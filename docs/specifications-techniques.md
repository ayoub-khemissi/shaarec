# SHAAREC — Spécifications Techniques

> **Version** : 1.0
> **Date** : 08/04/2026
> **Stack** : Next.js / MySQL / TypeScript

---

## 1. Stack technique

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Framework | **Next.js 15** (App Router) | SSR, SSG, API Routes |
| Langage | **TypeScript** | Typage strict sur tout le projet |
| UI | **HeroUI** + **TailwindCSS 4** | Composants + utilitaires CSS |
| Animations | **Framer Motion** | Transitions, animations de pages, micro-interactions |
| Graphiques | **Recharts** | Tableaux de bord, barres de progression campagnes |
| BDD | **MySQL 8** | Base de données relationnelle |
| ORM | **Prisma** | Requêtes typées, schéma déclaratif, migrations |
| Auth | **NextAuth.js v5** | Google OAuth + credentials |
| Captcha | **reCAPTCHA v3** | Protection silencieuse (formulaires, dons, inscription) |
| Paiement | **Stripe** (+ PayPal via Stripe) | Dons ponctuels, abonnements récurrents |
| Emails | **Brevo (ex-Sendinblue)** | SMTP transactionnel + templates |
| i18n | **next-intl** | 7 langues, support RTL, détection géo |
| Validation | **Zod** | Validation des entrées côté serveur et client |
| Process manager | **PM2** | Déploiement, clustering, monitoring |

### Ajouts recommandés

| Technologie | Rôle |
|-------------|------|
| **Sharp** | Optimisation d'images (photos Zourgane) |
| **react-pdf / @react-pdf/renderer** | Génération de reçus fiscaux PDF |

### Stockage

Fichiers stockés **localement sur la machine dédiée** (uploads, médias, reçus PDF, rapports). Servis via un dossier `public/uploads/` ou un répertoire hors `public/` servi par Nginx.

### Rate limiting

Pas de rate limiter natif dans Next.js. Implémenté manuellement via un **`Map` en mémoire** dans le middleware Next.js (sliding window). Suffisant pour un serveur dédié, aucune dépendance externe nécessaire.

---

## 2. Architecture du projet

### Clean Architecture — Structure des dossiers

