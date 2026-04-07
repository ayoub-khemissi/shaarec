# SHAAREC — User Stories

> **Version** : 1.0
> **Date** : 08/04/2026
> **Source** : Cahier des besoins v1.0

---

## Légende complexité

| Niveau | Signification |
|--------|---------------|
| S | Simple — quelques heures |
| M | Moyenne — 1-2 jours |
| L | Large — 3-5 jours |
| XL | Très large — 5+ jours |

---

## Catégorie : Vitrine

### US-01 — Page d'accueil

**En tant que** visiteur,
**je veux** voir une page d'accueil attractive présentant SHAAREC et le village de Zourgane,
**afin de** comprendre immédiatement la mission et être incité à explorer le site.

**Critères d'acceptance :**
- [ ] Affichage du logo, de l'accroche et d'un visuel d'impact (photo/vidéo Zourgane)
- [ ] Sections : mission, chiffres clés, appel aux dons, campagne en cours, derniers articles du blog
- [ ] CTA visibles vers la page de don et l'espace donateur
- [ ] Responsive mobile/tablette/desktop
- [ ] Multilingue fonctionnel

**Complexité : L**

---

### US-02 — Page "À propos / Manifeste"

**En tant que** visiteur,
**je veux** découvrir l'histoire de SHAAREC, son manifeste (S.H.A.A.R.E.C) et ses valeurs,
**afin de** comprendre la philosophie du projet.

**Critères d'acceptance :**
- [ ] Présentation du manifeste (acronyme détaillé)
- [ ] Histoire du fondateur et du village de Zourgane
- [ ] Photos/vidéos immersives du village (oasis, désert)
- [ ] Contenu multilingue

**Complexité : M**

---

### US-03 — Page "L'équipe"

**En tant que** visiteur,
**je veux** voir les membres de l'équipe SHAAREC (Conseil des Sages + Pôle Experts),
**afin de** mettre des visages sur le projet et renforcer la confiance.

**Critères d'acceptance :**
- [ ] Fiche par membre : nom, rôle, photo, courte bio
- [ ] Distinction visuelle entre Conseil des Sages et Pôle Experts
- [ ] Contenu multilingue

**Complexité : S**

---

### US-04 — Page "Méthodologie / Programme"

**En tant que** visiteur,
**je veux** comprendre la méthodologie de coaching et d'accompagnement proposée,
**afin de** juger du sérieux et de la qualité du programme.

**Critères d'acceptance :**
- [ ] Présentation du coaching hybride (individuel/collectif)
- [ ] Soft skills, leadership, discipline de l'aube
- [ ] Soutien scolaire (maths, physique) et orientation post-bac
- [ ] Accompagnement psychologique
- [ ] Contenu multilingue

**Complexité : M**

---

### US-05 — Page "Transparence"

**En tant que** visiteur,
**je veux** voir comment les fonds sont utilisés et quels résultats SHAAREC obtient,
**afin de** être rassuré avant de donner.

**Critères d'acceptance :**
- [ ] Affichage des KPIs publics (nombre de bénéficiaires, taux de réussite, etc.)
- [ ] Mention de l'approche QHSE et de la traçabilité des dons
- [ ] Lien vers l'espace donateur pour les rapports détaillés

**Complexité : M**

---

### US-06 — Page "Contact"

**En tant que** visiteur,
**je veux** pouvoir contacter l'équipe SHAAREC,
**afin de** poser des questions ou proposer un partenariat.

**Critères d'acceptance :**
- [ ] Formulaire de contact (nom, email, objet, message)
- [ ] Envoi d'un email de notification à l'équipe
- [ ] Email de confirmation au visiteur
- [ ] Contenu multilingue

**Complexité : S**

---

## Catégorie : Dons & Campagnes

### US-07 — Page de don

**En tant que** donateur,
**je veux** choisir un pack de don ou saisir un montant libre et payer en ligne,
**afin de** soutenir SHAAREC facilement.

**Critères d'acceptance :**
- [ ] Affichage des 5-6 packs de don avec description et montant
- [ ] Option de montant libre
- [ ] Choix entre don ponctuel et don récurrent (mensuel)
- [ ] Paiement via Stripe (+ PayPal via Stripe)
- [ ] Formulaire simple et accessible (public peu tech-savvy)
- [ ] Confirmation de paiement à l'écran + email
- [ ] Multilingue

**Complexité : XL**

---

### US-08 — Gestion des campagnes

**En tant qu'** administrateur,
**je veux** créer et gérer des campagnes de collecte (3-4 par an),
**afin de** organiser les appels aux dons par période.

