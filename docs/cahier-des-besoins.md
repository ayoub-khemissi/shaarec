# SHAAREC — Cahier des besoins

> **Version** : 1.0
> **Date** : 08/04/2026
> **Source** : Appel de découverte du 07/04/2026 avec Mohamed Aït Bajja
> **Domaine** : shaarec.org

---

## 1. Contexte

SHAAREC est une initiative éducative fondée par Mohamed Aït Bajja, actif dans l'humanitaire depuis 10 ans. Le projet vise à accompagner les jeunes du village de Zourgane (oasis aux portes du Sahara, Maroc) vers l'excellence académique et le leadership.

L'initiative est déjà active sur le terrain : 7 élèves bacheliers accompagnés (dont 5 filles), via un dispositif 100% virtuel (WhatsApp, Google Meet). Les services proposés incluent du coaching individuel et collectif, du soutien scolaire en maths/physique via des partenaires enseignants, de l'orientation post-bac, et un soutien psychologique pré-examen.

Deux entités juridiques sont prévues :
- **SHAAREC France** — Association loi 1901 (en cours de création)
- **SHAAREC Maroc** — Entité locale

---

## 2. Objectifs du site

| Priorité | Objectif |
|----------|----------|
| 1 | **Communication & visibilité** — Faire connaître SHAAREC et le village de Zourgane |
| 2 | **Crédibilité & transparence** — Rassurer les autorités locales (Makhzen) et les donateurs potentiels |
| 3 | **Collecte de dons** — Permettre aux donateurs du monde entier de contribuer en ligne |
| 4 | **Image de marque** — Asseoir le branding et le professionnalisme de l'association |
| 5 | **Partenariats** — Attirer des partenaires institutionnels (France, Maroc, international) |

---

## 3. Public cible

- **Donateurs** : diaspora marocaine et sympathisants dans le monde entier
- **Partenaires institutionnels** : en France et au Maroc
- **Villageois / familles** : public peu familier avec le numérique, nécessitant une UX très simple

---

## 4. Fonctionnalités attendues

### 4.1 Site vitrine

- Présentation de SHAAREC (manifeste, mission, valeurs)
- Présentation du village de Zourgane (photos, vidéos, immersion)
- Présentation de l'équipe (Conseil des Sages, Pôle Experts)
- Méthodologie et programme de coaching
- Design attractif : tons sablés (désert), vert (palmier/oasis), logo existant

### 4.2 Plateforme de dons

- **5 à 6 packs de dons** (montants à définir) pour couvrir tous les niveaux sociaux, extensible à terme (2-3 packs supplémentaires)
- **Montant libre** en complément des packs
- **Dons ponctuels et récurrents** (mensuels)
- **Plusieurs campagnes par an** (3-4 : rentrée, 1er semestre, 2e semestre, fin d'année / Ramadan)
- Barre de progression par campagne
- Paiement via **Stripe** (avec connexion PayPal)

### 4.3 Espace donateur

- Création de compte donateur
- Historique des dons
- Accès aux **rapports d'impact trimestriels** (exclusif aux donateurs)
- Suivi de l'utilisation des fonds
- Reçu fiscal

### 4.4 Blog

- Espace d'actualités sur la vie du projet
- Vues, commentaires, temps de lecture, auteur

### 4.5 Back-office

- Gestion par **3 personnes** au sein de l'équipe SHAAREC
- Gestion du contenu (pages, blog, campagnes, autres en fonctio nde l'utilité)
- Suivi des dons et des donateurs

---

## 5. Multilingue

Le site doit supporter **7 langues** :

| Langue | Priorité | Note |
|--------|----------|------|
| Français | Principale | Langue par défaut |
| Arabe littéraire | Haute | Affichage RTL |
| Anglais | Haute | — |
| Espagnol | Secondaire | — |
| Néerlandais | Secondaire | — |
| Allemand | Secondaire | — |
| Tamazight | Secondaire | — |

La langue par défaut s'adapte en fonction du pays de l'utilisateur (géolocalisation).

---

## 6. Design & UX

- **Simplicité avant tout** : le public inclut des personnes peu habituées au numérique
- Couleurs : palette sablée (désert), vert (oasis/palmier)
- Logo existant fourni par le client
- Inspirations citées :
  - [Bani Academy](https://baniacademy.org) (ONG éducative)
  - Le Devoir d'Agir Nantes

---

## 7. Contraintes & délais

- **Deadline** : avant le **3 juin 2026** (baccalauréat), **15 juin max** (résultats du bac)
- Le site doit être opérationnel pour accompagner la première promotion de bacheliers et démontrer les résultats de SHAAREC

---

## 8. Existant

| Élément | Statut |
|---------|--------|
| Domaine | shaarec.org (réservé) |
| Logo | Existant |
| YouTube | Page créée, pas encore alimentée |
| Stripe | Compte à configurer |
| Contenu textuel | À rédiger / formaliser |
| Photos / vidéos | À confirmer avec le client |
| Traductions | À prévoir |

---

## 9. Points restant à clarifier

- [ ] Montants exacts des packs de dons
- [ ] Photos et vidéos disponibles de Zourgane et des élèves
