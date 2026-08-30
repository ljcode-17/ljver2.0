import React, { useState, useEffect, Suspense, lazy } from 'react';
import { flushSync } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

const Hero3D = lazy(() => import('./components/Hero3D'));

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Force browser to reset scroll to top (home page) on refresh/reload
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = (origin) => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme);
      return;
    }

    const startViewTransition = document.startViewTransition?.bind(document);
    if (!startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const x = origin?.x ?? viewportWidth - 40;
    const y = origin?.y ?? 40;

    const maxRadius = Math.max(
      Math.hypot(x, y),
      Math.hypot(viewportWidth - x, y),
      Math.hypot(x, viewportHeight - y),
      Math.hypot(viewportWidth - x, viewportHeight - y)
    );

    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--theme-transition-x', `${x}px`);
    rootStyle.setProperty('--theme-transition-y', `${y}px`);
    rootStyle.setProperty('--theme-transition-r', `${Math.ceil(maxRadius)}px`);
    document.documentElement.classList.add('theme-transition-active');

    const transition = startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });

    transition.finished.finally(() => {
      document.documentElement.classList.remove('theme-transition-active');
    });
  };

  return (
    <>
      <CustomCursor theme={theme} />

      <AnimatePresence mode="wait">
        {loading && (
          <LoadingScreen
            onComplete={() => {
              window.scrollTo(0, 0);
              setLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      <div className="aura-bg" data-theme={theme}>
        {theme === 'dark' && (
          <>
            <div className="dark-nightfall-layer-1" aria-hidden="true" />
            <div className="dark-nightfall-layer-2" aria-hidden="true" />
            <div className="dark-aurora-layer-3" aria-hidden="true" />
            <div className="dark-aura-grain" aria-hidden="true" />
          </>
        )}

        {theme === 'light' && (
          <>
            <div className="aura-layer-1" aria-hidden="true" />
            <div className="aura-layer-2" aria-hidden="true" />
            <div className="aura-grain" aria-hidden="true" />
          </>
        )}

        <div className="aura-content">
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <Suspense fallback={null}>
            <Hero3D theme={theme} />
          </Suspense>
          <Hero theme={theme} />
          <About />
          <Projects />
          <Skills />
          <Education />
          <Experience />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;

