import type { Skill, Project, Experience, Certification} from '@/types'

export const skills: Skill[] = [
  {name:"Javascipt",             pct:90},
  { name: 'React.js',            pct: 92 },
  { name: 'Next.js',             pct: 88 },
  { name: 'Node.js',             pct: 85 },
  { name: 'TypeScript',          pct: 82 },
  { name: 'MongoDB',             pct: 80 },
  { name: 'Express.js',          pct: 84 },
  { name: 'Redux / Zustand',     pct: 78 },
  { name: 'AWS (EC2, S3, Lambda)', pct: 70 },
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
  github: 'https://github.com/rajeshsarkar',
  gradient: ''
},
  {
    id: "pathology",
    emoji: "🧪",
    image: "/images/projects/Pathogy.png",
    featured: true,
    tags: ["Next.js", "Node.js", "MongoDB", "Express"],
    title: "Pathology Management System",
    desc: "A comprehensive pathology management system for efficient lab operations, patient management, and test result tracking.",
    demo: "",
    gradient: '',
    github: 'https://github.com/rajeshsarkar'
  },
  {
   id:"School-Management",
   emoji:"🏫",
   image:"/images/projects/EducationsMag.png",
   featured: false,
   tags:["Next.js","Node.js","MongoDB","Express"],
   title:"School Management System",
   desc:"A comprehensive school management system for efficient administration, student tracking, and communication.",
   demo:"https://school-management-system-eta.vercel.app/",
   gradient:'',
   github:'https://github.com/rajeshsarkar' 
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
  github: 'https://github.com/rajeshsarkar',
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
  github: 'https://github.com/rajeshsarkar',
},
{
  id: 'analyticspro',
  emoji: '📊',
  image: '/images/projects/hydrohaven.png',
  tags: ['Next.js', 'TypeScript', 'Chart.js', 'MySQL'],
  title: 'Hydrohaven — Dashboard',
  desc: 'We provide Bitlote solutions designed to deliver seamless performance, reliability, and a smooth user experience.',
  demo: 'https://github.com/rajeshsarkar',
  github: 'https://github.com/rajeshsarkar',
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
  github: 'https://github.com/rajeshsarkar',
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
  github: 'https://github.com/rajeshsarkar',
  gradient: ''
},
]

export const experiences: Experience[] = [
  {
    id: 'e1', company: 'Appsdelite Technology', role: 'Full Stack Developer', period: '2025 — Present',
    points: [
      'Architected microservice-based Node.js APIs serving 10 k+ daily requests',
      'Built responsive React dashboards reducing user task completion time by 40 %',
      'Implemented Redis caching & MongoDB indexing, improving API latency by 60 %',
      'Led REST → GraphQL migration, improving client-side data-fetching efficiency',
    ],
  },
  {
    id: 'e2', company: 'CyberClipper Solutions LLP Dehradun', role: 'Junior Full  Stack Developer', period: '2025 — 2023',
    points: [
      'Developed 8+ client-facing web apps using React.js and Next.js',
      'Designed MongoDB schemas and built RESTful APIs with Express.js',
      'Improved Core Web Vitals scores to 90+ across all client projects',
      'Collaborated with designers to ship pixel-perfect responsive UIs',
    ],
  },
  {
    id: 'e3', company: 'SofTech Pilibhit', role: 'Frontend Developer Intern', period: '2021 — 2022',
    points: [
      'Delivered 5+ end-to-end web applications for small businesses',
      'Provided SEO optimisation services improving organic traffic by 35 %',
      'Built reusable component libraries, reducing dev time across projects',
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



