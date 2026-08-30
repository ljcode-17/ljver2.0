import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const education = [
  {
    logo: '/assets/schools/PUP.png',
    degree: "Bachelor of Science in Information Technology",
    school: "Polytechnic University of the Philippines – Lopez Campus",
    period: "2022 – Present | Current GPA: 1.53",
    details: [
      "President’s Lister (2022 & 2025)",
      "Dean’s Lister (2022 – 2024)",
      "Academic Awardee (S.Y. 2022–2023)",
      "Academic Awardee (S.Y. 2023–2024)",
      "Academic Awardee (S.Y. 2025–2026)",
      "1st Place — Southern Tagalog Consortium for Industry, Energy, and Emerging Technology Research and Development (STCIEERD), 2nd Undergraduate R&D Category — \"MATHtatag\": Grade-1 math assessment app with performance monitoring and Filipino text-to-speech. Event held at Batangas State University, Alangilan Campus.",
      "2nd Placer — 7th Multi-Disciplinary In-House Review and Research Colloquium (PUP Lopez Campus), Architecture, Engineering & Technology Category (2026)"
    ]
  },
  {
    logo: '/assets/schools/MUNHI.png',
    degree: "Senior High School",
    school: "Tagkawayan National High School",
    period: "2020 – 2022",
    details: [
      "With Honors",
      "Participant, 4th De La Salle University Senior High School Research Congress",
      "3rd Place, 1st Quezon Division Science and Technology Fair"
    ]
  },
  {
    logo: '/assets/schools/OLLA.png',
    degree: "Junior High School",
    school: "Our Lady of Lourdes Academy",
    period: "2016 – 2020",
    details: ["With Honors"]
  },
  {
    logo: '/assets/schools/CENTRAL.png',
    degree: "Elementary & Kindergarten",
    school: "Tagkawayan Central Elementary School",
    period: "2009 – 2016",
    details: []
  }
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '120px 5%', position: 'relative', zIndex: 1, background: 'var(--bg-subtle)' }}>
      <motion.div
        initial={{ opacity: 0.3, y: 35, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px 120px 0px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
            04 / ACADEMIC BACKGROUND
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Education & <span style={{ color: 'var(--accent)' }}>Honors</span>
          </h2>
        </div>
        
        <div style={{ position: 'relative' }} className="education-timeline">
          <div style={{ position: 'absolute', left: '20px', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }} className="education-timeline-line" />
          
          {education.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0.3, x: -25, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: "0px 0px 120px 0px" }}
              transition={{ duration: 0.65, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: 'relative', paddingLeft: '60px', marginBottom: '40px' }}
              className="education-item"
            >
              <div style={{ 
                position: 'absolute', left: '11px', top: 0, width: '20px', height: '20px', 
                background: 'var(--bg)', border: '4px solid var(--accent)', borderRadius: '50%', zIndex: 1 
              }} />
              <div style={{
                display: 'grid',
                gridTemplateColumns: '88px 1fr',
                gap: '1.25rem',
                alignItems: 'start'
              }} className="education-entry">
                <motion.div
                  initial={{ opacity: 0.3, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px 120px 0px" }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
                  style={{
                    width: '88px',
                    height: '88px',
                    borderRadius: '18px',
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.08)',
                    transition: 'box-shadow 0.25s ease, border-color 0.25s ease'
                  }}
                  className="education-logo-card"
                >
                  <img
                    src={item.logo}
                    alt={`${item.school} logo`}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      display: 'block',
                      padding: '12px'
                    }}
                  />
                </motion.div>

                <div className="education-copy">
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '4px', color: 'var(--text)' }}>{item.degree}</h3>
                  <h4 style={{ fontSize: '1rem', color: 'var(--accent)', marginBottom: '8px' }}>{item.school}</h4>
                  <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '12px', overflowWrap: 'anywhere' }}>{item.period}</p>
                  {item.details.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {item.details.map((detail, dIdx) => (
                        <li key={dIdx} style={{ position: 'relative', paddingLeft: '20px', marginBottom: '8px', fontSize: '0.95rem', color: 'var(--text)', overflowWrap: 'anywhere' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center' }}>
                            <ArrowRight size={14} strokeWidth={2.4} aria-hidden="true" />
                          </span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <style>{`
        .education-logo-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 14px 32px var(--shadow) !important;
        }

        @media (max-width: 768px) {
          .education-timeline-line {
            left: 16px !important;
          }

          .education-item {
            padding-left: 46px !important;
            margin-bottom: 28px !important;
          }

          .education-entry {
            grid-template-columns: 1fr !important;
            gap: 0.9rem !important;
            justify-items: start !important;
            align-items: start !important;
          }

          .education-logo-card {
            width: 78px !important;
            height: 78px !important;
            margin-bottom: 0.2rem !important;
          }

          .education-copy {
            width: 100% !important;
          }

          .education-copy h3 {
            font-size: 1.1rem !important;
          }

          .education-copy h4 {
            font-size: 0.95rem !important;
          }

          .education-copy p,
          .education-copy li {
            font-size: 0.9rem !important;
          }
        }

        @media (max-width: 480px) {
          .education-item {
            padding-left: 40px !important;
          }

          .education-timeline-line {
            left: 14px !important;
          }

          .education-logo-card {
            width: 68px !important;
            height: 68px !important;
            border-radius: 16px !important;
          }

          .education-entry {
            grid-template-columns: 1fr !important;
            gap: 0.8rem !important;
          }

          .education-logo-card {
            margin-bottom: 0.15rem !important;
          }

          .education-copy h3 {
            line-height: 1.25 !important;
          }

          .education-copy ul {
            padding-top: 2px !important;
          }
        }
      `}</style>
    </section>
  );
}
