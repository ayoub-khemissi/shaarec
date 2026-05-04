"use client";

import { useTransition } from "react";
import { AppButton } from "@/components/ui/AppButton";
import { cancelSubscription } from "@/controllers/subscription.controller";

export function CancelSubscriptionButton({ subscriptionId }: { subscriptionId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleCancel = () => {
    if (!confirm("Êtes-vous sûr de vouloir annuler votre don mensuel ?")) return;
    startTransition(async () => {
      await cancelSubscription(subscriptionId);
    });
  };

  return (
    <AppButton variant="outline" size="sm" onPress={handleCancel} isDisabled={isPending}>
      {isPending ? "..." : "Annuler"}
    </AppButton>
  );
}
