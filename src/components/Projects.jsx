import React, { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ProjectModal = lazy(() => import('./ProjectModal'));

const projectsData = [
  {
    id: 1,
    title: 'MATHTatag – Capstone Project',
    category: 'Mobile',
    tags: ['Academic', 'Capstone'],
    image: "/assets/projects/mathtatag.jpg",
    gallery: [
      "/assets/projects/mathtatag.jpg",
      "/assets/projects/fuel.png",
      "/assets/projects/meat.png"
    ],
    desc: "AI-integrated mobile learning app for mathematics.",
    problem: 'Grade 1 mathematics assessment often lacks interactive tools that allow teachers to monitor and analyze learner performance in real-time.',
    solution: 'Developed an academic capstone mobile learning application featuring role-based dashboards for teachers to create assessments and analyze results. Integrates Filipino text-to-speech for better accessibility.',
    features: [
        'AI-Powered Assessment Question Generation (Gemini Integration)',
        'Implemented assessment and performance monitoring features',
        'Integrated Filipino text-to-speech for accessibility',
        'Role-based dashboards for real-time data analysis',
        'Tested and evaluated for academic system requirements'
    ],
    tech: ['React Native', 'Firebase', 'Google Gemini AI', 'TTS Integration'],
    role: 'Documentation Lead, Quality Assurance (QA), and UI Contributor',
    responsibilities: [
        'Lead student for project documentation and research writing',
        'Assisted in AI Integration (Gemini) for assessment generation',
        'Conducted Quality Assurance (QA) testing and debugging',
        'Co-contributed to the UI design and layout',
        'Assisted in data management and Firebase integration'
    ],
    learnings: 'Gained hands-on experience in application logic, team collaboration, and the importance of accurate documentation and QA in a capstone project.',
    link: 'https://youtu.be/57dUWe2xdW8?si=bLKdqaVKnmJc0cqk',
    linkText: 'View Demo',
    docs: 'assets/docs/Group 1 Chapter 1-5 FINAL.pdf'
  },
  {
    id: 7,
    title: 'MeatMaster – Business Management System',
    category: 'Systems',
    tags: ['Academic Project', 'QMMS', 'Database'],
    image: "/assets/projects/meat.png",
    gallery: [
      "/assets/projects/meat.png",
      "/assets/projects/cover.png",
      "/assets/projects/fuel.png"
    ],
    desc: "Comprehensive management system for meat stores to track orders, debts, and profits.",
    problem: 'Manual record-keeping in public markets often leads to costly errors in debt tracking, disorganized order management, and inaccurate profit calculations.',
    solution: 'Developed an integrated digital solution designed specifically for local meat vendors to automate transactions, track customer credits, and provide real-time financial clarity for optimal business management.',
    features: [
        'Automated Debt & Credit Tracking',
        'Real-time Order Management System',
        'Profit & Loss Dashboard',
        'Inventory Monitoring & Status Updates',
        'Integrated Visual Basic UI with MySQL'
    ],
    tech: ['Visual Basic 2022', 'MySQL Workbench', 'VS Code'],
    role: 'Group Leader, Lead Developer & UI/UX Designer',
    responsibilities: [
        'Led the overall project development and group coordination',
        'Developed the UI and handled core business logic in Visual Basic 2022',
        'Designed and managed the relational database in MySQL Workbench',
        'Implemented seamless integration between frontend and backend within a single environment',
        'Facilitated development and debugging tasks using VS Code'
    ],
    learnings: 'Mastered the integration of modeling and simulation techniques into a functional business system using Visual Basic and MySQL.'
  },
  {
    id: 5,
    title: 'FuelWatch PH',
    category: 'Web',
    tags: ['Location-Aware', 'Crowdsourcing', 'UI/UX'],
    image: "/assets/projects/fuel.png",
    gallery: [
      "/assets/projects/fuel.png",
      "/assets/projects/art.png",
      "/assets/projects/kayumanggi.png"
    ],
    desc: "Crowdsourced fuel price monitoring platform for the Philippines.",
    problem: 'Finding cheaper fuel prices nearby is often difficult for consumers due to the lack of real-time, transparent price data across different gasoline stations.',
    solution: 'Developed a map-based crowdsourcing platform that allows users to find, compare, and contribute fuel price updates. It empowers the community to maintain accurate data and help each other save on fuel costs.',
    features: [
        'Live Map Integration (OpenStreetMap/Leaflet)',
        'Real-time Fuel Price Comparison by City/GPS',
        'Crowdsourced Data Contribution System',
        'Station Search & Filtering Logic',
        'Frontend Persistence via localStorage',
        'Responsive Design (Figma-to-React Conversion)'
    ],
    tech: ['React JS', 'OpenStreetMap', 'Leaflet', 'Figma', 'localStorage'],
    role: 'UI/UX Designer & Sole Frontend Developer',
    responsibilities: [
        'Designed the complete UI/UX flow in Figma',
        'Converted Figma/AI-generated designs into clean React JSX',
        'Implemented core frontend logic and map functionalities',
        'Handled map pinning and location-aware filtering',
        'Developed temporary data persistence using localStorage'
    ],
    learnings: 'Mastered the process of design-to-code conversion using modern AI tools and learned to integrate interactive map systems into React applications.'
  },
  {
    id: 2,
    title: 'Art Appreciation Website',
    category: 'Web',
    tags: ['Academic Project', 'Solo'],
    image: "/assets/projects/art.png",
    gallery: [
      "/assets/projects/art.png",
      "/assets/projects/kayumanggi.png",
      "/assets/projects/JmLaica.png"
    ],
    desc: "Cinematic web gallery showcasing cultural masterpieces.",
    problem: 'Navigating through vast art history and cultural masterpieces can be overwhelming without a structured and visual presentation.',
    solution: 'Developed a solo academic website that categorizes different forms of art—visual, performing, theater, and literary—specifically for an Art Appreciation course.',
    features: [
        'Categorized Art Sections (Visual, Performing, Literary, Theater)',
        'Famous Artworks & Cultural Highlights',
        'Image-Based Gallery Layout',
        'Smooth User-Friendly Navigation',
        'Fully Responsive Design'
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'VS Code'],
    learnings: 'Improved my web design fundamentals and learned how to present large amounts of visual information in a clean, professional way.',
    link: 'https://ljcode-17.github.io/loterinaArtAppre/visualart.html',
    linkText: 'View Website'
  },
  {
    id: 3,
    title: 'Fortress Security Agency',
    category: 'Systems',
    tags: ['Academic Final Project', 'Database Administration'],
    image: "/assets/projects/cover.png",
    gallery: [
      "/assets/projects/cover.png",
      "/assets/projects/meat.png",
      "/assets/projects/mathtatag.jpg"
    ],
    desc: "C# Guard & Salary Management System with SQL DB.",
    problem: 'Security agencies often struggle with manual record-keeping for guard attendance, complex shift scheduling, and error-prone salary computations.',
    solution: 'Developed a dedicated desktop application to automate guard information management, attendance tracking, and salary computation.',
    features: [
        'Automated Guard Information Management',
        'Relational Database for Attendance & Shift Logs',
        'Automated Salary Computation Logic',
        'Structured Shift Scheduling System',
        'Tested for Database Integrity and System Validation'
    ],
    tech: ['C#', 'Microsoft SQL Server', 'Visual Studio'],
    learnings: 'Mastered relational database design and C# integration. Learned to translate complex administrative workflows into a structured software solution.'
  },
  {
    id: 4,
    title: 'Kayumanggi E-Commerce Website',
    category: 'Web',
    tags: ['Frontend Project', 'Web Development'],
    image: "/assets/projects/kayumanggi.png",
    gallery: [
      "/assets/projects/kayumanggi.png",
      "/assets/projects/art.png",
      "/assets/projects/fuel.png"
    ],
    desc: "Frontend e-commerce platform with cultural aesthetics.",
    problem: 'Establishing a cohesive online visual identity for local Filipino products often requires a custom frontend that reflects cultural roots.',
    solution: 'Built a frontend-only e-commerce website to promote local Filipino products, featuring a custom brown-and-white aesthetic inspired by "kayumanggi".',
    features: [
        'Dynamic product listing layout',
        'Interactive shopping cart logic (JavaScript)',
        'Simulated checkout and purchase flow',
        'Responsive design for desktop and mobile',
        'Culturally-inspired color palette'
    ],
    tech: ['HTML5', 'Vanilla CSS', 'JavaScript (ES6)'],
    learnings: 'Gained a deeper understanding of bridging JavaScript logic with CSS styling to create a functional, aesthetically focused user experience.'
  },
  {
    id: 6,
    title: 'SILID',
    category: 'Multimedia',
    tags: ['Short Film', 'Thriller', 'Academic'],
    image: "/assets/projects/silid.png",
    gallery: [
      "/assets/projects/silid.png",
      "/assets/projects/cover.png",
      "/assets/projects/art.png"
    ],
    desc: "A psychological thriller about a man trapped in a maddening time loop.",
    problem: "Ryan wakes up in his apartment, only to find himself trapped in a maddening, never-ending loop of the same day.",
    solution: "As reality fractures, he is forced to confront the decaying remnants of his own sanity—until he makes the ultimate choice to silence the cycle forever.",
    features: [
        'Psychological Thriller Concept',
        'Time-Loop Narrative Structure',
        'Cinematic Lighting & Sound Design',
        'High-Impact Visual Storytelling'
    ],
    tech: ['CapCut', 'iPhone 13 & 14 Plus (Mobile Cinematography)', 'Audio Engineering'],
    role: 'Co-Director, Camera Operator & Script Supervisor',
    responsibilities: [
        'Co-Directed the overall vision and pacing of the film',
        'Managed camera operations and framing for key cinematic shots',
        'Supervised script continuity and dialogue delivery',
        'Provided voice acting for the PLDT caller (Extra Voice)'
    ],
    learnings: 'Gained profound insight into the mechanics of suspense, cinematic pacing, and the importance of seamless continuity in visual storytelling.',
    link: 'https://youtu.be/fq0dhi5-kzE?si=kG5Lcys7_q1Kw1fa',
    linkText: 'Watch on YouTube'
  },
  {
    id: 8,
    title: 'JM & Laica Prenup Album',
    category: 'Web',
    tags: ['Web Application', 'Gallery', 'UI/UX'],
    image: "/assets/projects/JmLaica.png",
    gallery: [
      "/assets/projects/JmLaica.png",
      "/assets/projects/art.png",
      "/assets/projects/kayumanggi.png",
      "/assets/projects/silid.png"
    ],
    desc: "A premium, responsive digital gallery application built with a modern web stack.",
    problem: 'To serve as a dedicated digital album and gallery showcasing the prenup photo collection for Laica and JM.',
    solution: 'Curates photos into distinct artistic concepts (such as Picnic, Roadside, Coastal, and Night City) rather than just functioning as a traditional event or story timeline, creating an immersive, premium viewing experience.',
    features: [
        'Elegant, editorial-style UI',
        'Masonry gallery and cinematic sliding photo sections',
        'Interactive backgrounds and romantic, airy spring aesthetic',
        'Cohesive visual experience across all devices'
    ],
    tech: ['React (v19)', 'Vite', 'Tailwind CSS (v4)', 'Framer Motion', 'Lucide React', 'ESLint', 'PostCSS'],
    role: 'Creator & Developer',
    responsibilities: [
        'Developed a premium, responsive digital gallery application',
        'Built an elegant, editorial-style UI with modern web stack components',
        'Curated photos into distinct artistic concepts'
    ],
    learnings: 'Created a cohesive visual experience across all devices and utilized a modern web stack including React v19 and Tailwind CSS v4.',
    link: 'https://jm-laica051526-4-ever.vercel.app/',
    linkText: 'Visit Gallery'
  }
];

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const filters = ['All', 'Web', 'Mobile', 'Systems', 'Multimedia'];
  const filtered = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" style={{ padding: '120px 5%', background: 'var(--bg-subtle)', position: 'relative', zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0.3, y: 35, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px 120px 0px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
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
            02 / SELECTED WORK
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Featured <span style={{ color: 'var(--accent)' }}>Portfolio</span>
          </h2>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0.3, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "0px 0px 120px 0px" }}
          transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '4rem', flexWrap: 'wrap' }}
        >
          {filters.map(f => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                background: filter === f ? 'var(--accent)' : 'var(--card-bg)',
                color: filter === f ? '#FFFFFF' : 'var(--text-muted)',
                border: `1px solid ${filter === f ? 'var(--accent)' : 'var(--border)'}`,
                padding: '10px 22px',
                borderRadius: '100px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.88rem',
                backdropFilter: 'blur(10px)',
                boxShadow: filter === f ? 'var(--shadow)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          <AnimatePresence>
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0.3, y: 35, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px 120px 0px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.65, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                onClick={() => setSelectedProject(project)}
                className="project-card"
                style={{
                  background: 'var(--card-bg)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <div style={{ height: '210px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                  <motion.img 
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.5 }}
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    decoding="async"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x300/1E293B/FFFFFF?text=Project+Preview' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, transparent 70%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '1.25rem',
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }} className="project-hover-overlay">
                    <span style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Explore Case Study <ArrowRight size={16} strokeWidth={2.4} aria-hidden="true" />
                    </span>
                  </div>
                </div>
                <div style={{ padding: '1.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{
                      color: 'var(--accent)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      background: 'var(--accent-light)',
                      borderRadius: '100px',
                      border: '1px solid var(--border)'
                    }}>
                      {project.category}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>{project.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>{project.desc}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectModal 
            project={selectedProject} 
            isOpen={!!selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        </Suspense>
      )}

      <style>{`
        .project-card:hover .project-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
