import { useRef, useState } from 'react';
import { PauseIcon } from '@phosphor-icons/react/dist/csr/Pause';
import { PlayIcon } from '@phosphor-icons/react/dist/csr/Play';
import { CircleIcon } from '@phosphor-icons/react/dist/csr/Circle';
import { useMediaQuery, useSceneActive } from '../motion.js';

const words = ['Un aperitivo.', 'Un altro giro.', 'Una bella serata.', 'Hollywood, a Casale.'];

export function EveningRibbon() {
  const ribbonRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const active = useSceneActive(ribbonRef);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  return <div ref={ribbonRef} className="evening-ribbon" data-running={active && !paused && !reduced}>
    <p className="sr-only">Apericena, cocktail. Ci si trova qui, da Hollywood.</p>
    <div className="ribbon-window" aria-hidden="true"><div className="ribbon-track">{[0, 1].map(copy => <div className="ribbon-segment" key={copy}>{words.map(word => <span className="ribbon-item" key={word}>{word}<CircleIcon size={6} weight="fill" /></span>)}</div>)}</div></div>
    {!reduced && <button type="button" className="ribbon-toggle" aria-label={paused ? 'Riprendi la fascia animata' : 'Metti in pausa la fascia animata'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <PlayIcon size={22} weight="fill" aria-hidden="true" /> : <PauseIcon size={22} weight="fill" aria-hidden="true" />}</button>}
  </div>;
}
