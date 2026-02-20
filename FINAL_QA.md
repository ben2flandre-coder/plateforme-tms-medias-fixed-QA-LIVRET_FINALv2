# FINAL QA

## Checklist (OK/KO)
- [OK] Aucun marqueur de conflit (`<<<<<<<`, `=======`, `>>>>>>>`).
- [OK] Aucun iframe dans `cours/module-g-metiers.html`.
- [OK] Iframes Napo présentes dans `cours/module-a-introduction.html` + `cours/module-f-prevention.html`.
- [OK] Bouton bas-gauche `scroll-top-left` présent sur toutes les pages HTML.
- [OK] Aucun chemin absolu local (`src/href/poster` commençant par `/`).
- [OK] Références locales HTML valides (`MISSING_LOCAL_REFS 0`).
- [OK] Smoke test local HTTP 200 sur les pages demandées.

## Preuves (extraits)
- `rg -n "^<<<<<<<|^=======$|^>>>>>>>" --glob "**/*.{html,css,md}" || true` → 0
- `rg -n "<iframe" cours/module-g-metiers.html || true` → 0
- `rg -n "<iframe" cours/module-a-introduction.html cours/module-f-prevention.html` → 3 occurrences attendues (Napo)
- Script Python présence bouton gauche: `MISSING_SCROLL_TOP_LEFT 0`
- Script Python chemins absolus: `ABS_LOCAL_PATHS 0`
- Script Python références locales: `MISSING_LOCAL_REFS 0`
- Smoke test:
  - `index.html` → `HTTP/1.0 200 OK`
  - `cours/module-a-introduction.html` → `HTTP/1.0 200 OK`
  - `cours/module-c-mecanismes.html` → `HTTP/1.0 200 OK`
  - `cours/module-f-prevention.html` → `HTTP/1.0 200 OK`
  - `cours/module-g-metiers.html` → `HTTP/1.0 200 OK`
