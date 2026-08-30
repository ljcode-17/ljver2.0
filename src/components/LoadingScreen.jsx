import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 750;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let frameId;
    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progressRatio = Math.min(elapsed / duration, 1);
      const easedProgress = Math.floor(easeInOutCubic(progressRatio) * 100);

      setProgress(easedProgress);

      if (progressRatio < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          document.body.style.overflow = previousOverflow;
          onComplete();
        }, 150);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      document.body.style.overflow = previousOverflow;
    };
  }, [onComplete]);

  const formattedCount = String(progress).padStart(3, '0');

  return (
    <motion.div
      initial={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        background: '#0A0A0A',
        color: '#FFFFFF',
        borderBottomLeftRadius: '2rem',
        borderBottomRightRadius: '2rem',
        pointerEvents: 'all'
      }}
    >
      <motion.div
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
          textAlign: 'center',
          padding: '0 1.5rem'
        }}
      >
        {/* Brand Logo Row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: 'linear-gradient(135deg, #14B8A6, #0D9488)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              fontWeight: 800,
              fontSize: '1rem',
              letterSpacing: '-0.02em',
              boxShadow: '0 8px 24px rgba(20, 184, 166, 0.25)'
            }}
          >
            LJ
          </div>
          <span style={{ fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.02em', color: '#FFFFFF' }}>
            Lloyd Loteriña
          </span>
        </div>

        {/* Supporting Bio Paragraph */}
        <p
          style={{
            maxWidth: '28ch',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            color: 'rgba(255, 255, 255, 0.55)',
            fontWeight: 400
          }}
        >
          Frontend Developer & UI/UX Specialist crafting intuitive digital experiences.
        </p>

        {/* Progress Counter & Track */}
        <div
          style={{
            width: 'min(22rem, 72vw)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginTop: '0.5rem'
          }}
        >
          <div
            style={{
              height: '2px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #14B8A6, #22D3EE)',
                borderRadius: '9999px',
                transition: 'width 0.05s linear'
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.75rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <span>INITIALIZING</span>
            <span style={{ color: '#14B8A6' }}>{formattedCount} / 100</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

