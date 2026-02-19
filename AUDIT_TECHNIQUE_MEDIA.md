# Audit technique média (code-only)

## Règles appliquées
- Correctif **100% code-only**: modifications limitées à `.html`, `.css`, `.md`.
- **Aucun fichier binaire ajouté/modifié** (`.jpg/.png/.webp/.gif/.svg/.mp4/...`).
- Règle stabilité: **aucune balise `<iframe>` YouTube** dans le repo.

## Pages modifiées
- `cours/module-a-introduction.html`
- `cours/module-c-mecanismes.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`
- `css/style.css`
- `AUDIT_FINAL_YOUTUBE.md`
- `AUDIT_TECHNIQUE_MEDIA.md`

## Vérifications techniques
- Scan HTML global: aucune iframe restante.
- Vérification chemins locaux `src|href|poster`: aucun lien local cassé.
- Vérification chemins absolus locaux `/...`: aucun trouvé.
- Liens internes conservés; architecture dossiers inchangée (`cours/`, `css/`, `images/`, `outils/`).
