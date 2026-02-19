# AUDIT FINAL — PATCH GLOBAL STABLE

## Pages modifiées
- `cours/module-c-mecanismes.html`
- `AUDIT_FINAL_YOUTUBE.md`
- `AUDIT_TECHNIQUE_MEDIA.md`

## Corrections appliquées
### A) Vidéos YouTube (stabilité)
- Vérification ciblée des modules A/C/F/G : aucune iframe YouTube restante.
- Le module G est bien en remplacement stable (lien `watch?v=`), sans embed iframe.

### B) Schéma flèches (Module C)
- Correction du sens des 3 flèches du schéma PAD pour un flux gauche → droite :
  `Danger → Situation → Événement → Dommage`.
- Correction faite par ajustement minimal des coordonnées des triangles (`<polygon>`), sans refonte du schéma.

### C) Double bouton “remontée en haut”
- Bouton droite conservé.
- Bouton gauche `scroll-top-left` déjà présent et conservé (même comportement `window.scrollTo(...)`).

## Comptage / conformité
- iframes supprimées (campagne globale) : **5**
- iframes YouTube restantes (repo) : **0**
- fichiers binaires ajoutés : **0**
- régression détectée : **aucune**
