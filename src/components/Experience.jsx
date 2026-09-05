import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const experience = [
  {
    role: "System Developer Intern (OJT)",
    org: "One CoreDev IT®, Inc. (CORE®)",
    badge: "Enterprise Practicum",
    logo: "/assets/core.png",
    period: "2026 | 500-Hour OJT Completed",
    skills: ["React.js", "ASP.NET Core", "C#", "SQL Server (SSMS)", "RESTful APIs", "Postman", "Git & Sourcetree"],
    details: [
      "Engineered responsive, dynamic front-end interfaces using React.js to streamline user workflows and modern Web UI design.",
      "Developed robust back-end web services and controller endpoints utilizing ASP.NET Core & C# architecture.",
      "Designed and managed relational database schemas, complex SQL queries, and stored procedures in Microsoft SQL Server (SSMS).",
      "Conducted comprehensive API endpoint testing, payload validation, and debugging via Postman for production reliability.",
      "Maintained strict version control, branch management, and code integrity using Git, GitHub, and Sourcetree across team workflows.",
      "Successfully completed a rigorous 500-hour system developer practicum, delivering internal web automation solutions."
    ]
  },
  {
    role: "Lead Documentarian & QA Contributor (Academic)",
    org: "MATHTatag Capstone & System Design Projects",
    badge: "Leadership & Quality Assurance",
    period: "2024 - 2026",
    skills: ["System Documentation", "QA & Test Case Execution", "Firebase Integration", "Usability Testing", "Team Leadership"],
    details: [
      "Authored and structured comprehensive technical documentation (Chapters 1-5) for academic capstone and system development life cycles.",
      "Established standardized bug reporting, QA test cases, and error tracking frameworks to accelerate developer resolution times.",
      "Assisted in Firebase database configuration, AI (Google Gemini API) prompt integration, and TTS accessibility testing.",
      "Facilitated cross-functional collaboration between developers, UI designers, and academic evaluators."
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" style={{ padding: '120px 5%', position: 'relative', zIndex: 1, background: 'var(--bg-subtle)' }}>
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ maxWidth: '840px', margin: '0 auto' }}
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
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '540px', margin: '0.75rem auto 0 auto', lineHeight: 1.6 }}>
            Demonstrated hands-on experience in full-stack development, database administration, QA testing, and software documentation.
          </p>
        </div>

        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }} />

          {experience.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
              style={{ position: 'relative', paddingLeft: '60px', marginBottom: '48px' }}
            >
              {/* Timeline Indicator Dot */}
              <div style={{
                position: 'absolute', left: '11px', top: '4px', width: '20px', height: '20px',
                background: 'var(--bg)', border: '4px solid var(--accent)', borderRadius: '50%', zIndex: 1
              }} />

              <motion.div
                whileHover={{ y: -4, borderColor: 'var(--accent)' }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid var(--border)',
                  borderRadius: '24px',
                  padding: '2.25rem',
                  boxShadow: 'var(--shadow)',
                  transition: 'border-color 0.25s ease'
                }}
              >
                {/* Header Row: Title + Logo & Badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '14px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
                      <span style={{ 
                        fontSize: '0.72rem', 
                        fontWeight: 700, 
                        color: 'var(--accent)', 
                        background: 'var(--accent-light)', 
                        padding: '3px 10px', 
                        borderRadius: '100px', 
                        border: '1px solid var(--border)',
                        letterSpacing: '0.04em'
                      }}>
                        ✦ {item.badge}
                      </span>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>
                        {item.period}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.01em', marginBottom: '2px' }}>
                      {item.role}
                    </h3>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--accent)', fontWeight: 700 }}>
                      {item.org}
                    </h4>
                  </div>

                  {item.logo && (
                    <div style={{
                      background: '#ffffff',
                      padding: '10px 16px',
                      borderRadius: '16px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)'
                    }}>
                      <img 
                        src={item.logo} 
                        alt={`${item.org} logo`} 
                        style={{ height: '36px', width: 'auto', objectFit: 'contain' }} 
                      />
                    </div>
                  )}
                </div>

                {/* Key Accomplishments Bullet Points */}
                <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 20px 0' }}>
                  {item.details.map((detail, dIdx) => (
                    <li key={dIdx} style={{ position: 'relative', paddingLeft: '26px', marginBottom: '12px', fontSize: '0.95rem', color: 'var(--text)', lineHeight: 1.65 }}>
                      <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', top: '4px' }}>
                        <CheckCircle2 size={16} strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                {item.skills && item.skills.length > 0 && (
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '16px' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
                      Technologies & Tools Utilized:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {item.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            padding: '4px 10px',
                            background: 'var(--bg)',
                            color: 'var(--text)',
                            borderRadius: '8px',
                            border: '1px solid var(--border)'
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