```
shaarec/shaarec-front/
├── .env.example
├── ecosystem.config.js              # PM2
├── next.config.ts
├── tailwind.config.ts
├── prisma/
│   ├── schema.prisma                # Schéma de BDD
│   └── migrations/                  # Migrations auto (prisma migrate)
│       └── ...
├── scripts/                         # Traitements automatiques TS
│   ├── seed.ts                      # Données initiales (packs, admin, langues)
│   ├── send-campaign-reminders.ts   # Emails de rappel campagnes
│   ├── send-impact-reports.ts       # Envoi trimestriel des rapports
│   └── cleanup-expired-sessions.ts  # Nettoyage des sessions expirées
├── public/
│   └── locales/                     # Fichiers de traduction statiques
├── src/
│   ├── app/                         # App Router Next.js
│   │   ├── [locale]/                # Routes par langue
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx             # Accueil
│   │   │   ├── about/
│   │   │   ├── team/
│   │   │   ├── methodology/
│   │   │   ├── transparency/
│   │   │   ├── contact/
│   │   │   ├── donate/              # Page de don
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx         # Liste articles
│   │   │   │   └── [slug]/          # Article détaillé
│   │   │   ├── donor/               # Espace donateur (protégé)
│   │   │   │   ├── dashboard/
│   │   │   │   ├── donations/
│   │   │   │   ├── receipts/
│   │   │   │   ├── reports/
│   │   │   │   └── subscription/
│   │   │   └── admin/               # Back-office (protégé)
│   │   │       ├── dashboard/
│   │   │       ├── campaigns/
│   │   │       ├── donations/
│   │   │       ├── donors/
│   │   │       ├── blog/
│   │   │       ├── pages/
│   │   │       ├── comments/
│   │   │       └── reports/
│   │   └── api/                     # API Routes
│   │       ├── auth/                # NextAuth endpoints
│   │       ├── donations/
│   │       ├── campaigns/
│   │       ├── blog/
│   │       ├── comments/
│   │       ├── contact/
│   │       ├── reports/
│   │       ├── receipts/
│   │       ├── stripe/
│   │       │   └── webhook/         # Webhook Stripe
│   │       └── recaptcha/
│   ├── core/                        # Couche métier (Clean Architecture)
│   │   ├── entities/                # Types / interfaces métier
│   │   │   ├── donation.ts
│   │   │   ├── donor.ts
│   │   │   ├── campaign.ts
│   │   │   ├── article.ts
│   │   │   ├── comment.ts
│   │   │   ├── report.ts
│   │   │   └── user.ts
│   │   └── use-cases/               # Logique métier pure
│   │       ├── donations/
│   │       ├── campaigns/
│   │       ├── blog/
│   │       └── donors/
│   ├── infrastructure/              # Couche infra
│   │   ├── database/
│   │   │   └── prisma-client.ts     # Singleton Prisma
│   │   ├── repositories/            # Accès données (implémentation)
│   │   │   ├── donation.repository.ts
│   │   │   ├── donor.repository.ts
│   │   │   ├── campaign.repository.ts
│   │   │   ├── article.repository.ts
│   │   │   ├── comment.repository.ts
│   │   │   └── report.repository.ts
│   │   ├── services/                # Services externes
│   │   │   ├── stripe.service.ts
│   │   │   ├── brevo.service.ts
│   │   │   ├── recaptcha.service.ts
│   │   │   ├── upload.service.ts
│   │   │   └── pdf.service.ts
│   │   └── email/
│   │       └── templates/           # Templates emails Brevo
│   ├── controllers/                 # Couche contrôleurs (orchestration)
│   │   ├── donation.controller.ts
│   │   ├── campaign.controller.ts
│   │   ├── blog.controller.ts
│   │   ├── comment.controller.ts
│   │   ├── donor.controller.ts
│   │   ├── contact.controller.ts
│   │   └── report.controller.ts
│   ├── middleware/                   # Middlewares
│   │   ├── auth.ts                  # Protection des routes
│   │   ├── rate-limit.ts
│   │   ├── recaptcha.ts
│   │   └── locale.ts               # Détection langue / RTL
│   ├── components/                  # Composants React
│   │   ├── ui/                      # Composants génériques
│   │   ├── layout/                  # Header, Footer, Navigation, LangSwitcher
│   │   ├── donations/               # DonationCard, DonationForm, ProgressBar
│   │   ├── blog/                    # ArticleCard, CommentSection
│   │   ├── admin/                   # Composants back-office
│   │   └── charts/                  # Wrappers Recharts
│   ├── hooks/                       # Custom hooks React
│   ├── lib/                         # Utilitaires
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── validators/              # Schémas Zod
│   ├── messages/                    # Fichiers de traduction (next-intl)
│   │   ├── fr.json
│   │   ├── ar.json
│   │   ├── en.json
│   │   ├── es.json
│   │   ├── nl.json
│   │   ├── de.json
│   │   └── ber.json                 # Tamazight
│   └── styles/
│       └── globals.css
└── tests/
    ├── unit/
    └── integration/
```

### Flux Clean Architecture

```
Route API / Server Action
    → Controller (validation Zod, orchestration)
        → Use Case (logique métier)
            → Repository (accès BDD via Prisma)
            → Service (Stripe, Brevo, reCAPTCHA...)
        ← DTO / Réponse
    ← Response JSON
```

---

## 3. Schéma de base de données

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// ──────────────────────────────────────
// Auth & Utilisateurs
// ──────────────────────────────────────

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  passwordHash  String?
  image         String?
  role          UserRole  @default(DONOR)
  locale        String    @default("fr")
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  donations     Donation[]
  comments      Comment[]
  articles      Article[]   @relation("ArticleAuthor")

  @@map("users")
}

