# FINAL QA — PR #2 Conflict Resolution + Stabilisation

## Ce qui a été gardé / retiré
- **Gardé**
  - Module A: iframe Napo intégrée (`youtube-nocookie`) + lien fallback YouTube.
  - Module F: 2 iframes Napo intégrées (`start=285` et `start=180`) + liens fallback.
  - Double boutons scroll-top (droite existant + gauche `scroll-top-left`) sur toutes les pages.
  - Flèches PAD module C dans le sens gauche → droite.
- **Retiré / non remis**
  - Module G: aucun iframe intégré pour la vidéo aide-soignant (bloc ressource externe uniquement).
  - Aucune variante concurrente `video-thumb` en `background-image` dans A/F.

## Checklist de validation
- [OK] Aucune trace de conflit active dans HTML/CSS (`^<<<<<<<|^=======$|^>>>>>>>`).
- [OK] Iframes restantes limitées aux vidéos Napo de A/F.
- [OK] Module G sans iframe (lien externe propre).
- [OK] Double bouton scroll-top présent partout.
- [OK] Smoke HTTP local OK sur A/F/G.

## Preuves (commandes + résultats)
1. Conflits
   - Commande demandée: `rg -n "<<<<<<|=======|>>>>>>" .`
   - Résultat: remonte des séparateurs décoratifs (`=======`) dans commentaires/markdown, **pas** des marqueurs de conflit actifs.
   - Commande stricte utilisée pour conflit réel: `rg -n "^<<<<<<<|^=======$|^>>>>>>>" -g"*.html" -g"*.css" . || true`
   - Résultat: **0 occurrence**.

2. Iframes
   - `rg -n "<iframe" cours/*.html`
   - Résultat:
     - `cours/module-a-introduction.html` (1 iframe Napo)
     - `cours/module-f-prevention.html` (2 iframes Napo)
     - **aucune** iframe en `cours/module-g-metiers.html`

3. Boutons scroll-top gauche/droite
   - Script vérification globale pages HTML
   - Résultat: `MISSING_DOUBLE_BUTTON 0`

4. Smoke test local
   - `python -m http.server 4173`
   - `curl -I` sur:
     - `cours/module-a-introduction.html` → `HTTP/1.0 200 OK`
     - `cours/module-f-prevention.html` → `HTTP/1.0 200 OK`
     - `cours/module-g-metiers.html` → `HTTP/1.0 200 OK`
