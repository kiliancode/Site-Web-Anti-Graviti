# L'Éphémère — Bistro Gastronomique

Site web vitrine & de réservation moderne pour un restaurant gastronomique fictif créé à Paris.

## 🍽️ Présentation du projet

- **Nom du restaurant** : *L'Éphémère - Bistro Gastronomique*
- **Chef de cuisine fictif** : Julien Vaneau
- **Concept** : Cuisine d'auteur raffinée, produits locaux et biologiques, cave à vins naturels et biodynamiques, ambiance feutrée et chaleureuse.

## ✨ Fonctionnalités clés

1. **Section Hero immersive** :
   - Présentation visuelle soignée, distinction fictive Michelin 2026.
   - Boutons d'appel à l'action rapides vers la réservation et la carte.
   - Chiffres clés (circuits courts, avis clients).

2. **Histoire & Philosophie** :
   - Portrait du chef, mise en valeur des engagements durables et des producteurs partenaires.

3. **Carte & Menus interactifs** :
   - Onglets de filtrage sans rechargement de page (*Entrées*, *Plats Signatures*, *Desserts*, *Vins & Cocktails*).
   - Accords mets & vins suggérés pour chaque assiette.
   - Badges diététiques (Signature, Végétarien, Sans Gluten, Pêche Durable).
   - Mise en avant d'un Menu Dégustation en 6 temps.

4. **Module de réservation en ligne** :
   - Fenêtre modale native `<dialog>` moderne avec backdrop flouté.
   - Adaptation dynamique des créneaux horaires selon le service (Midi vs Soir).
   - Validation de formulaire, calcul et génération d'un numéro de dossier fictif (#EPH-XXXX) et reçu de confirmation instantané.

5. **Avis & Recommandations de la presse** :
   - Critiques gastronomiques (Le Figaro, Gault & Millau) et retours de convives.

6. **Informations pratiques & Contact** :
   - Horaires précis (services midi & soir, jours de fermeture).
   - Adresse fictive dans le 9e arrondissement de Paris avec stations de métro.
   - Formulaire de demande de privatisation ou contact rapide.
   - Inscription à la newsletter avec notifications toast.

7. **Design & Ergonomie** :
   - Palette luxueuse : tons sombres, or champagne, verre dépoli (glassmorphism).
   - 100% responsive (optimisé mobile, tablette et desktop avec menu burger).
   - Typographies soignées (Cormorant Garamond + Plus Jakarta Sans via Google Fonts).

## 🚀 Comment lancer et prévisualiser le site

### Méthode 1 : Via l'extension VS Code Live Server (Recommandé)
Vous disposez de l'extension **Live Server** déjà installée dans votre IDE :
1. Ouvrez le dossier `restaurant-lephemere` dans VS Code.
2. Cliquez sur le bouton **« Go Live »** situé dans la barre d'état tout en bas à droite de votre écran.
3. Le site s'ouvrira automatiquement sur `http://127.0.0.1:5500/index.html`.

### Méthode 2 : Ouverture directe dans le navigateur
Double-cliquez simplement sur le fichier `index.html` pour l'ouvrir dans Google Chrome, Edge ou Firefox.

## 📂 Structure des fichiers

```
restaurant-lephemere/
├── index.html       # Structure sémantique HTML5 et composants
├── styles.css       # Design system moderne, variables CSS, responsive
├── app.js           # Interactions JavaScript (onglets, réservations, toast)
└── README.md        # Documentation du projet
```

