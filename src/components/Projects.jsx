import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Layers, LayoutGrid, Maximize2, ExternalLink, Sparkles } from 'lucide-react';
import { revealUp, SCROLL_EASE, SCROLL_VIEWPORT } from '../lib/animations';

const ProjectModal = lazy(() => import('./ProjectModal'));

const projectsData = [
  {
    id: 1,
    title: 'MATHTatag – Capstone Project',
    category: 'Mobile',
    tags: ['Academic', 'Capstone'],
    image: "/assets/projects/mathtatag/1.jpg",
    gallery: [
      "/assets/projects/mathtatag/1.jpg",
      "/assets/projects/mathtatag/2.jpg",
      "/assets/projects/mathtatag/3.jpg",
      "/assets/projects/mathtatag/main.jpg"
    ],
    galleryLabels: [
      "App Showcase & Overview",
      "Teacher Dashboard",
      "Learner Assessment Interface",
      "Brand & Logo Design"
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
    docs: 'https://drive.google.com/file/d/1lEh74F7UE75ghFOumWsRKNu7Ekdev4K8/view?usp=drive_link'
  },
  {
    id: 7,
    title: 'MeatMaster – Business Management System',
    category: 'Systems',
    tags: ['Academic Project', 'QMMS', 'Database'],
    image: "/assets/projects/meatmaster/main.webp",
    gallery: [
      "/assets/projects/meatmaster/main.webp",
      "/assets/projects/meatmaster/main.png"
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
    tags: ['Location-Aware', 'Crowdsourcing', 'Full-Stack'],
    image: "/assets/projects/fuelwatch/main.webp",
    gallery: [
      "/assets/projects/fuelwatch/main.webp",
      "/assets/projects/fuelwatch/main.png"
    ],
    desc: "Crowdsourced fuel price monitoring platform for the Philippines built with Python, Supabase, and ReactJS.",
    problem: 'Finding cheaper fuel prices nearby is often difficult for consumers due to the lack of real-time, transparent price data across different gasoline stations.',
    solution: 'Developed a map-based crowdsourcing platform that allows users to find, compare, and contribute fuel price updates. It empowers the community to maintain accurate data and help each other save on fuel costs.',
    features: [
        'Live Map Integration (OpenStreetMap/Leaflet)',
        'Real-time Fuel Price Comparison by City/GPS',
        'Crowdsourced Data Contribution System',
        'Supabase Database Integration for Fuel Stations & Price Logs',
        'Python Backend API Services',
        'Station Search & Filtering Logic',
        'Responsive Design (Figma-to-React Conversion)'
    ],
    tech: ['ReactJS', 'JavaScript', 'Python', 'Supabase', 'OpenStreetMap', 'Leaflet'],
    role: 'UI/UX Designer & Full-Stack Developer',
    responsibilities: [
        'Designed the complete UI/UX flow in Figma',
        'Developed the frontend using ReactJS and JavaScript',
        'Built backend services using Python',
        'Designed and integrated the Supabase database for real-time station logs and fuel prices',
        'Implemented core frontend logic, interactive map pinning, and location-aware filtering'
    ],
    learnings: 'Mastered the integration of Python backend services and Supabase database with ReactJS frontend map components.'
  },
  {
    id: 2,
    title: 'Art Appreciation Website',
    category: 'Web',
    tags: ['Academic Project', 'Solo'],
    image: "/assets/projects/art-appreciation/main.webp",
    gallery: [
      "/assets/projects/art-appreciation/main.webp",
      "/assets/projects/art-appreciation/main.png"
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
    image: "/assets/projects/fortress-security/main.webp",
    gallery: [
      "/assets/projects/fortress-security/main.webp",
      "/assets/projects/fortress-security/main.png"
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
    image: "/assets/projects/kayumanggi/main.webp",
    gallery: [
      "/assets/projects/kayumanggi/main.webp",
      "/assets/projects/kayumanggi/main.png"
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
    image: "/assets/projects/silid/main.webp",
    gallery: [
      "/assets/projects/silid/main.webp",
      "/assets/projects/silid/main.png"
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
    image: "/assets/projects/jm-laica/main.webp",
    gallery: [
      "/assets/projects/jm-laica/main.webp",
      "/assets/projects/jm-laica/main.png"
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
  },
  {
    id: 9,
    title: 'ManyBooks — Reimagining a Digital Reading Experience',
    category: 'UI/UX',
    tags: ['UI/UX Design', 'HCI', 'Canva', 'Website Redesign'],
    image: "/assets/projects/manybooks/2.png",
    gallery: [
      "/assets/projects/manybooks/2.png",
      "/assets/projects/manybooks/3.png",
      "/assets/projects/manybooks/4.png"
    ],
    desc: "An independently conceptualized UI/UX redesign of ManyBooks for Human-Computer Interaction, reimagining an outdated reading platform through modern visual hierarchy and user-centered design.",
    problem: 'ManyBooks — Reimagining a Digital Reading Experience is an independently conceptualized UI/UX redesign project developed during my second year of college as part of our Human-Computer Interaction (HCI) coursework in Academic Year 2023–2024. The project originated from an academic challenge to critically examine an existing website with an outdated visual interface and envision a more contemporary, intuitive, and user-centered alternative. I selected ManyBooks as an opportunity to explore how thoughtful interface design, cohesive visual storytelling, and purposeful information architecture could transform the presentation of a digital reading platform.',
    solution: 'Using Canva as my primary design environment, I conceptualized and crafted the interface from the ground up, developing original layouts, visual compositions, and design components that reflected my personal creative direction. Rather than focusing exclusively on visual aesthetics, my design approach emphasized the relationship between presentation and usability — exploring how organized content, clearer navigation, consistent visual elements, and an approachable interface could contribute to a more seamless and engaging browsing experience.',
    features: [
      'User-Centered Design: Prioritizing intuitive interaction patterns and clear presentation of information',
      'Visual Hierarchy: Establishing purposeful relationships between headings, content, imagery, and interface elements',
      'Interface Consistency: Creating cohesive visual patterns and reusable design components across all screens',
      'Navigation Clarity: Exploring more understandable, accessible pathways through website content and categories',
      'Visual Refinement: Reimagining the interface through a contemporary, elegant, and organized design language',
      'Comprehensive Screen Suite: Reconceptualized homepage storefront, hero carousel, book showcase, and detailed product view'
    ],
    tech: ['Canva', 'UI/UX Design', 'Human-Computer Interaction (HCI)', 'Information Architecture', 'Design Systems'],
    role: 'UI/UX Designer (Academic Project)',
    responsibilities: [
      'Independently conceptualized the creative direction and visual architecture for the ManyBooks platform',
      'Designed all interface concepts, visual arrangements, layouts, and components from scratch using Canva',
      'Restructured information architecture, search interface, and category navigation for better usability',
      'Created high-fidelity design screens for the storefront, curated book showcases, and item detail pages',
      'Applied core Human-Computer Interaction principles to balance visual aesthetics with intuitive user experience'
    ],
    learnings: 'Applied Human-Computer Interaction principles beyond theoretical classroom discussions to an independent design challenge. Strengthened visual hierarchy, layout composition, and user-centered design thinking, reinforcing that exceptional interface design is defined not solely by aesthetics, but by how thoughtfully it enables people to interact with information.'
  },
  {
    id: 10,
    title: 'StudyFlow',
    subtitle: 'AI-Powered Study Planner — Mobile UI/UX Design Concept',
    category: 'UI/UX',
    categoryDisplay: 'UI/UX Design',
    tags: ['Mobile App Design', 'UI/UX Design', 'Study Planner'],
    image: "/assets/projects/Study/1.png",
    gallery: [
      "/assets/projects/Study/1.png",
      "/assets/projects/Study/2.png",
      "/assets/projects/Study/3.png"
    ],
    galleryLabels: [
      "StudyFlow Project Showcase",
      "Core UI Screens",
      "Figma Canvas & Workspace"
    ],
    desc: "A student-focused mobile app design concept that brings together academic planning, progress tracking, and AI-assisted learning in a clean, intuitive interface. Designed in Figma with an emphasis on visual clarity, organized workflows, and a cohesive mobile experience.",
    problem: "StudyFlow is a mobile UI/UX design concept created to explore a more organized and engaging approach to student productivity. The project envisions a centralized study companion where students can view their academic responsibilities, monitor study-related progress, manage upcoming tasks, and access an AI-assisted learning interface.",
    solution: "Designed in Figma, StudyFlow emphasizes simplicity, visual consistency, and clear navigation. Its interface combines soft gradients, rounded components, organized information cards, and thoughtfully arranged screen layouts to create a modern and approachable student experience. The concept includes a personalized home dashboard, a conversational AI study assistant screen, and a study planner that presents academic tasks within a calendar-inspired interface.",
    features: [
      'Personalized Home Dashboard: Displays daily study time summaries, completed task counts, a study streak indicator, and an AI study tip card.',
      'Conversational AI Study Assistant: Visualizes a chat-based learning interface demonstrating concept breakdown, Feynman Technique explanations, and study method guidance.',
      'Structured Study Planner: Combines date navigation, pending assignment summaries, total study time counters, and individual assignment cards.',
      'Card-Based Information Hierarchy: Uses soft pastel surfaces, gentle shadows, and comfortable spacing to organize information without visual clutter.',
      'Mobile-First Visual Consistency: Cohesive design system built around purple, lavender, pink, and light blue pastel accents with rounded corners and labeled navigation.'
    ],
    designObjectives: {
      primary: 'To conceptualize a mobile application interface that helps students organize academic activities, understand their study progress, and explore AI-supported learning through a unified digital experience.',
      goals: [
        'Create a visually organized and approachable mobile dashboard',
        'Present academic information using clear visual hierarchy',
        'Explore how task management and study planning can work together',
        'Conceptualize an AI chat interface for study-related questions',
        'Establish a consistent visual identity across multiple screens',
        'Make the interface easy to understand through recognizable icons, labeled navigation, and structured content'
      ]
    },
    screens: [
      {
        title: 'Home Dashboard',
        heading: 'A Personalized Overview of Student Productivity',
        desc: 'The StudyFlow home dashboard presents academic information in a centralized and visually organized layout. It includes a personalized greeting, summary cards for study-related activity, an AI study tip section, quick-access feature cards, and a monthly planning preview. The dashboard uses clearly separated content areas to help users identify important information without overwhelming the screen.',
        elements: ['Personalized greeting and profile display', 'Study time summary (2h 48m)', 'Completed task summary (5 Tasks)', 'Study streak indicator (12 Days)', 'AI study tip card', 'Quick-action shortcuts (AI Chat, Steps, Study Time)', 'Monthly calendar preview']
      },
      {
        title: 'AI Study Assistant',
        heading: 'Exploring Conversational Learning Support',
        desc: 'The AI Study Assistant screen visualizes a conversational interface where students could ask study-related questions and receive learning guidance. The screen demonstrates a chat-based layout with distinct message bubbles, readable text areas, and a message input section. The example conversation explores study techniques and explanations of learning methods such as the Feynman Technique.',
        elements: ['Chat header and navigation controls', 'User and assistant message bubbles', 'Example study-related conversation', 'Message input interface', 'Voice and interaction icons']
      },
      {
        title: 'Study Planner',
        heading: 'Bringing Structure to Academic Responsibilities',
        desc: 'The Study Planner screen explores how students could organize assignments and study activities within a calendar-oriented interface. It combines date navigation, task summaries, and individual assignment cards in a single view. The design uses contrasting card styles, status indicators, and recognizable icons to distinguish pending tasks, study time, and completed activities.',
        elements: ['Calendar date navigation (March 2026)', 'Selected date indicator', 'Pending assignment summary (5 Tasks)', 'Total study time summary (2h 36min)', 'Assignment cards (Capstone, UI/UX, Frontend)', 'Task status indicators', 'Bottom navigation bar', 'Floating add-task button']
      }
    ],
    designApproach: [
      {
        title: 'Visual Hierarchy',
        desc: 'StudyFlow uses different card sizes, typography weights, and content groupings to distinguish primary information from supporting details. The dashboard prioritizes study summaries and quick actions, while the planner emphasizes upcoming responsibilities and task status.'
      },
      {
        title: 'Color and Visual Identity',
        desc: 'The interface features a soft pastel palette with purple, lavender, pink, and light blue accents. Subtle gradients and rounded surfaces create a modern, approachable visual style while helping distinguish interface components.'
      },
      {
        title: 'Consistency',
        desc: 'Repeated card styles, icon treatments, spacing patterns, and navigation elements establish a cohesive visual language across the three screens.'
      },
      {
        title: 'Mobile-First Presentation',
        desc: 'The layouts are designed for smartphone-sized screens, with vertically organized content and familiar mobile interface patterns.'
      },
      {
        title: 'Student-Centered Concept',
        desc: 'The interface is conceptualized around common academic activities, including reviewing tasks, tracking study time, and seeking study-related guidance.'
      }
    ],
    tech: ['Figma', 'UI/UX Design', 'Mobile App Design', 'Visual Hierarchy', 'Interface Layout Design', 'Design Consistency'],
    role: 'UI/UX Designer & Mobile Concept Creator',
    responsibilities: [
      'UI/UX Design and mobile application concept development in Figma',
      'Visual interface design and screen layout composition across all 3 key screens',
      'Formulated information architecture for the dashboard, conversational AI chat, and calendar planner',
      'Established cohesive pastel color harmonies, rounded card components, and typography hierarchy',
      'Designed polished presentation showcase mockups highlighting core features and mobile flows'
    ],
    learnings: 'Explored how UI design can translate common student needs into a cohesive mobile application concept while balancing functionality, visual appeal, and ease of navigation. Strengthened visual hierarchy, layout composition, and user-centered design thinking.',
    link: 'https://www.figma.com/design/UyJVSKqQzac9DjPMiEGOPq/Untitled?node-id=0-1&t=pxGXFYOVGzobO8Gn-1',
    linkText: 'View on Figma'
  }
];

// Helper to compute loop-aware offsets
const getOffset = (index, activeIndex, total) => {
  if (total <= 1) return 0;
  let diff = index - activeIndex;
  while (diff > total / 2) diff -= total;
  while (diff < -total / 2) diff += total;
  return diff;
};

export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('coverflow'); // 'coverflow' | 'grid'
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const filters = ['All', 'Web', 'Mobile', 'Systems', 'Multimedia', 'UI/UX'];
  const filtered = filter === 'All' ? projectsData : projectsData.filter(p => p.category === filter || (filter === 'UI/UX' && (p.category === 'UI/UX' || p.category === 'UI/UX Design')));
  const total = filtered.length;

  // Reset activeIndex when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [filter]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard navigation for coverflow
  useEffect(() => {
    if (viewMode !== 'coverflow') return;
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handlePrev, handleNext]);

  const safeActiveIndex = total > 0 ? (activeIndex % total + total) % total : 0;
  const currentActiveProject = filtered[safeActiveIndex] || filtered[0];

  return (
    <section id="projects" className="reveal-up" style={{ padding: '100px 5%', background: 'var(--bg-subtle)', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <motion.div
        {...revealUp(0)}
        style={{ maxWidth: '1320px', margin: '0 auto' }}
      >
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: 'var(--accent-light)',
              color: 'var(--accent)',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              marginBottom: '1rem',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
            }}
          >
            02 / SELECTED WORK
          </span>
          <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, color: 'var(--text)', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}>
            Featured <span style={{ color: 'var(--accent)' }}>Portfolio</span>
          </h2>

          {/* View Switcher Segmented Control */}
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--card-bg)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '4px',
                borderRadius: '100px',
                border: '1px solid var(--border)',
                boxShadow: 'var(--shadow)'
              }}
            >
              <button
                onClick={() => setViewMode('coverflow')}
                aria-label="Switch to 3D Coverflow View"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '100px',
                  border: 'none',
                  background: 'transparent',
                  color: viewMode === 'coverflow' ? '#FFFFFF' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'color 0.25s ease'
                }}
              >
                {viewMode === 'coverflow' && (
                  <motion.div
                    layoutId="viewModeHighlight"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--accent)',
                      borderRadius: '100px',
                      zIndex: -1
                    }}
                  />
                )}
                <Layers size={16} />
                <span>3D Coverflow</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                aria-label="Switch to Grid View"
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 18px',
                  borderRadius: '100px',
                  border: 'none',
                  background: 'transparent',
                  color: viewMode === 'grid' ? '#FFFFFF' : 'var(--text-muted)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  zIndex: 2,
                  transition: 'color 0.25s ease'
                }}
              >
                {viewMode === 'grid' && (
                  <motion.div
                    layoutId="viewModeHighlight"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'var(--accent)',
                      borderRadius: '100px',
                      zIndex: -1
                    }}
                  />
                )}
                <LayoutGrid size={16} />
                <span>Current View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <motion.div 
          {...revealUp(0.15)}
          style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
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
                padding: '9px 20px',
                borderRadius: '100px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
                backdropFilter: 'blur(10px)',
                boxShadow: filter === f ? '0 4px 14px rgba(20, 184, 166, 0.3)' : 'none',
                transition: 'all 0.25s ease'
              }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Empty State */}
        {total === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>No projects found for category "{filter}".</p>
          </div>
        )}

        {/* =================================================== */}
        {/* VIEW 1: MODERN 16:9 RECTANGULAR 3D COVERFLOW VIEW */}
        {/* =================================================== */}
        {viewMode === 'coverflow' && total > 0 && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
            {/* 3D Stage / Canvas */}
            <div
              style={{
                perspective: '1200px',
                WebkitPerspective: '1200px',
                perspectiveOrigin: '50% 50%',
                position: 'relative',
                height: 'clamp(210px, 36vh, 320px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible',
                padding: '15px 0',
                touchAction: 'pan-y'
              }}
            >
              {/* Drag/Swipe Wrapper with Touch Support */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const threshold = isMobile ? 25 : 35;
                  const velocityThreshold = 180;
                  if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
                    handleNext();
                  } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
                    handlePrev();
                  }
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  cursor: 'grab',
                  touchAction: 'pan-y'
                }}
                whileTap={{ cursor: 'grabbing' }}
              >
                {filtered.map((project, index) => {
                  const offset = getOffset(index, safeActiveIndex, total);
                  const isVisible = Math.abs(offset) <= 2;
                  const isActive = offset === 0;

                  if (!isVisible && total > 4) return null;

                  // 16:9 Rectangular Transform Metrics
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const isTablet = typeof window !== 'undefined' && window.innerWidth >= 640 && window.innerWidth < 1024;
                  
                  const rotationAngle = isMobile ? 16 : isTablet ? 20 : 24;
                  const translateXPercentage = isMobile ? offset * 50 : isTablet ? offset * 58 : offset * 64;
                  const translateYPixel = isActive ? -6 : Math.abs(offset) * 5;
                  const translateZDistance = -Math.abs(offset) * (isMobile ? 80 : 130);
                  const scaleVal = isActive ? 1.02 : Math.max(0.76, 0.94 - Math.abs(offset) * 0.16);
                  const opacityVal = isActive ? 1 : Math.max(0.4, 0.84 - Math.abs(offset) * 0.3);
                  const zIndexVal = 30 - Math.abs(offset) * 8;

                  return (
                    <motion.div
                      key={project.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) {
                          setSelectedProject(project);
                        } else {
                          setActiveIndex(index);
                        }
                      }}
                      animate={{
                        rotateY: offset * -rotationAngle,
                        x: `${translateXPercentage}%`,
                        y: translateYPixel,
                        z: translateZDistance,
                        scale: scaleVal,
                        opacity: opacityVal
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 280,
                        damping: 30,
                        mass: 0.85
                      }}
                      style={{
                        position: 'absolute',
                        width: 'clamp(270px, 62vw, 480px)',
                        height: 'clamp(160px, 35vw, 280px)',
                        aspectRatio: '16 / 9.5',
                        borderRadius: '20px',
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: isActive ? '2px solid #14B8A6' : '1px solid var(--border)',
                        boxShadow: isActive
                          ? '0 20px 50px -10px rgba(0, 0, 0, 0.4), 0 0 25px rgba(20, 184, 166, 0.3)'
                          : 'var(--shadow)',
                        transformStyle: 'preserve-3d',
                        zIndex: zIndexVal,
                        cursor: 'pointer',
                        overflow: 'hidden',
                        userSelect: 'none',
                        willChange: 'transform, opacity',
                        touchAction: 'pan-y'
                      }}
                    >
                      {/* Rectangular Screenshot Frame */}
                      <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: '18px', background: '#0F172A' }}>
                        <img
                          src={project.image}
                          alt={project.title}
                          loading={isActive || Math.abs(offset) <= 1 ? "eager" : "lazy"}
                          decoding="async"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'filter 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            filter: isActive ? 'brightness(100%) contrast(100%)' : 'brightness(0.82) contrast(0.96)'
                          }}
                          onError={(e) => {
                            const target = e.currentTarget;
                            if (target.dataset.triedFallback === 'true') {
                              target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='350' viewBox='0 0 600 350'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='18' font-weight='bold'>Project Preview</text></svg>";
                              return;
                            }
                            target.dataset.triedFallback = 'true';
                            const currentSrc = target.src;
                            if (currentSrc.endsWith('.webp')) {
                              target.src = currentSrc.replace(/\.webp$/, '.png');
                            } else if (currentSrc.endsWith('.png')) {
                              target.src = currentSrc.replace(/\.png$/, '.jpg');
                            } else {
                              target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='350' viewBox='0 0 600 350'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='18' font-weight='bold'>Project Preview</text></svg>";
                            }
                          }}
                        />

                        {/* Subtle Active Badge Overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
                            padding: '0.75rem 1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            opacity: isActive ? 1 : 0,
                            transition: 'opacity 0.35s ease'
                          }}
                        >
                          <span
                            style={{
                              color: '#FFFFFF',
                              background: 'var(--accent)',
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              textTransform: 'uppercase',
                              letterSpacing: '0.08em',
                              padding: '3px 10px',
                              borderRadius: '100px'
                            }}
                          >
                            {project.category}
                          </span>
                          <span
                            style={{
                              color: 'rgba(255, 255, 255, 0.92)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}
                          >
                            Explore Case Study <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* Navigation Controls (Arrows & Pagination Dots) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.25rem',
                marginTop: '0.75rem',
                marginBottom: '1rem'
              }}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                aria-label="Previous project"
                className="coverflow-nav-btn"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(12px)',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.25s ease'
                }}
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
              </motion.button>

              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                {filtered.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Go to project ${idx + 1}`}
                    style={{
                      width: idx === safeActiveIndex ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '100px',
                      background: idx === safeActiveIndex ? 'var(--accent)' : 'var(--border)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                      padding: 0
                    }}
                  />
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                aria-label="Next project"
                className="coverflow-nav-btn"
                style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  color: 'var(--text)',
                  borderRadius: '50%',
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  backdropFilter: 'blur(12px)',
                  boxShadow: 'var(--shadow)',
                  transition: 'all 0.25s ease'
                }}
              >
                <ChevronRight size={18} strokeWidth={2.5} />
              </motion.button>
            </div>

            {/* Instant Active Project Info Panel (Compact & Modern) */}
            <AnimatePresence mode="wait">
              {currentActiveProject && (
                <motion.div
                  key={currentActiveProject.id}
                  initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -6, filter: 'blur(4px)' }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    borderRadius: '20px',
                    border: '1px solid var(--border)',
                    padding: '1.25rem 1.5rem',
                    maxWidth: '740px',
                    margin: '0 auto',
                    boxShadow: 'var(--shadow)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          color: 'var(--accent)',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '4px 12px',
                          background: 'var(--accent-light)',
                          borderRadius: '100px',
                          border: '1px solid var(--border)'
                        }}
                      >
                        {currentActiveProject.categoryDisplay || currentActiveProject.category}
                      </span>
                      <div>
                        <h3 style={{ fontSize: 'clamp(1.15rem, 2.5vw, 1.45rem)', fontWeight: 800, color: 'var(--text)', margin: 0, letterSpacing: '-0.01em' }}>
                          {currentActiveProject.title}
                        </h3>
                        {currentActiveProject.subtitle && (
                          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                            {currentActiveProject.subtitle}
                          </span>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedProject(currentActiveProject)}
                        style={{
                          padding: '9px 20px',
                          background: 'var(--accent)',
                          color: '#FFFFFF',
                          borderRadius: '100px',
                          border: 'none',
                          fontWeight: 700,
                          fontSize: '0.84rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 4px 14px rgba(20, 184, 166, 0.35)'
                        }}
                      >
                        <Maximize2 size={15} /> Explore Case Study
                      </motion.button>

                      {currentActiveProject.link && (
                        <motion.a
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          href={currentActiveProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: '9px 16px',
                            background: 'var(--bg-subtle)',
                            color: 'var(--text)',
                            borderRadius: '100px',
                            border: '1px solid var(--border)',
                            fontWeight: 600,
                            fontSize: '0.84rem',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}
                        >
                          <ExternalLink size={15} /> {currentActiveProject.linkText || 'Demo'}
                        </motion.a>
                      )}
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.55, margin: 0 }}>
                    {currentActiveProject.desc}
                  </p>

                  {/* Tech Stack Pills */}
                  {currentActiveProject.tech && currentActiveProject.tech.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', paddingTop: '0.4rem', borderTop: '1px solid var(--border)' }}>
                      {currentActiveProject.tech.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: 'var(--bg-subtle)',
                            color: 'var(--text-muted)',
                            fontSize: '0.76rem',
                            fontWeight: 600,
                            padding: '4px 12px',
                            borderRadius: '100px',
                            border: '1px solid var(--border)'
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* =================================================== */}
        {/* VIEW 2: CURRENT GRID VIEW (PRESERVED INTACT) */}
        {/* =================================================== */}
        {viewMode === 'grid' && total > 0 && (
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
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={SCROLL_VIEWPORT}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, delay: (index % 3) * 0.1, ease: SCROLL_EASE }}
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
                  <div style={{ height: '210px', width: '100%', overflow: 'hidden', position: 'relative', background: '#0F172A' }}>
                    <motion.img 
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.5 }}
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.dataset.triedFallback === 'true') {
                          target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='350' viewBox='0 0 600 350'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='18' font-weight='bold'>Project Preview</text></svg>";
                          return;
                        }
                        target.dataset.triedFallback = 'true';
                        const currentSrc = target.src;
                        if (currentSrc.endsWith('.webp')) {
                          target.src = currentSrc.replace(/\.webp$/, '.png');
                        } else if (currentSrc.endsWith('.png')) {
                          target.src = currentSrc.replace(/\.png$/, '.jpg');
                        } else {
                          target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='600' height='350' viewBox='0 0 600 350'><rect width='100%' height='100%' fill='%230F172A'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2314B8A6' font-family='sans-serif' font-size='18' font-weight='bold'>Project Preview</text></svg>";
                        }
                      }}
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
                        {project.categoryDisplay || project.category}
                      </span>
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: project.subtitle ? '0.25rem' : '0.75rem', color: 'var(--text)', letterSpacing: '-0.01em' }}>
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p style={{ fontSize: '0.82rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '0.65rem' }}>
                        {project.subtitle}
                      </p>
                    )}
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>{project.desc}</p>

                    {/* Tech Badges / Tags */}
                    {project.tech && project.tech.length > 0 && (
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '1rem' }}>
                        {project.tech.slice(0, 3).map((t, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: 'var(--bg-subtle)',
                              color: 'var(--text-muted)',
                              fontSize: '0.72rem',
                              fontWeight: 600,
                              padding: '3px 9px',
                              borderRadius: '100px',
                              border: '1px solid var(--border)'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                        {project.tech.length > 3 && (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', alignSelf: 'center' }}>
                            +{project.tech.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Primary & Secondary Actions */}
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: 'var(--accent)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px'
                      }}>
                        View Project <ArrowRight size={14} />
                      </span>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: 'var(--text-muted)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            textDecoration: 'none',
                            padding: '4px 10px',
                            borderRadius: '100px',
                            background: 'var(--bg-subtle)',
                            border: '1px solid var(--border)',
                            transition: 'color 0.2s ease, border-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.color = 'var(--text)';
                            e.currentTarget.style.borderColor = 'var(--accent)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                          }}
                        >
                          <ExternalLink size={13} /> {project.linkText || 'Demo'}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>

      {/* Project Details Modal */}
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
