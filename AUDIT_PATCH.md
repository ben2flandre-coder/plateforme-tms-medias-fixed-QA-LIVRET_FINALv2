# AUDIT PATCH — État des lieux technique & fonctionnel

## Contexte de branche
- Branche de travail: `codex/final-patch-vid+scrolltop`
- Remarque: aucun remote/main configuré localement dans cet environnement, donc vérification effectuée sur l’état courant de la branche.

## Scan global effectué
- HTML: `src|href|poster`, liens internes `.html`, balises `<iframe>`
- CSS: `url(...)`
- Conflits: marqueurs Git `<<<<<<< / ======= / >>>>>>>`
- Occurrences YouTube: embeds + liens `watch`

## Résultats OK / KO

### 1) Conflits de merge
- **OK**: aucun marqueur de conflit détecté (`^<<<<<<<|^=======$|^>>>>>>>` → 0).

### 2) Liens et chemins
- **OK**: `ABS_LOCAL_PATHS 0` (aucun `src|href|poster` local en chemin absolu `/...`).
- **OK**: `MISSING_REFS 0` (aucune référence locale cassée depuis HTML/CSS).

### 3) Inventaire YouTube (fichier + type + ID)
- `cours/module-a-introduction.html`:
  - iframe (`youtube-nocookie/embed/zXSu_X0-DzE`) — **OK embed (à conserver)**
  - lien `watch?v=zXSu_X0-DzE`
- `cours/module-f-prevention.html`:
  - iframe (`youtube-nocookie/embed/zXSu_X0-DzE?start=285`) — **OK embed (à conserver)**
  - iframe (`youtube-nocookie/embed/zXSu_X0-DzE?start=180`) — **OK embed (à conserver)**
  - liens `watch` correspondants
- `cours/module-g-metiers.html`:
  - **pas d’iframe**
  - lien `watch?v=iGAvwbZyn9I` — **KO embed (neutralisé volontairement en ressource externe)**
- Autres pages (`module-h`, `videotheque`) : liens `watch` externes uniquement.

### 4) Boutons “remonter”
- **OK**: bouton droite (`btn-top`) présent sur toutes les pages HTML.
- **OK**: bouton gauche (`scroll-top-left`) présent sur toutes les pages HTML.
- Contrôle script: `MISSING_LEFT 0`, `MISSING_RIGHT 0`.

## Pages KO embed / Pages OK embed
- **Pages OK embed (conservées)**
  - `cours/module-a-introduction.html`
  - `cours/module-f-prevention.html` (2 lecteurs)
- **Pages KO embed (iframe retiré, lien externe conservé)**
  - `cours/module-g-metiers.html`

## Décision appliquée
- Conserver les embeds Napo fonctionnels (A/F).
- Conserver Module G en mode “Ressource externe” (sans iframe).
- Conserver le double bouton droite+gauche partout.
