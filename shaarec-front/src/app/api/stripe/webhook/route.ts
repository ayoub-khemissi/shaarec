import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/infrastructure/services/stripe.service";
import { prisma } from "@/infrastructure/database/prisma-client";
import { sendMail } from "@/infrastructure/services/mail.service";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object);
        break;
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object);
        break;
      case "charge.refunded":
        await handleRefund(event.data.object);
        break;
      case "charge.dispute.created":
      case "charge.dispute.closed":
        await handleDispute(event.data.object as Stripe.Dispute, event.type);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionCanceled(event.data.object);
        break;
      case "customer.subscription.paused":
        await handleSubscriptionStatus(event.data.object, "PAST_DUE");
        break;
      case "customer.subscription.resumed":
        await handleSubscriptionStatus(event.data.object, "ACTIVE");
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaid(event.data.object);
        break;
      case "invoice.payment_failed":
        await handleInvoiceFailed(event.data.object);
        break;
    }
  } catch (err) {
    console.error("Webhook handler error:", err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const donation = await prisma.donation.findUnique({
    where: { stripePaymentId: session.id },
    include: { user: true },
  });
  if (!donation) return;

  await prisma.donation.update({
    where: { id: donation.id },
    data: { status: "COMPLETED" },
  });

  // Email confirmation
  await sendMail({
    to: donation.user.email,
    subject: "Merci pour votre don à SHAAREC",
    html: `
      <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
        <h1 style="color: #2d8a4e;">Merci ${donation.user.name ?? ""} !</h1>
        <p>Votre don de <strong>${Number(donation.amount).toLocaleString("fr-FR")} ${donation.currency}</strong> a bien été reçu.</p>
        <p>Vous recevrez votre reçu fiscal dans votre espace donateur.</p>
        <p style="margin-top: 32px; color: #666;">L'équipe SHAAREC</p>
      </div>
    `,
  }).catch((err) => console.error("Confirmation email failed:", err));
}

async function handlePaymentSucceeded(intent: Stripe.PaymentIntent) {
  // Pour les paiements one-time hors checkout (rare ici)
  console.log("PaymentIntent succeeded:", intent.id);
}

async function handleRefund(charge: Stripe.Charge) {
  const sessionId = charge.payment_intent as string;
  const donation = await prisma.donation.findFirst({
    where: { stripePaymentId: sessionId },
  });
  if (!donation) return;

  await prisma.donation.update({
    where: { id: donation.id },
    data: { status: "REFUNDED" },
  });
}

async function handleDispute(dispute: Stripe.Dispute, eventType: string) {
  // TODO: alerter l'admin par email
  console.warn("Dispute event:", eventType, dispute.id);
}

async function handleSubscriptionUpsert(sub: Stripe.Subscription) {
  const customerId = sub.customer as string;
  const customer = await getStripe().customers.retrieve(customerId);
  if (customer.deleted) return;

  const user = await prisma.user.findUnique({
    where: { email: (customer as Stripe.Customer).email! },
  });
  if (!user) return;

  const item = sub.items.data[0];
  const amount = (item.price.unit_amount ?? 0) / 100;

  await prisma.subscription.upsert({
    where: { stripeSubscriptionId: sub.id },
    create: {
      userId: user.id,
      stripeSubscriptionId: sub.id,
      stripePriceId: item.price.id,
      amount,
      currency: item.price.currency.toUpperCase(),
      status: "ACTIVE",
      currentPeriodEnd: new Date(item.current_period_end * 1000),
    },
    update: {
      amount,
      stripePriceId: item.price.id,
      currentPeriodEnd: new Date(item.current_period_end * 1000),
      status: sub.status === "active" ? "ACTIVE" : "PAST_DUE",
    },
  });
}

async function handleSubscriptionCanceled(sub: Stripe.Subscription) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: sub.id },
    data: { status: "CANCELLED" },
  }).catch(() => {});
}

async function handleSubscriptionStatus(
  sub: Stripe.Subscription,
  status: "ACTIVE" | "CANCELLED" | "PAST_DUE",
) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: sub.id },
    data: { status },
  }).catch(() => {});
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subId = (invoice as Stripe.Invoice & { subscription?: string }).subscription;
  if (!subId) return;

  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subId },
  });
  if (!subscription) return;

  const amount = (invoice.amount_paid ?? 0) / 100;

  await prisma.donation.create({
    data: {
      userId: subscription.userId,
      amount,
      currency: invoice.currency.toUpperCase(),
      type: "RECURRING",
      status: "COMPLETED",
      stripePaymentId: invoice.id,
      stripeInvoiceId: invoice.id,
    },
  });
}

async function handleInvoiceFailed(invoice: Stripe.Invoice) {
  const subId = (invoice as Stripe.Invoice & { subscription?: string }).subscription;
  if (!subId) return;

  await prisma.subscription.update({
    where: { stripeSubscriptionId: subId },
    data: { status: "PAST_DUE" },
  }).catch(() => {});

  // TODO: notifier le donateur
}
