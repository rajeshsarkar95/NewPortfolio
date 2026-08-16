import type { Skill, Project, Experience, Certification} from '@/types'

export const skills: Skill[] = [
  {name:"Javascipt",             pct:90},
  { name: 'React.js',            pct: 92},
  { name: 'Next.js',             pct: 88},
  { name: 'Node.js',             pct: 85},
  { name: 'TypeScript',          pct: 82},
  { name: 'MongoDB',pct: 80},
  { name: 'Express.js',pct: 84},
  { name: 'Redux / Zustand',pct: 78},
  { name: 'AWS (EC2, S3, Lambda)',pct:70},
  { name:"Cloude Ai",pct:60},
  {name:"ChatGPT (GPT-5.5)", pct:50}
]
export const chips: string[] = [
  'MySQL','PostgreSQL','Redis','Docker','Git / GitHub','REST APIs',
  'GraphQL','SEO Optimization','Performance Tuning','TailwindCSS',
  'Jest / Testing','CI/CD Pipelines','Linux / Bash','Figma',
]
export const projects: Project[] = [
  {
  id: 'shopverse',
  emoji: '🛒',
  image: '/images/projects/uphaarbox.png',
  featured: false,
  tags: ['Next.js', 'MongoDB', 'Redux Toolkit', 'Stripe'],
  title: 'UphaarBox — Pilibhit Local E-Commerce Platform',
  desc: 'Built a local e-commerce platform for Pilibhit with product browsing, secure payments, order management, and an admin dashboard.',
  demo: 'https://github.com/rajeshsarkar',
  github: 'https://github.com/rajeshsarkar95',
  gradient: ''
},
  {
    id: "pathology",
    emoji: "🧪",
    image: "/images/projects/Pathogy.png",
    featured:true,
    tags: ["Next.js","Node.js","MongoDB","Express"],
    title: "Pathology Management System",
    desc: "A comprehensive pathology management system for efficient lab operations, patient management, and test result tracking.",
    demo: "",
    gradient: '',
    github: 'https://github.com/rajeshsarkar95'
  },
  {
   id:"School-Management",
   emoji:"🏫",
   image:"/images/projects/EducationsMag.png",
   featured:false,
   tags:["Next.js","Node.js","MongoDB","Express"],
   title:"School Management System",
   desc:"A comprehensive school management system for efficient administration, student tracking, and communication.",
   demo:"https://school-management-system-eta.vercel.app/",
   gradient:'',
   github:'https://github.com/rajeshsarkar95' 
  },
{
  id: 'taskflow',
  emoji: '📝',
  image: '/images/projects/Skillup.png',
  featured: false,
  tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
  title: 'skillup —  edtech Project',
  desc: 'Real-time project management tool with drag-and-drop boards, team collaboration, live notifications, and Kanban views.',
  demo: 'https://github.com/rajeshsarkar',
  github: 'https://github.com/rajeshsarkar95',
  gradient: ''
},
{
  id: 'chatsphere',
  emoji: '💬',
  image: '/images/projects/colorplay.png',
  gradient: 'linear-gradient(135deg,#a78bfa,#fb923c)',
  tags: ['React','Express','Socket.io','JWT'],
  title: 'ColorPlay — Images Generations',
  desc: 'ColorPlay is a creative image generation platform that allows users to generate unique visuals using AI-',
  demo: 'https://github.com/rajeshsarkar',
  github: 'https://github.com/rajeshsarkar95',
},
{
  id: 'analyticspro',
  emoji: '📊',
  image: '/images/projects/hydrohaven.png',
  tags: ['Next.js', 'TypeScript', 'Chart.js', 'MySQL'],
  title: 'Hydrohaven — Dashboard',
  desc: 'We provide Bitlote solutions designed to deliver seamless performance, reliability, and a smooth user experience.',
  demo: 'https://github.com/rajeshsarkar',
  github: 'https://github.com/rajeshsarkar95',
  gradient: ''
},
{
  id: 'medbook',
  emoji: '🏥',
  image: '/images/projects/portfolio.png',
  tags: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
  title: 'Portfolio — Healthcare App',
  desc: 'Doctor-patient appointment booking with e-prescriptions, medical records management, and video consultation integration.',
  demo: 'https://github.com/rajeshsarkar',
  github: 'https://github.com/rajeshsarkar95',
  gradient: ''
},
{
  id: 'devblog',
  emoji: '🚀',
  image: '/images/projects/portfolio2.png',
  tags: ['Next.js', 'TailwindCSS', 'MDX', 'SEO'],
  title: 'DevBlog — Tech Blog Platform',
  desc: 'SEO-optimised developer blog with MDX support, syntax highlighting, newsletter integration, and 95+ Lighthouse score.',
  demo: 'https://github.com/rajeshsarkar',
  github: 'https://github.com/rajeshsarkar95',
  gradient: ''
},
]
export const experiences: Experience[] = [
  {
  id: 'e1',
  company: 'Mentoxo Technology',
  role: 'Full Stack Developer',
  period: '2025 — Present',
  points: [
    'Architected microservice-based Node.js APIs serving 10K+ daily requests',
    'Built responsive React dashboards, reducing user task completion time by 40%',
    'Implemented secure authentication and role-based authorization with protected routes and access controls',
    'Implemented real-time communication and live updates using Socket.IO for chat, notifications, and collaborative features',
    'Implemented Redis caching and MongoDB indexing, improving API latency by 60%',
    'Led REST → GraphQL migration, improving client-side data-fetching efficiency',
    'Managed user access, permissions, session handling, and authentication workflows across the platform',
  ],
},
  {
  id: 'e2',
  company: 'CyberClipper Solutions LLP Dehradun',
  role: 'Junior Full Stack Developer',
  period: '2025 — 2023',
  points: [
    'Developed 8+ client-facing web applications using React.js and Next.js',
    'Designed MongoDB schemas and built scalable RESTful APIs with Express.js',
    'Integrated OpenAI ChatGPT APIs and DeepAI APIs to build AI-powered features and automation workflows',
    'Implemented AI-driven text generation, content processing, and intelligent user interactions',
    'Improved Core Web Vitals scores to 90+ across client projects',
    'Collaborated with designers to deliver pixel-perfect, responsive user interfaces',
  ],
},
  {
  id: 'e3',
  company: 'SofTech Pilibhit',
  role: 'Frontend Developer Intern',
  period: '2021 — 2022',
  points: [
    'Delivered 5+ end-to-end web applications and small e-commerce solutions for local businesses',
    'Developed business websites and customized web solutions based on client requirements',
    'Implemented secure user authentication and role-based authorization for web applications',
    'Built reusable React components and UI libraries, reducing development time across projects',
    'Provided SEO optimization services, improving organic traffic by 35%',
    'Integrated product listings, shopping cart, user accounts, and basic order management for e-commerce applications',
  ],
},
]
export const certifications: Certification[] = [
  { id:'c1', icon:'🎯', color:'rgba(108,99,255,0.15)', iconColor:'#6c63ff',  title:'Meta Front-End Developer',        issuer:'Meta / Coursera',       date:'2023' },
  { id:'c2', icon:'☁️',  color:'rgba(56,189,248,0.15)', iconColor:'#38bdf8',  title:'AWS Certified Cloud Practitioner', issuer:'Amazon Web Services',    date:'2023' },
  { id:'c3', icon:'🟩', color:'rgba(52,211,153,0.15)', iconColor:'#34d399',  title:'MongoDB Certified Developer',      issuer:'MongoDB University',      date:'2022' },
  { id:'c4', icon:'⚡', color:'rgba(167,139,250,0.15)',iconColor:'#a78bfa',  title:'JavaScript Algorithms & DS',       issuer:'freeCodeCamp',            date:'2022' },
  { id:'c5', icon:'🔷', color:'rgba(56,189,248,0.15)', iconColor:'#38bdf8',  title:'React — The Complete Guide',       issuer:'Udemy — Maximilian S.',   date:'2022' },
  { id:'c6', icon:'🏆', color:'rgba(251,146,60,0.15)', iconColor:'#fb923c',  title:'Node.js Developer Certificate',    issuer:'HackerRank',              date:'2021' },
]



