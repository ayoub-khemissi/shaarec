import { prisma } from "@/infrastructure/database/prisma-client";
import { GlassCard } from "@/components/ui/GlassCard";

export default async function ReportsPage() {
  const reports = await prisma.impactReport.findMany({
    orderBy: { quarter: "desc" },
    include: { translations: true },
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rapports d&apos;impact</h1>
        <p className="text-muted mt-1">
          Suivez l&apos;utilisation concrète des fonds, trimestre par trimestre.
        </p>
      </div>

      {reports.length === 0 ? (
        <GlassCard hover={false} className="text-center py-12">
          <p className="text-muted">Aucun rapport publié pour le moment.</p>
        </GlassCard>
      ) : (
        <div className="grid gap-3">
          {reports.map((r) => {
            const tr = r.translations.find((t) => t.locale === "fr") ?? r.translations[0];
            return (
              <GlassCard key={r.id} hover={false}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-accent mb-1">
                      {r.quarter}
                    </p>
                    <h3 className="font-semibold text-foreground">{tr?.title}</h3>
                  </div>
                  {r.filePath && (
                    <a
                      href={`/api/reports/${r.id}`}
                      target="_blank"
                      className="text-sm text-accent font-medium hover:underline"
                    >
                      Télécharger PDF
                    </a>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
