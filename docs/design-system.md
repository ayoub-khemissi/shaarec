# SHAAREC — Design System

> **Version** : 1.0
> **Date** : 08/04/2026
> **Thèmes** : Light (défaut) + Dark — les deux livrés ensemble

---

## 1. Identité visuelle

### Inspiration

Le design de SHAAREC s'inspire du village de **Zourgane** : une oasis aux portes du Sahara.

- **Sable** : chaleur, authenticité, ancrage dans le désert
- **Vert** : vie, oasis, palmiers, espoir
- **Terre** : solidité, confiance, enracinement

### Principes

- **Simplicité** : UX accessible à un public peu tech-savvy (villageois, donateurs âgés)
- **Chaleur** : palette chaude et accueillante, pas froide/corporate
- **Confiance** : design professionnel pour rassurer donateurs et institutions
- **Lisibilité** : contrastes forts, typographie claire, RTL supporté

---

## 2. Palette de couleurs

### Couleurs sémantiques (thème HeroUI)

| Token | Light | Usage |
|-------|-------|-------|
| `--background` | Sable très clair | Fond de page |
| `--foreground` | Brun foncé | Texte principal |
| `--surface` | Blanc | Cards, accordions, panneaux |
| `--accent` | Vert palmier profond | CTA, liens, éléments interactifs |
| `--success` | Vert frais | Confirmations, don réussi |
| `--warning` | Ambre/or du désert | Alertes, campagnes bientôt terminées |
| `--danger` | Rouge terre | Erreurs, échec paiement |

### Couleurs custom SHAAREC

| Classe Tailwind | Valeur | Usage |
|-----------------|--------|-------|
| `bg-sand` | Sable moyen | Sections alternées, fonds secondaires |
| `bg-sand-light` | Sable pâle | Fonds subtils, hover |
| `bg-sand-dark` | Sable foncé | Fonds appuyés |
| `bg-oasis` | Vert profond | Boutons primaires, accents |
| `bg-oasis-light` | Vert clair | Tags, badges, highlights |
| `bg-oasis-dark` | Vert foncé | Hover boutons, footer |
| `bg-earth` | Terre | Texte secondaire, bordures |
| `bg-earth-light` | Terre clair | Icônes, sous-titres |
| `bg-sahara` | Ambre doré | Accents dorés, mise en avant |

### Contraste & accessibilité

- Tous les couples couleur/fond respectent **WCAG AA** (ratio >= 4.5:1 pour le texte)
- Thème dark défini dans `shaarec.css` (`data-theme="shaarec-dark"`), livré en même temps que le light
- Toggle light/dark via `next-themes`

---

## 3. Typographie

| Niveau | Taille | Poids | Usage |
|--------|--------|-------|-------|
| H1 | `text-4xl` (2.25rem) | `font-bold` | Titre de page |
| H2 | `text-3xl` (1.875rem) | `font-bold` | Titre de section |
| H3 | `text-2xl` (1.5rem) | `font-semibold` | Sous-section |
| H4 | `text-xl` (1.25rem) | `font-semibold` | Card titles |
| Body | `text-base` (1rem) | `font-normal` | Texte courant |
| Small | `text-sm` (0.875rem) | `font-normal` | Labels, captions |
| Tiny | `text-xs` (0.75rem) | `font-medium` | Badges, tags |

### Police

- **Sans-serif** : Geist Sans (inclus par Next.js) — moderne, lisible
- **Monospace** : Geist Mono — code, données techniques

### RTL (Arabe)

- `dir="rtl"` appliqué conditionnellement sur `<html>`
- TailwindCSS gère le flip automatique des margins/paddings via les utilitaires logiques (`ms-*`, `me-*`, `ps-*`, `pe-*`)

---

## 4. Espacement

Système basé sur le multiplicateur `--spacing: 0.25rem` de Tailwind :

| Token | Valeur | Usage courant |
|-------|--------|---------------|
| `gap-1` / `p-1` | 0.25rem (4px) | Micro-espacement |
| `gap-2` / `p-2` | 0.5rem (8px) | Entre icône et texte |
| `gap-3` / `p-3` | 0.75rem (12px) | Padding inputs |
| `gap-4` / `p-4` | 1rem (16px) | Padding cards |
| `gap-6` / `p-6` | 1.5rem (24px) | Espacement sections internes |
| `gap-8` / `p-8` | 2rem (32px) | Marges entre sections |
| `gap-12` / `p-12` | 3rem (48px) | Espacement entre blocs majeurs |
| `gap-16` / `p-16` | 4rem (64px) | Espacement entre sections de page |

---

## 5. Arrondis

