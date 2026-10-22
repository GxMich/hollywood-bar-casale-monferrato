import { assetUrl } from './assets.js';
import { useEffect, useRef, useState } from 'react';
import { MapPinIcon } from '@phosphor-icons/react/dist/csr/MapPin';
import { PhoneIcon } from '@phosphor-icons/react/dist/csr/Phone';
import { Header, Arrow, ExternalLink, Modal, Wordmark } from './components/UI.jsx';
import { AtmosphereGallery, Evenings, OfferMenu } from './components/Experience.jsx';
import { siteData } from './data.js';
import { getUpcomingEvents } from './events.js';
import { useHeroScene, useMediaQuery, useScrollChoreography } from './motion.js';

function Hero({ actionsRef }) {
  const heroRef = useRef(null);
  useHeroScene(heroRef);
  return <section ref={heroRef} id="inizio" className="hero" aria-labelledby="hero-title">
    <div className="hero-camera" aria-hidden="true"><picture><source media="(max-width: 900px)" srcSet={assetUrl('/images/scena/room-900.webp')} /><img src={assetUrl('/images/scena/room.webp')} width="1600" height="754" alt="" fetchPriority="high" /></picture></div><div className="hero-shade" aria-hidden="true" />
    <div className="hero-content">
      <p className="hero-kicker">Casale Monferrato</p>
      <h1 id="hero-title"><span className="hero-line"><span>La serata</span></span><span className="hero-line"><span>prende <em className="hero-place">posto.</em></span></span></h1>
      <p className="hero-description">Apericena, cocktail e compagnia.<span className="hero-description-city"> A Casale.</span></p>
      <div ref={actionsRef} className="hero-actions"><a className="button button-lavender" href="#apericena">Scopri l’apericena <Arrow size={32} /></a></div>
      <a href="#contatti" className="hero-address"><MapPinIcon size={30} weight="fill" aria-hidden="true" /><span>Corso Giovane Italia, 9<span className="hero-address-city">Casale Monferrato</span></span><Arrow diagonal className="hero-address-arrow" size={18} /></a>
    </div>
  </section>;
}

function Apericena() {
  return <section id="apericena" className="apericena-intro" tabIndex={-1} aria-labelledby="apericena-title"><div className="apericena-photo" data-photo-reveal><picture><source media="(max-width: 700px)" srcSet={assetUrl('/images/scena/apericena-700.webp')} /><img src={assetUrl('/images/scena/apericena.webp')} width="1280" height="768" alt="Un tagliere di salumi, formaggi e assaggi da condividere, immagine illustrativa della demo" loading="lazy" /></picture></div><div className="apericena-copy"><p className="section-label">L’apericena</p><h2 id="apericena-title">Più gusto<br />alla tua <em>serata.</em></h2><p>Stuzzichini, taglieri, sapori da condividere<br className="wide-break" /> e i nostri cocktail. L’apericena è il modo migliore<br className="wide-break" /> per stare insieme, dall’inizio alla fine.</p><a className="text-link" href="#menu">Scopri l’apericena <Arrow size={30} /></a></div></section>;
}

function Contacts({ sectionRef }) {
  return <section id="contatti" ref={sectionRef} className="contact-section section-inset" tabIndex={-1} aria-labelledby="contact-title"><div className="contact-invitation"><MapPinIcon size={32} weight="light" aria-hidden="true" /><h2 id="contact-title">Il posto è qui.<br />Ci vediamo dopo.</h2><p>Hollywood Bar, Casale Monferrato.</p></div><div className="contact-details"><address><strong>Hollywood Bar</strong><br />{siteData.street}<br />{siteData.city}</address>{siteData.openingHours && <dl className="opening-hours">{siteData.openingHours.map(row => <div key={row.day}><dt>{row.day}</dt><dd>{row.hours}</dd></div>)}</dl>}<ExternalLink href={siteData.mapsUrl} className="button button-ink">Apri le indicazioni <Arrow diagonal /></ExternalLink>{siteData.phone && <a className="text-link" href={`tel:${siteData.phone.replace(/\s/g, '')}`}><PhoneIcon size={22} aria-hidden="true" /> Chiama il locale</a>}<p>Le novità del locale, su<br /><ExternalLink href={siteData.facebookUrl}>Facebook <Arrow diagonal size={18} /></ExternalLink>.</p></div></section>;
}

