# Hollywood — movimento Scena serale

L'utente ha scelto01-scena.png. Questo brief sostituisce quello della versione conviviale rifiutata. Movimento cinematografico coerente con il locale fotografico e con il mockup approvato; nessuno scroll pilotato.

## Momento principale
Entrata unica e coordinata: sala già visibile che si assesta da scala1.045 a1 in1800ms; titolo su due righe con avanzamento verticale32px e maschera breve,850ms con sfalsamento100ms; il termine lilla conclude il gesto. Azione e indirizzo immediatamente utilizzabili. Nessun loop infinito.

## Revisione mobile dopo la pubblicazione

Su telefono la fotografia introduce il bancone sopra il titolo su tre righe; nessuna camera allo scroll. Il menu diventa un dialog nativo a schermo intero: apertura → entrata di 12px dei collegamenti in 240ms con sfalsamento di 35ms → orientamento fra le quattro sezioni. Chiusura ed Escape immediati, focus intrappolato e restituito dal dialog, sfondo fermo. Header sempre raggiungibile. I cambi di categoria rimangono immediati, con la transizione già esistente; niente animazione geometrica del controllo selezionato. Reduced motion disattiva sequenze e spostamenti. Verificare anche apertura da fondo pagina, resize oltre 900px, tocchi ripetuti, safe area e landscape.

## Continuità

Solo su desktop con movimento consentito la camera si sposta massimo10px e scala da1 a1.04 durante l'uscita della hero. Un solo requestAnimationFrame per scroll e calcoli mentre la hero è visibile. La fotografia dell'apericena rivela la propria inquadratura all'ingresso e si assesta in900ms; il resto della pagina non ripete lo stesso fade. Galleria: hover preciso1.035/450ms e navigazione nativa. Categorie: selezione immediata, passaggio foto/pannello240ms con input puntatore; tastiera immediata. Dialog240ms/12px, uscita140ms/8px e focus nativo. Pulsanti160ms/freccia4px e pressione100ms/.98.

## Tecnica
CSS e WAAPI già presenti. Token fast160ms, panel240ms, exit140ms, hero850ms, scene1800ms, chapter900ms. Enter cubic-bezier(.16,1,.3,1), change(.4,0,.2,1), exit(.4,0,1,1). Wrapper distinti per movimento d'arrivo e camera allo scroll. Niente will-change permanente, handler duplicati o contenuti nascosti in attesa di observer.

## Riduzione e verifica
Prefers-reduced-motion anche live: camera e ingressi disabilitati, stato finale immediato; cromie, selezioni e focus preservati. Su touch niente profondità allo scroll; lettura e azioni non dipendono dall'effetto. Verifica screenshot a1487x1058 e confronto col riferimento, desktop/mobile, tastiera, touch, dialog, categorie, input rapido, cambio live reduced-motion, console e overflow320–1920px. La qualità del movimento si verifica anche in browser/video, non soltanto negli screenshot statici.
