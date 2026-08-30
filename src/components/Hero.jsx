import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ChevronLeft, ChevronRight, Sparkles, Download } from 'lucide-react';

const featuredProjects = [
  {
    title: 'MATHTatag – Capstone',
    category: 'Mobile & AI',
    desc: 'AI-powered mathematics assessment & Filipino text-to-speech app for Grade 1 monitoring.',
    image: '/assets/projects/mathtatag.jpg',
    tag: '1st Place STCIEERD Award'
  },
  {
    title: 'FuelWatch PH',
    category: 'Web Application',
    desc: 'Crowdsourced fuel price monitoring platform with OpenStreetMap/Leaflet location integration.',
    image: '/assets/projects/fuel.png',
    tag: 'React + Leaflet'
  },
  {
    title: 'MeatMaster System',
    category: 'Systems & DB',
    desc: 'Management system for meat vendors tracking orders, customer debt, and real-time profits.',
    image: '/assets/projects/meat.png',
    tag: 'Visual Basic + MySQL'
  },
  {
    title: 'JM & Laica Prenup Album',
    category: 'Digital Gallery',
    desc: 'Editorial-style wedding prenup photo gallery built with React 19 and Tailwind CSS v4.',
    image: '/assets/projects/JmLaica.png',
    tag: 'React 19 + Tailwind'
  }
];