| Token | Valeur | Usage |
|-------|--------|-------|
| `rounded-sm` | 3px | Tags, badges |
| `rounded` | 5px | Chips |
| `rounded-md` | 5px | Inputs, boutons small |
| `rounded-lg` | 10px | Cards, boutons |
| `rounded-xl` | 15px | Modals, containers |
| `rounded-2xl` | 20px | Hero sections |
| `rounded-full` | 9999px | Avatars, pills |

Base : `--radius: 0.625rem` — arrondi doux et chaleureux, ni trop carré ni trop rond.

---

## 6. Ombres

| Token | Usage |
|-------|-------|
| `shadow-surface` | Cards, surfaces posées |
| `shadow-overlay` | Modals, popovers, dropdowns |
| `shadow-field` | Inputs, selects |

Teinte d'ombre : `rgba(30, 20, 10, ...)` — ombre chaude brun/sable, pas gris froid.

---

## 7. Composants UI réutilisables

### Conventions de nommage

Les composants HeroUI v3 utilisent le pattern **compound components** :
```tsx
<Card>
  <Card.Header>...</Card.Header>
  <Card.Content>...</Card.Content>
</Card>
```

### Composants à créer (src/components/ui/)

| Composant | Description | Basé sur |
|-----------|-------------|----------|
| `Logo` | Logo SHAAREC avec variantes (full, icon, texte) | — |
| `LanguageSwitcher` | Sélecteur de langue (7 langues) | HeroUI Dropdown |
| `CampaignProgressBar` | Barre de progression campagne avec montant/objectif | HeroUI ProgressBar |
| `DonationPackCard` | Card de pack de don (nom, montant, description, CTA) | HeroUI Card + Button |
| `DonationAmountInput` | Input montant libre avec sélection devise | HeroUI NumberField |
| `StatCard` | Carte de statistique (chiffre + label + icône) | HeroUI Card |
| `TeamMemberCard` | Carte membre équipe (avatar, nom, rôle, bio) | HeroUI Card + Avatar |
| `ArticleCard` | Carte article blog (image, titre, extrait, auteur, date) | HeroUI Card |
| `ImpactMetric` | Indicateur d'impact (valeur animée + label) | Framer Motion |
| `SectionHeading` | Titre de section avec sous-titre et séparateur | — |

### Composants layout (src/components/layout/)

| Composant | Description |
|-----------|-------------|
| `Header` | Navigation principale + logo + langue + CTA don |
| `Footer` | Liens, réseaux sociaux, mentions légales |
| `PageContainer` | Wrapper max-width + padding responsive |
| `Section` | Section de page avec espacement standardisé |
| `RTLProvider` | Wrapper qui gère `dir="rtl"` selon la locale |

---

## 8. Patterns de design récurrents

### CTA principal (don)
- Bouton `accent` (vert oasis), taille `lg`, avec icône coeur/don
- Toujours visible : header (sticky) + hero + sections stratégiques
- Animation subtile au hover (Framer Motion scale)

### Cards
- Fond `surface` (blanc), ombre `shadow-surface`
- Padding `p-6`, arrondi `rounded-xl`
- Hover : légère élévation (translate-y + shadow plus prononcée)

### Sections de page
- Alternance fond `background` / `sand-light` pour rythmer la lecture
- Espacement `py-16` entre sections
- Titre : `SectionHeading` centré + séparateur vert accent

### Formulaires
- Inputs avec bordure `field-border`, fond `field-background`
- Labels au-dessus, description en `text-sm text-muted`
- Erreurs en `danger` sous le champ
- Bouton submit en `accent`

---

## 9. Responsive

| Breakpoint | Taille | Cible |
|------------|--------|-------|
| `sm` | 640px | Téléphone paysage |
| `md` | 768px | Tablette portrait |
| `lg` | 1024px | Tablette paysage / petit desktop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Grand écran |

### Stratégie mobile-first

- Design mobile en priorité (public SHAAREC = beaucoup de mobile)
- Navigation : hamburger menu sur mobile, barre horizontale sur desktop
- Grilles : 1 col mobile → 2 cols tablette → 3-4 cols desktop
- Taille de police : légèrement réduite sur mobile via `clamp()`

---

## 10. Animations (Framer Motion)

| Animation | Usage | Durée |
|-----------|-------|-------|
| `fadeIn` | Apparition de sections au scroll | 0.5s |
| `slideUp` | Cards, éléments de liste | 0.4s |
| `scaleOnHover` | Boutons, cards interactives | 0.2s |
| `countUp` | Chiffres d'impact, barre de progression | 1.5s |
| `stagger` | Listes (équipe, packs, articles) | 0.1s entre items |

### Principes

- Animations **subtiles** et **fonctionnelles** (pas décoratives)
- Respecter `prefers-reduced-motion` pour l'accessibilité
- Transitions fluides avec easing `ease-out-fluid` du thème HeroUI
