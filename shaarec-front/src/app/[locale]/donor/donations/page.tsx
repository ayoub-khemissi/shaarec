import { auth } from "@/lib/auth";
import { prisma } from "@/infrastructure/database/prisma-client";
import { GlassCard } from "@/components/ui/GlassCard";

export default async function DonationsPage() {
  const session = await auth();
  if (!session?.user) return null;
  const donations = await prisma.donation.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: { campaign: { include: { translations: true } } },
  });

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Mes dons</h1>
        <p className="text-muted mt-1">Historique de vos contributions</p>
      </div>

      {donations.length === 0 ? (
        <GlassCard hover={false} className="text-center py-12">
          <p className="text-muted">Vous n&apos;avez pas encore fait de don.</p>
        </GlassCard>
      ) : (
        <GlassCard hover={false} className="p-0 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-default/30">
              <tr className="text-start">
                <th className="px-4 py-3 text-start font-medium text-muted">Date</th>
                <th className="px-4 py-3 text-start font-medium text-muted">Type</th>
                <th className="px-4 py-3 text-start font-medium text-muted">Statut</th>
                <th className="px-4 py-3 text-end font-medium text-muted">Montant</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id} className="border-t border-border/40">
                  <td className="px-4 py-3 text-foreground">
                    {new Date(d.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td className="px-4 py-3 text-foreground">
                    {d.type === "RECURRING" ? "Récurrent" : "Ponctuel"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded-full
                        ${d.status === "COMPLETED" ? "bg-success/15 text-success" : ""}
                        ${d.status === "PENDING" ? "bg-warning/15 text-warning" : ""}
                        ${d.status === "FAILED" ? "bg-danger/15 text-danger" : ""}
                        ${d.status === "REFUNDED" ? "bg-muted/15 text-muted" : ""}`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-end font-semibold text-foreground tabular-nums">
                    {Number(d.amount).toLocaleString("fr-FR")} {d.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </GlassCard>
      )}
    </div>
  );
}
