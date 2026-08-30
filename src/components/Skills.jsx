import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend & UI/UX Design",
    desc: "Crafting visually engaging and user-centered digital interfaces.",
    chips: ["React JS", "HTML, CSS & JavaScript", "Figma", "Responsive Web Design"]
  },
  {
    title: "Systems & Programming",
    chips: ["C#, Java, Python, C++", "SSMS", "MySQL", "Firebase", "SQL (Basic)", "Microsoft Access", "Basic Laravel Filament"]
  },
  {
    title: "IT Support & Troubleshooting",
    chips: ["Hardware/Software Setup", "PC Troubleshooting"]
  },
  {
    title: "Tools & Productivity",
    chips: ["GitHub", "Sourcetree", "Postman", "Visual Studio / Code", "ClickUp", "Make AI Tools", "Generative AI / AI-Assisted Development", "Technical Writing"]
  }
];

export default function Skills() {
  return (
    <section id="skills" style={{ padding: '120px 5%', position: 'relative', zIndex: 1, background: 'var(--bg-subtle)' }}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
            03 / TECHNICAL EXPERTISE
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Skills & <span style={{ color: 'var(--accent)' }}>Technologies</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span>Methodology:</span>
            <span>Diagnose</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Document</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Resolve</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span>Prevent</span>
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
              whileHover={{ y: -6, borderColor: 'var(--accent)' }}
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                padding: '2.25rem',
                boxShadow: 'var(--shadow)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', borderLeft: '4px solid var(--accent)', paddingLeft: '12px', color: 'var(--text)', letterSpacing: '-0.01em' }}>{cat.title}</h3>
              {cat.desc && <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>{cat.desc}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {cat.chips.map(chip => (
                  <motion.span 
                    key={chip}
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
                    style={{
                      background: 'var(--accent-light)',
                      border: '1px solid var(--border)',
                      padding: '8px 16px',
                      borderRadius: '100px',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      cursor: 'default',
                      color: 'var(--text)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {chip}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
