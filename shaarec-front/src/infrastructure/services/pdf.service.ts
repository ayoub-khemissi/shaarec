import { renderToBuffer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { createElement } from "react";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 11, fontFamily: "Helvetica", lineHeight: 1.5 },
  header: { borderBottomWidth: 2, borderBottomColor: "#2d8a4e", paddingBottom: 16, marginBottom: 24 },
  title: { fontSize: 22, fontWeight: "bold", color: "#1a3d28" },
  subtitle: { fontSize: 11, color: "#666", marginTop: 4 },
  section: { marginBottom: 16 },
  label: { color: "#666", marginBottom: 2 },
  value: { fontSize: 12, fontWeight: "bold" },
  amountBox: { backgroundColor: "#f0f9f3", padding: 16, borderRadius: 4, marginVertical: 16, alignItems: "center" },
  amount: { fontSize: 28, fontWeight: "bold", color: "#2d8a4e" },
  amountLabel: { fontSize: 10, color: "#666", marginTop: 4 },
  footer: { marginTop: 40, paddingTop: 16, borderTopWidth: 1, borderTopColor: "#ddd", fontSize: 9, color: "#999", textAlign: "center" },
  row: { flexDirection: "row", marginBottom: 6 },
  rowLabel: { width: 120, color: "#666" },
  rowValue: { fontWeight: "bold" },
});

interface ReceiptData {
  donationId: string;
  amount: number;
  currency: string;
  createdAt: Date;
  donorName: string;
  donorEmail: string;
}

export async function generateFiscalReceipt(data: ReceiptData): Promise<Buffer> {
  const doc = createElement(
    Document,
    null,
    createElement(
      Page,
      { size: "A4", style: styles.page },
      createElement(
        View,
        { style: styles.header },
        createElement(Text, { style: styles.title }, "SHAAREC"),
        createElement(Text, { style: styles.subtitle }, "Reçu fiscal au titre des dons"),
      ),
      createElement(
        View,
        { style: styles.section },
        createElement(Text, { style: styles.label }, "Numéro de reçu"),
        createElement(Text, { style: styles.value }, data.donationId),
      ),
      createElement(
        View,
        { style: styles.amountBox },
        createElement(
          Text,
          { style: styles.amount },
          `${Number(data.amount).toLocaleString("fr-FR")} ${data.currency}`,
        ),
        createElement(Text, { style: styles.amountLabel }, "Montant du don"),
      ),
      createElement(
        View,
        { style: styles.section },
        createElement(
          View,
          { style: styles.row },
          createElement(Text, { style: styles.rowLabel }, "Donateur"),
          createElement(Text, { style: styles.rowValue }, data.donorName),
        ),
        createElement(
          View,
          { style: styles.row },
          createElement(Text, { style: styles.rowLabel }, "Email"),
          createElement(Text, { style: styles.rowValue }, data.donorEmail),
        ),
        createElement(
          View,
          { style: styles.row },
          createElement(Text, { style: styles.rowLabel }, "Date du don"),
          createElement(
            Text,
            { style: styles.rowValue },
            new Date(data.createdAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          ),
        ),
      ),
      createElement(
        View,
        { style: styles.section },
        createElement(
          Text,
          {},
          "L'association SHAAREC certifie avoir reçu le don ci-dessus. Conformément à l'article 200 du CGI, ce don ouvre droit à une réduction d'impôt sur le revenu.",
        ),
      ),
      createElement(
        View,
        { style: styles.footer },
        createElement(
          Text,
          {},
          "SHAAREC France — Association loi 1901 — contact@shaarec.org",
        ),
      ),
    ),
  );

  return renderToBuffer(doc);
}
