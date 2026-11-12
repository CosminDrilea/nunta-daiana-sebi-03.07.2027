export function initFlightIntro() {
  if ((location.hash && location.hash !== '#acasa') || new URLSearchParams(location.search).has('preview')) return;
  const intro = document.querySelector('[data-flight-intro]');
  const button = intro.querySelector('[data-flight-open]');
  if (typeof intro.showModal !== 'function') return;

  const previousOverflow = document.documentElement.style.overflow;
  intro.addEventListener('close', () => {
    document.documentElement.style.overflow = previousOverflow;
    const heading = document.querySelector('[data-couple-names]');
    heading.setAttribute('tabindex', '-1');
    heading.focus({ preventScroll: true });
  }, { once: true });
  button.addEventListener('click', async () => {
    button.disabled = true;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && button.animate) {
      try {
        const hint = intro.querySelector('#flight-hint');
        hint.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 500, easing: 'ease-out', fill: 'forwards'
        });
        await button.animate([
          { transform: 'translate3d(0, 0, 0) scale(1)', opacity: 1 },
          { transform: 'translate3d(-9vw, -7vh, 0) rotate(5deg) scale(.82)', opacity: 1, offset: .38 },
          { transform: 'translate3d(-37vw, -29vh, 0) rotate(2deg) scale(.07)', opacity: 0 }
        ], { duration: 1350, easing: 'cubic-bezier(.42, .05, .76, .55)', fill: 'forwards' }).finished;
        if (intro.open) {
          const cover = document.querySelector('.hero__content');
          cover.animate([
            { opacity: 0, translate: '0 12px' },
            { opacity: 1, translate: '0 0' }
          ], { duration: 1000, delay: 260, easing: 'cubic-bezier(.2, .7, .3, 1)', fill: 'backwards' });
          await intro.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 740, easing: 'ease-in-out', fill: 'forwards'
          }).finished;
        }
      } finally {
        intro.close();
      }
    } else {
      intro.close();
    }
  }, { once: true });
  intro.showModal();
  document.documentElement.style.overflow = 'hidden';
}
