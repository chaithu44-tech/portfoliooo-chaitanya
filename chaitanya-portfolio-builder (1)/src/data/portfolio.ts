export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  shortSubtitle: string;
  isPlaceholder: boolean;
  thumbnail?: string;
  thumbnailAlt?: string;
  teamType?: string;
  description: string;
  features?: string[];
  technologies?: string[];
  placeholderNote?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  items: {
    name: string;
    highlight?: boolean;
  }[];
}

export interface AcademicMetric {
  label: string;
  value: string;
  institution?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export const PORTFOLIO_DATA = {
  brand: {
    shortName: 'CHAITANYA',
    fullName: 'CHELAMSETTY CHAITANYA',
    firstName: 'CHELAMSETTY',
    lastName: 'CHAITANYA',
    roleLine: 'AI & ML STUDENT | SOFTWARE DEVELOPER',
    location: 'Bengaluru, Karnataka, India',
    portraitSrc: '/assets/chaitanya-portrait.png',
    portraitAlt: 'Portrait of Chelamsetty Chaitanya in a black suit and white shirt',
    resumeUrl: '/assets/Chelamsetty_Chaitanya_Resume.pdf',
    resumeFileName: 'Chelamsetty_Chaitanya_Resume.pdf',
  },
  hero: {
    displayTitle: 'PORTFOLIO',
    greeting: "HELLO, I'M",
    intro:
      "I'm an Artificial Intelligence and Machine Learning student passionate about building intelligent software solutions, exploring emerging technologies, and creating meaningful digital experiences.",
    verticalLeft: ['ARTIFICIAL INTELLIGENCE', 'SOFTWARE DEVELOPMENT'],
    verticalRight: ['FULL-STACK DEVELOPMENT', 'PYTHON & FASTAPI'],
    stampText: 'B.TECH AIML · JAIN UNIVERSITY · BENGALURU · ',
    stampCenter: '3RD SEM\nB.TECH AIML',
  },
  about: {
    headingTop: 'A LITTLE',
    headingAccent: 'ABOUT ME.',
    paragraphs: [
      "I'm a B.Tech Artificial Intelligence and Machine Learning student at Jain Deemed-to-be University, Bengaluru. I enjoy exploring programming, developing software applications, and understanding how artificial intelligence can solve real-world problems.",
      "I'm continuously improving my technical skills through hands-on projects, collaborative development, and experimentation with emerging technologies.",
    ],
    facts: [
      { label: 'Education', value: 'B.Tech AIML' },
      { label: 'University', value: 'Jain Deemed-to-be University' },
      { label: 'Current Semester', value: '2nd Year · 3rd Semester' },
      { label: 'Location', value: 'Bengaluru, India' },
    ],
  },
  projectsSection: {
    headingTop: 'SELECTED',
    headingAccent: 'PROJECTS',
    summary:
      'Practical full-stack software engineering and intelligent systems built through academic and collaborative development.',
  },
  projects: [
    {
      id: 'ai-career-platform',
      number: '01',
      title: 'AI-Powered Career Platform',
      category: 'Full-Stack Development / Artificial Intelligence',
      shortSubtitle: 'Full-Stack & AI Architecture',
      isPlaceholder: false,
      teamType: 'Team Project',
      thumbnail: '/src/assets/images/project_career_platform_1794991328935.jpg',
      thumbnailAlt: 'Editorial interface showcase for the AI-Powered Career Platform',
      description:
        'A full-stack AI-powered career platform featuring dedicated student, recruiter, and administrator portals.',
      features: [
        'PDF/DOCX resume parsing using PyMuPDF and structured document extraction',
        'AI-based resume analysis via Google Gemini API with a local NLP fallback',
        'Skills, projects, and certifications extraction with resume improvement suggestions',
        'Weighted career compatibility scoring system and skill-gap identification',
        'Personalized learning roadmaps with progress tracking',
        'Job and internship application management across student and recruiter workflows',
        'Secure JWT authentication, password hashing, and role-based access control',
        'Backend REST APIs built with Python, FastAPI, SQLite, and SQLAlchemy, backed by 15 automated tests and Docker support',
      ],
      technologies: [
        'Python',
        'FastAPI',
        'JavaScript',
        'HTML',
        'CSS',
        'Tailwind CSS',
        'SQLite',
        'SQLAlchemy',
        'Google Gemini API',
        'PyMuPDF',
        'Docker',
      ],
    },
    {
      id: 'slot-02',
      number: '02',
      title: 'Upcoming Project Slot',
      category: 'Machine Learning & NLP',
      shortSubtitle: 'Reserved Slot · Editable',
      isPlaceholder: true,
      description:
        'Dedicated space for upcoming Artificial Intelligence and Machine Learning experiments and model evaluations.',
      placeholderNote: 'Editable placeholder in src/data/portfolio.ts — ready for future coursework or hackathon builds.',
    },
    {
      id: 'slot-03',
      number: '03',
      title: 'Upcoming Project Slot',
      category: 'Python & Backend Systems',
      shortSubtitle: 'Reserved Slot · Editable',
      isPlaceholder: true,
      description:
        'Reserved for future Python microservices, API architecture case studies, and database engineering projects.',
      placeholderNote: 'Editable placeholder in src/data/portfolio.ts — populate with repository details once completed.',
    },
    {
      id: 'slot-04',
      number: '04',
      title: 'Upcoming Project Slot',
      category: 'Full-Stack Web Engineering',
      shortSubtitle: 'Reserved Slot · Editable',
      isPlaceholder: true,
      description:
        'Reserved for upcoming interactive web applications combining modern frontend craft with typed backend APIs.',
      placeholderNote: 'Editable placeholder in src/data/portfolio.ts — designed for future portfolio expansion.',
    },
  ] as ProjectItem[],
  skillsSection: {
    headingTop: 'TECHNICAL',
    headingAccent: 'SKILLS',
    quote:
      'Grounded in Python and FastAPI backend engineering, full-stack web foundations, and applied Artificial Intelligence.',
    categories: [
      {
        title: 'Programming',
        description: 'Core languages for algorithmic problem-solving and application engineering.',
        items: [
          { name: 'Python', highlight: true },
          { name: 'Java' },
          { name: 'C' },
        ],
      },
      {
        title: 'Web Development',
        description: 'Semantic markup, responsive styling, and interactive client-side logic.',
        items: [
          { name: 'HTML' },
          { name: 'CSS' },
          { name: 'JavaScript' },
          { name: 'Tailwind CSS' },
        ],
      },
      {
        title: 'Backend & Database',
        description: 'Typed REST APIs, relational data modeling, and ORM persistence.',
        items: [
          { name: 'FastAPI', highlight: true },
          { name: 'SQLite' },
          { name: 'SQLAlchemy' },
        ],
      },
      {
        title: 'AI & Tools',
        description: 'Document extraction, generative AI integration, and containerization.',
        items: [
          { name: 'Google Gemini API' },
          { name: 'PyMuPDF' },
          { name: 'Docker' },
        ],
      },
    ] as SkillCategory[],
  },
  education: {
    institution: 'Jain Deemed-to-be University, Bengaluru',
    degree: 'B.Tech — Artificial Intelligence and Machine Learning',
    status: 'Currently pursuing 2nd Year, 3rd Semester',
    metrics: [
      { label: '10th Standard', value: '83%' },
      { label: '12th Standard', value: '92.5%' },
      { label: 'Semester 1 SGPA', value: '8.625' },
      { label: 'Semester 2 SGPA', value: '9.00' },
    ] as AcademicMetric[],
  },
  achievements: [
    {
      id: 'sih',
      title: 'Smart India Hackathon — Qualified Participant',
      subtitle: 'National Selection Evaluation',
      description:
        'Collaborated within a team to conceptualize, architect, and pitch a technical software solution, successfully qualifying through the selection evaluation stage.',
    },
    {
      id: 'academic',
      title: 'Academic Excellence',
      subtitle: 'B.Tech Artificial Intelligence & Machine Learning',
      description:
        'Maintained strong academic performance with an 8.625 SGPA in Semester 1 and a 9.00 SGPA in Semester 2.',
    },
  ] as AchievementItem[],
  strengths: [
    { name: 'Problem-solving', detail: 'Structured analytical thinking across code and algorithms' },
    { name: 'Quick learning', detail: 'Rapidly adopting new frameworks, tools, and patterns' },
    { name: 'Teamwork and collaboration', detail: 'Effective communication in team software builds' },
    { name: 'Adaptability', detail: 'Steady execution across evolving technical requirements' },
    { name: 'Interest in emerging technologies', detail: 'Continuous curiosity in AI, ML, and web systems' },
  ],
  contact: {
    headingTop: "LET'S BUILD",
    headingAccent: 'SOMETHING INNOVATIVE.',
    description:
      "Have an interesting idea, project, or opportunity? Let's connect and create something meaningful together.",
    email: 'chaithuniva44@gmail.com',
    phone: '6302183467',
    location: 'Bengaluru, Karnataka, India',
    // Replace null with your actual profile URLs when ready
    linkedinUrl: null as string | null,
    githubUrl: null as string | null,
  },
};
