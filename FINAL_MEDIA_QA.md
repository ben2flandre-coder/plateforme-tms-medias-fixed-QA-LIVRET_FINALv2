# FINAL MEDIA QA

## Périmètre vérifié
- `index.html`
- `cours/module-a-introduction.html`
- `cours/module-b-corps-humain.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`

## Checklist
- [OK] Aucun marqueur de conflit dans le repo.
- [OK] Module A: lecteur Napo intégré + lien fallback.
- [OK] Module F: 2 lecteurs Napo intégrés + liens fallback.
- [OK] Module G: pas d’iframe, bloc ressource externe propre.
- [OK] Boutons scroll-top droite + gauche présents sur toutes les pages HTML.
- [OK] Aucun chemin absolu local `/...` en `src|href|poster`.
- [OK] Aucune référence locale manquante (`MISSING_LOCAL = 0`).
- [OK] Smoke test HTTP 200 sur les pages clés.

## Preuves (commandes)
1. `rg -n "^<<<<<<<|^=======$|^>>>>>>>" -S . || true`
2. `rg -n "<iframe" cours/**/*.html`
3. `rg -n "img\.youtube\.com|i\.ytimg\.com|ytimg" --glob "**/*.html" css/style.css || true`
4. Script Python présence bouton gauche (`MISSING_SCROLL_TOP_LEFT 0`)
5. Script Python chemins absolus (`ABS_LOCAL_PATHS 0`)
6. Script Python refs locales (`MISSING_LOCAL 0`)
7. `python -m http.server 4173` + `curl -I` sur pages clés (`HTTP/1.0 200 OK`)

## Notes fonctionnelles courtes
- Le bloc vidéo INRS non intégrable du module G reste volontairement en lien externe.
- Le visuel “Squelette humain” du module B utilise désormais une URL SVG Wikimedia stable avec `loading="lazy"` et `referrerpolicy="no-referrer"`.
