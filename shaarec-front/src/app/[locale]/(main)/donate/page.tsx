"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FloatingShapes } from "@/components/ui/BackgroundEffects";
import { HeartIcon } from "@/components/ui/Icons";
import { createCheckoutSession } from "@/controllers/donation.controller";

const PRESET_PACKS = [
  { key: "connection", icon: "📡", amount: 25 },
  { key: "mentorship", icon: "🎓", amount: 50, featured: true },
  { key: "sovereignty", icon: "🏆", amount: 100 },
];

const FREE_PRESETS = [10, 20, 50, 100, 250, 500];

export default function DonatePage() {
  const t = useTranslations("donate");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState<number>(50);
  const [type, setType] = useState<"ONE_TIME" | "RECURRING">("ONE_TIME");

  const finalAmount = selectedPack
    ? PRESET_PACKS.find((p) => p.key === selectedPack)?.amount ?? customAmount
    : customAmount;

  const handleSubmit = () => {
    setError("");
    startTransition(async () => {
      const result = await createCheckoutSession({
        packId: null,
        amount: finalAmount,
        currency: "EUR",
        type,
      });

      if (!result.ok || !result.url) {
        setError(result.error || "Erreur lors de la création du paiement");
        return;
      }
      window.location.href = result.url;
    });
  };

  return (
    <section className="relative min-h-dvh py-24 overflow-hidden">
      <FloatingShapes variant="accent" seed="donate-page" opacity="low" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-12 flex flex-col gap-8"
        >
          {/* Type de don */}
          <GlassCard hover={false} className="p-2">
            <div className="grid grid-cols-2 gap-1">
              <button
                onClick={() => setType("ONE_TIME")}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${type === "ONE_TIME" ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-default/50"}`}
              >
                Don ponctuel
              </button>
              <button
                onClick={() => setType("RECURRING")}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${type === "RECURRING" ? "bg-accent text-accent-foreground" : "text-foreground hover:bg-default/50"}`}
              >
                Don mensuel
              </button>
            </div>
          </GlassCard>

          {/* Packs */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Choisissez un pack</h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {PRESET_PACKS.map((pack) => (
                <button
                  key={pack.key}
                  onClick={() => setSelectedPack(pack.key)}
                  className={`relative flex flex-col items-center gap-2 p-5 rounded-xl border-2 transition-all cursor-pointer
                    ${selectedPack === pack.key
                      ? "border-accent bg-accent/10"
                      : "border-border bg-overlay/50 hover:border-accent/40"
                    }`}
                >
                  {pack.featured && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold text-accent-foreground bg-accent px-2 py-0.5 rounded-full">
                      {t("featured")}
                    </span>
                  )}
                  <span className="text-3xl">{pack.icon}</span>
                  <span className="font-semibold text-foreground">{t(`packs.${pack.key}.name`)}</span>
                  <span className="text-2xl font-bold text-accent tabular-nums">{pack.amount} €</span>
                </button>
              ))}
            </div>
          </div>

          {/* Montant libre */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Ou montant libre</h3>
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-2">
                {FREE_PRESETS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setSelectedPack(null);
                      setCustomAmount(amt);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors cursor-pointer
                      ${!selectedPack && customAmount === amt
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border bg-overlay/50 text-foreground hover:border-accent/40"
                      }`}
                  >
                    {amt} €
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <AppInput
                  type="number"
                  min={1}
                  max={100000}
                  value={customAmount}
                  onChange={(e) => {
                    setSelectedPack(null);
                    setCustomAmount(Number(e.target.value));
                  }}
                  className="max-w-[200px]"
                />
                <span className="text-foreground font-medium">€</span>
              </div>
            </div>
          </div>

          {/* Résumé + CTA */}
          <GlassCard hover={false} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-muted">Total</p>
              <p className="text-3xl font-bold text-accent tabular-nums">
                {finalAmount} € {type === "RECURRING" && <span className="text-base text-muted font-normal">/ mois</span>}
              </p>
            </div>
            <AppButton
              variant="primary"
              size="lg"
              onPress={handleSubmit}
              isDisabled={isPending || finalAmount <= 0}
            >
              <HeartIcon className="size-5" />
              {isPending ? "..." : "Donner maintenant"}
            </AppButton>
          </GlassCard>

          {error && (
            <p className="text-sm text-danger bg-danger/10 border border-danger/20 px-3 py-2 rounded-lg text-center">
              {error}
            </p>
          )}

          <p className="text-xs text-muted text-center">
            Paiement sécurisé via Stripe. Vous recevrez un reçu fiscal par email.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
