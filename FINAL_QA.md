# FINAL QA — PR #2 mergeable

## État fonctionnel conservé (sans régression)
- Module A: lecteur intégré Napo via `youtube-nocookie` (`zSXu_X0-DzE`) + lien fallback YouTube.
- Module F: 2 lecteurs intégrés Napo (`zSXu_X0-DzE?start=285` et `zSXu_X0-DzE?start=180`) + liens fallback.
- Module G: **pas d’iframe** (ressource externe propre uniquement).
- Module C: flèches PAD conservées dans le bon sens (gauche → droite).
- Module B: illustration squelette remplacée par un SVG inline (pas de dépendance externe cassable).
- Navigation: double bouton scroll-top sur toutes les pages (droite existant + gauche `scroll-top-left`).

## Vérifications obligatoires (preuves)

1) Scan strict des marqueurs de conflit
- Commande: `grep -R -n "^<<<<<<<\|^=======\|^>>>>>>>" --include='*.html' --include='*.css' --include='*.js' . || true`
- Résultat: **aucune sortie** (0 marqueur de conflit).

2) Scan iframes dans `cours/`
- Commande: `rg -n "<iframe" cours/*.html`
- Résultat:
  - `cours/module-a-introduction.html` = 1 iframe
  - `cours/module-f-prevention.html` = 2 iframes
  - `cours/module-g-metiers.html` = 0 iframe

3) Embeds attendus A/F
- Commande: `rg -n "youtube-nocookie\\.com/embed" cours/module-a-introduction.html cours/module-f-prevention.html`
- Résultat: embeds présents en A/F, conformes à la stratégie validée.

4) Présence des deux boutons scroll-top sur toutes les pages
- Script Python: scan de tous les `*.html` pour `btn-top` et `scroll-top-left`.
- Résultat: `TOTAL_HTML 21` et `MISSING_DOUBLE_BUTTON 0`.

5) Liens locaux (ressources internes)
- Script Python: validation `src/href/url(...)` relatifs.
- Résultat: `CHECKED_LOCAL_REFS 182` et `MISSING_LOCAL 0`.

6) Crawl liens externes (`href/src` HTTP)
- Script Python: extraction de toutes les URLs externes puis tests HEAD/GET.
- Résultat: `EXTERNAL_URLS_TESTED 84`, `HTTP_FAIL 84`.
- Interprétation: limitation d’environnement CI/container (`Tunnel connection failed: 403 Forbidden`), non liée au code HTML.

7) Smoke test local
- Commandes:
  - `python -m http.server 4173`
  - `curl -sI` sur `index.html`, `index-cours.html`, `cours/module-a-introduction.html`, `cours/module-b-corps-humain.html`, `cours/module-c-mecanismes.html`, `cours/module-f-prevention.html`, `cours/module-g-metiers.html`
- Résultat: `HTTP/1.0 200 OK` sur toutes les pages testées.

## Fichier demandé hors snapshot
- `corps_humain_CAP_AEPE_illustre.html` est absent de cette copie (`rg --files -g '*corps*humain*'`).
- Correctif appliqué sur la page pertinente existante: `cours/module-b-corps-humain.html` (SVG inline pour le squelette).
