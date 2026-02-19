# AUDIT FINAL YOUTUBE

## Pages modifiées
- `cours/module-a-introduction.html`
- `cours/module-c-mecanismes.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`
- `css/style.css`

## Vidéos / iframes
- iframes YouTube restantes dans le repo : **0**
- iframes YouTube supprimées (total campagne) : **5**
- remplacement stable : blocs `video-card` + `video-thumb` (miniature YouTube en `background-image`) + lien `watch?v=`
- timecodes conservés quand présents (`&t=285s`, `&t=180s`)

## Conformité binaire
- **Aucun fichier binaire ajouté**
- patch final : modifications uniquement sur fichiers texte (`.html`, `.css`, `.md`)

## Régression
- **Aucune régression détectée** sur la structure des pages ciblées
- bouton remonter droit conservé
- bouton remonter gauche ajouté (`scroll-top-left`) et branché sur la même logique `window.scrollTo(...)`
