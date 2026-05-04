import { auth } from "@/lib/auth";
import { prisma } from "@/infrastructure/database/prisma-client";
import { GlassCard } from "@/components/ui/GlassCard";
import { AppButton } from "@/components/ui/AppButton";
import { DocumentIcon } from "@/components/ui/Icons";

export default async function ReceiptsPage() {
  const session = await auth();
  if (!session?.user) return null;
  const donations = await prisma.donation.findMany({
    where: { userId: session.user.id, status: "COMPLETED" },
    orderBy: { createdAt: "desc" },
    include: { receipt: true },
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reçus fiscaux</h1>
        <p className="text-muted mt-1">
          Téléchargez vos reçus pour bénéficier d&apos;une déduction fiscale.
        </p>
      </div>

      {donations.length === 0 ? (
        <GlassCard hover={false} className="text-center py-12">
          <p className="text-muted">Aucun don éligible à un reçu fiscal pour le moment.</p>
        </GlassCard>
      ) : (
        <div className="grid gap-3">
          {donations.map((d) => (
            <GlassCard key={d.id} hover={false} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <DocumentIcon className="size-5" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    Don du {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                  <p className="text-sm text-muted tabular-nums">
                    {Number(d.amount).toLocaleString("fr-FR")} {d.currency}
                  </p>
                </div>
              </div>
              <form action={`/api/receipts/${d.id}`} method="GET" target="_blank">
                <AppButton type="submit" variant="secondary" size="sm">
                  Télécharger PDF
                </AppButton>
              </form>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
