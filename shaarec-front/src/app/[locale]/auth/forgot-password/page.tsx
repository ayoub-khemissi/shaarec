"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput } from "@/components/ui/AppInput";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { forgotPasswordAction } from "@/controllers/auth.controller";

export default function ForgotPasswordPage() {
  const t = useTranslations("auth.forgotPassword");
  const { execute } = useRecaptcha();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const recaptchaToken = await execute("forgot_password");
    await forgotPasswordAction({ email, recaptchaToken });

    setSent(true);
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <GlassCard hover={false} className="p-8 sm:p-10">
        <div className="flex flex-col gap-2 mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t("title")}</h1>
          <p className="text-sm text-muted">{t("subtitle")}</p>
        </div>

        {sent ? (
          <div className="text-center py-4">
            <p className="text-sm text-foreground/80">{t("sent")}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <AppInput
              type="email"
              name="email"
              label={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />

            <AppButton type="submit" variant="primary" fullWidth isDisabled={loading}>
              {loading ? "..." : t("submit")}
            </AppButton>

            <p className="text-xs text-muted text-center">{t("recaptcha")}</p>
          </form>
        )}

        <p className="text-sm text-muted text-center mt-6">
          <Link href="/auth/login" className="text-accent font-medium hover:underline">
            {t("backToLogin")}
          </Link>
        </p>
      </GlassCard>
    </motion.div>
  );
}
