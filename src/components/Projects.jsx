import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Layers, LayoutGrid, Maximize2, ExternalLink, Sparkles } from 'lucide-react';
import { revealUp, SCROLL_EASE, SCROLL_VIEWPORT } from '../lib/animations';

const ProjectModal = lazy(() => import('./ProjectModal'));

const projectsData = [
  {
    id: 1,
    title: 'MATHtatag – Best Capstone Project',
    subtitle: 'Best Capstone Project & STCIEERD Research Champion • Mobile Math Learning App with Filipino TTS & Performance Monitoring',
    category: 'Mobile',
    categoryDisplay: 'Mobile Application Development',
    tags: ['Best Capstone', 'STCIEERD Research Champion', 'Academic Capstone', 'Mobile App', 'React Native', 'TypeScript', 'EdTech', 'PUP Lopez'],
    image: "/assets/projects/mathtatag/1.jpg",
    gallery: [
      "/assets/projects/mathtatag/1.jpg",
      "/assets/projects/mathtatag/2.jpg",
      "/assets/projects/mathtatag/3.jpg",
      "/assets/projects/mathtatag/main.jpg"
    ],
    galleryLabels: [
      "App Overview & Role Selection",
      "Teacher Dashboard & Analytics",
      "Learner Assessment & Filipino TTS",
      "Brand Identity & Mascot"
    ],
    galleryCaptions: [
      "MATHtatag Mobile Learning Application — Showcase featuring role-based entry (Learner, Teacher, Parent) aligned with the Philippine MATATAG Curriculum for Grade 1.",
      "Teacher Dashboard & Monitoring — Classroom management interface displaying student rosters, assessment scores, performance analytics, and quarterly tracking.",
      "Learner Assessment & Filipino TTS Interface — Interactive math exercise with Filipino voice assistance, touch-friendly questions, and instant automated scoring.",
      "Brand & App Visual Identity — Custom educational character illustration, friendly mascot, and playful UI identity designed specifically for young learners."
    ],
    desc: "Awarded Best Capstone Project & STCIEERD Research Champion. Mobile mathematics learning application with Filipino text-to-speech and performance monitoring for Grade 1 Mathematics under the Philippine MATATAG Curriculum.",
    problem: 'Early mathematics education builds foundational numeracy, yet Grade 1 learners frequently experience challenges with abstract concepts, text-dense written instructions, and independent practice. Simultaneously, teachers and parents require convenient, real-time ways to evaluate assessment results and track learner progress.',
    solution: 'MATHtatag combines interactive Grade 1 mathematics exercises, AI-powered Filipino text-to-speech audio narration (ElevenLabs API), automated scoring, and real-time cloud monitoring (Firebase Realtime Database) into a unified mobile application supporting both classroom learning and parental involvement.',
    features: [
      'Interactive Grade 1 Mathematics Assessments aligned with the MATATAG Curriculum',
      'Filipino Text-to-Speech (ElevenLabs TTS API) providing audio-assisted question narration',
      'Instant automated assessment scoring and real-time performance feedback',
      'Role-based dashboards for Learners, Teachers, Parents, and Administrators',
      'Real-time synchronization of class rosters, exercises, student responses, and analytics',
      'Secure email/password authentication (Firebase Auth) and cloud media storage (Firebase Storage)',
      'Touch gestures, item reordering, and drag-and-drop question types via Gesture Handler & Reanimated'
    ],
    tech: ['TypeScript', 'JavaScript (ES6)', 'React Native', 'Expo SDK 54', 'Expo Router', 'Firebase Realtime DB', 'ElevenLabs TTS API', 'Reanimated', 'Gesture Handler'],
    role: 'Documentation Lead, Quality Assurance (QA), and UI Contributor',
    responsibilities: [
      'Authored and structured comprehensive technical documentation (Chapters 1–5) for the capstone manuscript and research writing',
      'Established QA testing protocols, designed test cases, and conducted debugging across mobile flows on Expo Go and Android Emulator',
      'Co-contributed to UI/UX design, visual layouts in Canva and Figma, and child-friendly component ergonomics',
      'Assisted in data structure organization and Firebase Realtime Database / Authentication configuration',
      'Assisted in testing and integrating ElevenLabs Filipino text-to-speech accessibility features',
      'Facilitated team collaboration between development, UI design, and academic defense evaluations'
    ],
    learnings: 'Strengthened mobile application QA methodologies, TypeScript data handling, cloud database synchronization with Firebase, accessibility-driven child UI design, and rigorous academic research documentation under strict standards.',
    link: 'https://youtu.be/57dUWe2xdW8?si=bLKdqaVKnmJc0cqk',
    linkText: 'View Demo',
    docs: 'https://drive.google.com/file/d/1lEh74F7UE75ghFOumWsRKNu7Ekdev4K8/view?usp=drive_link',
    caseStudy: {
      meta: {
        projectName: 'MATHtatag',
        fullDescription: 'Mobile Mathematics Learning Application with Filipino Text-to-Speech and Performance Monitoring for Grade 1 Mathematics',
        category: 'Mobile Application Development',
        projectType: 'Academic Capstone Project',
        institution: 'Polytechnic University of the Philippines – Lopez, Quezon Campus',
        degree: 'Bachelor of Science in Information Technology (BSIT)',
        curriculum: 'Philippine MATATAG Curriculum (DepEd Grade 1 Mathematics)',
        collaboration: 'Collaborative Academic Capstone Project',
        honors: [
          'Awarded Best Capstone Project — BSIT Program (PUP Lopez Campus)',
          'STCIEERD Research Champion (1st Place) — 2nd Undergraduate R&D Category (Batangas State University)',
          '2nd Placer — 7th Multi-Disciplinary In-House Review & Colloquium (PUP Lopez)',
          'Academic Capstone Defense Passed — Graduated Cum Laude'
        ]
      },
      overview: {
        summary: 'MATHtatag was awarded Best Capstone Project and recognized as the STCIEERD Research Champion. It is a mobile mathematics learning application developed as an academic capstone project to support Grade 1 Mathematics education under the Philippine MATATAG Curriculum. The application combines interactive mathematics assessments, Filipino text-to-speech instructions, automated scoring, and role-based performance monitoring for learners, teachers, and parents.',
        context: 'The project explores how mobile technology can make foundational mathematics practice more engaging and accessible while providing teachers and guardians with convenient ways to review learner progress. Through MATHtatag, our team sought to develop a practical educational technology solution that supports classroom learning and parental involvement.',
        scopeNote: 'MATHtatag is intended to support classroom instruction and home learning, not replace teachers or conventional educational methods.'
      },
      problemStatement: {
        intro: 'Early mathematics education is vital because it establishes essential numeracy skills that support children\'s future academic learning. However, young learners and educators face tangible educational hurdles during foundational mathematics instruction:',
        challenges: [
          {
            title: 'Foundational Comprehension & Abstract Concepts',
            desc: 'Young Grade 1 learners frequently experience difficulty transitioning from concrete physical objects to abstract mathematical symbols, basic addition, subtraction, and number relationships without guided interactive visual aids.'
          },
          {
            title: 'Reading & Language Barriers in Written Instructions',
            desc: 'Beginning readers in Grade 1 are still developing literacy skills. Text-dense assessment instructions can prevent children from demonstrating their true mathematical ability simply because they struggle to read the written prompt.'
          },
          {
            title: 'Engagement & Independent Learning Support',
            desc: 'Traditional static paper worksheets often struggle to sustain young learners\' attention. Furthermore, when practicing independently at home, learners lack immediate corrective feedback to guide their understanding.'
          },
          {
            title: 'Assessment Overhead & Monitoring Friction',
            desc: 'Teachers manage large class sizes where manual paper grading and score tallying consume valuable instructional time. Meanwhile, parents and guardians often lack accessible, timely visibility into their children\'s learning progress.'
          }
        ],
        framingNote: 'These points represent the educational needs and design motivations addressed by the project. The application was engineered to address these challenges through child-centered interactive design and cloud synchronization.'
      },
      objectives: {
        general: 'To develop a mobile mathematics learning and performance-monitoring application that supports Grade 1 learners, teachers, and parents in mathematics education aligned with the MATATAG Curriculum.',
        specific: [
          'Develop an interactive mobile interface suitable for Grade 1 learners with child-friendly visuals, intuitive touch navigation, and minimal cognitive load.',
          'Provide digital mathematics assessments aligned with the competencies and learning standards of the Grade 1 MATATAG Curriculum.',
          'Integrate Filipino text-to-speech (TTS) functionality to assist early-grade learners in understanding instructions through clear spoken narration.',
          'Implement automated assessment scoring to calculate exercise scores immediately and eliminate manual grading overhead.',
          'Provide dedicated role-based user experiences tailored for learners, teachers, parents/guardians, and administrators.',
          'Present learner performance information through intuitive dashboards and monitoring views for timely progress evaluation.',
          'Support convenient, real-time cross-device access to learner progress information using cloud database synchronization.'
        ]
      },
      targetUsers: [
        {
          role: 'Grade 1 Learners',
          badge: 'Primary End-Users',
          purpose: 'Engage with digital mathematics activities, listen to audio-guided instructions, and complete assessments.',
          capabilities: [
            'Access curriculum-aligned Grade 1 mathematics activities and assessments',
            'Listen to spoken Filipino instructions and question narration via audio buttons',
            'Interact via intuitive touch gestures, item reordering, and drag-and-drop mechanics',
            'Receive instant visual feedback and score summaries upon exercise completion'
          ]
        },
        {
          role: 'Teachers',
          badge: 'Educators & Evaluators',
          purpose: 'Manage class groups, monitor assessment submissions, and evaluate class-wide mathematical performance.',
          capabilities: [
            'Review and manage registered student lists and classroom sections',
            'Access real-time assessment scores and automated evaluation records',
            'Analyze learner performance trends to identify topics requiring remedial guidance',
            'Monitor student submission completion rates across assigned exercises'
          ]
        },
        {
          role: 'Parents & Guardians',
          badge: 'Home Learning Partners',
          purpose: 'Follow and support their child\'s mathematics learning journey from home.',
          capabilities: [
            'Access a dedicated parent dashboard showing their child\'s performance overview',
            'Review scores and completion history from assigned mathematics activities',
            'Identify areas where their child excels or needs additional home practice',
            'Stay actively informed on academic progress without waiting for quarterly report cards'
          ]
        },
        {
          role: 'Administrators',
          badge: 'System Governance',
          purpose: 'Manage authorized system access and verify platform security where supported.',
          capabilities: [
            'Validate authorized teacher and administrative credentials',
            'Ensure secure access controls and system configuration stability',
            'Support database integrity and account provisioning'
          ]
        }
      ],
      coreFeatures: [
        {
          title: 'Interactive Grade 1 Mathematics Assessments',
          tag: 'Curriculum-Aligned Numeracy',
          description: 'Digitized exercises structured specifically around foundational Grade 1 mathematics competencies under the Philippine MATATAG Curriculum, incorporating matching, counting, number recognition, and basic operations with colorful visual representations.'
        },
        {
          title: 'Filipino Text-to-Speech (ElevenLabs API)',
          tag: 'Accessibility & Audio Support',
          description: 'Spoken Filipino audio narration generated through the ElevenLabs Text-to-Speech API. By offering audio guidance for every written prompt, the app ensures that Grade 1 learners with emerging reading skills can independently understand exercise instructions.'
        },
        {
          title: 'Instant Automated Assessment Scoring',
          tag: 'Automated Evaluation',
          description: 'Calculates scores immediately upon exercise completion, giving children prompt feedback on their performance while automatically recording structured results in the cloud database to eliminate manual grading for teachers.'
        },
        {
          title: 'Learner Performance Monitoring Dashboards',
          tag: 'Progress Tracking',
          description: 'Visual monitoring interfaces that organize individual and class-level mathematics assessment outcomes, making performance records accessible to teachers for classroom tracking and to parents for home reinforcement.'
        },
        {
          title: 'Role-Based Architecture & Screen Navigation',
          tag: 'Multi-Role UX',
          description: 'Dedicated workflows and file-based screen routing powered by Expo Router, cleanly separating the learner experience from teacher analytics, parent views, and administrative controls.'
        },
        {
          title: 'Real-Time Cloud Synchronization',
          tag: 'Firebase Realtime DB',
          description: 'Synchronizes class rosters, exercise banks, student answers, and parent dashboard analytics instantly across devices via Firebase Realtime Database, ensuring seamless data updates across mobile clients.'
        },
        {
          title: 'Secure Authentication & Cloud Media Storage',
          tag: 'Firebase Services',
          description: 'Employs Firebase Authentication for email/password validation of educators and administrators, paired with Firebase Storage for cloud hosting of exercise graphics, audio assets, and TTS voice files.'
        },
        {
          title: 'Gesture-Driven Child Interactions',
          tag: 'Gesture Handler & Reanimated',
          description: 'Utilizes React Native Gesture Handler and React Native Reanimated to deliver fluid 60fps touch gestures, item reordering, and tactile drag-and-drop exercises tailored to young children\'s motor skills.'
        }
      ],
      myRoles: {
        title: 'Documentation Lead, Quality Assurance (QA), and UI Contributor',
        intro: 'Within our four-member collaborative academic capstone team, I was formally assigned as the Documentation Lead, Quality Assurance (QA) Contributor, and UI Contributor. My responsibilities focused on ensuring research rigor, system quality, user interface clarity, and data integration.',
        contributions: [
          {
            area: 'Technical Documentation & Research Writing',
            desc: 'Served as the lead student author for our comprehensive 5-chapter capstone manuscript. Formulated the Problem Statement, Educational Context, Literature & System Review, Technical Methodology, System Architecture, Results Analysis, and Recommendations according to rigorous PUP academic standards.'
          },
          {
            area: 'Quality Assurance (QA) & Test Case Execution',
            desc: 'Formulated systematic QA test plans and executed extensive test cases across learner and teacher application flows. Identified critical edge-case bugs in input handling, screen transitions, and score calculations; logged reproducible defect reports; and retested builds on Expo Go and Android Emulator.'
          },
          {
            area: 'Mobile UI/UX Design & Child-Centered Layouts',
            desc: 'Co-contributed to user interface design in Figma and Canva. Designed wireframes, selected high-contrast child-friendly color harmonies, established readable typographic hierarchy, and optimized touch targets to accommodate the developing motor skills of Grade 1 learners.'
          },
          {
            area: 'Data Management & Firebase Cloud Assistance',
            desc: 'Assisted in structuring NoSQL data nodes within Firebase Realtime Database (class rosters, student submissions, exercise schema, score logs) and supported the configuration of Firebase Authentication security rules.'
          },
          {
            area: 'Text-to-Speech Accessibility & Audio Testing',
            desc: 'Assisted in testing the integration of ElevenLabs Filipino voice prompts, verifying speech naturalness, pronunciation clarity for math terms, and audio playback synchronization with on-screen quiz questions.'
          },
          {
            area: 'Academic Colloquium & Defense Preparation',
            desc: 'Coordinated defense presentations, prepared technical slide decks, and co-defended the system architecture before academic panelists, contributing to our 1st Place STCIEERD research award and 2nd Place Colloquium honor.'
          }
        ],
        teamRoster: [
          { name: 'Ken P. Cas', role: 'Project Leader & Backend Developer' },
          { name: 'Lloyd Jernell Loteriña', role: 'Documentation Lead, Quality Assurance (QA), and UI Contributor' },
          { name: 'Engelbert Morales', role: 'UI/UX Lead, Quality Assurance, and Documentation' },
          { name: 'Cedick Artiaga', role: 'Developer' }
        ],
        teamworkStatement: 'MATHtatag was a collaborative team capstone endeavor. I did not personally write every line of code or single-handedly build every feature; rather, each member brought specialized strengths. My primary ownership centered on documentation leadership, QA testing, user interface collaboration, and data verification, working closely alongside our project leader, UI lead, and fellow developers.',
        skillsDeveloped: [
          'Academic research methodology and 5-chapter manuscript authoring',
          'Mobile QA test planning, test case formulation, and defect lifecycle tracking',
          'Child-oriented mobile UI/UX design and accessibility ergonomics',
          'TypeScript data modeling and React Native component lifecycle',
          'Firebase Realtime Database synchronization and cloud rule management',
          'Collaborative Git workflows, peer reviews, and academic presentation defense'
        ]
      },
      techStack: {
        languages: [
          {
            name: 'TypeScript',
            type: 'Primary Programming Language',
            desc: 'Used as the main development language for the mobile application. Provided strict static typing to ensure code reliability, eliminate runtime type errors, and maintain structured data handling across complex real-time mobile flows.'
          },
          {
            name: 'JavaScript (ES6)',
            type: 'Programming Language',
            desc: 'Used alongside TypeScript for dynamic UI component logic, state helpers, and integration with third-party React Native ecosystem libraries.'
          }
        ],
        frameworks: [
          {
            name: 'React Native',
            type: 'Core Mobile Framework',
            desc: 'The foundational cross-platform mobile application framework utilized to develop the native Android application with responsive, high-performance UI components.'
          },
          {
            name: 'Expo SDK 54',
            type: 'Mobile Platform & Toolchain',
            desc: 'Provides core native modules, audio playback drivers, file system handlers, and unified compilation toolchains powering the mobile app development lifecycle.'
          },
          {
            name: 'Expo Router',
            type: 'File-Based Navigation',
            desc: 'File-based navigation framework providing clean, predictable routing across login flows, role-based dashboards, and interactive exercise views.'
          },
          {
            name: 'React Native Reanimated',
            type: 'Animation Library',
            desc: 'Powers smooth, hardware-accelerated 60fps interface animations, card transitions, and visual feedback for young learners.'
          },
          {
            name: 'React Native Gesture Handler',
            type: 'Touch & Gesture Library',
            desc: 'Provides declarative native touch handling, powering interactive touch gestures, item reordering, and drag-and-drop question mechanics.'
          }
        ],
        backend: [
          {
            name: 'Firebase Realtime Database',
            type: 'Cloud NoSQL Database',
            desc: 'Synchronizes application data in real time across devices, including class rosters, exercises, student responses, score logs, and parent dashboard analytics. (Used specifically instead of Firestore).'
          },
          {
            name: 'Firebase Authentication',
            type: 'Identity & Access Management',
            desc: 'Provides secure email and password authentication, session management, and credential validation for teachers and administrators.'
          },
          {
            name: 'Firebase Storage',
            type: 'Cloud Object Storage',
            desc: 'Stores application media assets, including exercise illustrations, visual graphics, audio recordings, and cached TTS voice files.'
          }
        ],
        apis: [
          {
            name: 'ElevenLabs Text-to-Speech API',
            type: 'Voice Synthesis Integration',
            desc: 'Used to generate natural, AI-powered Filipino voice instructions and question narration. Intended as an accessibility bridge to assist Grade 1 learners who are still developing reading comprehension.'
          }
        ],
        tools: [
          {
            name: 'Visual Studio Code (VS Code)',
            type: 'Code Editor & IDE',
            desc: 'Main development environment used for writing TypeScript code, debugging, managing extensions, and organizing the project codebase.'
          },
          {
            name: 'Expo Go',
            type: 'Real-Time Mobile Testing',
            desc: 'Employed for rapid on-device testing, hot-reloading, and real-time interface validation on physical Android smartphones during development sprints.'
          },
          {
            name: 'Android Studio / Emulator',
            type: 'Device Emulation & Testing',
            desc: 'Used to test layout responsiveness, touch accuracy, and device compatibility across varied Android screen sizes and OS specifications.'
          },
          {
            name: 'EAS (Expo Application Services)',
            type: 'Cloud Build & Packaging',
            desc: 'Cloud build service utilized to compile and generate standalone Android APK and AAB binaries for device testing and academic presentation.'
          },
          {
            name: 'Git & GitHub',
            type: 'Version Control & Collaboration',
            desc: 'Utilized for source control, feature branching, code review, change history tracking, and collaborative multi-developer synchronization.'
          },
          {
            name: 'Canva & Figma',
            type: 'UI/UX & Asset Design',
            desc: 'Design platforms utilized to craft interface wireframes, screen mockups, brand assets, app icons, and child-friendly illustration graphics.'
          }
        ]
      },
      developmentProcess: [
        {
          step: '01',
          title: 'Problem Identification & Curriculum Alignment',
          desc: 'Investigated early childhood mathematics learning hurdles in Grade 1, reviewed DepEd MATATAG Curriculum competencies, and established project requirements for foundational numeracy support.'
        },
        {
          step: '02',
          title: 'Feature Scoping & Role-Based Architecture',
          desc: 'Defined multi-role user journeys for Learners, Teachers, Parents, and Administrators. Mapped functional requirements, permissions, and cloud database relationships.'
        },
        {
          step: '03',
          title: 'UI/UX Prototyping & Young-Learner Asset Design',
          desc: 'Designed wireframes and screen mockups in Figma and Canva. Established a vibrant, child-friendly color scheme, large touch targets, readable typography, and the MATHtatag mascot character.'
        },
        {
          step: '04',
          title: 'Mobile Development with React Native & TypeScript',
          desc: 'Implemented the application frontend using React Native, TypeScript, Expo SDK 54, and Expo Router, structuring modular UI components and state management routines.'
        },
        {
          step: '05',
          title: 'Backend & Cloud Database Integration',
          desc: 'Configured Firebase Realtime Database schemas for live synchronization of class rosters and submissions, established Firebase Auth role guards, and connected Firebase Storage.'
        },
        {
          step: '06',
          title: 'Filipino TTS Voice & Gesture Integration',
          desc: 'Integrated ElevenLabs API to synthesize spoken Filipino audio prompts. Implemented gesture-driven drag-and-drop and item reordering via Gesture Handler and Reanimated.'
        },
        {
          step: '07',
          title: 'Systematic Quality Assurance & Mobile Debugging',
          desc: 'Executed comprehensive QA test cases on Expo Go and Android Emulator. Logged and resolved defects regarding input validation, audio playback lag, and screen responsiveness.'
        },
        {
          step: '08',
          title: 'EAS Android Packaging & Capstone Defense',
          desc: 'Compiled release Android builds via EAS. Completed the comprehensive 5-chapter academic documentation, presented the system before panels, and participated in research colloquiums.'
        }
      ],
      challenges: [
        {
          challenge: 'Designing Accessible UX for Beginning Readers',
          context: 'Grade 1 children possess developing motor skills and early literacy, making standard textual menus and dense layouts difficult to navigate.',
          solution: 'Co-designed an image-first, audio-supported interface with oversized touchable targets, intuitive iconography, visual progress indicators, and one-tap voice narration.'
        },
        {
          challenge: 'Role-Based Routing & Access Control',
          context: 'The app needed to serve four distinct user personas (Learner, Teacher, Parent, Admin) without code fragmentation or unauthorized data access.',
          solution: 'Utilized Expo Router file-based route groups paired with Firebase Realtime Database role validation rules to enforce clean permission boundaries.'
        },
        {
          challenge: 'Real-Time Cross-Device Data Synchronization',
          context: 'Ensuring that student assessment submissions immediately reflected on teacher analytics and parent dashboards under varying mobile network speeds.',
          solution: 'Configured Firebase Realtime Database native real-time listeners and offline caching capabilities to maintain seamless synchronization.'
        },
        {
          challenge: 'Audio Playback Synchronization with Filipino TTS',
          context: 'Ensuring high-fidelity ElevenLabs Filipino voice synthesis without introducing noticeable audio latency during interactive assessment questions.',
          solution: 'Implemented audio asset pre-caching and state-managed playback triggers through Expo AV modules to ensure instantaneous speech playback upon question entry.'
        },
        {
          challenge: 'Cross-Device Android Screen Scaling',
          context: 'Testing touch drag-and-drop questions across varied Android phone aspect ratios and resolutions.',
          solution: 'Conducted iterative testing on the Android Emulator and physical devices using Expo Go, refactoring layouts with flexible responsive containers and percentage constraints.'
        },
        {
          challenge: 'Capstone Team Coordination & Academic Rigor',
          context: 'Balancing rigorous academic research manuscript writing (Chapters 1–5) with fast-paced software development sprints.',
          solution: 'Maintained strict Git commit practices, standardized defect tracking sheets, and divided documentation chapters systematically to align with technical progress.'
        }
      ],
      educationalImpact: [
        {
          group: 'For Grade 1 Learners',
          benefit: 'Provides an engaging supplementary digital environment for foundational mathematics practice, using Filipino audio narration to help learners overcome early reading obstacles.'
        },
        {
          group: 'For Teachers',
          benefit: 'Automates score tallying and presents organized assessment analytics, enabling teachers to quickly evaluate learner progress and identify areas needing classroom review.'
        },
        {
          group: 'For Parents & Guardians',
          benefit: 'Provides a convenient, accessible mobile window to monitor children\'s mathematics learning activity and support informed practice at home.'
        },
        {
          group: 'For Educational Technology',
          benefit: 'Exemplifies how modern mobile frameworks, real-time cloud services, and localized voice synthesis can be harmonized into an accessible supplementary learning solution aligned with the Philippine MATATAG Curriculum.'
        }
      ],
      impactDisclaimer: 'Important Note: These points highlight the intended educational benefits and design motivations of MATHtatag as an academic capstone. They reflect the project\'s conceptual and architectural goals, rather than claims of formal longitudinal clinical proof.',
      outcomes: [
        {
          title: 'Awarded Best Capstone Project',
          desc: 'Officially recognized and awarded Best Capstone Project by the academic evaluation committee and IT faculty at PUP Lopez Campus.'
        },
        {
          title: 'STCIEERD Research Champion (1st Place)',
          desc: 'Emerged as the Research Champion (1st Place) at the Southern Tagalog Consortium for Industry, Energy, and Emerging Technology Research and Development (STCIEERD), 2nd Undergraduate R&D Category (Batangas State University, Alangilan Campus).'
        },
        {
          title: 'Functional Android Mobile Application',
          desc: 'Delivered a fully operational mobile application built with React Native, TypeScript, Expo SDK 54, and Firebase services.'
        },
        {
          title: '2nd Placer — 7th Multi-Disciplinary In-House Review',
          desc: 'Recognized as 2nd Placer at the 7th Multi-Disciplinary In-House Review and Research Colloquium (PUP Lopez Campus), Architecture, Engineering & Technology Category (2026).'
        },
        {
          title: 'Academic Capstone Defense & BSIT Graduation',
          desc: 'Successfully defended the capstone project before academic review committees at the Polytechnic University of the Philippines – Lopez, Quezon Campus, graduating Cum Laude.'
        },
        {
          title: 'Comprehensive 5-Chapter Technical Manuscript',
          desc: 'Authored complete technical and academic research documentation (Chapters 1 to 5) preserved in the university archives and project repository.'
        }
      ]
    }
  },
  {
    id: 7,
    title: 'MeatMaster – Business Management System',
    category: 'Systems',
    tags: ['Academic Project', 'QMMS', 'Database', 'Desktop App'],
    image: "/assets/projects/meatmaster/main.webp",
    gallery: [
      "/assets/projects/meatmaster/main.webp",
      "/assets/projects/meatmaster/dashboard.png",
      "/assets/projects/meatmaster/orders-records.png",
      "/assets/projects/meatmaster/profit-expenses.png"
    ],
    galleryLabels: [
      "Welcome & Splash Screen",
      "Main Navigation Dashboard",
      "Stock & Order Records",
      "Profit & Expenses Ledger"
    ],
    galleryCaptions: [
      "Welcome & Splash Interface — High-impact landing screen with the Meat Shop brand identity and entry flow.",
      "Main Navigation Dashboard — Central hub with modules for Inventory management, Order transactions, and Profit analytics.",
      "Stock & Order Records — Tabular management screen with date-range picker, supplier information, and paid/unpaid debt tracking.",
      "Profit & Expenses Ledger — Automated financial overview displaying daily profit calculations, total expenses, and monthly sales totals."
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
    screens: [
      {
        title: 'Welcome & Splash Screen',
        heading: 'Brand Identity & Entry Flow',
        desc: 'The opening visual screen introducing the Meat Shop brand, featuring fresh meat imagery, culinary aesthetics, and a streamlined entry point to the system.',
        elements: ['Meat Shop brand logo', 'Promotional tagline', 'Continue navigation button', 'Themed culinary visual background']
      },
      {
        title: 'Main Navigation Dashboard',
        heading: 'Core Module Selection Hub',
        desc: 'The central system menu providing quick access to the three critical business operations: Inventory, Order processing, and Profit tracking.',
        elements: ['Inventory management card', 'Order processing tile', 'Profit analytics shortcut', 'Header status & profile controls']
      },
      {
        title: 'Stock & Order Records',
        heading: 'Inventory & Credit Transaction Management',
        desc: 'A comprehensive operational interface for recording daily livestock purchases, kilo weights, amounts, supplier contact info, and managing paid vs. unpaid customer credits.',
        elements: ['Supplier & stock data grid', 'Calendar date filter', 'Paid and unpaid debt buttons', 'Live slaughter weight tracking', 'Update and delete controls']
      },
      {
        title: 'Profit & Expenses Ledger',
        heading: 'Real-Time Financial Clarity & Profit Calculations',
        desc: 'An automated ledger that calculates daily and monthly profits against operating expenses, giving vendors immediate insight into their financial health.',
        elements: ['Daily profit KPI display', 'Total operating expenses summary', 'Monthly sales metrics', 'Historical daily ledger table']
      }
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
    image: "/assets/projects/art-appreciation/home.png",
    gallery: [
      "/assets/projects/art-appreciation/home.png",
      "/assets/projects/art-appreciation/highlight.png",
      "/assets/projects/art-appreciation/visual-art.png",
      "/assets/projects/art-appreciation/performing-art.png",
      "/assets/projects/art-appreciation/literary-art.png",
      "/assets/projects/art-appreciation/expressionism.png",
      "/assets/projects/art-appreciation/mission-vision.png",
      "/assets/projects/art-appreciation/creator.png"
    ],
    galleryLabels: [
      "Home & Featured Favorites",
      "Artwork Spotlight (Michelangelo)",
      "Visual Arts Collection",
      "Performing Arts Showcase",
      "Literary Arts Archive",
      "Expressionism Movement & Stories",
      "Academic Mission & Vision",
      "Website Creator Profile"
    ],
    galleryCaptions: [
      "Home Landing & Featured Favorites — Curated showcase displaying iconic masterpieces including Girl with a Pearl Earring, Starry Night, and Mona Lisa.",
      "Artwork Spotlight — Detailed view of Michelangelo's 'The Creation of Adam' fresco painting with interactive category links.",
      "Visual Arts Collection — Responsive gallery grid categorizing world-renowned paintings from The Scream to The Great Wave off Kanagawa.",
      "Performing Arts Showcase — Cultural performance section highlighting theatrical traditions like Noh Theatre, Sarsuwela, Kabuki, Ballet, and Opera.",
      "Literary Arts Archive — Curated archive of classical literature ranging from The Epic of Gilgamesh and Hamlet to Rizal's Noli Me Tangere.",
      "Stories & Movement Spotlight — Dedicated banner and narrative exploration section focusing on the Expressionism art movement.",
      "Educational Mission & Vision — Academic statement outlining the goal to foster deeper cultural heritage and artistic appreciation.",
      "Website Creator Profile — Personal developer profile featuring Lloyd Jernell C. Loterina as sole developer and designer."
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
      "/assets/projects/jm-laica/hero-concept.png",
      "/assets/projects/jm-laica/collection-intro.png",
      "/assets/projects/jm-laica/featured-concepts.png",
      "/assets/projects/jm-laica/carousel-slider.png",
      "/assets/projects/jm-laica/gallery-filters.png"
    ],
    galleryLabels: [
      "Landing Hero & Cover",
      "Roadside Minimal Concept",
      "The Collection & Metrics",
      "Featured Concepts Grid",
      "Cinematic Photo Carousel",
      "Filterable Photo Gallery"
    ],
    galleryCaptions: [
      "Landing Hero — Editorial entrance with ambient background music player and romantic spring aesthetic.",
      "Roadside Minimal Concept — Story showcase highlighting the raw, candid roadside aesthetic with modern typography.",
      "The Collection & Story Metrics — Curated collection overview highlighting 4 artistic concepts, 100+ candid frames, and scenic locations.",
      "Featured Concepts — Dedicated concept tiles for Soft Garden Romance, Endless Roadside Paths, Golden Hour Waves, and Golden Night Magic.",
      "Cinematic Carousel Slider — Interactive center-focused photo slider with responsive pagination and navigation controls.",
      "Curated Gallery & Filters — Dynamic concept-filtered masonry gallery allowing seamless browsing across all photo categories."
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
  },
  {
    id: 11,
    title: 'The Recipe Link — Website UI Redesign',
    subtitle: 'Academic UI/UX Redesign Concept • AY 2023–2024 (2nd Year College)',
    category: 'UI/UX',
    categoryDisplay: 'Academic UI/UX Project',
    tags: ['UI/UX Redesign', 'Academic Project', 'Interface Design', 'Case Study'],
    image: "/assets/projects/cookUI/good1.png",
    gallery: [
      "/assets/projects/cookUI/badUI.jpg",
      "/assets/projects/cookUI/good1.png",
      "/assets/projects/cookUI/good2.png",
      "/assets/projects/cookUI/good3.png"
    ],
    galleryLabels: [
      "Original Website (Before)",
      "Redesigned Homepage (After)",
      "Recipe Browsing & Discovery",
      "Individual Recipe Details"
    ],
    galleryCaptions: [
      "Original Website (Before) — The legacy Recipe Link website interface with dense information, limited visual hierarchy, and dated styling.",
      "My Redesigned Concept (Homepage) — Modernized header, refined red-and-neutral visual theme, prominent search bar, and curated categories (Quick and Easy, Dinner, Healthy, 5 Ingredients).",
      "My Redesigned Concept (Recipe Discovery) — Structured browsing layout with featured recipe cards, latest recipes sidebar, high-resolution food photography, and clear ratings.",
      "My Redesigned Concept (Recipe Details) — Dedicated recipe presentation featuring prominent food imagery, organized ingredient checklists, rating overview, and action buttons."
    ],
    desc: "An early academic UI/UX redesign concept from my second year of college evaluating and modernizing The Recipe Link's legacy interface through cleaner visual hierarchy, structured recipe discovery, and user-friendly navigation.",
    problem: "The Recipe Link — Website UI Redesign is an early academic design exercise completed during my second year as a BS Information Technology student in Academic Year 2023–2024. The original website featured an older visual appearance, densely arranged information, minimal visual distinction between sections, and a layout that made browsing and discovering recipes less intuitive. The academic challenge was to critically evaluate an existing interface, identify visible design bottlenecks, and explore how intentional user interface design could create a more modern, appetizing, and approachable cooking platform.",
    solution: "I conceptualized and designed a modernized web interface that replaces the cluttered legacy presentation with a clean, structured, and visually engaging culinary experience. Using a refined red-and-neutral visual theme, the redesign establishes clear visual hierarchy by utilizing large, high-quality food photography as primary focal points. It introduces an organized header with a prominent search bar, categorized recipe browsing (Quick and Easy, Dinner, Healthy, 5 Ingredients), a structured content discovery section with featured cards and a latest-recipes sidebar, and a dedicated individual recipe details page designed for effortless reading in the kitchen.",
    features: [
      'Visual Hierarchy & Modernization: Replaced the original dense, dated presentation with deliberate spacing, structured alignment, and a refined red-and-neutral culinary theme.',
      'Navigation & Recipe Discovery: Redesigned the header with a prominent search bar and categorized navigation (Quick and Easy, Dinner, Healthy, 5 Ingredients) to speed up recipe exploration.',
      'Structured Content Organization: Introduced image-based recipe cards, featured culinary highlights, and a latest-recipes sidebar to minimize cognitive clutter.',
      'Dedicated Recipe Detail Page: Designed a dedicated recipe presentation with large hero imagery, ingredients checklist, ratings, and a prominent Save Recipe action button.',
      'Before-and-After Comparison: Directly contrasts the legacy interface against the modernized concept to visibly demonstrate interface clarity and layout evolution.'
    ],
    designObjectives: {
      primary: 'To evaluate an existing legacy recipe website, identify visible design weaknesses in layout and hierarchy, and propose a more organized, appetizing, and user-friendly interface concept.',
      goals: [
        'Evaluate visible usability and layout weaknesses of the original legacy Recipe Link website',
        'Establish clear visual hierarchy prioritizing vibrant food imagery, readable typography, and ratings',
        'Design prominent search and category navigation to make browsing and discovering recipes intuitive',
        'Structure dedicated single-recipe details for comfortable kitchen readability and ingredient reference',
        'Practice foundational UI/UX principles (spacing, alignment, contrast, visual weight) as a 2nd year student'
      ]
    },
    screens: [
      {
        title: 'Original Website Interface',
        heading: 'The Legacy Baseline (Before Redesign)',
        desc: 'The original Recipe Link website featured an older visual layout with densely arranged information, minimal typographic contrast, and small thumbnails that made recipe browsing and navigation tedious for home cooks.',
        elements: ['Dense text-heavy presentation', 'Limited visual hierarchy', 'Legacy header & navigation', 'Small, crowded imagery', 'Subdued culinary appeal']
      },
      {
        title: 'Redesigned Homepage & Header',
        heading: 'Modern Culinary Hero & Category Filtering',
        desc: 'The redesigned homepage welcomes users with a cohesive red-and-neutral visual palette, prominent search bar, accessible category chips (Quick and Easy, Dinner, Healthy, 5 Ingredients), and a welcoming culinary introduction.',
        elements: ['Prominent recipe search bar', 'Category filter pills', 'Modernized header navigation', 'Refined red-and-neutral theme', 'Welcoming brand identity']
      },
      {
        title: 'Recipe Browsing & Content Section',
        heading: 'Structured Cards & Latest Recipes Sidebar',
        desc: 'Organizes recipe discovery through visual cards with high-impact food photography, clear recipe titles, user ratings, and brief descriptions, paired with a structured latest-recipes sidebar for frictionless exploration.',
        elements: ['Image-first recipe cards', 'Star ratings & review counts', 'Curated featured recipes', 'Latest recipes sidebar', 'Balanced whitespace & grid alignment']
      },
      {
        title: 'Individual Recipe Details Page',
        heading: 'Dedicated Culinary Presentation & Ingredient Guide',
        desc: 'A dedicated recipe screen featuring a large hero food image, recipe title, user ratings, structured ingredients checklist, and a Save Recipe action button optimized for clear reading during food preparation.',
        elements: ['Large hero food photography', 'Clear recipe title & ratings', 'Organized ingredients checklist', 'Save Recipe button', 'Comfortable reading flow']
      }
    ],
    designApproach: [
      {
        title: 'Visual Hierarchy & Modernization',
        desc: 'Replaced uniform text blocks with intentional typographic scale, deliberate spacing, and appetizing food photography that immediately anchors user attention.'
      },
      {
        title: 'Intuitive Navigation & Discovery',
        desc: 'Elevated search into a central header feature and introduced top-level category pills to make finding recipes fast and effortless.'
      },
      {
        title: 'Refined Visual Theme',
        desc: 'Applied a curated culinary red accent paired with warm neutral backgrounds to give the platform a modern, welcoming, and appetizing atmosphere.'
      },
      {
        title: 'Scannable Card Architecture',
        desc: 'Grouped recipe metadata (image, title, rating, description) into distinct card containers with consistent padding and boundaries to eliminate visual clutter.'
      },
      {
        title: 'Academic Learning Exercise',
        desc: 'Executed as a hands-on project during second year college to translate theoretical UI principles into practical, visible interface improvements.'
      }
    ],
    tech: ['UI/UX Design', 'Academic Redesign', 'Visual Hierarchy', 'Wireframing & Layout', 'Information Architecture', 'Before/After Analysis'],
    role: 'UI/UX Designer (Academic Redesign Project)',
    responsibilities: [
      'Evaluated the original Recipe Link website to identify layout, spacing, and visual hierarchy weaknesses',
      'Conceptualized and crafted the redesigned interface screens for the homepage, browsing grid, and recipe details',
      'Established an appetizing red-and-neutral color scheme, modern typography hierarchy, and card components',
      'Structured recipe categories (Quick & Easy, Dinner, Healthy, 5 Ingredients) to streamline discovery',
      'Documented design growth and visual improvements as an early milestone in my UI/UX learning journey'
    ],
    learnings: 'I created this project during my second year of college while still building my UI/UX foundations. It served as a valuable practical exercise in analyzing an existing website, recognizing interface shortcomings, and applying core principles of visual hierarchy, deliberate spacing, layout composition, typography, and scannable content organization. While the design represents a meaningful step forward in my early learning journey, I recognize that there is always room for growth—particularly in design system consistency, accessibility standards, responsive edge cases, and deeper user research methodologies.'
  },
  {
    id: 12,
    title: 'Smart Home Control System',
    subtitle: 'Academic UI/UX Dashboard Concept • Centralized Home Automation',
    category: 'UI/UX',
    categoryDisplay: 'Academic UI/UX Project',
    tags: ['UI/UX Design', 'Dashboard Design', 'Smart Home Concept', 'Academic Project'],
    image: "/assets/projects/homeUI/main.png",
    gallery: [
      "/assets/projects/homeUI/main.png",
      "/assets/projects/homeUI/home1.jpg",
      "/assets/projects/homeUI/home2.jpg"
    ],
    galleryLabels: [
      "Project Overview & Mockup",
      "Centralized Dashboard",
      "Favorites & Quick Access"
    ],
    galleryCaptions: [
      "Project Showcase & Desktop Mockup — Presentation concept visualizing the Smart Home Control System dashboard on an iMac desktop setup.",
      "Centralized Smart Home Dashboard — Unified control center featuring thermostat slider, device toggles, room navigation, power metrics, live camera feeds, and environmental data.",
      "Favorites & Quick Access Screen — Streamlined device dashboard providing rapid control over frequently used appliances, lighting, door locks, and air conditioning."
    ],
    desc: "Smart Home Control System is a UI/UX dashboard design concept created for an academic task, exploring how users can monitor and control household devices, room settings, environmental data, and home activity through a clean, centralized smart home interface.",
    problem: "The Smart Home Control System is an academic UI/UX design concept created to explore a centralized interface for managing smart home devices and household information. In modern connected households, users frequently encounter fragmented interfaces and disjointed apps to control disparate devices—ranging from climate and lighting to security cameras and energy tracking. The objective of this project was to conceptualize a cohesive, modern, and user-friendly dashboard interface that unifies multi-room controls, environmental metrics, and household activity into a single, intuitive control center.",
    solution: "I conceptualized and designed a comprehensive dark-themed dashboard interface that brings home automation and monitoring together into a streamlined digital experience. The interface features a centralized main dashboard with a large circular thermostat controller, quick-action device toggles (cooler, lights, smart TV), room status cards, a live multi-camera preview, energy consumption statistics, media playback controls, and environmental readouts. Additionally, the concept includes a dedicated Favorites screen that prioritizes frequently used appliances and door locks for frictionless everyday interaction.",
    features: [
      'Centralized Smart Home Dashboard: Single-view control center displaying home climate, room statuses, live camera previews, and household activity.',
      'Thermostat & Climate Regulation: Large circular thermostat component with temperature readout (20°C Celsius), time remaining, and smooth adjustment slider.',
      'Room-Based Management Cards: Modular cards organizing device counts across Living Room, Kitchen, Bedroom, Bathroom, and Dining Room with an Add Room action.',
      'Live Camera Feeds: Multi-room camera monitoring window with live recording indicators and camera switching for Living Room, Bedroom, Backyard, and Office.',
      'Energy & Power Analytics: Bar chart visualization tracking monthly power statistics and individual device consumption (Smart Lamp, Speaker).',
      'Environmental & Weather Insights: Real-time weather card (temperature, conditions, 5-day forecast), wind speed indicators, and humidity metrics.',
      'Dedicated Favorites Screen: Streamlined interface prioritizing frequently used devices including Smart TV, Washer, Terrace Doorlock, Lights, Kitchen Pendant, and Air Conditioning.',
      'Modern Dark-Themed Aesthetic: Tech-oriented dark UI with rounded card surfaces, high-contrast typography, and intuitive iconography.'
    ],
    designObjectives: {
      primary: 'To design a centralized, user-friendly smart home dashboard concept that unifies household device controls, room management, live monitoring, and environmental data into an intuitive interface.',
      goals: [
        'Consolidate scattered home automation features into a single, cohesive dashboard layout',
        'Establish a clear visual hierarchy using modular card containers of varying scale and priority',
        'Design an interactive climate control module with circular thermostat visual feedback',
        'Provide a dedicated Favorites view for instant access to high-frequency household appliances',
        'Create a polished dark-themed visual language tailored for modern connected living environments'
      ]
    },
    screens: [
      {
        title: 'Showcase & Mockup Presentation',
        heading: 'Desktop Environment Context',
        desc: 'The desktop mockup visualizes the Smart Home Control System in a realistic contemporary workspace environment, showcasing how the dark dashboard balances with modern home interior design.',
        elements: ['Full desktop environment showcase', 'High-fidelity dashboard presentation', 'Clean branding & typography', 'Visual proportion demonstration']
      },
      {
        title: 'Main Control Dashboard',
        heading: 'Centralized Multi-Room & Environmental Hub',
        desc: 'The primary management interface displaying circular thermostat climate controls, quick appliance toggles, multi-room status cards, power consumption statistics, weather updates, media playback, live camera streams, and household member statuses.',
        elements: ['Circular thermostat controller (20°C)', 'Room cards (Living, Kitchen, Bedroom, Bath, Dining)', 'Device power statistics & bar charts', 'Live camera stream with room tabs', 'Weather & 5-day forecast widget', 'Media playback controller', 'Household user profile list', 'Left navigation sidebar']
      },
      {
        title: 'Favorites & Quick Access Screen',
        heading: 'Priority Device Access & Quick Toggles',
        desc: 'A streamlined view prioritizing frequently used devices and security locks, allowing users to toggle lighting, entertainment, door locks, and air conditioning without navigating through room submenus.',
        elements: ['Top status summary pills (Weather, Lights on, Washer timer, Lock state)', 'Living Room TV card & power toggle', 'Laundry Room Washer card with timer', 'Terrace Doorlock status card', 'Living Room Lights card', 'Kitchen Pendant light card', 'Bedroom 1 Air Con card']
      }
    ],
    designApproach: [
      {
        title: 'Information Architecture',
        desc: 'Organized dense smart home functionality into distinct card containers with dedicated sizes, preventing cognitive overload.'
      },
      {
        title: 'Dark-Themed Visual Style',
        desc: 'Utilized deep gray panels with high-contrast colored accents (yellow, green, blue, pink) for a modern, sleek aesthetic.'
      },
      {
        title: 'Familiar Digital Cues',
        desc: 'Blended intuitive physical elements (circular dial, power toggles, room illustrations) with digital dashboard simplicity.'
      },
      {
        title: 'Fast Access Prioritization',
        desc: 'Divided the concept into an exhaustive main dashboard for complete home visibility and a focused Favorites view for instant daily actions.'
      },
      {
        title: 'Academic Design Exercise',
        desc: 'Developed as a classroom concept exploring interface organization, usability, and visual coherence in home automation software.'
      }
    ],
    tech: ['UI/UX Design', 'Dashboard Design', 'Interface Layout Design', 'Visual Hierarchy', 'Information Organization', 'Smart Home Concept'],
    role: 'UI/UX Designer (Academic Concept Project)',
    responsibilities: [
      'Conceptualized and structured the overall dashboard layout and information architecture',
      'Designed all interface components including the thermostat dial, room cards, and data widgets',
      'Created the streamlined Favorites screen for high-frequency device interaction',
      'Established a cohesive dark-themed visual design system with high-contrast accents and iconography',
      'Produced the presentation desktop mockup showcasing the concept in a realistic setting'
    ],
    learnings: 'Developed as an academic class task to explore smart home interface design. This project enhanced my ability to structure complex, multi-faceted dashboards with diverse data types (sensors, controls, media, video, energy charts) while maintaining clean visual hierarchy, comfortable spacing, and intuitive navigation patterns.'
  },
  {
    id: 13,
    title: 'ePhilMed — Telemedicine Mobile App',
    subtitle: 'Academic Mobile App UI/UX Design Concept • Recognized for Best UI Design (AY 2023–2024)',
    category: 'UI/UX',
    categoryDisplay: 'Academic UI/UX Project',
    tags: ['UI/UX Design', 'Telemedicine App', 'Best UI Design Award', 'Mobile App Design', 'Healthcare UI', 'PUP Lopez'],
    image: "/assets/projects/Ephil Medicine UI/1.png",
    gallery: [
      "/assets/projects/Ephil Medicine UI/1.png",
      "/assets/projects/Ephil Medicine UI/2.png",
      "/assets/projects/Ephil Medicine UI/3.png",
      "/assets/projects/Ephil Medicine UI/4.png",
      "/assets/projects/Ephil Medicine UI/5.png"
    ],
    galleryLabels: [
      "Project Showcase & Presentation",
      "Onboarding & Authentication",
      "Navigation & Core Views",
      "Doctor & Prescription Services",
      "Emergency & Health Insights"
    ],
    galleryCaptions: [
      "ePhilMed Project Presentation (Image 1) — Healthcare platform branding featuring a medical caduceus logo, 'Expert care at your fingertips' tagline, and dual-phone mockup presentation displaying the Homepage and Health Insights dashboard.",
      "Getting Started & Authentication (Image 2) — Welcome screen introducing brand identity, structured multi-field Sign Up form with terms acceptance, and clean Login interface with visual social authentication options.",
      "Main Navigation Screens (Image 3) — Core application suite featuring the dynamic Homepage with service shortcuts, 5-day doctor Schedule view, organized Medical Records archive, and comprehensive User Profile settings.",
      "Healthcare Services & Prescriptions (Image 4) — Searchable Doctor Directory with specialist ratings, Doctor Details profile with April 2024 appointment booking slots, Nearby Pharmacy locator (Watsons Lopez) with prescription upload, and chronological Prescription History.",
      "Emergency Assistance & Health Dashboard (Image 5) — Emergency triage condition selector ('What Happened?'), map-based ambulance dispatch route with single-tap SOS button, and personalized Health Insights dashboard (Heart Rate, Sleep Time, Calories, Steps, Virtual Consultations)."
    ],
    recognition: 'Recognized as Best UI Design by our professor in our academic design activity (PUP Lopez Campus)',
    desc: "An academic mobile UI/UX design concept exploring a centralized telemedicine experience by unifying doctor discovery, appointment scheduling, medical records, prescription management, health information, and emergency assistance interfaces. Recognized as Best UI Design in our 2nd-year academic activity.",
    problem: "ePhilMed is an academic mobile UI/UX design concept created during my second year as a BS Information Technology student in Academic Year 2023–2024 at the Polytechnic University of the Philippines – Lopez, Quezon Campus. The project originated as an exploration of how digital healthcare platforms could address the fragmentation of modern medical services. In conventional scenarios, patients must navigate disparate processes across clinics, diagnostic laboratories, physical pharmacies, and emergency services. ePhilMed was conceptualized to explore a centralized, approachable mobile interface where users can discover doctors, schedule consultations, organize medical history, order prescriptions, locate nearby pharmacies, and access emergency assistance in a single digital ecosystem. (Note: ePhilMed is an academic visual design concept and does not provide live medical services or backend functionality).",
    solution: "Using a healthcare-themed visual identity built on calming blue, navy, cyan, lavender, and clean white tones, I designed a multi-screen mobile application concept with consistent vertical layouts and recognizable bottom navigation. The interface features a modular Home Dashboard with service shortcuts, a 5-day doctor scheduling flow with selectable time slots, categorized medical records (Lab Tests, Diagnostic Results, Medications), a pharmacy locator with prescription upload, an emergency triage and map dispatch concept, and a personalized health dashboard displaying daily biometric summaries (Heart Rate, Sleep Time, Calories, Steps).",
    designObjectives: {
      primary: 'To conceptualize an approachable, centralized mobile healthcare interface that unifies doctor discovery, appointment scheduling, medical records, prescription management, pharmacy location, and emergency assistance into a cohesive mobile experience.',
      goals: [
        'Create a cohesive, medical-themed visual identity utilizing calming blues and rounded card components',
        'Design a centralized homepage offering rapid shortcut access to Doctors, Medicine, Prescriptions, and Emergency services',
        'Structure an intuitive doctor appointment scheduling workflow with date selectors and selectable time slots',
        'Organize diverse medical documents (Lab Tests, Diagnostics, Medications) into an accessible card-based archive',
        'Conceptualize a dedicated emergency assistance flow featuring condition triage, map-based route visualization, and a single-tap SOS button',
        'Visualize a personalized health dashboard tracking daily activity metrics (Heart Rate, Sleep, Calories, Steps) alongside upcoming virtual consultations',
        'Maintain strict multi-screen navigation consistency through a standardized 5-icon bottom navigation bar'
      ]
    },
    screens: [
      {
        title: 'Project Presentation & Brand Identity',
        heading: 'Dual-Mockup Presentation & Healthcare Identity (Image 1)',
        desc: 'Introduces the visual identity of ePhilMed through a clean healthcare aesthetic, featuring a circular medical caduceus logo, the tagline "Expert care at your fingertips: telemedicine app," and two angled smartphone mockups demonstrating the Homepage and Health Insights screens.',
        elements: ['Medical Caduceus logo', 'Navy and sky blue palette', 'Angled smartphone presentation mockups', 'Tagline: "Expert care at your fingertips"', 'Homepage & Health Insights screen previews']
      },
      {
        title: 'Getting Started & Authentication',
        heading: 'Welcome, Registration & Login Workflows (Image 2)',
        desc: 'Presents the introductory user onboarding experience through three mobile screens: a clean Welcome screen with direct call-to-actions, a structured Sign Up form with language selection and terms acceptance, and a Login interface with password visibility toggles and visual social authentication options (Facebook, Google, Apple).',
        elements: ['Welcome landing screen ("GET STARTED")', 'Sign Up form (Full Name, Email/Phone, Password, Language)', 'Terms & Conditions acceptance checkbox', 'Login interface with "Keep Sign In" and "Forgot Password"', 'Social authentication visual shortcuts (Facebook, Google, Apple)', 'Seamless navigation toggles between Login and Registration']
      },
      {
        title: 'Core Navigation Ecosystem',
        heading: 'Homepage, Schedule, Medical Records & Profile (Image 3)',
        desc: 'Demonstrates the primary navigation screens accessible via the standardized 5-icon bottom navigation bar: the dynamic Homepage with service shortcuts and health news, a 5-day appointment Schedule view with doctor cards and communication icons, a card-based Medical Records repository with health summaries, and a comprehensive User Profile settings screen.',
        elements: ['Homepage with medical search, service shortcuts, health news, and appointment previews', 'Schedule screen with date selector (17–21) and doctor appointment cards with call/chat icons', 'Medical Records screen (Lab Tests Reports, Diagnostic Test Results, Medication Records)', 'Health summary widgets (Blood Type O+, Total Walk Distance Today: 2km)', 'User Profile screen with demographics, payment methods, security, language (Wika), and support options', 'Standardized 5-icon bottom navigation bar (Home, Calendar, Records, Notifications, Profile)']
      },
      {
        title: 'Healthcare Services & Prescriptions',
        heading: 'Doctor Directory, Availability Booking & Pharmacy Finder (Image 4)',
        desc: 'Explores healthcare discovery and prescription fulfillment across four dedicated screens: a searchable Doctor Directory with specialist ratings (Cardiologists, Surgeons, Pediatricians, Neurologists), a Doctor Details profile with an April 2024 availability calendar and selectable time slots, a location-based Nearby Pharmacy map locator (Watsons Lopez, Quezon) with prescription file/link upload, and a chronological Prescription History archive.',
        elements: ['Doctor Directory with "Popular" / "Nearby" filters and specialist review ratings', 'Doctor Details profile with education background, hospital affiliations, and "Message" button', 'April 2024 calendar row with selectable consultation time slots (9:00 AM to 5:00 PM)', 'Nearby Pharmacy locator centered on Lopez, Quezon with Watsons store rating and distance', 'Prescription upload interface supporting direct file upload or link sharing', 'Prescription History view organizing past medications chronologically with prescribing doctor details']
      },
      {
        title: 'Emergency Assistance & Health Dashboard',
        heading: 'Emergency Triage, Ambulance Route & Health Insights (Image 5)',
        desc: 'Visualizes high-priority emergency workflows and ongoing wellness tracking across three specialized screens: an Emergency Triage selector ("What Happened?" with Accident, Heart Attack, Breathlessness, Unconsciousness options and custom text input), a Map-based Emergency Dispatch screen showing ambulance route tracking in Lopez, Quezon (3 min ETA) with a prominent pulsing red SOS button, and a personalized Health Dashboard tracking daily biometric insights and virtual consultations.',
        elements: ['Emergency condition triage selector (Accident, Heart Attack, Breathlessness, Unconsciousness)', 'Custom emergency situation description text box', 'Map-based ambulance dispatch route visualization in Lopez, Quezon', 'Real-time estimated arrival indicator (3 min ambulance, 8 min user arrival)', 'Large central touch-activated SOS emergency button', 'Health Insights dashboard (Heart Rate 97 bpm, Sleep Time 7.5 hrs, Calories Burnt 1.2 kCal, Steps 1492)', 'Virtual Consultations card ("24+ Upcoming Consultations") with add action button']
      }
    ],
    features: [
      'Centralized Mobile Healthcare Hub: Centralizes doctor discovery, appointment booking, medical records, prescription fulfillment, and emergency triage into one unified mobile application concept.',
      'Consistent 5-Icon Bottom Navigation: Standardized navigation bar (Home, Schedule, Medical Records, Notifications, Profile) providing clear, predictable screen switching.',
      'Doctor Discovery & Availability Scheduling: Searchable directory with specialist ratings, educational credentials, and an interactive April 2024 calendar with selectable hourly consultation slots.',
      'Structured Medical Records Archive: Card-based repository categorizing Lab Test Reports, Diagnostic Test Results, and Medication Records with supporting blood type and daily walk summaries.',
      'Location-Based Pharmacy & Prescription Upload: Map-enabled interface pinpointing local pharmacies (Watsons Lopez) with options to upload doctor prescriptions via file or web link.',
      'Dedicated Emergency Assistance Flow: Emergency triage condition selector paired with map route visualization and a prominent single-touch SOS emergency call button.',
      'Personalized Health Insights Dashboard: Colorful card widgets visualizing key wellness metrics including Heart Rate (ECG waveform), Sleep Time, Calories Burnt, and Daily Steps.',
      'Comprehensive User Account Management: Structured onboarding, login, profile editing, language switching (English / Wika), and support settings.'
    ],
    designApproach: [
      {
        title: 'Healthcare-Themed Color Palette',
        desc: 'Applied a curated medical palette of deep navy, sky blue, cyan, lavender, and soft neutrals to evoke clinical trust, calm, and cleanliness.'
      },
      {
        title: 'Visual Hierarchy & Scannable Cards',
        desc: 'Organized dense clinical and administrative information into distinct rounded card surfaces with clear headings, icon anchors, and readable metadata.'
      },
      {
        title: 'Navigation Consistency',
        desc: 'Implemented a standardized 5-icon bottom navigation bar, consistent top app bars, and familiar back-button patterns across all mobile screen states.'
      },
      {
        title: 'Ergonomic Touch Targets',
        desc: 'Designed large primary action buttons (GET STARTED, REGISTER, LOG IN, Confirm Booking, SOS Button) optimized for effortless smartphone one-handed thumb reach.'
      },
      {
        title: 'Information Chunking',
        desc: 'Divided complex healthcare processes (onboarding, discovery, records, triage) across dedicated screens to minimize cognitive load during stressful medical situations.'
      },
      {
        title: 'Academic Milestone',
        desc: 'Created during second year college as a hands-on exploration of mobile design systems and healthcare ergonomics, earning Best UI Design recognition from my professor.'
      }
    ],
    tech: ['UI/UX Design', 'Mobile App Design', 'Healthcare UI/UX', 'Information Architecture', 'Visual Hierarchy', 'Device Mockup Presentation'],
    role: 'Student UI/UX Designer (Solo Academic Concept)',
    responsibilities: [
      'Independently conceptualized the overarching ePhilMed product vision, branding, and healthcare feature suite',
      'Designed all 15+ mobile interface screens from scratch, establishing cohesive layouts, visual styling, and typography',
      'Formulated the information architecture spanning user authentication, service discovery, medical records, and emergency triage',
      'Created the medical visual design system featuring a blue-toned palette, rounded card components, and custom icon treatments',
      'Constructed realistic dual-phone and multi-screen presentation mockups to showcase the mobile user experience',
      'Presented and defended the UI/UX design concept in class, earning recognition as Best UI Design from my professor'
    ],
    learnings: 'Created during my second year of college in AY 2023–2024, ePhilMed was a formative milestone in my design journey. It provided hands-on experience in structuring a complex, multi-screen mobile application and balancing dense clinical information with visual clarity and approachable navigation. Earning the Best UI Design recognition from my professor was deeply encouraging and motivated me to pursue deeper studies in user experience, accessibility, and modern design systems.',
    improvements: [
      'Enhanced Text Legibility: Increase font size and line height on secondary metadata (e.g., small disclaimer text and doctor sub-credentials) to improve readability on smaller screens.',
      'Color Contrast Optimization: Elevate contrast ratios between text and background on pastel status cards to strictly satisfy WCAG 2.1 AA accessibility guidelines.',
      'Refined Component Spacing: Standardize vertical and horizontal padding across form input fields and calendar rows to ensure an exact 8pt grid alignment.',
      'Interactive State Definitions: Design explicit hover, active, pressed, and error states for appointment time slots, form inputs, and emergency triggers.',
      'Emergency Flow Usability: Streamline the emergency interface into a zero-latency single-action triage to reduce cognitive friction in life-threatening scenarios.',
      'User Research & Usability Testing: Conduct formal user testing sessions with real patients and medical practitioners to validate task completion rates and navigation pathways.'
    ]
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
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '960px',
              margin: '0 auto',
              overflow: 'hidden',
              padding: '0.5rem 0'
            }}
          >
            {/* 3D Stage / Canvas */}
            <div
              style={{
                perspective: '1200px',
                WebkitPerspective: '1200px',
                perspectiveOrigin: '50% 50%',
                position: 'relative',
                height: 'clamp(210px, 34vw, 320px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'visible',
                padding: '12px 0',
                touchAction: 'pan-y'
              }}
            >
              {/* Drag/Swipe Wrapper with Touch Support */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  const isMobile = windowWidth < 640;
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
                  const isAdjacent = Math.abs(offset) === 1;

                  if (!isVisible && total > 4) return null;

                  // 16:9 Rectangular Transform Metrics
                  // Refined angles and translations so adjacent cards subtly peek out (~10-20%)
                  // and cards farther away (|offset| >= 2) are completely hidden/faded out.
                  const isMobile = windowWidth < 640;
                  const isTablet = windowWidth >= 640 && windowWidth < 1024;
                  
                  // Gentle perspective tilt without distortion
                  const rotationAngle = isMobile ? 4 : isTablet ? 7 : 9;
                  // Precise translation so only 10-20% peeks behind the active hero
                  const translateXPercentage = isMobile ? offset * 14 : isTablet ? offset * 18 : offset * 22;
                  const translateYPixel = isActive ? 0 : 4;
                  const translateZDistance = isActive ? 20 : isAdjacent ? -80 : -180;
                  const scaleVal = isActive ? 1.0 : isAdjacent ? 0.88 : 0.74;
                  const opacityVal = isActive ? 1 : isAdjacent ? (isMobile ? 0.25 : 0.55) : 0;
                  const zIndexVal = isActive ? 30 : isAdjacent ? 15 : 1;
                  const pointerEventsVal = isActive || isAdjacent ? 'auto' : 'none';

                  return (
                    <motion.div
                      key={project.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) {
                          setSelectedProject(project);
                        } else if (isAdjacent) {
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
                        width: 'clamp(280px, 52vw, 480px)',
                        height: 'clamp(170px, 32vw, 290px)',
                        aspectRatio: '16 / 9.5',
                        borderRadius: '20px',
                        background: 'var(--card-bg)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        border: isActive ? '2px solid #14B8A6' : '1px solid var(--border)',
                        boxShadow: isActive
                          ? '0 20px 45px -10px rgba(0, 0, 0, 0.45), 0 0 25px rgba(20, 184, 166, 0.25)'
                          : '0 10px 25px -10px rgba(0, 0, 0, 0.35)',
                        transformStyle: 'preserve-3d',
                        zIndex: zIndexVal,
                        cursor: isActive ? 'pointer' : isAdjacent ? 'pointer' : 'default',
                        pointerEvents: pointerEventsVal,
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
                          loading={isActive || isAdjacent ? "eager" : "lazy"}
                          decoding="async"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                            transition: 'filter 0.4s ease, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                            filter: isActive ? 'brightness(100%) contrast(100%)' : 'brightness(0.68) contrast(0.95)'
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

                        {/* Inactive Card Depth Dimmer Overlay */}
                        {!isActive && (
                          <div
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(15, 23, 42, 0.35)',
                              borderRadius: '18px',
                              pointerEvents: 'none',
                              transition: 'opacity 0.35s ease'
                            }}
                          />
                        )}

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
                            pointerEvents: isActive ? 'auto' : 'none',
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
