"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/infrastructure/database/prisma-client";
import { sendMail } from "@/infrastructure/services/mail.service";
import { verifyRecaptcha } from "@/infrastructure/services/recaptcha.service";
import { registerSchema, forgotPasswordSchema, type RegisterInput, type ForgotPasswordInput } from "@/lib/validators/auth";

interface ActionResult {
  ok: boolean;
  error?: string;
}

export async function registerAction(input: RegisterInput): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Données invalides" };

  const captchaOk = await verifyRecaptcha(parsed.data.recaptchaToken);
  if (!captchaOk) return { ok: false, error: "Vérification anti-spam échouée" };

  const existing = await prisma.user.findUnique({ where: { email: parsed.data.email } });
  if (existing) return { ok: false, error: "Cet email est déjà utilisé" };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      email: parsed.data.email,
      name: parsed.data.name,
      passwordHash,
      role: "DONOR",
    },
  });

  // Email de bienvenue (non bloquant)
  sendMail({
    to: parsed.data.email,
    subject: "Bienvenue chez SHAAREC",
    html: welcomeEmail(parsed.data.name),
  }).catch((err) => console.error("Welcome email failed:", err));

  return { ok: true };
}

export async function forgotPasswordAction(input: ForgotPasswordInput): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Données invalides" };

  const captchaOk = await verifyRecaptcha(parsed.data.recaptchaToken);
  if (!captchaOk) return { ok: false, error: "Vérification anti-spam échouée" };

  // TODO: créer token, sauvegarder en BDD, envoyer email avec lien de reset
  // Pour l'instant on retourne toujours ok pour ne pas révéler l'existence du compte
  return { ok: true };
}

function welcomeEmail(name: string): string {
  return `
    <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px;">
      <h1 style="color: #2d8a4e;">Bienvenue ${name} !</h1>
      <p>Merci d'avoir rejoint la communauté SHAAREC.</p>
      <p>Vous pouvez désormais accéder à votre espace donateur, suivre vos contributions et consulter les rapports d'impact trimestriels.</p>
      <p style="margin-top: 32px; color: #666;">L'équipe SHAAREC</p>
    </div>
  `;
}
