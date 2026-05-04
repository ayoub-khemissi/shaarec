"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppButton } from "@/components/ui/AppButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { StatCard } from "@/components/ui/StatCard";
import { FloatingShapes, GridLines, SideLines, CrackedGradient } from "@/components/ui/BackgroundEffects";
import {
  HeartIcon, HeartOutlineIcon, ShieldCheckIcon, DocumentIcon, EyeIcon, CoinIcon,
  GraduationCapIcon, SmileyFaceIcon, LinkIcon, BookIcon, SparklesIcon, ShieldTickIcon, CompassIcon,
} from "@/components/ui/Icons";

/* ─────────────────────────────────────────
   HERO
   ───────────────────────────────────────── */
const HERO_VIDEOS = [
  "https://videos.pexels.com/video-files/9079160/9079160-uhd_4096_2160_30fps.mp4",
  "https://videos.pexels.com/video-files/17629832/17629832-uhd_3840_2160_60fps.mp4",
  "https://videos.pexels.com/video-files/17629657/17629657-uhd_2560_1440_25fps.mp4",
  "https://videos.pexels.com/video-files/10915833/10915833-hd_1920_1080_30fps.mp4",
];

function HeroSection() {
  const t = useTranslations("hero");
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const idx = Date.now() % HERO_VIDEOS.length;
    setVideoSrc(HERO_VIDEOS[idx]);
  }, []);

  return (
    <section className="snap-section relative overflow-hidden min-h-dvh flex items-center pt-24">
      <div className="absolute inset-0 -z-20">
        {videoSrc && (
          <video
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20 w-full">
        <div className="flex flex-col items-center text-center gap-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white bg-accent/80 border border-accent px-4 py-2 rounded-full">
              <span className="size-1.5 rounded-full bg-white animate-pulse" />
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-4xl text-white"
          >
            {t("title1")} <span className="text-accent">{t("titleHighlight")}</span> {t("title2")}
            <br />
            <span className="text-sahara">{t("title3")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white text-lg sm:text-xl max-w-2xl leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <AppButton
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onPress={() => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" })}
            >
              <HeartIcon className="size-5" />
              {t("cta")}
            </AppButton>
            <AppButton
              variant="outline"
              size="lg"
              className="w-full sm:w-auto !text-white !border-white/30 hover:!bg-white/10"
              onPress={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
            >
              {t("ctaSecondary")}
            </AppButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-4"
          >
            <span className="flex items-center gap-1.5 bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full">
              <ShieldCheckIcon className="size-4 text-accent" />
              {t("trust.payment")}
            </span>
            <span className="flex items-center gap-1.5 bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full">
              <DocumentIcon className="size-4 text-accent" />
              {t("trust.receipt")}
            </span>
            <span className="flex items-center gap-1.5 bg-white text-black text-xs font-medium px-3 py-1.5 rounded-full">
              <EyeIcon className="size-4 text-accent" />
              {t("trust.transparent")}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ABOUT / MISSION
   ───────────────────────────────────────── */
const VALUE_KEYS = ["S", "H", "A1", "A2", "R", "E", "C"] as const;
const VALUE_LETTERS = ["S", "H", "A", "A", "R", "E", "C"];

function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" className="snap-section relative min-h-dvh flex items-center py-16 sm:py-20 bg-surface-secondary/50">
      <FloatingShapes variant="warm" seed="about" />
      <CrackedGradient palette="accent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {VALUE_KEYS.map((key, i) => (
            <GlassCard key={key} delay={i * 0.05} className="flex flex-col items-center text-center gap-2 p-4 w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)] lg:flex-1 lg:min-w-0">
              <span className="text-2xl font-bold text-accent">{VALUE_LETTERS[i]}</span>
              <span className="text-sm font-semibold text-foreground">{t(`values.${key}.word`)}</span>
              <span className="text-xs text-muted leading-snug">{t(`values.${key}.desc`)}</span>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 max-w-3xl mx-auto"
        >
          <GlassCard hover={false} className="p-8 text-center">
            <p className="text-foreground/80 leading-relaxed text-base sm:text-lg italic">
              &ldquo;{t("quote")}&rdquo;
            </p>
            <p className="mt-4 text-sm text-accent font-semibold">{t("quoteAuthor")}</p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   IMPACT STATS
   ───────────────────────────────────────── */
function ImpactSection() {
  const t = useTranslations("impact");

  return (
    <section id="impact" className="snap-section relative min-h-dvh flex items-center py-16 sm:py-20">
      <FloatingShapes variant="warm" seed="impact" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
          <StatCard value={7} label={t("stats.students")} delay={0} icon={<GraduationCapIcon className="size-6" />} />
          <StatCard value={71} suffix="%" label={t("stats.girls")} delay={0.1} icon={<SmileyFaceIcon className="size-6" />} />
          <StatCard value={3} label={t("stats.partners")} delay={0.2} icon={<LinkIcon className="size-6" />} />
          <StatCard value={10} suffix=" ans" label={t("stats.years")} delay={0.3} icon={<HeartOutlineIcon className="size-6" />} />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   METHODOLOGY
   ───────────────────────────────────────── */
const PILLAR_KEYS = ["academic", "coaching", "psychology", "orientation"] as const;
const PILLAR_ICONS = [
  <BookIcon key="a" className="size-6" />,
  <SparklesIcon key="c" className="size-6" />,
  <ShieldTickIcon key="p" className="size-6" />,
  <CompassIcon key="o" className="size-6" />,
];

function MethodologySection() {
  const t = useTranslations("methodology");

  return (
    <section id="methodology" className="snap-section relative min-h-dvh flex items-center py-16 sm:py-20 bg-surface-secondary/50">
      <GridLines />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PILLAR_KEYS.map((key, i) => (
            <GlassCard key={key} delay={i * 0.1} className="flex flex-col gap-4">
              <div className="size-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                {PILLAR_ICONS[i]}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{t(`pillars.${key}.title`)}</h3>
              <p className="text-sm text-muted leading-relaxed">{t(`pillars.${key}.desc`)}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   DONATION PACKS
   ───────────────────────────────────────── */
const PACK_KEYS = ["connection", "mentorship", "sovereignty"] as const;
const PACK_ICONS = ["📡", "🎓", "🏆"];
const PACK_ACCENT = [false, true, false];

function DonateSection() {
  const t = useTranslations("donate");

  return (
    <section id="donate" className="snap-section relative min-h-dvh flex items-center py-16 sm:py-20">
      <FloatingShapes variant="default" seed="donate" />
      <SideLines />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch">
          {PACK_KEYS.map((key, i) => (
            <GlassCard
              key={key}
              delay={i * 0.1}
              className={`relative flex flex-col items-center text-center gap-4 p-8 pt-10
                ${PACK_ACCENT[i] ? "border-accent/40 ring-1 ring-accent/20" : ""}`}
            >
              {PACK_ACCENT[i] && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest font-bold text-accent-foreground bg-accent px-3 py-1 rounded-full shadow-sm whitespace-nowrap">
                  {t("featured")}
                </span>
              )}
              <span className="text-4xl">{PACK_ICONS[i]}</span>
              <h3 className="text-xl font-bold text-foreground">{t(`packs.${key}.name`)}</h3>
              <p className="text-sm text-muted leading-relaxed flex-1">{t(`packs.${key}.desc`)}</p>
              <AppButton variant={PACK_ACCENT[i] ? "primary" : "secondary"} fullWidth className="mt-auto">
                {t("choose")}
              </AppButton>
            </GlassCard>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-sm text-muted mb-4">{t("freeAmountPrompt")}</p>
          <AppButton variant="warm" size="lg">
            <CoinIcon className="size-5" />
            {t("freeAmount")}
          </AppButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   TEAM
   ───────────────────────────────────────── */
const TEAM_MEMBERS = [
  { name: "Mohamed Aït Bajja", roleKey: "coordinator", initials: "MA" },
  { name: "Nadia Souhal", roleKey: "pedagogy", initials: "NS" },
  { name: "Amine Ait H.", roleKey: "mentor", initials: "AA" },
];

function TeamSection() {
  const t = useTranslations("team");

  return (
    <section id="team" className="snap-section relative min-h-dvh flex items-center py-16 sm:py-20 bg-surface-secondary/50">
      <FloatingShapes variant="accent" seed="team" />
      <CrackedGradient palette="ocean" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <SectionHeading tag={t("tag")} title={t("title")} subtitle={t("subtitle")} />

        <div className="mt-14 grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {TEAM_MEMBERS.map((member, i) => (
            <GlassCard key={member.name} delay={i * 0.1} className="flex flex-col items-center text-center gap-4">
              <div className="size-20 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-xl font-bold text-accent">{member.initials}</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted mt-1">{t(`roles.${member.roleKey}`)}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   FINAL CTA
   ───────────────────────────────────────── */
function CTASection() {
  const t = useTranslations("cta");

  return (
    <section className="snap-section relative min-h-dvh flex items-center py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sahara/6 via-transparent to-transparent" />
        <div className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[40%] rounded-full bg-sahara/5 blur-[120px]" />
      </div>

      <FloatingShapes variant="accent" seed="cta" opacity="low" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col items-center text-center gap-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="size-20 rounded-2xl bg-accent/15 backdrop-blur-sm border border-accent/25 flex items-center justify-center"
          >
            <HeartOutlineIcon className="size-10 text-accent" strokeWidth={1.5} />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">{t("title")}</h2>
          <p className="text-muted text-lg sm:text-xl max-w-2xl leading-relaxed">{t("subtitle")}</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
            <AppButton
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              onPress={() => document.getElementById("donate")?.scrollIntoView({ behavior: "smooth" })}
            >
              <HeartIcon className="size-5" />
              {t("donate")}
            </AppButton>
            <AppButton variant="outline" size="lg" className="w-full sm:w-auto">
              {t("partner")}
            </AppButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   PAGE
   ───────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ImpactSection />
      <MethodologySection />
      <DonateSection />
      <TeamSection />
      <CTASection />
    </>
  );
}