export function App() {
  const [now, setNow] = useState(() => Date.now());
  const [showQuick, setShowQuick] = useState(false);
  const infoRef = useRef(null);
  const heroActionsRef = useRef(null);
  const contactRef = useRef(null);
  const mainRef = useRef(null);
  useScrollChoreography(mainRef);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  const mobile = useMediaQuery('(max-width: 900px)');
  const events = getUpcomingEvents(siteData.upcomingEvents, now);
  useEffect(() => { const timer = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(timer); }, []);
  useEffect(() => {
    if (reduced) document.getAnimations().forEach(animation => { try { animation.finish(); } catch { animation.cancel(); } });
  }, [reduced]);
  useEffect(() => {
    let heroVisible = true;
    let contactVisible = false;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === heroActionsRef.current) heroVisible = entry.isIntersecting;
        if (entry.target === contactRef.current) contactVisible = entry.isIntersecting;
      });
      setShowQuick(!heroVisible && !contactVisible);
    });
    observer.observe(heroActionsRef.current); observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);
  return <>
    <a href="#contenuto" className="skip-link">Vai al contenuto</a><Header />
    <main ref={mainRef} id="contenuto" tabIndex={-1}><Hero actionsRef={heroActionsRef} /><Apericena /><OfferMenu /><AtmosphereGallery /><Evenings events={events} /><Contacts sectionRef={contactRef} /></main>
    <footer className="site-footer page-inset"><div className="footer-top"><a href="#inizio" className="footer-brand" aria-label="Hollywood Bar, torna all'inizio"><Wordmark /></a><p>A Casale, dal primo caffè<br />all’ultimo «ci vediamo».</p><a href="#inizio" className="back-top">Torna su <Arrow diagonal size={21} /></a></div><div className="footer-bottom"><span>Corso Giovane Italia, 9 · Casale Monferrato</span><button type="button" className="demo-info" onClick={() => infoRef.current.open()}>Demo di progetto · Foto e informazioni</button></div></footer>
    <div className="quick-actions" data-visible={showQuick && mobile} inert={!showQuick || !mobile} aria-hidden={!showQuick || !mobile}><a href="#menu">L’offerta <Arrow diagonal size={20} /></a><ExternalLink href={siteData.mapsUrl}><MapPinIcon size={20} aria-hidden="true" /> Indicazioni</ExternalLink></div>
    <Modal ref={infoRef} label="Informazioni sulla demo" className="info-dialog"><div className="demo-details"><h2>Una proposta<br />per Hollywood.</h2><p>Questa è una demo di progetto, non il sito ufficiale del locale.</p><p>La scena iniziale della sala e la fotografia introduttiva dell’apericena sono interpretazioni illustrative generate dal mockup scelto, usando gli interni e un tagliere di riferimento. Non documentano l’allestimento o l’offerta attuale.</p><p>Le foto della galleria e delle categorie provengono dalla ricerca pubblica sul locale. Sala e insegna sono fotografie storiche. Il tagliere è associato alla recensione Tripadvisor di Monica B del 10 gennaio 2026, il vassoio alla recensione di Romana M del 1 marzo 2025: le date non certificano lo scatto o la formula odierna.</p><p>Fonti: <ExternalLink href="https://www.tripadvisor.it/Restaurant_Review-g194712-d5002859-Reviews-Hollywood-Casale_Monferrato_Province_of_Alessandria_Piedmont.html">galleria e recensioni Tripadvisor</ExternalLink>; <ExternalLink href="https://botteghestorichecasalemonferrato.it/Home/Bottega/hollywood-micheletti-rita">Botteghe Storiche di Casale</ExternalLink> per la storia.</p><p>Marchio tipografico provvisorio. Logo attuale, diritti fotografici, menu, prezzi, orari, recapiti, calendario e dati societari vanno confermati dal locale prima del lancio del sito ufficiale.</p><p>La demo non raccoglie dati e non utilizza strumenti di tracciamento.</p></div></Modal>
  </>;
}
