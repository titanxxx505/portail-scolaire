# Campus — portail scolaire

Site de démonstration en français inspiré des usages d’un espace scolaire comme Pronote. Identité visuelle indépendante, données fictives.

## Utilisation

Ouvrir `index.html` dans un navigateur. Aucune installation ni compilation nécessaire.

- Tableau de bord, notes et moyennes calculées.
- Emploi du temps hebdomadaire.
- Cahier de textes avec filtres et suivi enregistré sur cet appareil.
- Vie scolaire et interface adaptée au mobile.

## GitHub Pages

Placer `index.html`, `style.css`, `app.js` et `.nojekyll` à la racine du dépôt. Dans Settings → Pages, choisir Deploy from a branch, la branche contenant les fichiers et le dossier `/ (root)`, puis Save.

## Limites

Il s’agit d’une démonstration statique, sans serveur, comptes utilisateurs, messagerie ni connexion à Pronote. Les données sont définies dans `app.js`. Le suivi des devoirs est local au navigateur et ne se synchronise pas. Ne pas utiliser ce prototype pour stocker des données réelles d’élèves. Les polices Google sont facultatives et disposent de polices système de remplacement.
