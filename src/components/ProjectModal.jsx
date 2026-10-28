import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  PlayCircle,
  FileText,
  Github,
  ArrowRight,
  Image as ImageIcon,
  ExternalLink,
  Award,
  GraduationCap,
  Users,
  Target,
  Sparkles,
  CheckCircle2,
  Cpu,
  Layers,
  Database,
  Wrench,
  BookOpen,
  Volume2,
  Code2,
  Smartphone,
  Check,
  AlertCircle
} from 'lucide-react';

function CaseStudyView({ caseStudy, project }) {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', label: 'All Sections' },
    { id: 'overview', label: 'Overview & Goals' },
    { id: 'features', label: 'Core Features' },
    { id: 'roles', label: 'My Roles & Team' },
    { id: 'tech', label: 'Verified Tech Stack' },
    { id: 'process', label: 'Development Process' },
    { id: 'challenges', label: 'Challenges & Lessons' },
    { id: 'impact', label: 'Impact & Outcomes' }
  ];

  const showAll = activeTab === 'all';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', marginTop: '0.25rem' }}>
      {/* Capstone Metadata & Honors Banner */}
      <div
        style={{
          background: 'var(--bg-subtle)',
          borderRadius: '16px',
          border: '1px solid var(--border)',
          padding: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(20, 184, 166, 0.15)',
                color: 'var(--accent)',
                fontSize: '0.72rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '4px 10px',
                borderRadius: '100px',
                border: '1px solid rgba(20, 184, 166, 0.3)'
              }}
            >
              <GraduationCap size={13} />
              {caseStudy.meta.institution}
            </span>
            <span
              style={{
                background: 'var(--card-bg)',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '100px',
                border: '1px solid var(--border)'
              }}
            >
              {caseStudy.meta.degree}
            </span>
          </div>

          <span
            style={{
              fontSize: '0.74rem',
              color: 'var(--text-muted)',
              fontWeight: 600
            }}
          >
            {caseStudy.meta.curriculum}
          </span>
        </div>

        {/* Honors Badges Strip */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {caseStudy.meta.honors.map((h, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'var(--card-bg)',
                border: '1px solid rgba(20, 184, 166, 0.35)',
                padding: '5px 11px',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--text)'
              }}
            >
              <Award size={13} style={{ color: 'var(--accent)', flexShrink: 0 }} />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Section Navigator Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          paddingBottom: '4px',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: '100px',
                border: isActive ? '1px solid var(--accent)' : '1px solid var(--border)',
                background: isActive ? 'var(--accent)' : 'var(--bg-subtle)',
                color: isActive ? '#FFFFFF' : 'var(--text-muted)',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                flexShrink: 0
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 1. PROJECT OVERVIEW & SCOPE */}
      {(showAll || activeTab === 'overview') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              1. Project Overview & Educational Scope
            </h4>
          </div>
          <p style={{ color: 'var(--text)', lineHeight: 1.65, fontSize: '0.92rem', margin: 0 }}>
            {caseStudy.overview.summary}
          </p>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem', margin: 0 }}>
            {caseStudy.overview.context}
          </p>
          <div
            style={{
              background: 'rgba(20, 184, 166, 0.08)',
              border: '1px solid rgba(20, 184, 166, 0.25)',
              borderRadius: '12px',
              padding: '0.75rem 1rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px'
            }}
          >
            <Sparkles size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
            <p style={{ color: 'var(--text)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
              <strong style={{ color: 'var(--accent)' }}>Educational Supplementary Role: </strong>
              {caseStudy.overview.scopeNote}
            </p>
          </div>
        </motion.div>
      )}

      {/* 2. PROBLEM STATEMENT & EDUCATIONAL NEEDS */}
      {(showAll || activeTab === 'overview') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              2. Educational Needs & Design Motivations
            </h4>
          </div>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.6, fontSize: '0.9rem', margin: 0 }}>
            {caseStudy.problemStatement.intro}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {caseStudy.problemStatement.challenges.map((c, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.9rem 1rem'
                }}
              >
                <strong style={{ color: 'var(--text)', fontSize: '0.84rem', display: 'block', marginBottom: '0.35rem' }}>
                  {c.title}
                </strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', fontStyle: 'italic', margin: 0, lineHeight: 1.45 }}>
            {caseStudy.problemStatement.framingNote}
          </p>
        </motion.div>
      )}

      {/* 3. PROJECT OBJECTIVES */}
      {(showAll || activeTab === 'overview') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              3. Project Objectives
            </h4>
          </div>

          <div
            style={{
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '0.9rem 1.1rem'
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.25rem' }}>
              General Objective
            </span>
            <p style={{ color: 'var(--text)', fontSize: '0.9rem', lineHeight: 1.55, margin: 0, fontWeight: 600 }}>
              {caseStudy.objectives.general}
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.5rem' }}>
              Specific Objectives (Intended Capabilities)
            </span>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {caseStudy.objectives.specific.map((obj, i) => (
                <div
                  key={i}
                  style={{
                    background: 'var(--card-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '0.7rem 0.9rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px'
                  }}
                >
                  <span
                    style={{
                      background: 'rgba(20, 184, 166, 0.12)',
                      color: 'var(--accent)',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 7px',
                      borderRadius: '6px',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}
                  >
                    0{i + 1}
                  </span>
                  <span style={{ color: 'var(--text)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. TARGET USERS */}
      {(showAll || activeTab === 'overview') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              4. Target Users & Role-Based Workflows
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {caseStudy.targetUsers.map((u, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
                  <strong style={{ color: 'var(--text)', fontSize: '0.92rem' }}>{u.role}</strong>
                  <span style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--accent)', background: 'rgba(20, 184, 166, 0.12)', padding: '2px 8px', borderRadius: '100px' }}>
                    {u.badge}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.45, margin: 0 }}>
                  {u.purpose}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0.25rem 0 0 0', display: 'grid', gap: '0.35rem' }}>
                  {u.capabilities.map((cap, cIdx) => (
                    <li key={cIdx} style={{ color: 'var(--text)', fontSize: '0.78rem', display: 'flex', gap: '7px', alignItems: 'flex-start', lineHeight: 1.4 }}>
                      <Check size={12} style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }} />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 5. CORE FEATURES */}
      {(showAll || activeTab === 'features') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              5. Key Features & Functionalities
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {caseStudy.coreFeatures.map((f, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', flexWrap: 'wrap' }}>
                  <strong style={{ color: 'var(--text)', fontSize: '0.88rem' }}>{f.title}</strong>
                  <span style={{ fontSize: '0.66rem', fontWeight: 700, color: 'var(--accent)', background: 'var(--card-bg)', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--border)' }}>
                    {f.tag}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.55, margin: 0 }}>
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 6. MY ROLES & TEAM */}
      {(showAll || activeTab === 'roles') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              6. My Actual Roles, Responsibilities & Capstone Team
            </h4>
          </div>

          <div
            style={{
              background: 'rgba(20, 184, 166, 0.08)',
              border: '1px solid rgba(20, 184, 166, 0.25)',
              borderRadius: '12px',
              padding: '0.85rem 1.1rem'
            }}
          >
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.2rem' }}>
              Assigned Capstone Role
            </span>
            <strong style={{ color: 'var(--text)', fontSize: '0.94rem', display: 'block', marginBottom: '0.35rem' }}>
              {caseStudy.myRoles.title}
            </strong>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem', lineHeight: 1.55, margin: 0 }}>
              {caseStudy.myRoles.intro}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {caseStudy.myRoles.contributions.map((c, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.9rem'
                }}
              >
                <strong style={{ color: 'var(--accent)', fontSize: '0.82rem', display: 'block', marginBottom: '0.3rem' }}>
                  {c.area}
                </strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                  {c.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Collaborative Capstone Team Roster */}
          <div
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1rem'
            }}
          >
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.6rem' }}>
              Academic Capstone Project Team
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.6rem', marginBottom: '0.75rem' }}>
              {caseStudy.myRoles.teamRoster.map((m, idx) => (
                <div key={idx} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', padding: '0.55rem 0.85rem', borderRadius: '8px' }}>
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text)', display: 'block' }}>{m.name}</strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{m.role}</span>
                </div>
              ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0, fontStyle: 'italic', borderTop: '1px solid var(--border)', paddingTop: '0.6rem' }}>
              {caseStudy.myRoles.teamworkStatement}
            </p>
          </div>

          {/* Technical and Professional Skills Developed */}
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '0.45rem' }}>
              Technical & Professional Skills Developed
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {caseStudy.myRoles.skillsDeveloped.map((sk, sIdx) => (
                <span
                  key={sIdx}
                  style={{
                    background: 'var(--bg-subtle)',
                    color: 'var(--text)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--border)'
                  }}
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 7. VERIFIED TECHNOLOGY STACK */}
      {(showAll || activeTab === 'tech') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              7. Verified Programming Languages & Technology Stack
            </h4>
          </div>

          {/* Category A: Programming Languages */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.45rem' }}>
              <Code2 size={14} style={{ color: 'var(--accent)' }} />
              <strong style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Programming Languages
              </strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {caseStudy.techStack.languages.map((l, i) => (
                <div key={i} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--text)', fontSize: '0.86rem' }}>{l.name}</strong>
                    <span style={{ fontSize: '0.66rem', color: 'var(--accent)', background: 'rgba(20, 184, 166, 0.12)', padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>
                      {l.type}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{l.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category B: Frameworks & Libraries */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.45rem' }}>
              <Layers size={14} style={{ color: 'var(--accent)' }} />
              <strong style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Frameworks & Libraries
              </strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {caseStudy.techStack.frameworks.map((f, i) => (
                <div key={i} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--text)', fontSize: '0.86rem' }}>{f.name}</strong>
                    <span style={{ fontSize: '0.66rem', color: 'var(--accent)', background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '2px 7px', borderRadius: '6px', fontWeight: 600 }}>
                      {f.type}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category C: Databases & Backend Services */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.45rem' }}>
              <Database size={14} style={{ color: 'var(--accent)' }} />
              <strong style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Databases & Cloud Backend Services
              </strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {caseStudy.techStack.backend.map((b, i) => (
                <div key={i} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--text)', fontSize: '0.86rem' }}>{b.name}</strong>
                    <span style={{ fontSize: '0.66rem', color: 'var(--accent)', background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '2px 7px', borderRadius: '6px', fontWeight: 600 }}>
                      {b.type}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category D: API Integration */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.45rem' }}>
              <Volume2 size={14} style={{ color: 'var(--accent)' }} />
              <strong style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                API Integrations
              </strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {caseStudy.techStack.apis.map((a, i) => (
                <div key={i} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--text)', fontSize: '0.86rem' }}>{a.name}</strong>
                    <span style={{ fontSize: '0.66rem', color: 'var(--accent)', background: 'rgba(20, 184, 166, 0.12)', padding: '2px 7px', borderRadius: '6px', fontWeight: 700 }}>
                      {a.type}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category E: Software, IDE & Development Tools */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.45rem' }}>
              <Wrench size={14} style={{ color: 'var(--accent)' }} />
              <strong style={{ fontSize: '0.8rem', color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Software, IDE & Development Tools
              </strong>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.65rem' }}>
              {caseStudy.techStack.tools.map((t, i) => (
                <div key={i} style={{ background: 'var(--bg-subtle)', border: '1px solid var(--border)', borderRadius: '12px', padding: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <strong style={{ color: 'var(--text)', fontSize: '0.86rem' }}>{t.name}</strong>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)', background: 'var(--card-bg)', border: '1px solid var(--border)', padding: '2px 7px', borderRadius: '6px', fontWeight: 600 }}>
                      {t.type}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.5, margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* 8. DEVELOPMENT PROCESS */}
      {(showAll || activeTab === 'process') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              8. Systematic Development Journey
            </h4>
          </div>
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            {caseStudy.developmentProcess.map((step, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <span
                  style={{
                    background: 'var(--accent)',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '3px 8px',
                    borderRadius: '6px',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                >
                  {step.step}
                </span>
                <div>
                  <strong style={{ color: 'var(--text)', fontSize: '0.88rem', display: 'block', marginBottom: '0.25rem' }}>
                    {step.title}
                  </strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 9. TECHNICAL CHALLENGES & LESSONS */}
      {(showAll || activeTab === 'challenges') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              9. Technical Challenges & Solutions
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {caseStudy.challenges.map((c, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '14px',
                  padding: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.45rem'
                }}
              >
                <strong style={{ color: 'var(--text)', fontSize: '0.88rem' }}>
                  {c.challenge}
                </strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                  <strong style={{ color: 'var(--text)' }}>Context: </strong>{c.context}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0, borderTop: '1px solid var(--border)', paddingTop: '0.45rem' }}>
                  <strong style={{ color: 'var(--accent)' }}>Solution: </strong>{c.solution}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* 10. EDUCATIONAL VALUE & IMPACT */}
      {(showAll || activeTab === 'impact') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              10. Educational Value & Potential Impact
            </h4>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {caseStudy.educationalImpact.map((item, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.9rem 1rem'
                }}
              >
                <strong style={{ color: 'var(--accent)', fontSize: '0.84rem', display: 'block', marginBottom: '0.35rem' }}>
                  {item.group}
                </strong>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                  {item.benefit}
                </p>
              </div>
            ))}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.76rem', fontStyle: 'italic', margin: 0, lineHeight: 1.45 }}>
            {caseStudy.impactDisclaimer}
          </p>
        </motion.div>
      )}

      {/* 11. PROJECT OUTCOMES & RECOGNITION */}
      {(showAll || activeTab === 'impact') && (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} style={{ color: 'var(--accent)' }} />
            <h4 style={{ color: 'var(--accent)', margin: 0, fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              11. Project Outcomes & Academic Recognition
            </h4>
          </div>
          <div style={{ display: 'grid', gap: '0.65rem' }}>
            {caseStudy.outcomes.map((out, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-subtle)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px'
                }}
              >
                <Award size={18} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
                <div>
                  <strong style={{ color: 'var(--text)', fontSize: '0.88rem', display: 'block', marginBottom: '0.2rem' }}>
                    {out.title}
                  </strong>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', lineHeight: 1.5, margin: 0 }}>
                    {out.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

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
    if (project?.gallery && project?.galleryCaptions) {
      const idx = project.gallery.indexOf(imgUrl);
      if (idx !== -1 && project.galleryCaptions[idx]) return project.galleryCaptions[idx];
    }
    if (imgUrl.includes('/mathtatag/1.jpg')) {
      return 'MATHtatag Mobile Mathematics Learning Application — Overview and role-based login mockup.';
    }
    if (imgUrl.includes('/mathtatag/2.jpg')) {
      return 'MATHtatag Teacher Dashboard — Student roster, analytics, and performance monitoring.';
    }
    if (imgUrl.includes('/mathtatag/3.jpg')) {
      return 'MATHtatag Learner Quiz & Filipino TTS audio-guided assessment interface.';
    }
    if (imgUrl.includes('/mathtatag/main.jpg')) {
      return 'MATHtatag App Brand Logo and Mascot Character Illustration.';
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
    if (imgUrl.includes('badUI.jpg')) {
      return 'The Recipe Link legacy website interface before redesign';
    }
    if (imgUrl.includes('good1.png')) {
      return 'The Recipe Link redesigned homepage with hero search and categories';
    }
    if (imgUrl.includes('good2.png')) {
      return 'The Recipe Link redesigned recipe browsing and content discovery section';
    }
    if (imgUrl.includes('good3.png')) {
      return 'The Recipe Link redesigned individual recipe details presentation';
    }
    if (imgUrl.includes('/homeUI/main.png')) {
      return 'Smart Home Control System desktop presentation mockup';
    }
    if (imgUrl.includes('home1.jpg')) {
      return 'Smart Home Control System centralized dashboard interface';
    }
    if (imgUrl.includes('/Ephil Medicine UI/1.png')) {
      return 'ePhilMed Project Presentation Showcase with mobile interface mockups';
    }
    if (imgUrl.includes('/Ephil Medicine UI/2.png')) {
      return 'ePhilMed Getting Started, User Registration, and Login mobile screens';
    }
    if (imgUrl.includes('/Ephil Medicine UI/3.png')) {
      return 'ePhilMed Main Navigation Screens: Homepage, Schedule, Medical Records, and User Profile';
    }
    if (imgUrl.includes('/Ephil Medicine UI/4.png')) {
      return 'ePhilMed Healthcare Services: Doctor Directory, Doctor Details, Nearby Pharmacy, and Prescriptions';
    }
    if (imgUrl.includes('/Ephil Medicine UI/5.png')) {
      return 'ePhilMed Emergency Assistance Triage, Map Ambulance Route, and Health Insights Dashboard';
    }
    return `${project?.title || 'Project'} Preview`;
  };

  const getImageCaption = (imgUrl) => {
    if (!imgUrl) return null;
    if (project?.gallery && project?.galleryCaptions) {
      const idx = project.gallery.indexOf(imgUrl);
      if (idx !== -1 && project.galleryCaptions[idx]) return project.galleryCaptions[idx];
    }
    if (imgUrl.includes('/mathtatag/1.jpg')) {
      return 'Mobile App Overview & Role Selection — Showcase of MATHtatag featuring role-based entry (Learner, Teacher, Parent) aligned with the Grade 1 MATATAG Curriculum.';
    }
    if (imgUrl.includes('/mathtatag/2.jpg')) {
      return 'Teacher Dashboard & Monitoring — Classroom management interface displaying student rosters, assessment scores, performance analytics, and quarterly tracking.';
    }
    if (imgUrl.includes('/mathtatag/3.jpg')) {
      return 'Learner Assessment & Filipino TTS — Interactive math exercise with Filipino voice assistance, touch-friendly questions, and instant automated scoring.';
    }
    if (imgUrl.includes('/mathtatag/main.jpg')) {
      return 'Brand & Visual Identity — Custom educational character illustration, friendly mascot, and playful UI identity designed specifically for young learners.';
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
    if (imgUrl.includes('badUI.jpg')) {
      return 'Original Website (Before) — The legacy Recipe Link website interface with dense information, limited visual hierarchy, and dated styling.';
    }
    if (imgUrl.includes('good1.png')) {
      return 'My Redesigned Concept (Homepage) — Modernized header, refined red-and-neutral visual theme, prominent search bar, and curated categories (Quick and Easy, Dinner, Healthy, 5 Ingredients).';
    }
    if (imgUrl.includes('good2.png')) {
      return 'My Redesigned Concept (Recipe Discovery) — Structured browsing layout with featured recipe cards, latest recipes sidebar, high-resolution food photography, and clear ratings.';
    }
    if (imgUrl.includes('good3.png')) {
      return 'My Redesigned Concept (Recipe Details) — Dedicated recipe presentation featuring prominent food imagery, organized ingredient checklists, rating overview, and action buttons.';
    }
    if (imgUrl.includes('/homeUI/main.png')) {
      return 'Project Showcase & Desktop Mockup — Presentation concept visualizing the Smart Home Control System dashboard on an iMac desktop setup.';
    }
    if (imgUrl.includes('home1.jpg')) {
      return 'Centralized Smart Home Dashboard — Unified control center featuring thermostat slider, device toggles, room navigation, power metrics, live camera feeds, and environmental data.';
    }
    if (imgUrl.includes('home2.jpg')) {
      return 'Favorites & Quick Access Screen — Streamlined device dashboard providing rapid control over frequently used appliances, lighting, door locks, and air conditioning.';
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
                    backgroundImage: `url("${currentHeroImage}")`,
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

              {project.caseStudy ? (
                <CaseStudyView caseStudy={project.caseStudy} project={project} />
              ) : (
                <>
                  {/* Role / Contribution badge */}
                  {project.role && (
                    <div style={{
                      marginBottom: '1rem',
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

                  {project.recognition && (
                    <div style={{
                      marginBottom: '1.25rem',
                      padding: '0.65rem 1rem',
                      background: 'rgba(20, 184, 166, 0.08)',
                      borderRadius: '12px',
                      border: '1px solid rgba(20, 184, 166, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      flexWrap: 'wrap'
                    }}>
                      <Award size={16} color="var(--accent)" />
                      <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Academic Recognition:
                      </span>
                      <span style={{ fontSize: '0.86rem', color: 'var(--text)', fontWeight: 600 }}>
                        {project.recognition}
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

                  {/* Opportunities for Improvement (Optional UI/UX section) */}
                  {project.improvements && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.32 }}
                      style={{ marginBottom: '1.5rem' }}
                    >
                      <h4 style={{ color: 'var(--accent)', marginBottom: '0.55rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Opportunities for Improvement & Future Iterations
                      </h4>
                      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.45rem' }}>
                        {project.improvements.map((imp, i) => (
                          <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.88rem', display: 'flex', gap: '10px', alignItems: 'flex-start', lineHeight: 1.5 }}>
                            <span style={{ color: 'var(--accent)', marginTop: '3px', flexShrink: 0 }}>
                              <ArrowRight size={13} strokeWidth={2.5} />
                            </span>
                            <span>{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </>
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
