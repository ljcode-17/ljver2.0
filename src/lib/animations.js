// Standard Scroll-Reveal Motion Configurations matching old portfolio specification
// Duration: 1 second
// Ease: cubic-bezier(0.33, 1, 0.68, 1) -> smooth decelerating motion
// Offset: 30px
// Viewport: trigger at ~15% visibility, animate once

export const SCROLL_EASE = [0.33, 1, 0.68, 1];
export const SCROLL_DURATION = 1;

export const SCROLL_VIEWPORT = {
  once: true,
  amount: 0.15,
  margin: '0px 0px -50px 0px'
};

export const revealUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: SCROLL_VIEWPORT,
  transition: {
    duration: SCROLL_DURATION,
    ease: SCROLL_EASE,
    delay
  }
});

export const revealLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: SCROLL_VIEWPORT,
  transition: {
    duration: SCROLL_DURATION,
    ease: SCROLL_EASE,
    delay
  }
});

export const revealRight = (delay = 0) => ({
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: SCROLL_VIEWPORT,
  transition: {
    duration: SCROLL_DURATION,
    ease: SCROLL_EASE,
    delay
  }
});
