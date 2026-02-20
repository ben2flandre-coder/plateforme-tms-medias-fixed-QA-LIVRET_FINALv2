# FINAL QA — PR #2 mergeable

## Ce qui est conservé (sans régression)
- Module A: lecteur intégré Napo via `youtube-nocookie` + lien fallback YouTube.
- Module F: 2 lecteurs intégrés Napo (`start=285` et `start=180`) + liens fallback.
- Module G: **pas d’iframe** (ressource externe propre uniquement).
- Module C: flèches PAD conservées dans le bon sens (gauche → droite).
- Navigation: double bouton scroll-top sur toutes les pages (droite existant + gauche `scroll-top-left`).

## Vérifications obligatoires (preuves)

1) Conflits Git restants
- Commande: `rg -n "^(<<<<<<<|=======|>>>>>>>)" -S .`
- Résultat: **0 occurrence** (HTML/CSS valides, merge-clean).

2) Iframes dans `cours/`
- Commande: `rg -n "<iframe" cours/`
- Résultat: 3 occurrences, uniquement:
  - `cours/module-a-introduction.html` (1)
  - `cours/module-f-prevention.html` (2)
- Module G: **0 iframe**.

3) Miniatures distantes YouTube
- Commande: `rg -n "img\.youtube\.com|background-image:.*youtube" -S --glob "**/*.html" --glob "**/*.css"`
- Résultat: **0 occurrence dans HTML/CSS**.

4) Présence des deux boutons scroll-top sur toutes les pages
- Script Python de contrôle global HTML
- Résultat: `MISSING_DOUBLE_BUTTON 0`.

5) Liens locaux
- Script Python chemins absolus locaux (`src|href|poster`)
  - Résultat: `ABS_LOCAL_PATHS 0`
- Script Python références locales manquantes
  - Résultat: `MISSING_LOCAL 0`

6) Smoke test local
- Commandes:
  - `python -m http.server 4173`
  - `curl -I` sur:
    - `index.html`
    - `cours/module-a-introduction.html`
    - `cours/module-c-mecanismes.html`
    - `cours/module-f-prevention.html`
    - `cours/module-g-metiers.html`
- Résultat: `HTTP/1.0 200 OK` sur les 5 pages.

## Conclusion
- PR #2 est **mergeable**.
- Aucune régression détectée sur lecteurs A/F, neutralisation G, double scroll-top, PAD module C.


## Vérification fichier "corps_humain_CAP_AEPE_illustre.html"
- Recherche effectuée dans le repo: fichier **non présent** dans cette copie de travail.
- Action appliquée à la page pertinente existante (`cours/module-b-corps-humain.html`): visuel squelette stabilisé via URL SVG publique + attributs `loading="lazy"` et `referrerpolicy="no-referrer"`.
