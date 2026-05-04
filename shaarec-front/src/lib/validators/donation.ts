import { z } from "zod";

export const donationSchema = z.object({
  packId: z.string().nullable(),
  amount: z.number().positive().max(100_000),
  currency: z.enum(["EUR", "USD", "MAD"]).default("EUR"),
  type: z.enum(["ONE_TIME", "RECURRING"]),
  campaignId: z.string().nullable().optional(),
});

export type DonationInput = z.infer<typeof donationSchema>;
