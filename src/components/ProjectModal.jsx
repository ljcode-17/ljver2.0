import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, FileText, Github, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehaviorY;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorY = 'none';

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehaviorY = previousOverscroll;
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed',
          top: '72px',
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(1rem, 3vw, 2rem)',
          overflow: 'hidden'
        }}>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(8px)'
            }}
          />

          {/* Modal Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '800px',
              maxHeight: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--bg)',
              borderRadius: '24px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                padding: 'clamp(1.5rem, 4vw, 3rem)',
                paddingTop: '3.5rem'
              }}
            >
              <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {project.category} / {project.tags?.join(' / ')}
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginTop: '0.5rem', marginBottom: '2rem', color: 'var(--text)', fontWeight: 800 }}>{project.title}</h2>

              {project.problem && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 700 }}>Overview</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{project.problem}</p>
                </div>
              )}

              {project.solution && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 700 }}>Story / Concept</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{project.solution}</p>
                </div>
              )}

              {project.features && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>Highlights</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {project.features.map((f, i) => (
                      <li key={i} style={{ marginBottom: '0.6rem', color: 'var(--text)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--accent)', marginTop: '2px', display: 'inline-flex', alignItems: 'center' }}>
                          <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.responsibilities && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '1rem', fontSize: '1rem', fontWeight: 700 }}>My Roles</h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {project.responsibilities.map((r, i) => (
                      <li key={i} style={{ marginBottom: '0.6rem', color: 'var(--text)', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                        <span style={{ color: 'var(--accent)', marginTop: '2px', display: 'inline-flex', alignItems: 'center' }}>
                          <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                        </span>
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {project.learnings && (
                <div style={{ marginBottom: '2.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem', fontSize: '1rem', fontWeight: 700 }}>What I Learned</h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{project.learnings}</p>
                </div>
              )}

              <div style={{ 
                borderTop: '1px solid var(--border)', 
                paddingTop: '2rem', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                flexWrap: 'wrap', 
                gap: '1.5rem' 
              }}>
                <div>
                  <strong style={{ color: 'var(--text)', fontSize: '0.9rem' }}>Technologies / Tools:</strong> 
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.2rem' }}>{project.tech?.join(' • ')}</div>
                </div>
                
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
                      padding: '12px 24px',
                      background: 'var(--accent)',
                      color: 'white',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px 0 rgba(20, 184, 166, 0.3)'
                    }}>
                      <PlayCircle size={18} /> {project.linkText || 'Watch Now'}
                    </a>
                  )}
                  
                  <a href={project.docs || '#'} target="_blank" rel="noopener noreferrer" style={{
                    padding: '12px 24px',
                    background: project.docs ? 'var(--accent)' : 'var(--bg-subtle)',
                    color: project.docs ? 'white' : 'var(--text-muted)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: project.docs ? 'none' : '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: project.docs ? 1 : 0.6,
                    cursor: project.docs ? 'pointer' : 'not-allowed'
                  }}>
                    <FileText size={18} /> View Document
                  </a>

                  <a href={project.github || '#'} target="_blank" rel="noopener noreferrer" style={{
                    padding: '12px 24px',
                    background: 'var(--bg-subtle)',
                    color: project.github ? 'var(--text)' : 'var(--text-muted)',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: project.github ? 1 : 0.6,
                    cursor: project.github ? 'pointer' : 'not-allowed'
                  }}>
                    <Github size={18} /> GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
