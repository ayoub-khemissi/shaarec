import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/infrastructure/services/stripe.service";
import type Stripe from "stripe";

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

  switch (event.type) {
    case "checkout.session.completed":
      // TODO: enregistrer le don / créer la souscription
      break;
    case "payment_intent.succeeded":
      // TODO: confirmer le paiement
      break;
    case "charge.refunded":
      // TODO: marquer le don comme remboursé
      break;
    case "charge.dispute.created":
      // TODO: alerter l'admin
      break;
    case "charge.dispute.closed":
      // TODO: mettre à jour le statut du litige
      break;
    case "customer.subscription.created":
      // TODO: créer la souscription en BDD
      break;
    case "customer.subscription.updated":
      // TODO: mettre à jour montant, statut, échéance
      break;
    case "customer.subscription.deleted":
      // TODO: marquer l'abonnement comme annulé
      break;
    case "customer.subscription.paused":
      // TODO: marquer en pause
      break;
    case "customer.subscription.resumed":
      // TODO: réactiver
      break;
    case "invoice.payment_succeeded":
      // TODO: enregistrer le paiement récurrent
      break;
    case "invoice.payment_failed":
      // TODO: notifier le donateur
      break;
    case "customer.updated":
      // TODO: synchroniser les infos donateur
      break;
    case "payment_method.attached":
    case "payment_method.detached":
      // TODO: mettre à jour le moyen de paiement
      break;
  }

  return NextResponse.json({ received: true });
}
