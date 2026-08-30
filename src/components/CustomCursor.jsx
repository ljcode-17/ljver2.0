import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor({ theme }) {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const mouseRef = useRef({ x: -100, y: -100 });
  const posRef = useRef({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const hoveredRef = useRef(false);

  useEffect(() => {
    hoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
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
          target.getAttribute('role') === 'button')
      ) {
        if (!hoveredRef.current) setIsHovered(true);
      } else {
        if (hoveredRef.current) setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver, { passive: true });

    const render = () => {
      // Smooth lerp for outer ring
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.25;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.25;

      const size = hoveredRef.current ? 60 : 40;
      const halfSize = size / 2;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${posRef.current.x - halfSize}px, ${posRef.current.y - halfSize}px, 0)`;
      }

      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouseRef.current.x - 3}px, ${mouseRef.current.y - 3}px, 0) scale(${hoveredRef.current ? 1.5 : 1})`;
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

  return (
    <>
      <style>{`
        @media (min-width: 769px) {
          body, a, button, [role="button"], [role="dialog"], div, section { cursor: none !important; }
        }
        @media (max-width: 768px) {
          .custom-cursor { display: none !important; }
        }
      `}</style>

      {/* Outer Ring */}
      <div
        ref={outerRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: isHovered ? 60 : 40,
          height: isHovered ? 60 : 40,
          borderRadius: '50%',
          border: isHovered
            ? `2px solid ${isDark ? 'rgba(20, 184, 166, 1)' : 'rgba(10, 10, 10, 0.95)'}`
            : `1px solid ${isDark ? 'rgba(20, 184, 166, 0.35)' : 'rgba(0, 0, 0, 0.25)'}`,
          backgroundColor: isHovered ? (isDark ? 'rgba(20, 184, 166, 0.08)' : 'rgba(0, 0, 0, 0.05)') : 'transparent',
          pointerEvents: 'none',
          zIndex: 1000000,
          willChange: 'transform',
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease, background-color 0.2s ease',
        }}
      />

      {/* Inner Dot */}
      <div
        ref={innerRef}
        className="custom-cursor"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          backgroundColor: isDark ? '#14B8A6' : '#0A0A0A',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1000001,
          boxShadow: isDark ? '0 0 10px rgba(20, 184, 166, 0.6)' : 'none',
          willChange: 'transform',
          transition: 'transform 0.15s ease-out, background-color 0.2s ease',
        }}
      />
    </>
  );
}

