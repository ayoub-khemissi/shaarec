import { auth } from "@/lib/auth";
import { prisma } from "@/infrastructure/database/prisma-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { HeartIcon, DocumentIcon, EyeIcon } from "@/components/ui/Icons";
import { AppButton } from "@/components/ui/AppButton";
import { CancelSubscriptionButton } from "@/components/donations/CancelSubscriptionButton";
import Link from "next/link";

async function getDonorStats(userId: string) {
  const [totalDonations, totalAmount, latestDonation, activeSubscription] = await Promise.all([
    prisma.donation.count({ where: { userId, status: "COMPLETED" } }),
    prisma.donation.aggregate({
      where: { userId, status: "COMPLETED" },
      _sum: { amount: true },
    }),
    prisma.donation.findFirst({
      where: { userId, status: "COMPLETED" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.subscription.findFirst({
      where: { userId, status: "ACTIVE" },
    }),
  ]);

  return {
    count: totalDonations,
    total: Number(totalAmount._sum.amount ?? 0),
    latest: latestDonation,
    subscription: activeSubscription,
  };
}

export default async function DonorDashboard() {
  const session = await auth();
  if (!session?.user) return null;
  const stats = await getDonorStats(session.user.id);

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Bonjour {session.user.name?.split(" ")[0] ?? ""} 👋
        </h1>
        <p className="text-muted mt-1">Bienvenue dans votre espace donateur</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <GlassCard hover={false} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Dons totaux</span>
            <HeartIcon className="size-5 text-accent" />
          </div>
          <span className="text-3xl font-bold text-foreground tabular-nums">
            {stats.total.toLocaleString("fr-FR")} €
          </span>
        </GlassCard>

        <GlassCard hover={false} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Nombre de dons</span>
            <DocumentIcon className="size-5 text-accent" />
          </div>
          <span className="text-3xl font-bold text-foreground tabular-nums">{stats.count}</span>
        </GlassCard>

        <GlassCard hover={false} className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted">Dernier don</span>
            <EyeIcon className="size-5 text-accent" />
          </div>
          <span className="text-3xl font-bold text-foreground tabular-nums">
            {stats.latest
              ? new Date(stats.latest.createdAt).toLocaleDateString("fr-FR")
              : "—"}
          </span>
        </GlassCard>
      </div>

      {stats.subscription && (
        <GlassCard hover={false} className="border-accent/30 bg-accent/5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-accent mb-1">
                Don mensuel actif
              </p>
              <p className="font-semibold text-foreground tabular-nums">
                {Number(stats.subscription.amount).toLocaleString("fr-FR")} {stats.subscription.currency} / mois
              </p>
              <p className="text-xs text-muted mt-1">
                Prochain prélèvement : {new Date(stats.subscription.currentPeriodEnd).toLocaleDateString("fr-FR")}
              </p>
            </div>
            <CancelSubscriptionButton subscriptionId={stats.subscription.id} />
          </div>
        </GlassCard>
      )}

      <GlassCard hover={false} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
        <div>
          <h3 className="font-semibold text-foreground">Faire un nouveau don</h3>
          <p className="text-sm text-muted mt-1">
            Soutenez SHAAREC ponctuellement ou via un don récurrent.
          </p>
        </div>
        <Link href="/donate">
          <AppButton variant="primary">
            <HeartIcon className="size-4" />
            Donner
          </AppButton>
        </Link>
      </GlassCard>
    </div>
  );
}
