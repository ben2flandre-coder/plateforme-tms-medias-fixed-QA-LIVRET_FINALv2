# QA_REPORT — Stabilisation finale vidéos/liens/médias + scroll-top

## Pages testées
- `index.html`
- `cours/index-cours.html`
- `cours/module-a-introduction.html`
- `cours/module-b-corps-humain.html`
- `cours/module-c-mecanismes.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`
- + crawl complet sur tous les `*.html` du repo.

## Avant / Après (points critiques)
| Point | Avant | Après |
|---|---|---|
| Module A/F (lecteurs) | embed potentiellement KO / non robuste | carte vidéo robuste avec miniature + lien YouTube explicite |
| Module G | politique variable | ressource externe propre (pas d’iframe) |
| “↑ ↑” en bas de page | lien + boutons créaient une lecture visuelle confuse | libellés normalisés (`Sommaire`), 2 boutons UI conservés |
| Scroll-top | risque de dérive de classes | pattern verrouillé: 1 bouton `.scroll-top` + 1 bouton `.scroll-top-left` par page |
| Module B illustrations | visuels incomplets/cassables | 4 SVG inline (squelette, colonne, disque, muscles) + logos locaux |
| Liens internes | à vérifier | 0 lien interne 404 |

## Commandes & résultats (preuves)

### 1) Conflits Git
```bash
rg -n "<<<<<<|=======|>>>>>>" . && exit 1 || true
```
Résultat: aucune occurrence bloquante de marqueurs de conflit.

### 2) Scan iframes (cours)
```bash
rg -n "<iframe" cours/*.html
```
Résultat: aucune iframe restante dans `cours/*.html` (stratégie robuste “thumbnail + lien” appliquée).

### 3) Audit structure HTML / scroll / ancres / médias locaux
Script Python (crawl tous les `*.html`) avec résultats:
- `TOTAL_HTML 21`
- `SCROLL_BAD 0`
- `ANCHOR_BAD 0`
- `INTERNAL_404 0`
- `LOCAL_MEDIA_404 0`
- `IFRAMES_TOTAL 0`

### 4) Validation HTTP liens internes
Script Python + `python -m http.server 4173` + `curl -sI` sur tous les chemins internes extraits:
- `CURL_INTERNAL_PATHS 20`
- `CURL_NON_200 0`

### 5) Crawl externes (limitation environnement)
Script Python HEAD/GET sur URLs externes:
- `EXTERNAL_URLS_TESTED 82`
- `EXTERNAL_KO 82`
- Cause: blocage réseau sortant dans l’environnement d’exécution (tunnel/proxy).

## Correctifs appliqués
1. **Vidéos A/F**: conversion en carte robuste (thumbnail `img.youtube.com` + bouton `Regarder sur YouTube`) pour éviter le cas “Vidéo non disponible”.
2. **Module G**: conservation de la ressource externe (pas d’iframe).
3. **Ancres**: correction des ancres manquantes (`#main`, `#charges`).
4. **Scroll-top**: normalisation classes (`.scroll-top` à droite + `.scroll-top-left` à gauche), exact 2 boutons/page.
5. **Module B logos**: attribut `loading="lazy"` ajouté sur les logos.

## Fichiers modifiés
- `cours/module-a-introduction.html`
- `cours/module-f-prevention.html`
- `cours/module-b-corps-humain.html`
- `cours/index-cours.html`
- `outils/grille-evaluation.html`
- `css/style.css`
- `QA_REPORT.md`
