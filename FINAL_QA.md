# FINAL QA — Checklist obligatoire

## Checklist (OK/KO)
- [OK] Aucun marqueur de conflit (`<<<<<<<`, `=======`, `>>>>>>>`).
- [OK] Module G: aucun iframe intégré problématique.
- [OK] Module A + Module F: iframes Napo présentes (intégration restaurée).
- [OK] Bouton `scroll-top-left` présent sur toutes les pages HTML.
- [OK] Aucun chemin absolu local (`/`) dans `src|href|poster`.
- [OK] Références locales HTML/CSS valides (0 manquant).
- [OK] Smoke test local HTTP 200 sur les 5 pages exigées.

## Preuves (commandes exécutées)
1. `rg -n "^<<<<<<<|^=======$|^>>>>>>>" --glob "**/*.{html,css,md}" || true`
2. `rg -n "<iframe" cours/module-g-metiers.html || true`
3. `rg -n "<iframe" cours/module-a-introduction.html cours/module-f-prevention.html`
4. Script Python présence bouton gauche/droite sur toutes les pages HTML (`MISSING_LEFT 0`, `MISSING_RIGHT 0`)
5. Script Python chemins absolus (`ABS_LOCAL_PATHS 0`)
6. Script Python références locales (`MISSING_REFS 0`)
7. `python -m http.server 4173` + `curl -I` sur:
   - `index.html`
   - `cours/module-a-introduction.html`
   - `cours/module-c-mecanismes.html`
   - `cours/module-f-prevention.html`
   - `cours/module-g-metiers.html`
   Résultat: `HTTP/1.0 200 OK` pour les 5 pages.

## Vérification post-merge GitHub Pages
- Merge PR vers `main`
- Attendre le build GitHub Pages
- Ouvrir le site puis faire **CTRL+F5**
- Contrôler:
  - module A: iframe Napo visible + lien fallback
  - module F: 2 iframes Napo visibles + liens fallback
  - module G: bloc ressource externe (pas d’iframe)
  - bouton ↑ droite + bouton ↑ gauche sur toutes les pages
