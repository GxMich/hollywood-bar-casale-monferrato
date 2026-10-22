# Hollywood Bar — Scena serale

Demo responsive per Hollywood Bar a Casale Monferrato, realizzata con React e Vite: atmosfera serale, apericena, categorie dell’offerta, galleria accessibile, novità e indicazioni.

**[Apri il sito su GitHub Pages](https://gxmich.github.io/hollywood-bar-casale-monferrato/)**

## Sviluppo

Richiede Node.js 24 e npm.

```sh
npm ci
npm run dev
npm run build
npm test
npm run preview
```

La pagina usa font locali e supporta tastiera, touch e movimento ridotto. Non usa moduli, backend, analytics o tracker. Non contiene eventi, prezzi, orari o recapiti inventati.

## Pubblicazione

Ogni push su `main` avvia il workflow GitHub Actions: test, build e pubblicazione del sito direttamente su GitHub Pages. Vedi [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Materiali

Demo di progetto non ufficiale, con indicizzazione disabilitata. Le immagini iniziali sono illustrative e generate; la galleria include fotografie storiche e immagini associate a recensioni. Fonti e limiti in [docs/ASSETS.md](docs/ASSETS.md). Diritti fotografici e dati del locale restano da confermare per il sito ufficiale.

Contenuti in `src/data.js`; sistema visivo in `DESIGN.md`. Il runtime alternativo in `worker/` è conservato. GitHub Pages pubblica solo `dist/client/`.
