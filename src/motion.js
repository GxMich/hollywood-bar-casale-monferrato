import { useCallback, useEffect, useSyncExternalStore } from 'react';
import { cssTimeToMilliseconds } from './motion-tokens.js';

export function useMediaQuery(query) {
  const subscribe = useCallback(listener => {
    const media = window.matchMedia(query);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  const snapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  return useSyncExternalStore(subscribe, snapshot, () => false);
}

export function animateElement(element, keyframes, token = 'panel', easing = 'enter') {
  if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null;
  const tokens = getComputedStyle(document.documentElement);
  return element.animate(keyframes, {
    duration: cssTimeToMilliseconds(tokens.getPropertyValue(`--motion-${token}`)),
    easing: tokens.getPropertyValue(`--ease-${easing}`).trim() || 'ease-out',
  });
}

export function useHeroScene(ref) {
  const enabled = useMediaQuery('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
  useEffect(() => {
    const hero = ref.current;
    if (!hero || !enabled) return;
    let frame = 0;
    let visible = true;
    const paint = () => {
      frame = 0;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      hero.style.setProperty('--camera-y', `${progress * 10}px`);
      hero.style.setProperty('--camera-scale', `${1 + progress * .04}`);
    };
    const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(paint); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); });
    observer.observe(hero);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    schedule();
    return () => {
      observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      hero.style.removeProperty('--camera-y'); hero.style.removeProperty('--camera-scale');
    };
  }, [ref, enabled]);
}

export function useScrollChoreography(ref) {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)');
  useEffect(() => {
    if (!ref.current || reduced) return;
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const photo = entry.target.querySelector('img');
        const animation = animateElement(photo, [
          { transform: 'scale(1.06) translateY(12px)' },
          { transform: 'scale(1) translateY(0)' },
        ], 'chapter');
        if (animation) {
          animations.add(animation);
          animation.finished.then(() => animations.delete(animation), () => {});
        }
        observer.unobserve(entry.target);
      });
    }, { threshold: .15 });
    ref.current.querySelectorAll('[data-photo-reveal]').forEach(element => observer.observe(element));
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); };
  }, [ref, reduced]);
}