enum UserRole {
  ADMIN
  DONOR
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

// ──────────────────────────────────────
// Campagnes & Dons
// ──────────────────────────────────────

model Campaign {
  id          String         @id @default(cuid())
  status      CampaignStatus @default(DRAFT)
  goalAmount  Decimal        @db.Decimal(10, 2)
  startDate   DateTime
  endDate     DateTime
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  translations CampaignTranslation[]
  donations    Donation[]

  @@map("campaigns")
}

enum CampaignStatus {
  DRAFT
  ACTIVE
  CLOSED
}

model CampaignTranslation {
  id          String @id @default(cuid())
  campaignId  String
  locale      String @db.VarChar(5)
  title       String
  description String @db.Text

  campaign Campaign @relation(fields: [campaignId], references: [id], onDelete: Cascade)

  @@unique([campaignId, locale])
  @@map("campaign_translations")
}

model DonationPack {
  id        String   @id @default(cuid())
  position  Int      @default(0)
  amount    Decimal  @db.Decimal(10, 2)
  active    Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  translations DonationPackTranslation[]
  donations    Donation[]

  @@map("donation_packs")
}

model DonationPackTranslation {
  id          String @id @default(cuid())
  packId      String
  locale      String @db.VarChar(5)
  name        String
  description String @db.Text

  pack DonationPack @relation(fields: [packId], references: [id], onDelete: Cascade)

  @@unique([packId, locale])
  @@map("donation_pack_translations")
}

model Donation {
  id               String         @id @default(cuid())
  userId           String
  campaignId       String?
  packId           String?
  amount           Decimal        @db.Decimal(10, 2)
  currency         String         @default("EUR") @db.VarChar(3)
  type             DonationType
  status           DonationStatus @default(PENDING)
  stripePaymentId  String?        @unique
  stripeInvoiceId  String?
  createdAt        DateTime       @default(now())

  user     User          @relation(fields: [userId], references: [id])
  campaign Campaign?     @relation(fields: [campaignId], references: [id])
  pack     DonationPack? @relation(fields: [packId], references: [id])
  receipt  FiscalReceipt?

  @@index([userId])
  @@index([campaignId])
  @@map("donations")
}

enum DonationType {
  ONE_TIME
  RECURRING
}

enum DonationStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
}

model Subscription {
  id                   String             @id @default(cuid())
  userId               String
  stripeSubscriptionId String             @unique
  stripePriceId        String
  amount               Decimal            @db.Decimal(10, 2)
  currency             String             @default("EUR") @db.VarChar(3)
  status               SubscriptionStatus @default(ACTIVE)
  currentPeriodEnd     DateTime
  createdAt            DateTime           @default(now())
  updatedAt            DateTime           @updatedAt

  @@index([userId])
  @@map("subscriptions")
}

enum SubscriptionStatus {
  ACTIVE
  CANCELLED
  PAST_DUE
}

model FiscalReceipt {
  id          String   @id @default(cuid())
  donationId  String   @unique
  fileUrl     String
  generatedAt DateTime @default(now())

  donation Donation @relation(fields: [donationId], references: [id])

  @@map("fiscal_receipts")
}

// ──────────────────────────────────────
// Blog
// ──────────────────────────────────────

model Article {
  id          String        @id @default(cuid())
  authorId    String
  slug        String        @unique
  coverImage  String?
  status      ArticleStatus @default(DRAFT)
  views       Int           @default(0)
  readingTime Int           @default(0)
  publishedAt DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  author       User                 @relation("ArticleAuthor", fields: [authorId], references: [id])
  translations ArticleTranslation[]
  comments     Comment[]

  @@map("articles")
}

enum ArticleStatus {
  DRAFT
  PUBLISHED
}

model ArticleTranslation {
  id        String @id @default(cuid())
  articleId String
  locale    String @db.VarChar(5)
  title     String
  excerpt   String @db.Text
  content   String @db.LongText

  article Article @relation(fields: [articleId], references: [id], onDelete: Cascade)

  @@unique([articleId, locale])
  @@map("article_translations")
}

model Comment {
  id        String        @id @default(cuid())
  articleId String
  userId    String?
  name      String
  email     String
  content   String        @db.Text
  status    CommentStatus @default(PENDING)
  createdAt DateTime      @default(now())

  article Article @relation(fields: [articleId], references: [id], onDelete: Cascade)
  user    User?   @relation(fields: [userId], references: [id])

  @@index([articleId])
  @@map("comments")
}

enum CommentStatus {
  PENDING
  APPROVED
  REJECTED
}

// ──────────────────────────────────────
// Rapports d'impact
// ──────────────────────────────────────

model ImpactReport {
  id        String   @id @default(cuid())
  quarter   String   @db.VarChar(7) // ex: "2026-Q1"
  fileUrl   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  translations ImpactReportTranslation[]

  @@unique([quarter])
  @@map("impact_reports")
}

model ImpactReportTranslation {
  id       String @id @default(cuid())
  reportId String
  locale   String @db.VarChar(5)
  title    String
  content  String @db.LongText

  report ImpactReport @relation(fields: [reportId], references: [id], onDelete: Cascade)

  @@unique([reportId, locale])
  @@map("impact_report_translations")
}

