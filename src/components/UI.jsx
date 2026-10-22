import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { ListIcon } from '@phosphor-icons/react/dist/csr/List';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { StarIcon } from '@phosphor-icons/react/dist/csr/Star';
import { animateElement, useMediaQuery } from '../motion.js';
import { siteData } from '../data.js';

export function Arrow({ diagonal = false, ...props }) {
  const Icon = diagonal ? ArrowUpRightIcon : ArrowRightIcon;
  return <Icon size={26} weight="regular" aria-hidden="true" {...props} />;
}

export function ExternalLink({ children, ...props }) {
  return <a {...props} target="_blank" rel="noopener noreferrer">{children}<span className="sr-only">, nuova scheda</span></a>;
}

export function Wordmark({ className = '' }) {
  return <span className={`wordmark ${className}`} aria-hidden="true"><StarIcon className="brand-star" weight="fill" /><span>HOLLYWOOD<small>BAR · CASALE MONFERRATO</small></span></span>;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const mobile = useMediaQuery('(max-width: 900px)');
  const toggleRef = useRef(null);
  const dialogRef = useRef(null);
  const links = [
    { href: '#apericena', label: 'Apericena' },
    { href: '#locale', label: 'Il locale' },
    { href: '#serate', label: 'Le serate', mobileOnly: true },
    { href: '#contatti', label: 'Dove siamo' },
  ];
  useEffect(() => {
    if (!open || !mobile) return;
    const dialog = dialogRef.current;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    dialog.scrollTop = 0;
    dialog.querySelector('button').focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [open, mobile]);
  useEffect(() => { if (!mobile) setOpen(false); }, [mobile]);
  function navigate(event) {
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    setOpen(false);
    if (mobile) requestAnimationFrame(() => target?.focus({ preventScroll: true }));
  }
  function trapNavigationFocus(event) {
    if (event.key !== 'Tab') return;
    const controls = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault(); last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault(); first.focus();
    }
  }
  return <header className="site-header">
    <div className="topbar page-inset">
      <a href="#inizio" className="small-brand" aria-label="Hollywood Bar, torna all'inizio"><Wordmark /></a>
      <button ref={toggleRef} className="nav-toggle" type="button" aria-label="Apri navigazione" aria-expanded={open} aria-controls="mobile-navigation" aria-haspopup="dialog" onClick={() => setOpen(true)}><span>Menu</span><ListIcon size={21} aria-hidden="true" /></button>
      <nav id="main-navigation" className="main-navigation" aria-label="Navigazione principale">
        {links.filter(link => !link.mobileOnly).map(link => <a key={link.href} href={link.href}>{link.label}</a>)}
      </nav>
    </div>
    <dialog ref={dialogRef} id="mobile-navigation" className="navigation-dialog" aria-label="Menu di navigazione" onKeyDown={trapNavigationFocus} onCancel={() => setOpen(false)} onClose={event => { if (!event.currentTarget.open) setOpen(false); }}>
      <div className="navigation-shell">
        <div className="topbar page-inset"><a href="#inizio" className="small-brand" aria-label="Hollywood Bar, torna all'inizio" onClick={navigate}><Wordmark /></a><button type="button" className="nav-toggle" aria-label="Chiudi navigazione" onClick={() => setOpen(false)} autoFocus><span>Chiudi</span><XIcon size={21} aria-hidden="true" /></button></div>
        <div className="navigation-body">
          <p className="navigation-label">La tua serata, da qui.</p>
          <nav aria-label="Navigazione mobile">{links.map((link, index) => <a key={link.href} href={link.href} onClick={navigate} style={{ '--nav-index': index }}><span className="navigation-number" aria-hidden="true">0{index + 1}</span><span>{link.label}</span><Arrow diagonal size={28} /></a>)}</nav>
          <div className="navigation-footer"><p>Ci trovi a Casale.<span>{siteData.street}</span></p><ExternalLink href={siteData.mapsUrl} className="button button-lavender">Apri le indicazioni <Arrow diagonal size={24} /></ExternalLink></div>
        </div>
      </div>
    </dialog>
  </header>;
}

export const Modal = forwardRef(function Modal({ label, children, className = '', onKeyDown }, ref) {
  const dialogRef = useRef(null);
  const contentRef = useRef(null);
  const animationRef = useRef(null);
  const closingRef = useRef(false);
  const generationRef = useRef(0);
  const overflowRef = useRef('');
  function close() {
    const dialog = dialogRef.current;
    if (!dialog?.open || closingRef.current) return;
    closingRef.current = true;
    const generation = ++generationRef.current;
    animationRef.current?.cancel();
    const animation = animateElement(contentRef.current, [{ opacity: 1, transform: 'translateY(0)' }, { opacity: 0, transform: 'translateY(8px)' }], 'exit', 'exit');
    animationRef.current = animation;
    const finish = () => {
      if (generation !== generationRef.current) return;
      dialog.close(); closingRef.current = false;
    };
    if (animation) animation.finished.then(finish, () => {}); else finish();
  }
  function open() {
    const dialog = dialogRef.current;
    ++generationRef.current;
    closingRef.current = false;
    animationRef.current?.cancel();
    if (!dialog.open) {
      overflowRef.current = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      dialog.showModal();
    }
    animationRef.current = animateElement(contentRef.current, [{ opacity: 0.6, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }]);
  }
  useImperativeHandle(ref, () => ({ open, close }));
  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      animationRef.current?.cancel();
      if (dialog?.open) document.body.style.overflow = overflowRef.current;
    };
  }, []);
  return <dialog ref={dialogRef} className={`app-dialog ${className}`} aria-label={label} onClose={() => { document.body.style.overflow = overflowRef.current; closingRef.current = false; }} onCancel={event => { event.preventDefault(); close(); }} onKeyDown={onKeyDown} onClick={event => { if (event.target === event.currentTarget) close(); }}>
    <div ref={contentRef} className="dialog-content"><button className="dialog-close" type="button" aria-label="Chiudi finestra" onClick={close}><XIcon size={26} aria-hidden="true" /></button>{children}</div>
  </dialog>;
});
