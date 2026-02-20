# AUDIT PATCH (Phase 0)

## Pages impactées par ce patch
- `cours/module-a-introduction.html`
- `cours/module-f-prevention.html`
- `cours/module-g-metiers.html`
- `AUDIT_PATCH.md`
- `FINAL_QA.md`

## Inventaire YouTube (ID + page + type)
- `cours/module-a-introduction.html` — `zXSu_X0-DzE` — `iframe` + `watch`
- `cours/module-c-mecanismes.html` — `7Ug83sUuHto` — `watch`
- `cours/module-f-prevention.html` — `zXSu_X0-DzE` — `iframe`(x2, start=285/180) + `watch`(x2)
- `cours/module-g-metiers.html` — `iGAvwbZyn9I` — `watch`
- `cours/module-h-materiel.html` — plusieurs IDs — `watch`
- `videotheque-tms.html` — `qGUfmVVLnGk` — `watch`

## Ce qui est conservé / retiré
- **Conservé**: liens externes `watch?v=` et textes pédagogiques.
- **Restauré**: lecteur intégré (iframe `youtube-nocookie`) uniquement pour Napo dans:
  - `cours/module-a-introduction.html`
  - `cours/module-f-prevention.html` (2 séquences)
- **Retiré / neutralisé**: tout lecteur intégré problématique dans `cours/module-g-metiers.html` (reste un lien externe stable).
- **Conservé**: bouton `scroll-top-left` sur toutes les pages HTML.