**Critères d'acceptance :**
- [ ] Créer une campagne : titre, description, objectif financier, dates début/fin
- [ ] Barre de progression affichée publiquement sur le site
- [ ] Associer les dons à une campagne active
- [ ] Historique des campagnes passées
- [ ] Multilingue (titre et description de la campagne)

**Complexité : L**

---

### US-09 — Don récurrent

**En tant que** donateur,
**je veux** mettre en place un don mensuel automatique,
**afin de** soutenir SHAAREC dans la durée sans intervention manuelle.

**Critères d'acceptance :**
- [ ] Choix de la fréquence (mensuel)
- [ ] Gestion de l'abonnement Stripe (création, annulation)
- [ ] Le donateur peut annuler son don récurrent depuis son espace
- [ ] Notification email à chaque prélèvement

**Complexité : L**

---

## Catégorie : Espace donateur

### US-10 — Inscription / Connexion donateur

**En tant que** donateur,
**je veux** créer un compte et me connecter,
**afin d'** accéder à mon espace personnel.

**Critères d'acceptance :**
- [ ] Inscription par email + mot de passe
- [ ] Connexion / déconnexion
- [ ] Mot de passe oublié / réinitialisation
- [ ] Multilingue

**Complexité : M**

---

### US-11 — Historique des dons

**En tant que** donateur connecté,
**je veux** consulter l'historique de mes dons,
**afin de** suivre mes contributions.

**Critères d'acceptance :**
- [ ] Liste des dons : date, montant, campagne associée, statut
- [ ] Filtre par période
- [ ] Distinction dons ponctuels / récurrents

**Complexité : M**

---

### US-12 — Reçu fiscal

**En tant que** donateur connecté,
**je veux** télécharger un reçu fiscal pour chaque don,
**afin de** bénéficier d'une déduction fiscale.

**Critères d'acceptance :**
- [ ] Génération d'un reçu fiscal au format PDF
- [ ] Informations conformes (nom du donateur, montant, date, infos de l'association)
- [ ] Téléchargeable depuis l'historique des dons

**Complexité : L**

---

### US-13 — Rapports d'impact

**En tant que** donateur connecté,
**je veux** consulter les rapports d'impact trimestriels,
**afin de** voir concrètement comment mes dons sont utilisés.

**Critères d'acceptance :**
- [ ] Accès exclusif aux donateurs authentifiés
- [ ] Liste des rapports disponibles par trimestre
- [ ] Consultation en ligne ou téléchargement PDF
- [ ] Contenu multilingue

**Complexité : M**

---

### US-14 — Gestion du don récurrent

**En tant que** donateur connecté,
**je veux** voir et gérer mon don récurrent (annuler, modifier le montant),
**afin de** garder le contrôle sur mes contributions.

**Critères d'acceptance :**
- [ ] Affichage du don récurrent actif (montant, fréquence, prochain prélèvement)
- [ ] Possibilité d'annuler
- [ ] Possibilité de modifier le montant
- [ ] Confirmation par email de toute modification

**Complexité : M**

---

## Catégorie : Blog

### US-15 — Liste des articles

**En tant que** visiteur,
**je veux** parcourir les articles du blog,
**afin de** suivre l'actualité de SHAAREC.

**Critères d'acceptance :**
- [ ] Liste paginée des articles (titre, extrait, auteur, date, temps de lecture)
- [ ] Nombre de vues affiché
- [ ] Multilingue

**Complexité : M**

---

### US-16 — Lecture d'un article

**En tant que** visiteur,
**je veux** lire un article complet,
**afin de** m'informer sur la vie du projet.

**Critères d'acceptance :**
- [ ] Affichage complet : titre, auteur, date, temps de lecture, contenu, images
- [ ] Compteur de vues incrémenté à la lecture
- [ ] Section commentaires
- [ ] Multilingue

**Complexité : M**

---

### US-17 — Commentaires sur un article

**En tant que** visiteur,
**je veux** laisser un commentaire sur un article,
**afin d'** interagir avec la communauté SHAAREC.

**Critères d'acceptance :**
- [ ] Formulaire de commentaire (nom, email, message)
- [ ] Modération par l'admin avant publication
- [ ] Affichage des commentaires approuvés

**Complexité : M**

---

## Catégorie : Multilingue

### US-18 — Sélection de la langue

**En tant que** visiteur,
**je veux** choisir la langue du site parmi les 7 disponibles,
**afin de** naviguer dans ma langue préférée.

**Critères d'acceptance :**
- [ ] Sélecteur de langue accessible depuis toutes les pages
- [ ] Langues : FR, AR, EN, ES, NL, DE, Tamazight
- [ ] Détection automatique de la langue par géolocalisation (défaut)
- [ ] Le choix est mémorisé pour les visites suivantes
- [ ] Affichage RTL pour l'arabe

**Complexité : L**

---

## Catégorie : Back-office (Administration)

### US-19 — Connexion administrateur

**En tant qu'** administrateur,
**je veux** me connecter au back-office,
**afin de** gérer le contenu et les dons.

**Critères d'acceptance :**
- [ ] Authentification sécurisée (email + mot de passe)
- [ ] 3 comptes administrateurs prévus
- [ ] Accès restreint aux utilisateurs autorisés

**Complexité : S**

---

### US-20 — Gestion des articles de blog

**En tant qu'** administrateur,
**je veux** créer, modifier, publier et supprimer des articles de blog,
**afin de** alimenter le site en contenu.

**Critères d'acceptance :**
- [ ] Éditeur de contenu riche (texte, images)
- [ ] Gestion des traductions par article (7 langues)
- [ ] Statut : brouillon / publié
- [ ] Gestion de l'auteur (possibilité d'attribuer à un élève)