export default function Hero({ theme }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const mobileStageRef = useRef(null);
  const mobileCanvasRef = useRef(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const touchStartXRef = useRef(null);

  // LiquidReveal Canvas Effect with Mouse & Touch support across Desktop & Mobile
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const desktopCanvas = canvasRef.current;
    const desktopContainer = containerRef.current;
    const mobileCanvas = mobileCanvasRef.current;
    const mobileContainer = mobileStageRef.current;

    const imgPrimary = new Image();
    const imgSecondary = new Image();
    imgPrimary.src = theme === 'light' ? '/assets/lj1.png' : '/assets/lj2.0.png';
    imgSecondary.src = '/assets/lj3.png';

    const setupCanvas = (canvas, container) => {
      if (!canvas || !container) return null;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      let width = 0;
      let height = 0;
      let points = [];

      // Reusable offscreen mask canvas to avoid allocation inside 60FPS loop
      const maskCanvas = document.createElement('canvas');
      const maskCtx = maskCanvas.getContext('2d');

      const resize = () => {
        width = container.clientWidth || 0;
        height = container.clientHeight || 0;
        if (width <= 0 || height <= 0) return;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.scale(dpr, dpr);

        maskCanvas.width = Math.floor(width * dpr);
        maskCanvas.height = Math.floor(height * dpr);
      };

      resize();
      window.addEventListener('resize', resize, { passive: true });

      const addPoint = (clientX, clientY) => {
        const rect = container.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        if (x >= 0 && x <= width && y >= 0 && y <= height) {
          points.push({ x, y, age: 0 });
          if (points.length > 40) points.shift();
        }
      };

      const handlePointerMove = (e) => addPoint(e.clientX, e.clientY);
      const handleTouchMove = (e) => {
        if (e.touches && e.touches[0]) addPoint(e.touches[0].clientX, e.touches[0].clientY);
      };

      container.addEventListener('pointermove', handlePointerMove, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });

      const render = () => {
        if (width <= 0 || height <= 0) {
          resize();
          if (width <= 0 || height <= 0) return;
        }

        ctx.clearRect(0, 0, width, height);

        if (points.length === 0) return;

        const maxAge = 60;
        const brushRadius = width <= 768 ? 80 : 120;

        for (let i = points.length - 1; i >= 0; i--) {
          points[i].age += 1;
          if (points[i].age > maxAge) points.splice(i, 1);
        }

        const maskWidth = Math.floor(width * dpr);
        const maskHeight = Math.floor(height * dpr);

        if (points.length > 0 && imgSecondary.complete && imgSecondary.naturalWidth !== 0 && maskWidth > 0 && maskHeight > 0) {
          if (maskCanvas.width !== maskWidth || maskCanvas.height !== maskHeight) {
            maskCanvas.width = maskWidth;
            maskCanvas.height = maskHeight;
          }
          maskCtx.clearRect(0, 0, maskWidth, maskHeight);
          maskCtx.save();
          maskCtx.scale(dpr, dpr);

          points.forEach((p) => {
            const alpha = Math.max(0, 1 - p.age / maxAge);
            const rad = brushRadius * (0.5 + alpha * 0.5);
            const grad = maskCtx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad);
            grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.75})`);
            grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 0.4})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
            maskCtx.fillStyle = grad;
            maskCtx.beginPath();
            maskCtx.arc(p.x, p.y, rad, 0, Math.PI * 2);
            maskCtx.fill();
          });
          maskCtx.restore();

          ctx.save();
          ctx.drawImage(maskCanvas, 0, 0, width, height);
          ctx.globalCompositeOperation = 'source-in';

          const imgRatio = imgSecondary.naturalWidth / imgSecondary.naturalHeight;
          const containerRatio = width / height;
          let renderW, renderH, renderX, renderY;

          if (containerRatio > imgRatio) {
            renderH = height;
            renderW = height * imgRatio;
            renderX = (width - renderW) / 2;
            renderY = 0;
          } else {
            renderW = width;
            renderH = width / imgRatio;
            renderX = 0;
            renderY = (height - renderH) / 2;
          }

          ctx.drawImage(imgSecondary, renderX, renderY, renderW, renderH);
          ctx.restore();
        }
      };

      return { render, cleanup: () => {
        window.removeEventListener('resize', resize);
        container.removeEventListener('pointermove', handlePointerMove);
        container.removeEventListener('touchmove', handleTouchMove);
      }};
    };

    const desktopInstance = setupCanvas(desktopCanvas, desktopContainer);
    const mobileInstance = setupCanvas(mobileCanvas, mobileContainer);

    let animationFrameId;
    let isIntersecting = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    if (desktopContainer) observer.observe(desktopContainer);

    const loop = () => {
      if (isIntersecting) {
        if (desktopInstance) desktopInstance.render();
        if (mobileInstance) mobileInstance.render();
      }
      animationFrameId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (desktopInstance) desktopInstance.cleanup();
      if (mobileInstance) mobileInstance.cleanup();
    };
  }, [theme]);

  const isDark = theme === 'dark';
  const currentProject = featuredProjects[activeProjectIndex];

  const nextProject = () => {
    setActiveProjectIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setActiveProjectIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  // Touch Swipe Handlers for Hero Project Card
  const handleTouchStartCard = (e) => {
    if (e.touches && e.touches[0]) {
      touchStartXRef.current = e.touches[0].clientX;
    }
  };

  const handleTouchEndCard = (e) => {
    if (touchStartXRef.current !== null && e.changedTouches && e.changedTouches[0]) {
      const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
      if (deltaX < -40) {
        nextProject();
      } else if (deltaX > 40) {
        prevProject();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      ref={containerRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        isolation: 'isolate',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: '84px',
        paddingBottom: '0px',
        borderBottom: '1px solid var(--border)'
      }}
    >
      {/* 1. Desktop Primary Background Image */}
      <div
        className="desktop-hero-bg"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 0,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        <img
          src={isDark ? '/assets/lj2.0.png' : '/assets/lj1.png'}
          alt="Lloyd Jernell Loteriña Hero Background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center center',
            opacity: isDark ? 0.78 : 0.85,
            filter: isDark ? 'contrast(1.06) brightness(1.05)' : 'contrast(1.05) brightness(1.02)',
            transition: 'all 0.4s ease'
          }}
        />
      </div>

      {/* 2. Desktop Interactive LiquidReveal Canvas */}
      <canvas
        ref={canvasRef}
        className="desktop-hero-canvas"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none',
          opacity: isDark ? 0.88 : 0.55
        }}
      />

      {/* 3. Legibility Vignette Gradient Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: isDark
            ? 'linear-gradient(180deg, rgba(16,14,11,0.45) 0%, rgba(16,14,11,0.25) 45%, rgba(16,14,11,0.65) 100%)'
            : 'linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.65) 100%)'
        }}
      />

      {/* 4. Giant Oversized Watermark */}
      <div
        className="hero-watermark"
        style={{
          position: 'absolute',
          insetInline: 0,
          bottom: '5rem',
          zIndex: 3,
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          fontWeight: 900,
          lineHeight: 0.9,
          fontSize: 'clamp(3.5rem, 14vw, 13rem)',
          letterSpacing: '-0.04em',
          color: isDark ? 'rgba(255, 255, 255, 0.035)' : 'rgba(0, 0, 0, 0.04)',
          whiteSpace: 'nowrap'
        }}
      >
        LOTERIÑA
      </div>

      {/* 5. Main Hero Grid Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '88rem',
          margin: '0 auto',
          padding: 'clamp(1.5rem, 4vw, 4rem) 5%',
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(12, 1fr)',
          gap: '2rem',
          alignItems: 'center'
        }}
        className="hero-grid"
      >
        {/* Left Column - Editorial Headline & Introduction */}
        <div style={{ gridColumn: 'span 7' }} className="hero-left">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <span
              className="hero-eyebrow-chip"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: isDark ? 'rgba(20, 184, 166, 0.12)' : 'rgba(0, 0, 0, 0.05)',
                color: isDark ? '#14B8A6' : '#0a0a0a',
                borderRadius: '100px',
                fontSize: 'clamp(0.72rem, 2.8vw, 0.85rem)',
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: '1.25rem',
                border: isDark ? '1px solid rgba(20, 184, 166, 0.25)' : '1px solid rgba(0, 0, 0, 0.12)',
                backdropFilter: 'blur(8px)',
                maxWidth: '100%',
                lineHeight: 1.3
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: isDark ? '#14B8A6' : '#0a0a0a',
                  flexShrink: 0
                }}
              />
              BSIT GRADUATE • GPA 1.53 • PRESIDENT'S LISTER
            </span>
          </motion.div>

          {/* 📷 Dedicated Hero Portrait Visual Component (Moved ABOVE Name for Mobile & Tablet) */}
          <div ref={mobileStageRef} className="mobile-portrait-stage">
            <img
              src={isDark ? '/assets/lj2.0.png' : '/assets/lj1.png'}
              alt="Lloyd Jernell Loteriña Hero Portrait"
              className="mobile-portrait-img"
              style={{
                opacity: isDark ? 0.82 : 0.9,
                filter: isDark ? 'contrast(1.06) brightness(1.05)' : 'contrast(1.05) brightness(1.02)'
              }}
            />
            <canvas
              ref={mobileCanvasRef}
              className="mobile-portrait-canvas"
              style={{ opacity: isDark ? 0.88 : 0.55 }}
            />
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            className="hero-main-title"
            style={{
              fontSize: 'clamp(2.4rem, 6.8vw, 4.8rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
              color: 'var(--text)'
            }}
          >
            Lloyd Jernell<br />
            <span style={{ color: isDark ? '#14B8A6' : '#0a0a0a', fontWeight: 900 }}>Loteriña</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            style={{
              fontSize: 'clamp(0.95rem, 2.2vw, 1.25rem)',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              maxWidth: '38ch',
              marginBottom: '1.5rem',
              fontWeight: 400
            }}
          >
            Frontend Development, UI/UX Design & System Support. Crafting intuitive digital experiences with editorial precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}
            className="hero-cta-btns"
          >
            {/* Highly Visible Download CV Button */}
            <motion.a
              whileHover={{ scale: 1.05, boxShadow: isDark ? '0 10px 30px rgba(20, 184, 166, 0.45)' : '0 10px 30px rgba(0, 0, 0, 0.25)' }}
              whileTap={{ scale: 0.95 }}
              href="/assets/CV.pdf"
              download="Lloyd_Jernell_Loterina_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '8px 8px 8px 24px',
                backgroundColor: isDark ? '#14B8A6' : '#0a0a0a',
                color: '#FFFFFF',
                borderRadius: '100px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: isDark ? '0 8px 24px rgba(20, 184, 166, 0.35)' : '0 8px 24px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <span>Download CV</span>
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  color: '#0A0A0A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Download size={16} strokeWidth={2.5} />
              </div>
            </motion.a>

            {/* View Selected Work */}
            <motion.a
              whileHover={{ scale: 1.04, backgroundColor: isDark ? 'rgba(20, 184, 166, 0.15)' : 'rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.96 }}
              href="#projects"
              style={{
                padding: '14px 24px',
                backgroundColor: isDark ? 'var(--card-bg)' : 'transparent',
                color: 'var(--text)',
                border: isDark ? '1px solid var(--border)' : '1px solid rgba(0, 0, 0, 0.18)',
                borderRadius: '100px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)'
              }}
            >
              <span>View Selected Work</span>
              <ArrowUpRight size={16} strokeWidth={2} />
            </motion.a>

            {/* Get in Touch */}
            <motion.a
              whileHover={{ scale: 1.04, backgroundColor: isDark ? 'rgba(20, 184, 166, 0.15)' : 'rgba(0, 0, 0, 0.05)' }}
              whileTap={{ scale: 0.96 }}
              href="#contact"
              style={{
                padding: '14px 24px',
                backgroundColor: isDark ? 'var(--card-bg)' : 'transparent',
                color: 'var(--text)',
                border: isDark ? '1px solid var(--border)' : '1px solid rgba(0, 0, 0, 0.18)',
                borderRadius: '100px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backdropFilter: 'blur(10px)'
              }}
            >
              Get in Touch <ArrowRight size={18} strokeWidth={2} />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Column - Interactive Lumora-Style Project Hero Card & Credentials */}
        <div style={{ gridColumn: 'span 5' }} className="hero-right">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            onTouchStart={handleTouchStartCard}
            onTouchEnd={handleTouchEndCard}
            className="hero-project-card"
            style={{
              width: '100%',
              maxWidth: '420px',
              margin: '0 auto',
              background: isDark ? 'rgba(30, 41, 59, 0.65)' : 'rgba(255, 255, 255, 0.88)',
              border: isDark ? '1px solid var(--border)' : '1px solid rgba(255, 255, 255, 0.6)',
              borderRadius: '24px',
              padding: '1.25rem',
              backdropFilter: 'blur(20px)',
              boxShadow: isDark ? '0 20px 40px -15px rgba(0, 0, 0, 0.3)' : '0 12px 36px rgba(0, 0, 0, 0.06)',
              userSelect: 'none',
              marginBottom: '1.5rem'
            }}
          >
            {/* Lumora Card Top Row: Dark Square Icon + Category & Nav */}
            <div style={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: '1rem', alignItems: 'center' }}>
              {/* Left Dark Square Icon Box with Warm Star Spark ✦ */}
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: '#0A0A0A',
                  color: isDark ? '#14B8A6' : '#E07A48',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 8px 18px rgba(0, 0, 0, 0.2)'
                }}
              >
                ✦
              </div>

              {/* Right Content & Arrow Controls */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                      {currentProject.category}
                    </span>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1.25, marginTop: '2px' }}>
                      {currentProject.title}
                    </h3>
                  </div>

                  {/* Navigation Arrows */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={prevProject}
                      aria-label="Previous project"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <ChevronLeft size={14} />
                    </button>

                    <button
                      onClick={nextProject}
                      aria-label="Next project"
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'var(--bg-subtle)',
                        border: '1px solid var(--border)',
                        color: 'var(--text)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Index Dashes — • • • */}
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginTop: '8px' }}>
                  {featuredProjects.map((_, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveProjectIndex(idx)}
                      style={{
                        width: idx === activeProjectIndex ? '18px' : '6px',
                        height: '4px',
                        borderRadius: '2px',
                        backgroundColor: idx === activeProjectIndex ? 'var(--text)' : 'var(--text-muted)',
                        opacity: idx === activeProjectIndex ? 0.9 : 0.3,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Lumora "Trusted by" / Credentials Grid (Below Card) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            style={{
              width: '100%',
              maxWidth: '420px',
              margin: '0 auto',
              padding: '0 0.5rem'
            }}
          >
            <div style={{ fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', textAlign: 'right', marginBottom: '0.5rem' }}>
              RECOGNIZED & ACADEMIC CREDENTIALS
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px 12px',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-muted)',
              justifyItems: 'end'
            }}>
              <span>⊙ PUP Lopez Campus</span>
              <span>⊙ GPA 1.53 (Highest)</span>
              <span>⊙ STCIEERD 1st Place R&D</span>
              <span>⊙ 3x President's Lister</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 6. Editorial Bottom Status Bar */}
      <div
        className="hero-bottom-bar"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          borderTop: '1px solid var(--border)',
          background: isDark ? 'rgba(15, 23, 42, 0.45)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(12px)',
          padding: '0.85rem 5%'
        }}
      >
        <div
          className="hero-status-grid"
          style={{
            maxWidth: '88rem',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)'
          }}
        >
          <div className="status-item">
            <span style={{ color: 'var(--accent)' }}>GPA 1.53</span> • ACADEMIC AWARDEE
          </div>

          <div className="status-item">
            LOCATION: <span style={{ color: 'var(--text)' }}>QUEZON, PHILIPPINES</span>
          </div>

          <div className="status-item">
            STATUS: <span style={{ color: '#10B981' }}>AVAILABLE FOR ROLES</span>
          </div>

          <div className="status-item scroll-hint" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>SCROLL TO EXPLORE</span>
            <ArrowRight size={12} style={{ transform: 'rotate(90deg)' }} />
          </div>
        </div>
      </div>

      {/* CSS Layout Adjustments for Mobile & Tablet Viewports */}
      <style>{`
        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding-top: 1.5rem !important;
          }
          .hero-left, .hero-right {
            grid-column: span 12 !important;
            width: 100%;
          }
          .hero-left {
            text-align: center;
          }
          .hero-left p {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-cta-btns {
            justify-content: center;
          }
          .hero-project-card {
            max-width: 100% !important;
          }
        }

        @media (max-width: 640px) {
          #home {
            padding-top: 76px !important;
          }
          .hero-grid {
            padding: 1.25rem 4% 2rem 4% !important;
            gap: 1.8rem !important;
          }
          .hero-main-title {
            font-size: 2.2rem !important;
            line-height: 1.1 !important;
          }
          .hero-eyebrow-chip {
            font-size: 0.7rem !important;
            padding: 5px 12px !important;
          }
          .hero-cta-btns {
            flex-direction: column !important;
            width: 100% !important;
          }
          .hero-cta-btns a {
            width: 100% !important;
          }
          .hero-card-image-box {
            height: 145px !important;
          }
          .hero-status-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.5rem !important;
            font-size: 0.65rem !important;
            text-align: center;
          }
          .status-item {
            padding: 2px 0;
          }
          .scroll-hint {
            justify-content: center;
          }
          .hero-watermark {
            bottom: 3.5rem !important;
            font-size: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}


