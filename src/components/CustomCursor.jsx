import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

export default function CustomCursor({ theme }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const isHoveredRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Disable custom cursor on mobile, touchscreens, or coarse pointer devices
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia('(pointer: coarse)').matches ||
      window.innerWidth <= 768;

    if (isTouch) return;

    let animationFrameId;

    const onMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.project-card') ||
          target.closest('.modal-close-btn') ||
          target.closest('input') ||
          target.closest('textarea') ||
          target.getAttribute('role') === 'button' ||
          target.closest('[role="button"]') ||
          target.getAttribute('aria-label') === 'Close dialog')
      ) {
        if (!isHoveredRef.current) {
          isHoveredRef.current = true;
          if (outerRef.current) outerRef.current.classList.add('hovered');
          if (innerRef.current) innerRef.current.classList.add('hovered');
        }
      } else {
        if (isHoveredRef.current) {
          isHoveredRef.current = false;
          if (outerRef.current) outerRef.current.classList.remove('hovered');
          if (innerRef.current) innerRef.current.classList.remove('hovered');
        }
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    const render = () => {
      // Direct high-speed 0.92 lerp for immediate response without cursor lag/delay
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.92;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.92;

      const scale = isHoveredRef.current ? 1.35 : 1;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${posRef.current.x - 20}px, ${posRef.current.y - 20}px, 0) scale(${scale})`;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px, 0) scale(${isHoveredRef.current ? 1.5 : 1})`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const isDark = theme === 'dark';

  const cursorContent = (
    <>
      <style>{`
        @media (min-width: 769px) and (pointer: fine) {
          *, *::before, *::after {
            cursor: none !important;
          }
        }
        @media (max-width: 768px), (pointer: coarse) {
          .custom-cursor {
            display: none !important;
          }
        }

        .custom-cursor-outer {
          position: fixed;
          top: 0;
          left: 0;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid ${isDark ? 'rgba(20, 184, 166, 0.65)' : 'rgba(10, 10, 10, 0.8)'};
          box-shadow: ${
            isDark
              ? '0 0 12px rgba(20, 184, 166, 0.4), inset 0 0 6px rgba(20, 184, 166, 0.2)'
              : '0 0 0 1px rgba(255, 255, 255, 0.85), 0 2px 8px rgba(0, 0, 0, 0.25)'
          };
          background-color: transparent;
          pointer-events: none !important;
          z-index: 2147483647 !important;
          will-change: transform;
          /* CRITICAL: NO transition on transform to prevent fighting requestAnimationFrame! */
          transition: border-color 0.2s ease, background-color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
        }

        .custom-cursor-outer.hovered {
          border: 2px solid ${isDark ? 'rgba(20, 184, 166, 1)' : 'rgba(10, 10, 10, 0.95)'};
          box-shadow: ${
            isDark
              ? '0 0 20px rgba(20, 184, 166, 0.6), inset 0 0 8px rgba(20, 184, 166, 0.3)'
              : '0 0 0 1.5px rgba(255, 255, 255, 0.95), 0 4px 14px rgba(0, 0, 0, 0.35)'
          };
          background-color: ${isDark ? 'rgba(20, 184, 166, 0.12)' : 'rgba(0, 0, 0, 0.08)'};
        }

        .custom-cursor-inner {
          position: fixed;
          top: 0;
          left: 0;
          width: 7px;
          height: 7px;
          background-color: ${isDark ? '#14B8A6' : '#0A0A0A'};
          border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.95)'};
          border-radius: 50%;
          pointer-events: none !important;
          z-index: 2147483647 !important;
          box-shadow: ${
            isDark
              ? '0 0 10px rgba(20, 184, 166, 0.8), 0 0 2px rgba(0, 0, 0, 0.5)'
              : '0 0 0 1px rgba(0, 0, 0, 0.4), 0 2px 6px rgba(0, 0, 0, 0.4)'
          };
          will-change: transform;
          transition: background-color 0.2s ease, opacity 0.2s ease, box-shadow 0.2s ease;
        }
      `}</style>

      {/* Outer Ring */}
      <div ref={outerRef} className="custom-cursor custom-cursor-outer" aria-hidden="true" />

      {/* Inner Dot */}
      <div ref={innerRef} className="custom-cursor custom-cursor-inner" aria-hidden="true" />
    </>
  );

  if (!mounted || typeof document === 'undefined') return null;

  return ReactDOM.createPortal(cursorContent, document.body);
}