**Complexité : L**

---

### US-21 — Gestion des pages de contenu

**En tant qu'** administrateur,
**je veux** modifier le contenu des pages vitrine,
**afin de** garder le site à jour sans intervention technique.

**Critères d'acceptance :**
- [ ] Édition des textes, images et médias des pages principales
- [ ] Gestion des traductions
- [ ] Prévisualisation avant publication

**Complexité : L**

---

### US-22 — Tableau de bord des dons

**En tant qu'** administrateur,
**je veux** consulter un tableau de bord des dons,
**afin de** suivre les contributions et l'avancement des campagnes.

**Critères d'acceptance :**
- [ ] Vue d'ensemble : total collecté, nombre de donateurs, dons récurrents actifs
- [ ] Détail par campagne : progression, liste des dons
- [ ] Liste des donateurs avec historique
- [ ] Export des données (CSV)

**Complexité : L**

---

### US-23 — Modération des commentaires

**En tant qu'** administrateur,
**je veux** modérer les commentaires du blog,
**afin de** contrôler le contenu publié sur le site.

**Critères d'acceptance :**
- [ ] Liste des commentaires en attente de modération
- [ ] Approuver / Rejeter / Supprimer un commentaire
- [ ] Notification à l'admin quand un nouveau commentaire est soumis

**Complexité : S**

---

### US-24 — Gestion des rapports d'impact

**En tant qu'** administrateur,
**je veux** publier des rapports d'impact trimestriels,
**afin que** les donateurs puissent les consulter dans leur espace.

**Critères d'acceptance :**
- [ ] Upload d'un rapport (PDF) ou saisie de contenu en ligne
- [ ] Association à un trimestre / période
- [ ] Visible uniquement par les donateurs connectés

**Complexité : M**

---

## Récapitulatif

| ID | Titre | Catégorie | Complexité |
|----|-------|-----------|------------|
| US-01 | Page d'accueil | Vitrine | L |
| US-02 | Page "À propos / Manifeste" | Vitrine | M |
| US-03 | Page "L'équipe" | Vitrine | S |
| US-04 | Page "Méthodologie / Programme" | Vitrine | M |
| US-05 | Page "Transparence" | Vitrine | M |
| US-06 | Page "Contact" | Vitrine | S |
| US-07 | Page de don | Dons & Campagnes | XL |
| US-08 | Gestion des campagnes | Dons & Campagnes | L |
| US-09 | Don récurrent | Dons & Campagnes | L |
| US-10 | Inscription / Connexion donateur | Espace donateur | M |
| US-11 | Historique des dons | Espace donateur | M |
| US-12 | Reçu fiscal | Espace donateur | L |
| US-13 | Rapports d'impact | Espace donateur | M |
| US-14 | Gestion du don récurrent | Espace donateur | M |
| US-15 | Liste des articles | Blog | M |
| US-16 | Lecture d'un article | Blog | M |
| US-17 | Commentaires | Blog | M |
| US-18 | Sélection de la langue | Multilingue | L |
| US-19 | Connexion administrateur | Back-office | S |
| US-20 | Gestion articles blog | Back-office | L |
| US-21 | Gestion pages contenu | Back-office | L |
| US-22 | Tableau de bord des dons | Back-office | L |
| US-23 | Modération commentaires | Back-office | S |
| US-24 | Gestion rapports d'impact | Back-office | M |

**Total estimé : 3S + 8M + 9L + 1XL**
