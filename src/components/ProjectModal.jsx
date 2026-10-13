import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, FileText, Github, ArrowRight, Image as ImageIcon, ExternalLink } from 'lucide-react';

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

  const getAltText = (imgUrl) => {
    if (!imgUrl) return 'Project Preview';
    if (imgUrl.includes('/mathtatag/1.jpg')) {
      return 'MATHTatag Mobile Learning App Showcase featuring role-based dashboards and Grade 1 math assessment.';
    }
    if (imgUrl.includes('/mathtatag/2.jpg')) {
      return 'MATHTatag Teacher Dashboard with announcements, student analytics, and exercise results.';
    }
    if (imgUrl.includes('/mathtatag/3.jpg')) {
      return 'MATHTatag Learner Quiz & Filipino TTS audio-guided assessment interface.';
    }
    if (imgUrl.includes('/mathtatag/main.jpg')) {
      return 'MATHTatag App Logo and Character Illustration.';
    }
    if (imgUrl.includes('/Study/1.png')) {
      return 'Showcase: StudyFlow mobile study planner UI/UX concept featuring home dashboard, AI chat, and study planner screens.';
    }
    if (imgUrl.includes('/Study/2.png')) {
      return 'Core UI Screens: StudyFlow mobile screens showing Home Dashboard, AI Chat assistant, and Study Planner.';
    }
    if (imgUrl.includes('/Study/3.png')) {
      return 'Figma Workspace: StudyFlow design canvas in Figma showing screen frames, layout grids, and component assets.';
    }
    return `${project?.title || 'Project'} Preview`;
  };

  const getImageCaption = (imgUrl) => {
    if (!imgUrl) return null;
    if (imgUrl.includes('/mathtatag/1.jpg')) {
      return 'MATHTatag Mobile Mathematics Learning Application — Overview & role-based login mockup.';
    }
    if (imgUrl.includes('/mathtatag/2.jpg')) {
      return 'Teacher Dashboard — Classroom management, student demographics, and quarterly performance monitoring.';
    }
    if (imgUrl.includes('/mathtatag/3.jpg')) {
      return 'Learner Quiz Interface — Filipino text-to-speech questions, matching challenges, and assessment results.';
    }
    if (imgUrl.includes('/mathtatag/main.jpg')) {
      return 'MATHTatag Brand & App Icon Identity.';
    }
    if (imgUrl.includes('/Study/1.png')) {
      return 'StudyFlow Showcase Artwork — Mobile study planner UI/UX concept featuring home dashboard, AI chat, and study planner screens.';
    }
    if (imgUrl.includes('/Study/2.png')) {
      return 'Key Screen Designs — Screen 1: Home Dashboard, Screen 2: AI Study Assistant, Screen 3: Study Planner.';
    }
    if (imgUrl.includes('/Study/3.png')) {
      return 'Figma Design Workspace — Canvas frames, component structure, and design assets in Figma.';
    }
    return null;
  };

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
                  {project.categoryDisplay || project.category}
                </span>
                <div>
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
                  {project.subtitle && (
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block' }}>
                      {project.subtitle}
                    </span>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                aria-label="Close dialog"
                className="modal-close-btn"
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
                  height: 'clamp(190px, 34vw, 360px)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  marginBottom: getImageCaption(currentHeroImage) ? '0.4rem' : '1.25rem',
                  border: '1px solid var(--border)',
                  boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
                  position: 'relative',
                  background: '#090D16',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Atmospheric blurred ambient backdrop */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -12,
                    backgroundImage: `url(${currentHeroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(26px) brightness(0.35)',
                    opacity: 0.65,
                    transform: 'scale(1.15)',
                    pointerEvents: 'none'
                  }}
                />
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentHeroImage}
                    src={currentHeroImage}
                    alt={getAltText(currentHeroImage)}
                    initial={{ opacity: 0.5, scale: 0.99 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.5 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: 'auto',
                      objectFit: 'contain',
                      display: 'block'
                    }}
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.dataset.triedFallback === 'true') {
                        target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='22' font-weight='bold'>Project Preview</text></svg>";
                        return;
                      }
                      target.dataset.triedFallback = 'true';
                      const currentSrc = target.src;
                      if (currentSrc.endsWith('.webp')) {
                        target.src = currentSrc.replace(/\.webp$/, '.png');
                      } else if (currentSrc.endsWith('.png')) {
                        target.src = currentSrc.replace(/\.png$/, '.jpg');
                      } else {
                        target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='22' font-weight='bold'>Project Preview</text></svg>";
                      }
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Informative Image Caption */}
              {getImageCaption(currentHeroImage) && (
                <p style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.2rem',
                  marginBottom: '1.25rem',
                  fontStyle: 'italic',
                  lineHeight: 1.45
                }}>
                  {getImageCaption(currentHeroImage)}
                </p>
              )}

              {/* Gallery Screenshots Switcher */}
              {galleryImages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 }}
                  style={{ marginBottom: '1.75rem' }}
                >
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
                      const label = project.galleryLabels?.[imgIdx];
                      return (
                        <motion.button
                          key={imgIdx}
                          onClick={() => setSelectedImage(imgUrl)}
                          whileHover={{ scale: 1.04, y: -2 }}
                          whileTap={{ scale: 0.96 }}
                          title={label || `Screenshot ${imgIdx + 1}`}
                          style={{
                            height: '78px',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            border: isSelected ? '2px solid var(--accent)' : '1px solid var(--border)',
                            cursor: 'pointer',
                            background: '#0F172A',
                            padding: 0,
                            position: 'relative',
                            outline: 'none',
                            boxShadow: isSelected ? '0 0 12px rgba(20, 184, 166, 0.4)' : 'none',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <img
                            src={imgUrl}
                            alt={getAltText(imgUrl)}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              display: 'block',
                              opacity: isSelected ? 1 : 0.75,
                              transition: 'opacity 0.2s'
                            }}
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.dataset.triedFallback === 'true') {
                                target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='14' font-weight='bold'>Screenshot</text></svg>";
                                return;
                              }
                              target.dataset.triedFallback = 'true';
                              const currentSrc = target.src;
                              if (currentSrc.endsWith('.webp')) {
                                target.src = currentSrc.replace(/\.webp$/, '.png');
                              } else if (currentSrc.endsWith('.png')) {
                                target.src = currentSrc.replace(/\.png$/, '.jpg');
                              } else {
                                target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='14' font-weight='bold'>Screenshot</text></svg>";
                              }
                            }}
                          />
                          {label && (
                            <span style={{
                              position: 'absolute',
                              bottom: 0,
                              left: 0,
                              right: 0,
                              background: 'rgba(0,0,0,0.72)',
                              color: '#fff',
                              fontSize: '0.6rem',
                              fontWeight: 600,
                              padding: '2px 4px',
                              textAlign: 'center',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {label}
                            </span>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Role / Contribution badge */}
              {project.role && (
                <div style={{
                  marginBottom: '1.25rem',
                  padding: '0.65rem 1rem',
                  background: 'var(--bg-subtle)',
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Personal Contribution:
                  </span>
                  <span style={{ fontSize: '0.86rem', color: 'var(--text)', fontWeight: 600 }}>
                    {project.role}
                  </span>
                </div>
              )}

              {/* Overview */}
              {project.problem && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Project Overview
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>{project.problem}</p>
                </motion.div>
              )}

              {/* Solution */}
              {project.solution && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.14 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    The Design Concept
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>{project.solution}</p>
                </motion.div>
              )}

              {/* Design Objectives (Optional UI/UX section) */}
              {project.designObjectives && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.16 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.45rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Design Objective & Goals
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.92rem', marginBottom: '0.6rem' }}>
                    <strong style={{ color: 'var(--text)', fontWeight: 600 }}>Primary Objective: </strong>
                    {project.designObjectives.primary}
                  </p>
                  {project.designObjectives.goals && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.4rem' }}>
                      {project.designObjectives.goals.map((g, i) => (
                        <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', gap: '10px', alignItems: 'flex-start', lineHeight: 1.5 }}>
                          <span style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }}>
                            <ArrowRight size={13} strokeWidth={2.5} />
                          </span>
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              )}

              {/* Key UI/UX Screens (Optional UI/UX section) */}
              {project.screens && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.18 }}
                  style={{ marginBottom: '1.75rem' }}
                >
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Key UI/UX Screens
                  </h4>
                  <div style={{ display: 'grid', gap: '0.85rem' }}>
                    {project.screens.map((scr, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg-subtle)',
                          border: '1px solid var(--border)',
                          borderRadius: '14px',
                          padding: '1rem 1.15rem'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                          <span style={{
                            background: 'var(--accent)',
                            color: '#FFFFFF',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: '6px'
                          }}>
                            Screen {idx + 1}
                          </span>
                          <strong style={{ fontSize: '0.94rem', color: 'var(--text)' }}>{scr.title}</strong>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>— {scr.heading}</span>
                        </div>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55, margin: '0 0 0.65rem 0' }}>
                          {scr.desc}
                        </p>
                        {scr.elements && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                            {scr.elements.map((elem, eIdx) => (
                              <span
                                key={eIdx}
                                style={{
                                  background: 'var(--card-bg)',
                                  border: '1px solid var(--border)',
                                  color: 'var(--text)',
                                  fontSize: '0.72rem',
                                  fontWeight: 500,
                                  padding: '3px 8px',
                                  borderRadius: '6px'
                                }}
                              >
                                {elem}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Key Features */}
              {project.features && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.2 }}
                  style={{ marginBottom: '1.5rem' }}
                >
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
                </motion.div>
              )}

              {/* Design Approach (Optional UI/UX section) */}
              {project.designApproach && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.22 }}
                  style={{ marginBottom: '1.75rem' }}
                >
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.75rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Design Approach
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                    {project.designApproach.map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: 'var(--bg-subtle)',
                          border: '1px solid var(--border)',
                          borderRadius: '12px',
                          padding: '0.85rem 1rem'
                        }}
                      >
                        <strong style={{ color: 'var(--accent)', fontSize: '0.84rem', display: 'block', marginBottom: '0.3rem' }}>
                          {item.title}
                        </strong>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Responsibilities */}
              {project.responsibilities && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.25 }}
                  style={{ marginBottom: '1.5rem' }}
                >
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
                </motion.div>
              )}

              {/* Learnings */}
              {project.learnings && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 }}
                  style={{ marginBottom: '1.5rem' }}
                >
                  <h4 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Key Takeaways & Learnings
                  </h4>
                  <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>{project.learnings}</p>
                </motion.div>
              )}

              {/* Footer Tech & Links */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.35 }}
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
                      {project.link.includes('figma.com') ? (
                        <ExternalLink size={15} />
                      ) : (
                        <PlayCircle size={15} />
                      )}{' '}
                      {project.linkText || 'Live Demo'}
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
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
