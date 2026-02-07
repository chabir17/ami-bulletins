# AMI Education - Générateur de Bulletins & Enveloppes 🎓

Une suite d'outils web pour la gestion scolaire de l'AMI (Association Musulmane de l'Inde). Ce projet permet de générer des bulletins scolaires et d'imprimer des enveloppes à partir de données CSV.

## ✨ Fonctionnalités

### 📄 Bulletins Scolaires (`bulletin.html`)

- **Parsing CSV Intelligent** : Import automatique ou manuel des notes via PapaParse.
- **Design Premium** : Mise en page soignée avec typographie Noto Sans & Amiri.
- **Calculs Automatisés** : Moyennes, rangs, min/max et appréciations.
- **Multi-langue** : Support Français/Arabe.

### ✉️ Impression d'Enveloppes (`enveloppes.html`)

- **Format C6** : Mise en page spécifique (162mm x 114mm) pour l'impression directe sur enveloppes.
- **Données Élèves** : Récupération automatique des Noms, Prénoms et Classes depuis la base de données centrale.
- **Suivi Trimestriel** : Tableau de suivi des signatures inclus au verso/recto selon l'usage.

## 🚀 Utilisation

### 1. Génération de Bulletins

Ouvrez `bulletin.html` dans votre navigateur.

- **Via URL** : `bulletin.html?year=2025-2026&sem=1&class=M06`
- **Manuel** : Utilisez l'interface pour charger un fichier CSV si le chargement automatique est bloqué.

### 2. Impression d'Enveloppes

Ouvrez `enveloppes.html` dans votre navigateur.

- Le fichier `data/2025-2026/Database/ÉLÈVES.csv` est chargé automatiquement.
- Lancez l'impression (`Ctrl+P`) en choisissant le format papier **C6** ou **Personnalisé (162x114mm)**.

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
│   ├── config.js        # Configuration (Matières, Proffesseurs)
│   ├── bulletin.js      # Logique des bulletins
│   └── envelope.js      # Logique des enveloppes
├── data/                # Base de données CSV
├── bulletin.html        # Page des bulletins
└── enveloppes.html      # Page des enveloppes
```

## 📚 Technologies

- **HTML5 / CSS3**
- **Vanilla JavaScript**
- **PapaParse** (Traitement CSV)
- **Google Fonts**
