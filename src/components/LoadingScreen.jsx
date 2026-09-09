import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Preload DarkMode Logo for immediate render
    const logoImg = new Image();
    logoImg.src = '/assets/Logos/DarkMode Logo.png';

    const startTime = performance.now();
    const duration = 850;

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
        }, 120);
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
        background: '#070A0F',
        backgroundImage: 'radial-gradient(circle at 50% 45%, rgba(20, 184, 166, 0.12) 0%, rgba(7, 10, 15, 0.96) 60%, #070A0F 100%)',
        color: '#FFFFFF',
        borderBottomLeftRadius: '2rem',
        borderBottomRightRadius: '2rem',
        pointerEvents: 'all',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Ambient Background Grid Detail */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.035,
          backgroundImage: `linear-gradient(#FFFFFF 1px, transparent 1px), linear-gradient(90deg, #FFFFFF 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        exit={{ opacity: 0, y: -16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          textAlign: 'center',
          padding: '0 1.5rem',
          maxWidth: '440px',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Top Micro Status Tag */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '5px 14px',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            fontSize: '0.68rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: '#14B8A6',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)'
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#14B8A6',
              boxShadow: '0 0 8px #14B8A6'
            }}
          />
          LLOYD LOTERIÑA • PORTFOLIO 2.0
        </div>

        {/* Immersive DarkMode Logo Presentation */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.5rem',
            marginTop: '0.2rem',
            marginBottom: '0.2rem'
          }}
        >
          {/* Logo Glow Halo */}
          <div
            style={{
              position: 'absolute',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.28) 0%, rgba(20, 184, 166, 0) 70%)',
              filter: 'blur(16px)',
              pointerEvents: 'none'
            }}
          />

          <img
            src="/assets/Logos/DarkMode Logo.png"
            alt="Lloyd Loteriña Official Logo"
            style={{
              height: '58px',
              width: 'auto',
              maxHeight: '58px',
              objectFit: 'contain',
              position: 'relative',
              zIndex: 1,
              filter: 'drop-shadow(0 8px 20px rgba(0, 0, 0, 0.7))'
            }}
          />
        </div>

        {/* Sophisticated Intro & Role Identity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', alignItems: 'center' }}>
          <h1
            style={{
              fontSize: 'clamp(1.25rem, 3.5vw, 1.55rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#FFFFFF',
              lineHeight: 1.2
            }}
          >
            Frontend Developer &amp; UI/UX Specialist
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.82rem, 2.2vw, 0.92rem)',
              lineHeight: 1.55,
              color: 'rgba(255, 255, 255, 0.62)',
              fontWeight: 400,
              maxWidth: '34ch'
            }}
          >
            Crafting intuitive digital experiences with editorial precision &amp; modern engineering.
          </p>
        </div>

        {/* Progress Counter & Track */}
        <div
          style={{
            width: 'min(22rem, 80vw)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            marginTop: '0.5rem'
          }}
        >
          <div
            style={{
              height: '3px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '9999px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #14B8A6 0%, #3B82F6 100%)',
                borderRadius: '9999px',
                boxShadow: '0 0 12px rgba(20, 184, 166, 0.6)',
                transition: 'width 0.05s linear'
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.72rem',
              fontWeight: 600,
              fontFamily: 'monospace',
              letterSpacing: '0.12em',
              color: 'rgba(255, 255, 255, 0.6)'
            }}
          >
            <span>INITIALIZING SYSTEM</span>
            <span style={{ color: '#14B8A6', fontWeight: 700 }}>
              {formattedCount} / 100
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


