import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/infrastructure/database/prisma-client";
import { generateFiscalReceipt } from "@/infrastructure/services/pdf.service";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const donation = await prisma.donation.findUnique({
    where: { id },
    include: { user: true },
  });

  if (!donation) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  if (donation.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (donation.status !== "COMPLETED") {
    return NextResponse.json({ error: "Donation not completed" }, { status: 400 });
  }

  const buffer = await generateFiscalReceipt({
    donationId: donation.id,
    amount: Number(donation.amount),
    currency: donation.currency,
    createdAt: donation.createdAt,
    donorName: donation.user.name ?? donation.user.email,
    donorEmail: donation.user.email,
  });

  return new NextResponse(buffer as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="recu-shaarec-${donation.id}.pdf"`,
    },
  });
}
