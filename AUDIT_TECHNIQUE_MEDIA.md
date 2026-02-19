# Audit technique média — patch final stable

## Périmètre contrôlé
- `cours/module-a-introduction.html`
- `cours/module-c-mecanismes.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`
- `css/style.css`

## Points validés
- Aucune iframe YouTube restante.
- Module G en lien YouTube stable (`watch?v=`), sans embed.
- Module C : flèches du schéma PAD orientées gauche → droite après correction.
- Double bouton de remontée : droite conservé + gauche (`scroll-top-left`) actif.
- Aucun chemin absolu local `/...` en `src/href`.
- Architecture inchangée, patch code-only.

## Conformité livraison
- Modifications limitées aux fichiers texte (`.html`, `.css`, `.md`).
- Aucun fichier binaire ajouté.
- Compatible GitHub Pages.
