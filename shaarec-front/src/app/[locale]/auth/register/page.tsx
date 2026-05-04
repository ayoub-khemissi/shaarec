"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppButton } from "@/components/ui/AppButton";
import { AppInput, AppPasswordInput } from "@/components/ui/AppInput";
import { useRecaptcha } from "@/hooks/useRecaptcha";
import { registerAction } from "@/controllers/auth.controller";

export default function RegisterPage() {
  const t = useTranslations("auth.register");
  const router = useRouter();
  const { execute } = useRecaptcha();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const recaptchaToken = await execute("register");
      const result = await registerAction({ name, email, password, recaptchaToken });

      if (!result.ok) {
        setError(result.error || t("genericError"));
        setLoading(false);
        return;
      }

      // Auto-login après inscription réussie
      await signIn("credentials", { email, password, redirect: false });
      router.push("/donor/dashboard");
      router.refresh();
    } catch {
      setError(t("genericError"));
      setLoading(false);
    }
  };

  const handleGoogle = () => signIn("google", { callbackUrl: "/donor/dashboard" });

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

        <AppButton variant="secondary" fullWidth onPress={handleGoogle} className="mb-5">
          <svg className="size-4" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0012 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18a11 11 0 000 9.86l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" fill="#EA4335" />
          </svg>
          {t("withGoogle")}
        </AppButton>

        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted uppercase tracking-wider">{t("or")}</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AppInput
            type="text"
            name="name"
            label={t("name")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={80}
            autoComplete="name"
          />
          <AppInput
            type="email"
            name="email"
            label={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <AppPasswordInput
            name="password"
            label={t("password")}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            description={t("passwordHint")}
            autoComplete="new-password"
          />

          {error && (
            <p className="text-sm text-danger bg-danger/10 border border-danger/20 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          <AppButton type="submit" variant="primary" fullWidth isDisabled={loading}>
            {loading ? "..." : t("submit")}
          </AppButton>

          <p className="text-xs text-muted text-center">{t("recaptcha")}</p>
        </form>

        <p className="text-sm text-muted text-center mt-6">
          {t("hasAccount")}{" "}
          <Link href="/auth/login" className="text-accent font-medium hover:underline">
            {t("login")}
          </Link>
        </p>
      </GlassCard>
    </motion.div>
  );
}
