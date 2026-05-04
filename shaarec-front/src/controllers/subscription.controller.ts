"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { getStripe } from "@/infrastructure/services/stripe.service";
import { prisma } from "@/infrastructure/database/prisma-client";

export async function cancelSubscription(subscriptionId: string) {
  const session = await auth();
  if (!session?.user) return { ok: false, error: "Non autorisé" };

  const subscription = await prisma.subscription.findUnique({
    where: { id: subscriptionId },
  });
  if (!subscription || subscription.userId !== session.user.id) {
    return { ok: false, error: "Abonnement introuvable" };
  }

  await getStripe().subscriptions.cancel(subscription.stripeSubscriptionId);

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/donor/dashboard");
  return { ok: true };
}
