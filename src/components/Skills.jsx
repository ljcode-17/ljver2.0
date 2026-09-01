import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Cable, Wrench, Cpu, Smartphone, Network, Sparkles, FileText, Code2 } from 'lucide-react';

const skillCategories = [
  {
    title: "Frontend & UI/UX Design",
    desc: "Crafting visually engaging and user-centered digital interfaces.",
    skills: [
      { name: "ReactJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Responsive Web Design", lucide: Smartphone }
    ]
  },
  {
    title: "Programming & Frameworks",
    desc: "Building structured software, desktop apps, and web services.",
    skills: [
      { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Laravel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
      { name: "Filament", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" }
    ]
  },
  {
    title: "Databases & Cloud",
    desc: "Designing relational database schemas & cloud data services.",
    skills: [
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Supabase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "MS SQL Server (SSMS)", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "MS Access", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" }
    ]
  },
  {
    title: "IT Support, Hardware & Networking",
    desc: "Hands-on hardware installation, network cabling, and system maintenance.",
    skills: [
      { name: "RJ45 Cable Crimping & Cabling", lucide: Cable },
      { name: "PC Hardware Setup & Assembly", lucide: Cpu },
      { name: "System Diagnostics & Troubleshooting", lucide: Wrench },
      { name: "Network Configuration", lucide: Network }
    ]
  },
  {
    title: "Tools & Productivity",
    desc: "Version control, IDEs, API testing, and AI-assisted workflows.",
    skills: [
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
      { name: "Visual Studio", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Sourcetree", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sourcetree/sourcetree-original.svg" },
      { name: "ClickUp", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/clickup/clickup-original.svg" },
      { name: "Generative AI Tools", lucide: Sparkles },
      { name: "Technical Writing", lucide: FileText }
    ]
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          maxWidth: '1250px',
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
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid var(--border)',
                borderRadius: '24px',
                padding: '2rem',
                boxShadow: 'var(--shadow)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem', borderLeft: '4px solid var(--accent)', paddingLeft: '12px', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                {cat.title}
              </h3>
              {cat.desc && (
                <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {cat.desc}
                </p>
              )}

              {/* Individual Skill Badges with Official Logos */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {cat.skills.map((skill, sIdx) => {
                  const LucideIcon = skill.lucide;
                  return (
                    <motion.div 
                      key={sIdx}
                      whileHover={{ scale: 1.05, y: -2 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'var(--accent-light)',
                        border: '1px solid var(--border)',
                        padding: '8px 14px',
                        borderRadius: '100px',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        color: 'var(--text)',
                        transition: 'all 0.25s ease'
                      }}
                    >
                      {skill.icon ? (
                        <img 
                          src={skill.icon} 
                          alt={skill.name}
                          style={{ width: '18px', height: '18px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : LucideIcon ? (
                        <LucideIcon size={16} style={{ color: 'var(--accent)' }} />
                      ) : (
                        <Code2 size={16} style={{ color: 'var(--accent)' }} />
                      )}
                      <span>{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
