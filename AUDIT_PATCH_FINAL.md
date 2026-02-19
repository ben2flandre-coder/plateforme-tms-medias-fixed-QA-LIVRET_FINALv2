# AUDIT PATCH FINAL

## Fichiers modifiés
- `cours/module-a-introduction.html`
- `cours/module-c-mecanismes.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`
- `AUDIT_PATCH_FINAL.md`

## Correctifs appliqués
1. **Suppression des dépendances embed/miniatures YouTube distantes**
   - Suppression des `background-image:url('https://img.youtube.com/...')` dans les blocs `.video-thumb`.
   - Les blocs vidéo restent en composant HTML/CSS (`video-card`) avec liens externes `watch?v=`.
   - Aucune balise `<iframe>` restante.

2. **Bouton gauche global**
   - Le bouton `scroll-top-left` est déjà présent sur toutes les pages HTML (racine, `cours/`, `outils/`) et conserve la logique existante `window.scrollTo({top:0,behavior:'smooth'})`.
   - Règle CSS dédiée positionnelle active dans `css/style.css`.

3. **Schéma PAD (Module C)**
   - Orientation déjà correcte (gauche → droite), aucune modification supplémentaire nécessaire dans ce patch.

## Preuves de scans (commandes + résultats)
- `rg -n "<iframe" --glob "**/*.html" || true`
  - Résultat: **0 occurrence**.

- `python` scan des chemins absolus locaux `src|href` (`/...`)
  - Résultat: `ABS_LOCAL_PATHS 0`.

- `python` résolution des références locales `href/src` vers fichiers existants
  - Résultat: `MISSING_LOCAL_REFS 0`.

- `rg -n "scroll-top-left" -S index.html cours/module-a-introduction.html cours/module-c-mecanismes.html cours/module-g-metiers.html outils/grille-evaluation.html css/style.css`
  - Résultat: classe/markup présents sur les pages contrôlées + règle CSS trouvée.

## Conformité
- **AUCUN fichier binaire ajouté**.
- **AUCUN iframe restant**.
- Patch minimal, architecture inchangée.
