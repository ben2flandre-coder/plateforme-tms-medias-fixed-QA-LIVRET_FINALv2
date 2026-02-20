# FINAL QA — PR #2 mergeable


- Module A: lecteur intégré Napo via `youtube-nocookie` (`zSXu_X0-DzE`) + lien fallback YouTube.
- Module F: 2 lecteurs intégrés Napo (`zSXu_X0-DzE?start=285` et `zSXu_X0-DzE?start=180`) + liens fallback.
- Module G: **pas d’iframe** (ressource externe propre uniquement).
- Module C: flèches PAD conservées dans le bon sens (gauche → droite).

- Navigation: double bouton scroll-top sur toutes les pages (droite existant + gauche `scroll-top-left`).

## Vérifications obligatoires (preuves)


- Commande: `rg -n "<iframe" cours/*.html`
- Résultat:
  - `cours/module-a-introduction.html` = 1 iframe
  - `cours/module-f-prevention.html` = 2 iframes
  - `cours/module-g-metiers.html` = 0 iframe



4) Présence des deux boutons scroll-top sur toutes les pages
- Script Python: scan de tous les `*.html` pour `btn-top` et `scroll-top-left`.
- Résultat: `TOTAL_HTML 21` et `MISSING_DOUBLE_BUTTON 0`.

5) Liens locaux (ressources internes)
- Script Python: validation `src/href/url(...)` relatifs.
- Résultat: `CHECKED_LOCAL_REFS 182` et `MISSING_LOCAL 0`.


