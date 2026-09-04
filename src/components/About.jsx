import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Square, Volume2, Code2, Palette, Wrench, CheckCircle2 } from 'lucide-react';

export default function About() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [activePartIndex, setActivePartIndex] = useState(null);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const utteranceRef = useRef(null);

  const cards = [
    { 
      Icon: Code2,
      title: "Frontend Development & Engineering", 
      desc: "BSIT Graduate & Award-Winning Developer specializing in ReactJS, JavaScript (ES6+), HTML5, and CSS3. I translate complex business requirements into high-performance, pixel-perfect, and responsive web applications.",
      tag: "ReactJS • Modern JS • Web Systems"
    },
    { 
      Icon: Palette,
      title: "UI/UX & Experience Design", 
      desc: "Passionate about user-centered design, Figma prototyping, and visual hierarchy. I bridge the gap between creative visual aesthetics and functional usability—ensuring digital products are intuitive, engaging, and effortless to navigate.",
      tag: "Figma • User Workflows • Visual Aesthetics"
    },
    { 
      Icon: Wrench,
      title: "IT Support & Technical Operations", 
      desc: "Hands-on experience in enterprise IT support, system diagnostics, PC hardware setup, RJ45 cabling, and database management. I bring rigorous problem-solving skills to maintain system reliability, security, and technical support.",
      tag: "Hardware Setup • Cabling • Diagnostics"
    }
  ];

  const introduction = cards.map(card => `${card.title}. ${card.desc}`).join(' ');
  const speechParts = [];
  let speechOffset = 0;

  cards.forEach((card, cardIndex) => {
    speechParts.push({ text: card.title, cardIndex, start: speechOffset });
    speechOffset += card.title.length + 2;
    speechParts.push({ text: card.desc, cardIndex, start: speechOffset });
    speechOffset += card.desc.length + 1;
  });

  speechParts.forEach(part => {
    part.words = [...part.text.matchAll(/\S+/g)].map(match => ({
      start: match.index,
      end: match.index + match[0].length
    }));
  });

  const resetSpeechPosition = () => {
    setActivePartIndex(null);
    setActiveWordIndex(null);
  };

  const handleSpeechBoundary = event => {
    const partIndex = speechParts.findIndex(part => (
      event.charIndex >= part.start && event.charIndex < part.start + part.text.length
    ));
    if (partIndex === -1) return;

    const part = speechParts[partIndex];
    const relativeIndex = event.charIndex - part.start;
    const wordIndex = part.words.findIndex(word => (
      relativeIndex >= word.start && relativeIndex < word.end
    ));
    setActivePartIndex(partIndex);
    setActiveWordIndex(wordIndex === -1 ? null : wordIndex);
  };

  useEffect(() => {
    if (!('speechSynthesis' in window)) {
      setIsSupported(false);
      return undefined;
    }

    const handleSpeechEnd = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
      resetSpeechPosition();
    };

    return () => {
      window.speechSynthesis.cancel();
      utteranceRef.current = null;
      handleSpeechEnd();
    };
  }, []);

  const selectEnglishVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    return voices.find(voice => voice.lang.toLowerCase() === 'en-us' && voice.localService)
      || voices.find(voice => voice.lang.toLowerCase().startsWith('en') && voice.localService)
      || voices.find(voice => voice.lang.toLowerCase().startsWith('en'));
  };

  const startSpeaking = () => {
    if (!isSupported) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(introduction);
    const voice = selectEnglishVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      resetSpeechPosition();
    };
    utterance.onboundary = handleSpeechBoundary;
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
      resetSpeechPosition();
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      utteranceRef.current = null;
      resetSpeechPosition();
    };
    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const togglePause = () => {
    if (!isSpeaking) {
      startSpeaking();
      return;
    }

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
    utteranceRef.current = null;
    resetSpeechPosition();
  };

  const renderSpeechText = (text, partIndex) => {
    let wordIndex = 0;
    return text.split(/(\s+)/).map((segment, index) => {
      if (/\s+/.test(segment)) return segment;
      const isActive = activePartIndex === partIndex && activeWordIndex === wordIndex;
      wordIndex += 1;
      return (
        <span key={`${partIndex}-${index}`} className={isActive ? 'speech-word-active' : undefined}>
          {segment}
        </span>
      );
    });
  };

  return (
    <section id="about" style={{ padding: '120px 5%', position: 'relative', zIndex: 1, background: 'var(--bg-subtle)' }}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              marginBottom: '1rem',
              border: '1px solid var(--border)'
            }}
          >
            01 / ABOUT ME • PROFESSIONAL PROFILE
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Engineering Logic. <span style={{ color: 'var(--accent)' }}>Designing Experiences.</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '720px', margin: '0 auto', lineHeight: 1.6 }}>
            Bridging technical precision, user-centered design, and IT support to deliver robust, intuitive digital solutions.
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {cards.map((card, index) => {
            const CardIcon = card.Icon;
            return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -6, boxShadow: 'var(--shadow)', borderColor: 'var(--accent)' }}
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: `1px solid ${isSpeaking && speechParts[activePartIndex]?.cardIndex === index ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '24px',
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div>
                <div
                  style={{
                    marginBottom: '1.5rem',
                    color: 'var(--accent)',
                    width: '52px',
                    height: '52px',
                    borderRadius: '14px',
                    background: 'var(--accent-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid var(--border)'
                  }}
                >
                  <CardIcon size={26} strokeWidth={2} aria-hidden="true" />
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>{renderSpeechText(card.title, index * 2)}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.65, fontSize: '0.95rem' }}>{renderSpeechText(card.desc, index * 2 + 1)}</p>
              </div>

              {card.tag && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.02em' }}>
                    {card.tag}
                  </span>
                </div>
              )}
            </motion.div>
          );
          })}
        </div>

        {isSupported && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              margin: '3rem auto 0'
            }}
            aria-live="polite"
          >
            <motion.button
              type="button"
              onClick={startSpeaking}
              whileHover={{ y: -2, backgroundColor: 'var(--accent-hover)' }}
              whileTap={{ scale: 0.98 }}
              aria-label="Listen to my introduction"
              title="Listen to my introduction"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                padding: 0,
                border: '1px solid var(--accent)',
                borderRadius: '50%',
                background: 'var(--accent)',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <Volume2 size={18} aria-hidden="true" />
            </motion.button>

            <div style={{ display: 'flex', gap: '8px' }} aria-label="Voice playback controls">
              <motion.button
                type="button"
                onClick={togglePause}
                whileHover={{ scale: 1.08, y: -1, borderColor: 'var(--accent)' }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                aria-label={isPaused ? 'Resume introduction' : 'Pause introduction'}
                title={isPaused ? 'Resume' : 'Pause'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  background: 'var(--card-bg)',
                  color: 'var(--text)',
                  cursor: 'pointer'
                }}
              >
                {isPaused ? <Play size={17} aria-hidden="true" /> : <Pause size={17} aria-hidden="true" />}
              </motion.button>
              <motion.button
                type="button"
                onClick={stopSpeaking}
                whileHover={{ scale: 1.08, y: -1, borderColor: 'var(--accent)' }}
                whileTap={{ scale: 0.94 }}
                transition={{ duration: 0.2 }}
                aria-label="Stop introduction"
                title="Stop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  border: '1px solid var(--border)',
                  borderRadius: '50%',
                  background: 'var(--card-bg)',
                  color: 'var(--text)',
                  cursor: 'pointer'
                }}
              >
                <Square size={16} aria-hidden="true" />
              </motion.button>
            </div>

            {isSpeaking && !isPaused && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 600 }}>
                <span className="voice-indicator" aria-hidden="true"><i /><i /><i /></span>
                Speaking
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
