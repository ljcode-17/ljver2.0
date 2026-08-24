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
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center', marginBottom: '1rem', color: 'var(--text)' }}>
          Technical <span style={{ color: 'var(--accent)' }}>Expertise</span>
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '4rem', fontWeight: 500, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
          <span>Methodology:</span>
          <span>Diagnose</span>
          <ChevronRight size={14} aria-hidden="true" />
          <span>Document</span>
          <ChevronRight size={14} aria-hidden="true" />
          <span>Resolve</span>
          <ChevronRight size={14} aria-hidden="true" />
          <span>Prevent</span>
        </p>
        
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
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              whileHover={{ y: -5, borderColor: 'var(--accent)' }}
              style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '2rem',
                transition: 'border-color 0.3s ease'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderLeft: '4px solid var(--accent)', paddingLeft: '12px', color: 'var(--text)' }}>{cat.title}</h3>
              {cat.desc && <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{cat.desc}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {cat.chips.map(chip => (
                  <motion.span 
                    key={chip}
                    whileHover={{ scale: 1.05, backgroundColor: 'var(--accent)', color: 'white' }}
                    style={{
                      background: 'var(--bg-subtle)',
                      border: '1px solid var(--border)',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      cursor: 'default',
                      color: 'var(--text)'
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
