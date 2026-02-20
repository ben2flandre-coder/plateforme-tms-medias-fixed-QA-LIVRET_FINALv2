# QA_REPORT — Stabilisation finale PR #2

## 1) Problèmes initiaux constatés
- Risque de régression média (ID vidéo Napo incohérent entre embeds/liens).
- Image squelette dépendante d’une URL externe instable.
- Besoin de preuves QA consolidées et vérifiables.

## 2) Correctifs appliqués
- **Module A / Module F**: conservation des iframes `youtube-nocookie` + fallback `watch?v=` avec ID stable `zSXu_X0-DzE`.
- **Module B**: remplacement de l’image squelette externe par un **SVG inline** (zéro dépendance réseau, code-only).
- **Navigation**: maintien du double bouton scroll-top (droite + gauche) sur toutes les pages HTML.
- **Compatibilité routes**: ajout de `index-cours.html` (racine) pour éviter 404 et rediriger vers `cours/index-cours.html`.

## 3) Commandes de contrôle et résultats

### A. Conflits Git (strict)
Commande:
```bash
grep -R -n "^<<<<<<<\|^=======\|^>>>>>>>" --include='*.html' --include='*.css' --include='*.js' . || true
```
Résultat: **aucune sortie** (0 marqueur de conflit).

### B. Iframes cours
Commande:
```bash
rg -n "<iframe" cours/*.html
```
Résultat:
- `cours/module-a-introduction.html`: 1 iframe
- `cours/module-f-prevention.html`: 2 iframes
- `cours/module-g-metiers.html`: 0 iframe

### C. Embeds attendus A/F
Commande:
```bash
rg -n "youtube-nocookie\\.com/embed" cours/module-a-introduction.html cours/module-f-prevention.html
```
Résultat: embeds présents en A et F (3 occurrences au total).

### D. Double bouton scroll-top (toutes pages)
Commande (script): scan global des `*.html` pour `btn-top` et `scroll-top-left`.
Résultat:
- `TOTAL_HTML 21`
- `MISSING_DOUBLE_BUTTON 0`

### E. Liens locaux internes
Commande (script): validation `src/href/url(...)` relatifs.
Résultat:
- `CHECKED_LOCAL_REFS 182`
- `MISSING_LOCAL 0`

### F. Crawl HTTP des liens externes
Commande (script): test HEAD/GET des URLs externes trouvées dans HTML.
Résultat:
- `EXTERNAL_URLS_TESTED 84`
- `HTTP_FAIL 84`
- Cause environnement: proxy sortant bloque les requêtes (`Tunnel connection failed: 403 Forbidden`).

### G. Smoke test local (serveur + curl)
Commandes:
```bash
python -m http.server 4173
curl -sI http://127.0.0.1:4173/index.html
curl -sI http://127.0.0.1:4173/index-cours.html
curl -sI http://127.0.0.1:4173/cours/module-a-introduction.html
curl -sI http://127.0.0.1:4173/cours/module-b-corps-humain.html
curl -sI http://127.0.0.1:4173/cours/module-c-mecanismes.html
curl -sI http://127.0.0.1:4173/cours/module-f-prevention.html
curl -sI http://127.0.0.1:4173/cours/module-g-metiers.html
```
Résultat: `HTTP/1.0 200 OK` sur toutes les pages listées.

## 4) Fichiers modifiés
- `cours/module-b-corps-humain.html`
- `index-cours.html` (nouveau)
- `QA_REPORT.md` (nouveau)

## 5) Conclusion
- État final cohérent avec la stratégie demandée: A/F en iframe intégré, G en ressource externe, double scroll-top homogène, squelette non cassé sans binaire ajouté, et aucun marqueur de conflit.
