import { assetUrl } from '../assets.js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeftIcon } from '@phosphor-icons/react/dist/csr/ArrowLeft';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { FacebookLogoIcon } from '@phosphor-icons/react/dist/csr/FacebookLogo';
import { Arrow, ExternalLink, Modal } from './UI.jsx';
import { siteData, menuCategories, galleryItems } from '../data.js';
import { formatEventDate, formatEventTime, getSafeEventLink } from '../events.js';
import { animateElement, useMediaQuery } from '../motion.js';

export function OfferMenu() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef([]);
  const panelRef = useRef(null);
  const offerImageRef = useRef(null);
  const inputRef = useRef('keyboard');
  const category = menuCategories[active];
  useLayoutEffect(() => {
    if (inputRef.current === 'keyboard') return;
    const animation = animateElement(panelRef.current, [{ opacity: 0.4 }, { opacity: 1 }], 'fast', 'change');
    const photo = animateElement(offerImageRef.current, [{ transform: 'scale(1.04) translateY(8px)' }, { transform: 'scale(1) translateY(0)' }], 'panel');
    return () => { animation?.cancel(); photo?.cancel(); };
  }, [active]);
  function select(index, input) { inputRef.current = input; setActive(index); }
  function keyboard(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % menuCategories.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + menuCategories.length) % menuCategories.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = menuCategories.length - 1;
    if (next === undefined) return;
    event.preventDefault(); select(next, 'keyboard'); tabsRef.current[next]?.focus();
  }
  return <section id="momenti" className="menu-section section-inset" tabIndex={-1} aria-labelledby="menu-title">
    <div className="section-heading"><h2 id="menu-title">Scegli il tuo<br /><em>momento.</em></h2><p>Dal primo caffè al prossimo brindisi.<br className="desktop-break" /> Scopri cosa ti va, oggi.</p></div>
    <div id="menu" className="menu-tabs" role="tablist" aria-label="Scopri l'offerta">{menuCategories.map((item, index) => <button type="button" key={item.id} role="tab" id={`tab-${item.id}`} aria-controls="offer-panel" aria-selected={active === index} tabIndex={active === index ? 0 : -1} ref={node => { tabsRef.current[index] = node; }} onClick={event => select(index, event.detail === 0 ? 'keyboard' : 'pointer')} onKeyDown={event => keyboard(event, index)}>{item.label}<Arrow diagonal size={20} /></button>)}</div>
    <div ref={panelRef} className="menu-panel" role="tabpanel" id="offer-panel" aria-labelledby={`tab-${category.id}`} tabIndex={0}>
      <figure className="menu-image"><div className="menu-image-frame"><img ref={offerImageRef} src={category.image} alt={category.imageAlt} width={category.width} height={category.height} loading="lazy" /></div><figcaption>{category.imageLabel}</figcaption></figure>
      <div className="menu-copy"><h3>{category.title}</h3><p>{category.description}</p>{category.items.length > 0 && <ul className="menu-items">{category.items.map(item => <li key={item.name}><div><strong>{item.name}</strong>{item.description && <p>{item.description}</p>}</div>{item.price && <span>{item.price}</span>}</li>)}</ul>}<p className="menu-note">{category.detail}</p><a className="text-link" href="#contatti">Trova il locale <Arrow diagonal /></a>{siteData.menuPdf && <ExternalLink className="text-link" href={siteData.menuPdf}>Scarica il menu <Arrow diagonal /></ExternalLink>}</div>
    </div>
  </section>;
}

export function Evenings({ events }) {
  const [selected, setSelected] = useState(null);
  const modalRef = useRef(null);
  function show(event) { setSelected(event); requestAnimationFrame(() => modalRef.current?.open()); }
  const actionLink = selected && getSafeEventLink(selected.url);
  return <>
    <section id="serate" className="evening-section section-inset" tabIndex={-1} aria-labelledby="evening-title"><div className="evening-scene-copy"><h2 id="evening-title">E dopo l’apericena?</h2><p>La compagnia c’è.<br />Il prossimo appuntamento lo scopri qui.</p></div>
      {events.length > 0 ? <div className="event-list" aria-label="Prossime serate">{events.map(event => <button type="button" className="event-row" key={event.id} onClick={() => show(event)}><time dateTime={event.start}>{formatEventDate(event.start)}<span>{formatEventTime(event.start)}</span></time><span className="event-title">{event.title}</span><Arrow diagonal /></button>)}</div> : <div className="program-update"><FacebookLogoIcon size={28} aria-hidden="true" /><p>Per serate, programma e novità, dai un’occhiata alla pagina di Hollywood prima di uscire.</p><ExternalLink href={siteData.facebookUrl} className="button button-light">Segui le novità <Arrow diagonal /></ExternalLink></div>}
    </section>
    <Modal ref={modalRef} label="Dettagli della serata" className="event-dialog">{selected && <article><h2>{selected.title}</h2><p>{formatEventDate(selected.start)} · ore {formatEventTime(selected.start)}</p>{selected.image && <img src={selected.image} alt={selected.imageAlt || selected.title} width="1280" height="853" />}<p>{selected.description}</p>{selected.info && <p className="muted">{selected.info}</p>}{actionLink && <ExternalLink href={actionLink} className="button button-orange">{selected.actionLabel || 'Informazioni sulla serata'}<Arrow diagonal /></ExternalLink>}</article>}</Modal>
  </>;
}

