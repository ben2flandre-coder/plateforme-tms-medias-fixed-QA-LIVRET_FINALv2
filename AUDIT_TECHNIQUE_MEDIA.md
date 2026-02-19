# Audit technique média (patch final stable)

## Périmètre contrôlé
- `cours/module-a-introduction.html`
- `cours/module-c-mecanismes.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`
- `css/style.css`

## Règles garanties
- no iframe YouTube dans le repo
- patch 100% code-only
- aucun binaire ajouté
- aucun chemin absolu local `/...` en `src/href/poster`
- architecture du repo inchangée

## Contrôles techniques exécutés
- scan `iframe` : 0 occurrence
- contrôle liens locaux : 0 manquant
- contrôle chemins absolus locaux : 0
- bouton droit remonter conservé + bouton gauche `scroll-top-left` ajouté
