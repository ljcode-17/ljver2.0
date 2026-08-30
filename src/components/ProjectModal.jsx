import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, FileText, Github, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sync selected image when project opens
  useEffect(() => {
    if (project) {
      setSelectedImage(project.image);
    }
  }, [project]);

  // Lock background scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehaviorY;

    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehaviorY = 'none';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehaviorY = previousOverscroll;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const galleryImages = project && project.gallery && project.gallery.length > 0
    ? project.gallery
    : project ? [project.image] : [];

  const currentHeroImage = selectedImage || (project ? project.image : '');

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'grid',
            placeItems: 'center',
            padding: 'clamp(0.75rem, 3vh, 2rem) clamp(0.5rem, 2.5vw, 1.25rem)',
            overflow: 'hidden'
          }}
        >
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(5, 5, 5, 0.85)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          />

          {/* Centered Modal Card Container */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              maxHeight: 'min(86vh, 820px)',
              margin: 'auto',
              display: 'flex',
              flexDirection: 'column',
              background: 'var(--card-bg)',
              borderRadius: '24px',
              border: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 25px 70px -15px rgba(0, 0, 0, 0.7)',
              zIndex: 10
            }}
          >
            {/* Sticky Header Bar with Close Button */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 30,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.9rem 1.25rem',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                borderBottom: '1px solid var(--border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden', paddingRight: '0.75rem' }}>
                <span
                  style={{
                    color: 'var(--accent)',
                    fontWeight: 700,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    background: 'rgba(20, 184, 166, 0.12)',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    border: '1px solid rgba(20, 184, 166, 0.25)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {project.category}
                </span>
                <h3
                  id="modal-project-title"
                  style={{
                    fontSize: 'clamp(0.95rem, 2.4vw, 1.2rem)',
                    fontWeight: 800,
                    color: 'var(--text)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    margin: 0
                  }}
                >
                  {project.title}
                </h3>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close dialog"
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all 0.2s ease'
                }}
              >
                <X size={18} strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Scrollable Body Content */}
            <div
              style={{
                flex: 1,
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
                overscrollBehavior: 'contain',
                padding: 'clamp(1rem, 3.2vw, 2.25rem)'
              }}
            >
              {/* Interactive Hero Cover Photo */}
              <div
                style={{
                  width: '100%',
                  height: 'clamp(180px, 30vw, 320px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: '1.25rem',
                  border: '1px solid var(--border)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                  position: 'relative',
                  background: '#0a0a0a'
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroImage}
                    src={currentHeroImage}
                    alt={`${project.title} Preview`}
                    initial={{ opacity: 0.4, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x450/1E293B/FFFFFF?text=Project+Preview';
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Gallery Screenshots Switcher */}
              {galleryImages.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <h4
                    style={{
                      color: 'var(--text)',
                      marginBottom: '0.65rem',
                      fontSize: '0.88rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <ImageIcon size={15} style={{ color: 'var(--accent)' }} />
                    Project Screenshots ({galleryImages.length})
                  </h4>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
                      gap: '0.6rem'
                    }}
                  >
                    {galleryImages.map((imgUrl, imgIdx) => {
                      const isSelected = currentHeroImage === imgUrl;
                      return (
                        <motion.button
                          key={imgIdx}
                          onClick={() => setSelectedImage(imgUrl)}
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          style={{
                            height: '78px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                            cursor: 'pointer',
                            background: 'var(--bg-subtle)',
                            padding: 0,
                            position: 'relative',
                            outline: 'none',
                            boxShadow: isSelected ? '0 0 12px rgba(20, 184, 166, 0.4)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <img
                            src={imgUrl}
                            alt={`${project.title} Screenshot ${imgIdx + 1}`}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              opacity: isSelected ? 1 : 0.75,
                              transition: 'opacity 0.2s'
                            }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/300x200/1E293B/FFFFFF?text=Screenshot+' + (imgIdx + 1);
                            }}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Overview */}
              {project.problem && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Overview
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>{project.problem}</p>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Story & Solution
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>{project.solution}</p>
                </div>
              )}

              {/* Key Features */}
              {project.features && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.65rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Key Features
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                    {project.features.map((f, i) => (
                      <li key={i} style={{ color: 'var(--text)', fontSize: '0.9rem', display: 'flex', gap: '10px', alignItems: 'flex-start', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }}>
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {project.responsibilities && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.65rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    My Contributions & Roles
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                    {project.responsibilities.map((r, i) => (
                      <li key={i} style={{ color: 'var(--text)', fontSize: '0.9rem', display: 'flex', gap: '10px', alignItems: 'flex-start', lineHeight: 1.5 }}>
                        <span style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }}>
                          <ArrowRight size={14} strokeWidth={2.5} />
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Learnings */}
              {project.learnings && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Key Takeaways & Learnings
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>{project.learnings}</p>
                </div>
              )}

              {/* Footer Tech & Links */}
              <div
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: '1.25rem',
                  marginTop: '1.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text)', fontSize: '0.82rem', display: 'block', marginBottom: '0.3rem' }}>
                    Technologies & Tools:
                  </strong>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {project.tech?.map((t, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: 'var(--bg-subtle)',
                          color: 'var(--text-muted)',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          padding: '3px 9px',
                          borderRadius: '100px',
                          border: '1px solid var(--border)'
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                  {project.link && (
                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '9px 18px',
                        background: 'var(--accent)',
                        color: 'white',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px',
                        boxShadow: '0 4px 14px rgba(20, 184, 166, 0.3)'
                      }}
                    >
                      <PlayCircle size={15} /> {project.linkText || 'Live Demo'}
                    </motion.a>
                  )}

                  {project.docs && (
                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={project.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '9px 16px',
                        background: 'var(--bg-subtle)',
                        color: 'var(--text)',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        border: '1px solid var(--border)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px'
                      }}
                    >
                      <FileText size={15} /> View Document
                    </motion.a>
                  )}

                  {project.github && (
                    <motion.a
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        padding: '9px 16px',
                        background: 'transparent',
                        color: 'var(--text)',
                        borderRadius: '50px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        fontSize: '0.82rem',
                        border: '1px solid var(--border)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '7px'
                      }}
                    >
                      <Github size={15} /> GitHub
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
