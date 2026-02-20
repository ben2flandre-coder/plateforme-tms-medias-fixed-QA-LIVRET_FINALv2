# FINAL QA — PR #2 mergeable

## Ce qui est conservé (sans régression)
- Module A: lecteur intégré Napo via `youtube-nocookie` (`zSXu_X0-DzE`) + lien fallback YouTube.
- Module F: 2 lecteurs intégrés Napo (`zSXu_X0-DzE?start=285` et `zSXu_X0-DzE?start=180`) + liens fallback.
- Module G: **pas d’iframe** (ressource externe propre uniquement).
- Module C: flèches PAD conservées dans le bon sens (gauche → droite).
- Module B: illustration squelette remplacée par un SVG inline (plus de dépendance externe).
- Navigation: double bouton scroll-top sur toutes les pages (droite existant + gauche `scroll-top-left`).

## Vérifications obligatoires (preuves)

1) Conflits Git restants
- Commande: `rg -n "^(<<<<<<<|=======|>>>>>>>)" -S .`
- Résultat: **0 occurrence**.

2) Iframes dans `cours/`
- Commande: `rg -n "<iframe" cours/*.html`
- Résultat:
  - `cours/module-a-introduction.html` = 1 iframe
  - `cours/module-f-prevention.html` = 2 iframes
  - `cours/module-g-metiers.html` = 0 iframe

3) Embeds / liens vidéos attendus
- Commande: `rg -n "youtube-nocookie\\.com/embed|youtube\\.com/watch\\?v=" cours/module-a-introduction.html cours/module-f-prevention.html cours/module-g-metiers.html`
- Résultat: embeds `youtube-nocookie` présents uniquement en A/F, lien `watch?v=` présent en A/F/G.

4) Présence des deux boutons scroll-top sur toutes les pages
- Script Python: scan de tous les `*.html` pour `btn-top` et `scroll-top-left`.
- Résultat: `TOTAL_HTML 21` et `MISSING_DOUBLE_BUTTON 0`.

5) Liens locaux (ressources internes)
- Script Python: validation `src/href/url(...)` relatifs.
- Résultat: `CHECKED_LOCAL_REFS 182` et `MISSING_LOCAL 0`.

6) Smoke test local
- Commandes:
  - `python -m http.server 4173`
  - `curl -sI` sur `index.html`, `index-cours.html`, `cours/module-a-introduction.html`, `cours/module-c-mecanismes.html`, `cours/module-f-prevention.html`, `cours/module-g-metiers.html`
- Résultat: `HTTP/1.0 200 OK` sur les pages testées.

## Vérification fichier "corps_humain_CAP_AEPE_illustre.html"
- Recherche dans le repo: fichier **non présent** (`rg --files -g '*corps*humain*'` retourne `cours/module-b-corps-humain.html`).
- Correctif appliqué sur la page existante pertinente: `cours/module-b-corps-humain.html` utilise désormais un SVG inline pour le squelette (pas d'URL externe cassable).
