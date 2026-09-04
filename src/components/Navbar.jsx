import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const previousOverflowY = document.body.style.overflowY;

    if (mobileOpen) {
      document.body.style.overflowY = 'hidden';
    }

    return () => {
      document.body.style.overflowY = previousOverflowY;
    };
  }, [mobileOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Technical Expertise', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 5%',
        zIndex: 1000,
        background: scrolled || mobileOpen ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled || mobileOpen ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled || mobileOpen ? 'blur(16px)' : 'none',
        borderBottom: scrolled || mobileOpen ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 0.35s ease, backdrop-filter 0.35s ease, border-color 0.35s ease',
        justifyContent: 'space-between'
      }}
    >
      <motion.a
        href="#home"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ duration: 0.2 }}
        style={{ fontWeight: 800, fontSize: '1.4rem', color: 'var(--text)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
      >
        <span style={{ color: theme === 'dark' ? '#14B8A6' : '#E07A48', fontSize: '1.15rem' }}>✦</span>
        <span><span style={{ color: 'var(--accent)' }}>LJ</span><span style={{ color: 'var(--text)', marginLeft: '2px' }}>CL</span></span>
      </motion.a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Local time badge inspired by Lumora */}
        <div
          className="desktop-time-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            background: 'var(--card-bg)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
        >
          Local time <strong style={{ color: 'var(--text)', marginLeft: '2px', marginRight: '4px' }}>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong> • Quezon, PH
        </div>

        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ y: -2, color: 'var(--accent)' }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.2 }}
              style={{
                textDecoration: 'none',
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontSize: '0.85rem',
                transition: 'color 0.25s ease'
              }}
            >
              {item.label}
            </motion.a>
          ))}

          {/* Nav Download CV Pill */}
          <motion.a
            whileHover={{ scale: 1.05, y: -1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            href="/assets/docs/Lloyd_Jernell_Loterina_CV.pdf"
            download="Lloyd_Jernell_Loterina_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: 'var(--accent)',
              color: '#FFFFFF',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 700,
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(20, 184, 166, 0.25)',
              marginLeft: '0.25rem'
            }}
          >
            <Download size={14} strokeWidth={2.5} />
            <span>CV</span>
          </motion.a>
        </nav>

        <motion.button
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            toggleTheme({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            });
          }}
          whileHover={{ scale: 1.12, rotate: 12 }}
          whileTap={{ scale: 0.88 }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text)',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1002
          }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </motion.button>

        {/* Mobile Nav Toggle */}
        <motion.div 
          className="mobile-toggle" 
          onClick={() => setMobileOpen(!mobileOpen)} 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ display: 'none', cursor: 'pointer', zIndex: 1002, color: 'var(--text)' }}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </motion.div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              height: '100vh',
              background: 'var(--bg)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.75rem'
            }}
          >
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: 'var(--text)',
                  fontWeight: 700,
                  fontSize: '1.8rem',
                  letterSpacing: '-0.02em'
                }}
                whileHover={{ color: 'var(--accent)', x: 10 }}
              >
                {item.label}
              </motion.a>
            ))}

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navItems.length * 0.04 }}
              href="/assets/CV.pdf"
              download="Lloyd_Jernell_Loterina_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 28px',
                background: 'var(--accent)',
                color: '#FFFFFF',
                borderRadius: '100px',
                fontWeight: 700,
                fontSize: '1.1rem',
                textDecoration: 'none',
                marginTop: '1rem',
                boxShadow: '0 8px 24px rgba(20, 184, 166, 0.35)'
              }}
            >
              <Download size={20} strokeWidth={2.5} />
              <span>Download CV</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.header>
  );
}
