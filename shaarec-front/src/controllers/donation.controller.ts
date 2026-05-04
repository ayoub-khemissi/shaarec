"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getStripe } from "@/infrastructure/services/stripe.service";
import { prisma } from "@/infrastructure/database/prisma-client";
import { donationSchema, type DonationInput } from "@/lib/validators/donation";

export async function createCheckoutSession(input: DonationInput) {
  const parsed = donationSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Données invalides" };

  const session = await auth();
  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/donate");
  }
  const user = session.user;

  const stripe = getStripe();
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
  const amountCents = Math.round(parsed.data.amount * 100);

  // Récupérer ou créer le pack en BDD si packId fourni
  let pack = null;
  if (parsed.data.packId) {
    pack = await prisma.donationPack.findUnique({
      where: { id: parsed.data.packId },
      include: { translations: true },
    });
  }

  const productName = pack
    ? pack.translations.find((t) => t.locale === "fr")?.name ?? "Don SHAAREC"
    : "Don SHAAREC";

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: parsed.data.type === "RECURRING" ? "subscription" : "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: parsed.data.currency.toLowerCase(),
          product_data: { name: productName },
          unit_amount: amountCents,
          ...(parsed.data.type === "RECURRING" && { recurring: { interval: "month" } }),
        },
        quantity: 1,
      },
    ],
    customer_email: user.email,
    success_url: `${baseUrl}/donor/dashboard?donation=success`,
    cancel_url: `${baseUrl}/donate?canceled=true`,
    metadata: {
      userId: user.id,
      packId: parsed.data.packId ?? "",
      campaignId: parsed.data.campaignId ?? "",
      type: parsed.data.type,
    },
  });

  // Pré-création de la donation en PENDING
  await prisma.donation.create({
    data: {
      userId: user.id,
      packId: parsed.data.packId,
      campaignId: parsed.data.campaignId ?? null,
      amount: parsed.data.amount,
      currency: parsed.data.currency,
      type: parsed.data.type,
      status: "PENDING",
      stripePaymentId: checkoutSession.id,
    },
  });

  return { ok: true, url: checkoutSession.url };
}
