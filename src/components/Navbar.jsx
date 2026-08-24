import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
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
        borderBottom: scrolled || mobileOpen ? '1px solid var(--border)' : 'none',
        transition: 'all 0.3s ease',
        justifyContent: 'space-between'
      }}
    >
      <a href="#home" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--text)', textDecoration: 'none' }}>
        <span style={{ color: 'var(--accent)' }}>LJ</span><span style={{ color: 'var(--text)', marginLeft: '4px' }}>CL</span>
      </a>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'flex', gap: '1.5rem' }}>
          {navItems.map((item) => (
            <motion.a
              key={item.label}
              href={item.href}
              whileHover={{ y: -2, color: 'var(--accent)' }}
              style={{
                textDecoration: 'none',
                color: 'var(--text-muted)',
                fontWeight: 500,
                fontSize: '0.85rem',
                transition: 'color 0.3s'
              }}
            >
              {item.label}
            </motion.a>
          ))}
        </nav>

        <motion.button
          onClick={(event) => {
            const rect = event.currentTarget.getBoundingClientRect();
            toggleTheme({
              x: rect.left + rect.width / 2,
              y: rect.top + rect.height / 2
            });
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
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
        <div className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', cursor: 'pointer', zIndex: 1002, color: 'var(--text)' }}>
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
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
              gap: '2rem'
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
                  fontSize: '2rem',
                  letterSpacing: '-0.02em'
                }}
                whileHover={{ color: 'var(--accent)', x: 10 }}
              >
                {item.label}
              </motion.a>
            ))}
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
