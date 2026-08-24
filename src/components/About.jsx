import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Pause, Play, Square, Volume2, Palette, Sparkles, Rocket } from 'lucide-react';

export default function About() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [activePartIndex, setActivePartIndex] = useState(null);
  const [activeWordIndex, setActiveWordIndex] = useState(null);
  const utteranceRef = useRef(null);

  const cards = [
    { 
      Icon: Palette,
      title: "Who I Am", 
      desc: "An Information Technology Graduate with a strong passion for Frontend Development, UI/UX Design, and technical problem-solving. I focus on creating intuitive, visually engaging, and user-centered digital experiences."
    },
    { 
      Icon: Sparkles,
      title: "What I Do", 
      desc: "I bridge the gap between technical logic and visual design. Whether it's crafting responsive interfaces or refining user workflows, I focus on aesthetics, usability, and clarity." 
    },
    { 
      Icon: Rocket,
      title: "My Goal", 
      desc: "To secure a role as a Frontend Developer or UI/UX Designer where I can leverage my eye for detail and technical skills to build high-quality web solutions. I aim to contribute to creative projects while continuing to refine my expertise in modern web technologies." 
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
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center', marginBottom: '4rem', color: 'var(--text)' }}>
          About <span style={{ color: 'var(--accent)' }}>Me</span>
        </h2>
        
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
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ y: -10, boxShadow: 'var(--shadow)', borderColor: 'var(--accent)' }}
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${isSpeaking && speechParts[activePartIndex]?.cardIndex === index ? 'var(--accent)' : 'var(--border)'}`,
                borderRadius: '16px',
                padding: '2.5rem',
                transition: 'border-color 0.3s ease'
              }}
            >
              <div style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>
                <CardIcon size={34} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--text)' }}>{renderSpeechText(card.title, index * 2)}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{renderSpeechText(card.desc, index * 2 + 1)}</p>
            </motion.div>
          );
          })}
        </div>

        {isSupported && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
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
              <button
                type="button"
                onClick={togglePause}
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
              </button>
              <button
                type="button"
                onClick={stopSpeaking}
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
              </button>
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
