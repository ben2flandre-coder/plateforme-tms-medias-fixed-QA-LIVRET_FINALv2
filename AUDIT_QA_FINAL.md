# AUDIT QA FINAL

## Pages testées (échantillon fonctionnel)
- `/index.html`
- `/cours/module-a-introduction.html`
- `/cours/module-b-corps-humain.html`
- `/cours/module-f-prevention.html`
- `/cours/module-g-metiers.html`

## Checklist finale
- [OK] Pas de conflits Git restants (`<<<<<<<`, `=======`, `>>>>>>>`).
- [OK] Deux boutons “remonter en haut” (droite + gauche) présents sur toutes les pages HTML.
- [OK] Flèches PAD module C dans le bon sens (gauche → droite).
- [OK] Aucune iframe “INRS aide-soignant” non traitée dans module G (lien externe propre).
- [OK] Lecteurs intégrés Napo maintenus en module A + module F.
- [OK] Aucun lien interne local cassé détecté.
- [OK] Aucun chemin absolu local `/...` en `src|href|poster`.
- [OK] Aucun fichier binaire ajouté dans ce patch.

## Preuves de tests (commandes + résultats)
1. Conflits restants
   - Commande: `rg -n "^<<<<<<<|^=======$|^>>>>>>>" -g"*.html" -g"*.css" . || true`
   - Résultat: aucune occurrence.

2. Iframes dans `cours/`
   - Commande: `rg -n "<iframe" -g"*.html" cours/`
   - Résultat: 3 occurrences attendues (Napo module A + 2 vidéos module F), aucune en module G.

3. Présence bouton gauche
   - Commande: `rg -n "scroll-top-left" -S .`
   - Résultat: classe présente dans CSS + toutes les pages HTML.

4. Vérif liens locaux manquants (script Python)
   - Résultat: `MISSING_LOCAL = 0`.

5. Vérif chemins absolus locaux
   - Résultat: `ABS_LOCAL_PATHS = 0`.

6. Smoke test local
   - Commandes:
     - `python -m http.server 4173`
     - `curl -I http://127.0.0.1:4173/index.html`
     - `curl -I http://127.0.0.1:4173/cours/module-a-introduction.html`
     - `curl -I http://127.0.0.1:4173/cours/module-b-corps-humain.html`
     - `curl -I http://127.0.0.1:4173/cours/module-f-prevention.html`
     - `curl -I http://127.0.0.1:4173/cours/module-g-metiers.html`
   - Résultat: `HTTP/1.0 200 OK` sur les 5 pages.

## Notes de stabilisation
- Module A/F: embeds `youtube-nocookie` conservés (lecteurs intégrés fonctionnels + fallback lien YouTube).
- Module G: lecteur retiré et remplacé par bloc ressource externe (sans iframe KO).
- Module B (squelette humain): URL SVG Wikimedia stabilisée (`loading="lazy"`, `referrerpolicy="no-referrer"`).
