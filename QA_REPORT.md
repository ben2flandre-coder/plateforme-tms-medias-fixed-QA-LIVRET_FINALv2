# QA_REPORT — Stabilisation FINALv2 (UI + médias)

## Phase 1 — Audit automatisé

### Inventaire pages cours (doublon “↑ Sommaire”, boutons, vidéos, visuels)
- Méthode: script Python sur `cours/*.html` (scan texte + balises).
- Résultats clés:
  - `raw_up=False` sur toutes les pages cours (plus de libellé `↑ Sommaire`).
  - `btn_top=2` sur toutes les pages cours (bouton droite + bouton gauche).
  - iframes uniquement sur A/F (`A=1`, `F=2`, `G=0`).
  - module B: `svg=4` (squelette + colonne + disque + muscles).

### Audit conflits Git
- Commande: `grep -R -n "^<<<<<<<\|^=======\|^>>>>>>>" --include='*.html' --include='*.css' --include='*.js' . || true`
- Résultat: aucune occurrence.

### Audit médias (vidéos + images)
- Commande iframes: `rg -n "<iframe" cours/*.html`
- Commande embeds: `rg -n "youtube-nocookie\\.com/embed" cours/module-a-introduction.html cours/module-f-prevention.html`
- Commande module G: `rg -n "<iframe" cours/module-g-metiers.html || true`
- Commande images module B: `rg -n "<svg|<img" cours/module-b-corps-humain.html`

### Audit liens/images externes
- Script crawl `href/src` externes (HEAD/GET).
- Résultat: `EXTERNAL_URLS_TESTED 84`, `HTTP_FAIL 84`.
- Cause: limitation d’environnement (`Tunnel connection failed: 403 Forbidden`) empêchant la validation HTTP sortante.

## Phase 2 — Correctifs appliqués
1. **UI bas de page**: remplacement des libellés `↑ Sommaire` par `Sommaire` dans `cours/*.html` pour supprimer l’effet “↑ ↑” tout en gardant les deux boutons flottants UI.
2. **Vidéos A/F**: conservation des iframes `youtube-nocookie` responsives + fallback lien officiel.
3. **Module G**: maintien en ressource externe (pas d’iframe).
4. **Module B**: ajout de visuels inline SVG supplémentaires (disque intervertébral + chaîne musculaire) en plus du squelette/colonne.

## Phase 3 — Tests & preuves

### A) Vérification anti-conflits
```bash
grep -R -n "^<<<<<<<\|^=======\|^>>>>>>>" --include='*.html' --include='*.css' --include='*.js' . || true
```
Résultat: vide.

### B) Vérification vidéos
```bash
rg -n "<iframe" cours/*.html
rg -n "youtube-nocookie\.com/embed" cours/module-a-introduction.html cours/module-f-prevention.html
rg -n "<iframe" cours/module-g-metiers.html || true
```
Résultat: A/F OK (3 iframes), G sans iframe.

### C) Vérification “↑ ↑”
```bash
rg -n "↑ Sommaire" cours/*.html cours/index-cours.html || true
```
Résultat: aucune occurrence.

### D) Vérification module B (illustrations)
```bash
rg -n "<svg|<img" cours/module-b-corps-humain.html
```
Résultat: 4 SVG inline + 2 logos.

### E) Smoke test local
```bash
python -m http.server 4173
curl -sI http://127.0.0.1:4173/index.html
curl -sI http://127.0.0.1:4173/cours/index-cours.html
curl -sI http://127.0.0.1:4173/cours/module-a-introduction.html
curl -sI http://127.0.0.1:4173/cours/module-b-corps-humain.html
curl -sI http://127.0.0.1:4173/cours/module-c-mecanismes.html
curl -sI http://127.0.0.1:4173/cours/module-f-prevention.html
curl -sI http://127.0.0.1:4173/cours/module-g-metiers.html
```
Résultat: `HTTP/1.0 200 OK` sur toutes les pages testées.



### F) Vérification structure HTML (équilibre balises)
```bash
python - <<'PY'
from pathlib import Path
import re
issues=[]
for p in sorted(Path('cours').glob('*.html')):
    t=p.read_text(encoding='utf-8',errors='ignore')
    if len(re.findall(r'<div\b',t,re.I)) != len(re.findall(r'</div>',t,re.I)):
        issues.append(p.name)
print('DIV_BALANCE_ISSUES', len(issues))
PY
```
Résultat: `DIV_BALANCE_ISSUES 0`.

### G) Unicité pattern scroll-top (cours/*.html)
```bash
python - <<'PY'
from pathlib import Path
import re
issues=[]
for p in sorted(Path('cours').glob('*.html')):
    t=p.read_text(encoding='utf-8',errors='ignore')
    btn_all=len(re.findall(r'class="btn-top(?: scroll-top-left)?"',t))
    left=len(re.findall(r'class="btn-top scroll-top-left"',t))
    if btn_all!=2 or left!=1:
        issues.append((p.name,btn_all,left))
print('SCROLL_BUTTON_PATTERN_ISSUES', len(issues))
PY
```
Résultat: `SCROLL_BUTTON_PATTERN_ISSUES 0`.

## Fichiers modifiés
- `cours/module-b-corps-humain.html`
- `cours/module-a-introduction.html` (déjà conforme, inchangé dans ce passage)
- `cours/module-f-prevention.html` (déjà conforme, inchangé dans ce passage)
- `cours/module-g-metiers.html` (déjà conforme, inchangé dans ce passage)
- `cours/*.html` (remplacement texte `↑ Sommaire` -> `Sommaire`)
- `QA_REPORT.md`
