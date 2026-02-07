# AMI Education - Générateur de Bulletins & Enveloppes 🎓

Une suite d'outils web pour la gestion scolaire de l'AMI (Association Musulmane de l'Inde). Ce projet permet de générer des bulletins scolaires et d'imprimer des enveloppes à partir de données CSV.

## ✨ Fonctionnalités

### 📋 Bulletins Scolaires (`bulletins.html`)

- **Parsing CSV Intelligent** : Import automatique ou manuel des notes via PapaParse.
- **Design Premium** : Mise en page soignée avec typographie Noto Sans & Amiri.
- **Calculs Automatisés** : Moyennes, rangs, min/max et appréciations.
- **Multi-langue** : Support Français/Arabe.
- **Header Centralisé** : Utilisation d'un fichier `header.html` modifiable pour l'en-tête commun.

### ✉️ Impression d'Enveloppes (`enveloppes.html`)

- **Format C6** : Mise en page spécifique (162mm x 114mm) pour l'impression directe sur enveloppes.
- **Données Élèves** : Récupération automatique des Noms, Prénoms, Classes et Catégories (A/B) depuis la base de données.
- **Tri & Filtre** : Tri automatique (Classe → Nom → Prénom) et possibilité de filtrer par classe via l'URL.
- **Suivi Trimestriel** : Tableau de suivi des signatures inclus.

## 🚀 Utilisation

### 1. Génération de Bulletins

Ouvrez `bulletins.html` dans votre navigateur.

- **Via URL (Automatique)** : `bulletins.html?year=2025-2026&sem=1&class=M06`
    - Le sélecteur de classe sera pré-rempli.
- **Manuel** : Utilisez l'interface pour charger un fichier CSV si le chargement automatique est bloqué ou pour changer de classe manuellement.

### 2. Impression d'Enveloppes

Ouvrez `enveloppes.html` dans votre navigateur.

- **Par défaut** : Affiche toutes les enveloppes triées par Classe, puis Nom.
- **Filtrer par Classe** : Ajoutez `?class=M06` à l'URL pour n'afficher que les élèves de la M06.
- **Impression** : Lancez l'impression (`Ctrl+P`) en choisissant le format papier **C6** ou **Personnalisé (162x114mm)**.

### 3. Modification de l'En-tête

L'en-tête (Logo, Nom, Adresse) est commun à tous les documents.

- Modifiez le fichier `header.html` à la racine pour mettre à jour les informations.
- Les changements se répercuteront immédiatement sur les bulletins et les enveloppes.

## 🛠 Structure du Projet

```
/
├── assets/              # Images et logos
│   └── AMI.png
├── css/                 # Feuilles de style
│   ├── common.css       # Styles partagés (Police, Reset, Header, Tableaux)
│   ├── bulletin.css     # Style spécifique aux bulletins (A4)
│   └── envelope.css     # Style spécifique aux enveloppes (C6)
├── js/                  # Logique applicative
│   ├── common.js        # Fonctions partagées (Chargement Header)
│   ├── config.js        # Configuration (Matières, Professeurs)
│   ├── bulletin.js      # Logique des bulletins
│   └── envelope.js      # Logique des enveloppes
├── data/                # Base de données CSV
├── header.html          # En-tête HTML commun (editable)
├── bulletins.html       # Page des bulletins
└── enveloppes.html      # Page des enveloppes
```

## 📚 Technologies

- **HTML5 / CSS3** (Variables CSS, Flexbox, Grid)
- **Vanilla JavaScript** (ES6+)
- **PapaParse** (Traitement CSV)
- **Google Fonts** (Noto Sans, Amiri)