// ──────────────────────────────────────
// Contact
// ──────────────────────────────────────

model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String
  message   String   @db.Text
  read      Boolean  @default(false)
  createdAt DateTime @default(now())

  @@map("contact_messages")
}

// ──────────────────────────────────────
// Pages CMS
// ──────────────────────────────────────

model Page {
  id        String   @id @default(cuid())
  slug      String   @unique
  updatedAt DateTime @updatedAt

  translations PageTranslation[]

  @@map("pages")
}

model PageTranslation {
  id      String @id @default(cuid())
  pageId  String
  locale  String @db.VarChar(5)
  title   String
  content String @db.LongText

  page Page @relation(fields: [pageId], references: [id], onDelete: Cascade)

  @@unique([pageId, locale])
  @@map("page_translations")
}
```

---

## 4. Système de migrations

Prisma gère les migrations automatiquement :

```bash
# Créer une migration après modification du schema
npx prisma migrate dev --name <nom_migration>

# Appliquer en production
npx prisma migrate deploy

# Seed de données initiales
npx tsx scripts/seed.ts
```

Les migrations sont versionnées dans `prisma/migrations/` et commitées dans le repo.

---

## 5. Configuration PM2

```js
// ecosystem.config.js

module.exports = {
  apps: [
    {
      name: "shaarec-front",
      script: "node_modules/.bin/next",
      args: "start",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
    {
      name: "shaarec-campaign-reminders",
      script: "npx",
      args: "tsx scripts/send-campaign-reminders.ts",
      cron_restart: "0 9 * * 1", // Chaque lundi à 9h
      autorestart: false,
    },
    {
      name: "shaarec-impact-reports",
      script: "npx",
      args: "tsx scripts/send-impact-reports.ts",
      cron_restart: "0 10 1 1,4,7,10 *", // 1er jour du trimestre à 10h
      autorestart: false,
    },
    {
      name: "shaarec-cleanup",
      script: "npx",
      args: "tsx scripts/cleanup-expired-sessions.ts",
      cron_restart: "0 3 * * 0", // Chaque dimanche à 3h
      autorestart: false,
    },
  ],
};
```

---

## 6. Variables d'environnement

```env
# .env.example

# ── App
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=SHAAREC

# ── Base de données
DATABASE_URL=mysql://user:password@localhost:3306/shaarec

# ── NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=

# ── Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# ── Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# ── Brevo (SMTP)
BREVO_API_KEY=
BREVO_SMTP_HOST=smtp-relay.brevo.com
BREVO_SMTP_PORT=587
BREVO_SMTP_USER=
BREVO_SMTP_PASSWORD=
BREVO_SENDER_EMAIL=contact@shaarec.org
BREVO_SENDER_NAME=SHAAREC

# ── reCAPTCHA v3
RECAPTCHA_SECRET_KEY=
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=

# ── Stockage local
UPLOADS_DIR=./uploads

# ── Géolocalisation (détection langue)
NEXT_PUBLIC_DEFAULT_LOCALE=fr
```

---

## 7. Scripts de traitement automatique

| Script | Fréquence | Description |
|--------|-----------|-------------|
| `seed.ts` | Manuel | Données initiales : packs de dons, comptes admin, pages CMS |
| `send-campaign-reminders.ts` | Hebdo (lundi 9h) | Email aux donateurs récurrents sur les campagnes actives |
| `send-impact-reports.ts` | Trimestriel | Notifie les donateurs qu'un nouveau rapport est disponible |
| `cleanup-expired-sessions.ts` | Hebdo (dimanche 3h) | Purge des sessions expirées en BDD |

---

## 8. Internationalisation (i18n)

### Langues et configuration

| Code | Langue | Direction | Priorité |
|------|--------|-----------|----------|
| `fr` | Français | LTR | Principale |
| `ar` | Arabe littéraire | **RTL** | Haute |
| `en` | Anglais | LTR | Haute |
| `es` | Espagnol | LTR | Secondaire |
| `nl` | Néerlandais | LTR | Secondaire |
| `de` | Allemand | LTR | Secondaire |
| `ber` | Tamazight | LTR | Secondaire |

### Stratégie

- Routing par préfixe : `/fr/donate`, `/ar/donate`, etc.
- Détection automatique via l'en-tête `Accept-Language` / géo IP
- Contenu dynamique (articles, campagnes, pages) : table de traductions en BDD par locale
- Contenu statique (UI, labels, boutons) : fichiers JSON dans `src/messages/`
- RTL : classe `dir="rtl"` conditionnelle sur le layout, TailwindCSS RTL plugin

---

## 9. Authentification & Sécurité

### NextAuth v5

- **Providers** : Google OAuth + Credentials (email/password)
- **Rôles** : `ADMIN` (back-office) et `DONOR` (espace donateur)
- **Session strategy** : JWT (compatible PM2 cluster)
- **Middleware** : protection des routes `/donor/*` et `/admin/*`

### reCAPTCHA v3

- Mode silencieux (pas de challenge visible)
- Appliqué sur : formulaire de contact, inscription, don, commentaires
- Score minimum configurable (défaut : 0.5)

### Sécurité générale

- Rate limiting via `Map` en mémoire dans le middleware (sliding window, sans dépendance)
- Headers de sécurité via `next.config.ts` (CSP, X-Frame-Options, etc.)
- Webhook Stripe vérifié par signature
- Validation Zod sur toutes les entrées

---

## 10. Paiement Stripe

### Flux don ponctuel

```
Donateur → Choix pack/montant libre
    → Création Stripe Checkout Session (serveur)
    → Redirection vers Stripe
    → Webhook `checkout.session.completed`
    → Création Donation en BDD (status: COMPLETED)
    → Email confirmation via Brevo
```

### Flux don récurrent

```
Donateur → Choix montant + récurrent mensuel
    → Création Stripe Subscription via Checkout
    → Webhook `invoice.payment_succeeded`
    → Création/Mise à jour Donation + Subscription en BDD
    → Email confirmation via Brevo
```

### Webhooks Stripe écoutés

| Événement | Action |
|-----------|--------|
| **Checkout** | |
| `checkout.session.completed` | Enregistrer le don ponctuel, créer la souscription si récurrent |
| **Paiements** | |
| `payment_intent.succeeded` | Confirmer le paiement, email confirmation |
| `charge.refunded` | Marquer le don comme remboursé, mettre à jour les stats campagne |
| `charge.dispute.created` | Alerter l'admin (litige ouvert) |
| `charge.dispute.closed` | Mettre à jour le statut du litige |
| **Abonnements (dons récurrents)** | |
| `customer.subscription.created` | Créer la souscription en BDD |
| `customer.subscription.updated` | Mettre à jour montant, statut, prochaine échéance |
| `customer.subscription.deleted` | Marquer l'abonnement comme annulé |
| `customer.subscription.paused` | Marquer l'abonnement en pause |
| `customer.subscription.resumed` | Réactiver l'abonnement |
| `customer.subscription.trial_will_end` | Notification fin de période d'essai (si applicable) |
| **Factures (récurrent)** | |
| `invoice.payment_succeeded` | Enregistrer le paiement récurrent, email confirmation |
| `invoice.payment_failed` | Notifier le donateur, incrémenter le compteur d'échecs |
| **Client** | |
| `customer.updated` | Synchroniser les infos donateur (email, nom) |
| `payment_method.attached` | Mettre à jour le moyen de paiement du donateur |
| `payment_method.detached` | Retirer le moyen de paiement |

---

## 11. Emails (Brevo)

### Templates transactionnels

| Email | Déclencheur |
|-------|-------------|
| Confirmation de don | Webhook Stripe (don validé) |
| Bienvenue donateur | Création de compte |
| Reçu fiscal disponible | Généré à la demande (clic donateur) |
| Nouveau rapport d'impact | Script `send-impact-reports.ts` |
| Rappel campagne | Script `send-campaign-reminders.ts` |
| Réinitialisation mot de passe | Demande utilisateur |
| Nouveau message contact | Soumission formulaire |
| Paiement échoué | Webhook Stripe |

---

## 12. Déploiement

### Prérequis serveur

- Node.js 20 LTS
- MySQL 8
- PM2 (global)
- Nginx (reverse proxy)
- Certbot (SSL Let's Encrypt)

### Processus

```bash
# Build
npm run build

# Migrations
npx prisma migrate deploy

# Lancement
pm2 start ecosystem.config.js

# Monitoring
pm2 monit
```
