import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ArrowRightIcon } from '@phosphor-icons/react/dist/csr/ArrowRight';
import { ArrowUpRightIcon } from '@phosphor-icons/react/dist/csr/ArrowUpRight';
import { ListIcon } from '@phosphor-icons/react/dist/csr/List';
import { XIcon } from '@phosphor-icons/react/dist/csr/X';
import { StarIcon } from '@phosphor-icons/react/dist/csr/Star';
import { animateElement, useMediaQuery } from '../motion.js';

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
  const navRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = event => {
      if (event.key === 'Escape') { setOpen(false); toggleRef.current?.focus(); }
    };
    const onPointer = event => {
      if (!navRef.current?.contains(event.target) && !toggleRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onPointer); };
  }, [open]);
  function navigate(event) {
    setOpen(false);
    if (!mobile) return;
    const target = document.getElementById(event.currentTarget.hash.slice(1));
    requestAnimationFrame(() => target?.focus({ preventScroll: true }));
  }
  return <header id="inizio" className="site-header">
    <div className="topbar page-inset">
      <a href="#inizio" className="small-brand" aria-label="Hollywood Bar, torna all'inizio"><Wordmark /></a>
      <button ref={toggleRef} className="nav-toggle" type="button" aria-label={open ? 'Chiudi navigazione' : 'Apri navigazione'} aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(value => !value)}>{open ? <XIcon size={27} aria-hidden="true" /> : <ListIcon size={27} aria-hidden="true" />}</button>
      <nav ref={navRef} id="main-navigation" className="main-navigation" aria-label="Navigazione principale" data-open={open} inert={mobile && !open} aria-hidden={mobile ? !open : undefined}>
        <a href="#apericena" onClick={navigate}>Apericena</a><a href="#locale" onClick={navigate}>Il locale</a><a href="#contatti" onClick={navigate}>Dove siamo</a>
      </nav>
    </div>
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
