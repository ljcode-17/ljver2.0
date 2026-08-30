import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const experience = [
  {
    role: "System Developer Intern (OJT)",
    org: "One CoreDev IT®, Inc. (CORE®)",
    period: "2026 | 500-Hour OJT Completed",
    details: [
      "Automated critical company workflows and internal systems using modern technologies.",
      "Developed interactive front-end components using React JS.",
      "Engineered robust back-end services with ASP.NET.",
      "Managed relational databases with SSMS and integrated version control via Sourcetree & GitHub.",
      "Utilized Postman for API testing and validation of system services."
    ]
  },
  {
    role: "Lead Documentarian (Academic)",
    org: "System Design Project",
    period: "2024-2026",
    details: [
      "Managed technical documentation for a multi-student project lifecycle.",
      "Standardized reporting formats for system bugs and resolution steps.",
      "Facilitated communication between developers and project stakeholders."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '120px 5%', position: 'relative', zIndex: 1, background: 'var(--bg-subtle)' }}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        style={{ maxWidth: '800px', margin: '0 auto' }}
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
            05 / PROFESSIONAL EXPERIENCE
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Experience & <span style={{ color: 'var(--accent)' }}>Roles</span>
          </h2>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }} />

          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
              style={{ position: 'relative', paddingLeft: '60px', marginBottom: '44px' }}
            >
              <div style={{
                position: 'absolute', left: '11px', top: 0, width: '20px', height: '20px',
                background: 'var(--bg)', border: '4px solid var(--accent)', borderRadius: '50%', zIndex: 1
              }} />
              <div style={{
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: 'var(--shadow)'
              }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '4px', color: 'var(--text)', letterSpacing: '-0.01em' }}>{item.role}</h3>
                <h4 style={{ fontSize: '1.05rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '8px' }}>{item.org}</h4>
                <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '14px', letterSpacing: '0.02em' }}>{item.period}</p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} style={{ position: 'relative', paddingLeft: '24px', marginBottom: '10px', fontSize: '0.94rem', color: 'var(--text)', lineHeight: 1.6 }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', top: '3px' }}>
                        <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
