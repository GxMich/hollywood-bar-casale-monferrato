# GitHub Pages

- Repository: https://github.com/GxMich/hollywood-bar-casale-monferrato
- Sito: https://gxmich.github.io/hollywood-bar-casale-monferrato/
- Branch: `main`.
- Workflow: `.github/workflows/pages.yml`.
- Hosting: GitHub Pages, senza Vercel.

Il workflow esegue `npm ci`, `npm run build` e `npm test` con Node.js 24. La build precede i test perché viene verificato anche il pacchetto compilato. `VITE_BASE_PATH` usa il nome del repository per bundle, font e immagini nel sottopercorso Pages. Viene caricato solo `dist/client/`; il runtime alternativo non serve su Pages.

In locale il percorso predefinito è `/`. Per riprodurre la build Pages in PowerShell:

```powershell
$env:VITE_BASE_PATH = '/hollywood-bar-casale-monferrato/'
npm run build
Remove-Item Env:VITE_BASE_PATH
npm run preview
```

Aprire `/hollywood-bar-casale-monferrato/` nella preview. La navigazione usa ancore e non richiede routing server. La demo mantiene `noindex, nofollow` e le dichiarazioni sui materiali. Iterazioni grafiche locali, registrazioni browser e configurazioni della macchina sono escluse dal repository.
