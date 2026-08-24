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
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', textAlign: 'center', marginBottom: '4rem', color: 'var(--text)' }}>
          Experience & <span style={{ color: 'var(--accent)' }}>Involvement</span>
        </h2>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }} />

          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              style={{ position: 'relative', paddingLeft: '60px', marginBottom: '40px' }}
            >
              <div style={{
                position: 'absolute', left: '11px', top: 0, width: '20px', height: '20px',
                background: 'var(--bg)', border: '4px solid var(--accent)', borderRadius: '50%', zIndex: 1
              }} />
              <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--text)' }}>{item.role}</h3>
              <h4 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '8px' }}>{item.org}</h4>
              <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px' }}>{item.period}</p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {item.details.map((detail, dIdx) => (
                  <li key={dIdx} style={{ position: 'relative', paddingLeft: '20px', marginBottom: '8px', fontSize: '0.95rem', color: 'var(--text)' }}>
                    <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center' }}>
                      <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