export function AtmosphereGallery() {
  const [index, setIndex] = useState(0);
  const modalRef = useRef(null);
  const imageRef = useRef(null);
  const swipeStartRef = useRef(null);
  const inputRef = useRef('keyboard');
  const railRef = useRef(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  function updateEdges() {
    const rail = railRef.current;
    if (rail) {
      const start = rail.scrollLeft <= 2;
      const end = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
      setEdges(previous => previous.start === start && previous.end === end ? previous : { start, end });
    }
  }
  useEffect(() => {
    const observer = new ResizeObserver(updateEdges);
    observer.observe(railRef.current);
    updateEdges();
    return () => observer.disconnect();
  }, []);
  function scrollRail(direction) {
    railRef.current.scrollBy({ left: direction * railRef.current.clientWidth * .85, behavior: reduced ? 'instant' : 'smooth' });
  }
  const current = galleryItems[index];
  useLayoutEffect(() => {
    if (inputRef.current === 'keyboard') return;
    const animation = animateElement(imageRef.current, [{ opacity: 0.5 }, { opacity: 1 }], 'fast', 'change');
    return () => animation?.cancel();
  }, [index]);
  function show(next) { inputRef.current = 'keyboard'; setIndex(next); requestAnimationFrame(() => modalRef.current?.open()); }
  function change(direction, input = 'pointer') { inputRef.current = input; setIndex(value => (value + direction + galleryItems.length) % galleryItems.length); }
  function onKey(event) {
    if (event.key === 'ArrowRight') { event.preventDefault(); change(1, 'keyboard'); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); change(-1, 'keyboard'); }
  }
  return <>
    <section id="locale" className="atmosphere-section section-inset" tabIndex={-1} aria-labelledby="locale-title"><div>
      <div className="heritage"><figure className="heritage-photo"><img src={assetUrl('/images/real/insegna-storica.webp')} width="844" height="900" alt="L’insegna storica di Hollywood: lettere bianche e una grande stella scura" loading="lazy" /><figcaption>L’insegna di Hollywood · fotografia storica</figcaption></figure><div className="heritage-copy"><h2 id="locale-title">Un classico di Casale.<br /><em>Da vivere insieme.</em></h2><p>Hollywood fa parte della storia dei bar di Casale dagli anni ’50. Un luogo che attraversa la giornata, dalla colazione all’apericena.</p><p>La sala chiara, gli archi, il bancone illuminato. E quel piacere semplice di incontrarsi, anche senza un’occasione speciale.</p><a href="#contatti" className="text-link">Ci trovi in Corso Giovane Italia <Arrow diagonal size={22} /></a></div></div>
      <div className="gallery-heading"><h3>Un’occhiata da vicino.</h3><div className="gallery-rail-controls"><button className="icon-button" type="button" aria-label="Scorri le foto verso sinistra" aria-controls="gallery-rail" disabled={edges.start} onClick={() => scrollRail(-1)}><ArrowLeftIcon size={22} aria-hidden="true" /></button><button className="icon-button" type="button" aria-label="Scorri le foto verso destra" aria-controls="gallery-rail" disabled={edges.end} onClick={() => scrollRail(1)}><ArrowRightIcon size={22} aria-hidden="true" /></button></div></div>
      <div ref={railRef} id="gallery-rail" className="gallery-grid" onScroll={updateEdges}>{galleryItems.map((item, itemIndex) => <button type="button" className={`gallery-tile gallery-tile-${item.id}`} key={item.id} aria-label={`Apri la foto: ${item.label}`} onClick={() => show(itemIndex)}><span className="gallery-media"><span className="photo-depth" data-parallax><img src={item.src} width={item.width} height={item.height} alt={item.alt} loading="lazy" /></span></span><span className="gallery-tile-caption"><span>{item.label}</span><Arrow diagonal /></span></button>)}</div>
      <p className="gallery-note">Fotografie del locale e dei suoi apericena. Apri le immagini per leggere fonte e periodo di riferimento.</p>
    </div></section>
    <Modal ref={modalRef} label="Galleria di Hollywood" className="gallery-dialog" onKeyDown={onKey}><figure className="gallery-figure" onPointerDown={event => { if (event.pointerType === 'touch') swipeStartRef.current = event.clientX; }} onPointerUp={event => { if (event.pointerType !== 'touch' || swipeStartRef.current === null) return; const delta = event.clientX - swipeStartRef.current; swipeStartRef.current = null; if (Math.abs(delta) > 50) change(delta < 0 ? 1 : -1); }}><img ref={imageRef} src={current.src} width={current.width} height={current.height} alt={current.alt} /><figcaption id="gallery-caption">{current.caption}</figcaption></figure><div className="gallery-controls"><button type="button" className="icon-button" aria-label="Foto precedente" onClick={() => change(-1)}><ArrowLeftIcon size={26} aria-hidden="true" /></button><span aria-live="polite" aria-atomic="true">{index + 1} / {galleryItems.length}</span><button type="button" className="icon-button" aria-label="Foto successiva" onClick={() => change(1)}><ArrowRightIcon size={26} aria-hidden="true" /></button></div></Modal>
  </>;
}
