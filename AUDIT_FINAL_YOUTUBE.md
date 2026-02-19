# Audit final YouTube — suppression des embeds instables

## PHASE A — Audit ciblé
- Scan de tous les HTML du dépôt.
- Occurrences `<iframe>` YouTube identifiées avant patch: **5** (sur 4 pages):
  - `cours/module-a-introduction.html` (1)
  - `cours/module-c-mecanismes.html` (1)
  - `cours/module-f-prevention.html` (2)
  - `cours/module-g-metiers.html` (1)

## PHASE B — Remplacement stable (sans iframe)
- Suppression de **toutes** les iframes YouTube.
- Remplacement par bloc standardisé:
  - `<div class="video-card">`
  - `<div class="video-thumb" aria-hidden="true"></div>`
  - zone meta (titre/description conservés)
  - bouton lien YouTube `watch?v=...` (timecode conservé via `&t=...s` si nécessaire)

## URLs de remplacement utilisées
1. `https://www.youtube.com/watch?v=zXSu_X0-DzE`
2. `https://www.youtube.com/watch?v=7Ug83sUuHto`
3. `https://www.youtube.com/watch?v=zXSu_X0-DzE&t=285s`
4. `https://www.youtube.com/watch?v=zXSu_X0-DzE&t=180s`
5. `https://www.youtube.com/watch?v=iGAvwbZyn9I`

## PHASE C — CSS minimal
- Ajout/usage des classes:
  - `.video-card`
  - `.video-thumb` (+ `::before`, `::after` pour motif + icône play CSS)
  - `.video-meta`
  - `.btn-video`
  - `.btn-video:hover`

## PHASE D — QA stricte
- iframes restantes: **0**
- liens locaux cassés: **0**
- chemins absolus locaux `/...`: **0**
- architecture projet: **inchangée**
- fichiers binaires ajoutés/modifiés dans ce patch: **0**
