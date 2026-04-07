// Service de génération de reçus fiscaux PDF
// Utilise @react-pdf/renderer côté serveur
// Génération à la demande (clic donateur)

export async function generateFiscalReceipt(donation: {
  id: string;
  amount: number;
  currency: string;
  createdAt: Date;
  donorName: string;
  donorEmail: string;
  associationName: string;
  associationAddress: string;
}): Promise<Buffer> {
  // TODO: implémenter le template PDF avec @react-pdf/renderer
  throw new Error("Not implemented");
}
