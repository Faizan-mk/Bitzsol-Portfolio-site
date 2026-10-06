export const profile = {
  name: "Muhammad Faizan",
  firstName: "Muhammad",
  lastName: "Faizan",
  initials: "MF",
  role: "Full Stack Developer",
  tagline:
    "I build secure, scalable and production-ready web and mobile apps with the MERN stack, Next.js, React Native, Firebase and Supabase. Let's turn your idea into a product people love to use.",
  email: "faizannaizi007@gmail.com",
  phone: "+92-303-2798007",
  phoneHref: "tel:+923032798007",
  location: "Rawalpindi, Pakistan",
  linkedin: "https://linkedin.com/in/muhammad-faizanmk",
  github: "https://github.com/Faizan-mk",
  resume: "/resume/Muhammad_Faizan_FullStack_Resume.pdf",
  about:
    "Full Stack Developer with hands-on experience across the MERN stack (MongoDB, Express.js, React.js, Node.js), React Native mobile apps, RESTful API development, and both relational (MySQL/Sequelize ORM, PostgreSQL/Supabase) and NoSQL (MongoDB) databases. Computer Science graduate (CGPA 3.44/4.0) comfortable working on backend, frontend, or full-stack roles — from designing secure, JWT-authenticated APIs to building responsive, production-deployed React interfaces. Strong problem-solving skills, quick learner, and eager to contribute to real-world engineering teams.",
};

export const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#process", label: "Process" },
  { href: "#projects", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export const stats = [
  { value: "3.44", label: "CGPA" },
  { value: "12+", label: "Projects" },
  { value: "2", label: "Internships" },
  { value: "5", label: "Certifications" },
];

export const education = {
  degree: "BS Computer Science",
  school: "University of Mianwali",
  period: "2022 – 2026",
  cgpa: "3.44 / 4.0",
};

export const experience = [
  {
    role: "Junior Full Stack Developer",
    company: "BitzSole",
    period: "Aug 2026 – Present",
    points: [
      "Developing and maintaining full-stack features using the MERN stack (MongoDB, Express.js, React.js, Node.js).",
      "Building and integrating RESTful APIs with JWT-based authentication and role-based access control.",
      "Collaborating with the engineering team on code reviews, debugging, and production deployments.",
    ],
  },
  {
    role: "Backend Developer Intern",
    company: "DevelopersHub Corporation",
    period: "Mar – Apr 2026",
    points: [
      "Built RESTful APIs with Node.js and Express.js, and designed MySQL databases using Sequelize ORM.",
      "Implemented CRUD operations and tested APIs with Postman.",
    ],
  },
  {
    role: "Frontend Developer Intern",
    company: "Code With Alpha · Remote",
    period: "Apr – May 2025",
    points: ["Built responsive front-end interfaces using React.js based on UI/UX design specifications."],
  },
];

export const skillGroups = [
  {
    title: "Frontend & Mobile",
    skills: [
      { name: "React.js", level: 90 },
      { name: "React Native (Expo)", level: 80 },
      { name: "JavaScript", level: 88 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Next.js", level: 75 },
      { name: "HTML / CSS", level: 92 },
    ],
  },
  {
    title: "Backend & APIs",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 88 },
      { name: "REST API Design", level: 85 },
      { name: "JWT Auth / RBAC", level: 82 },
      { name: "bcrypt / Security", level: 80 },
    ],
  },
  {
    title: "Databases & BaaS",
    skills: [
      { name: "MongoDB", level: 85 },
      { name: "MySQL + Sequelize", level: 85 },
      { name: "PostgreSQL", level: 80 },
      { name: "Supabase (Auth & RLS)", level: 85 },
      { name: "Firebase", level: 80 },
      { name: "Git / GitHub", level: 88 },
    ],
  },
];

export const toolTags = [
  "React Native", "Expo / EAS", "Android", "Vite", "React Router", "RESTful APIs", "RBAC",
  "bcrypt", "Firestore", "Row Level Security", "Postman", "Vercel", "Python",
];

export const process = [
  { step: "01", title: "Discover", text: "Understand the goal, the users and the requirements, then agree on scope and milestones." },
  { step: "02", title: "Design", text: "Plan the data model, API contracts and UI flows so the build has a clear blueprint." },
  { step: "03", title: "Develop", text: "Build clean, tested features in small increments with regular demos and feedback." },
  { step: "04", title: "Deploy", text: "Ship to production on Vercel or EAS, monitor, and keep improving after launch." },
];

export type Project = {
  title: string;
  image: string;
  description: string;
  tags: string[];
  link?: { href: string; label: string; kind: "live" | "apk" };
};

export const projects: Project[] = [
  {
    title: "Rishta & Rang — Matrimonial App",
    image: "/assets/proj-rishta.jpg",
    description:
      "Android matrimonial app built with React Native and Expo for creating profiles, browsing and filtering matches, and connecting with potential partners. Built and distributed via EAS.",
    tags: ["React Native", "Expo", "Android"],
    link: { href: "https://expo.dev/artifacts/eas/jIZ1olZZROoaaL-alutumpLzzF-uDGyvIFz1QV_FkkQ.apk", label: "Download APK", kind: "apk" },
  },
  {
    title: "The Coffee Bean & Tea Leaf Website",
    image: "/assets/proj-cblt.jpg",
    description:
      "Brand website for The Coffee Bean & Tea Leaf Pakistan showcasing coffee, tea, food and cakes menus, brand story, and a store locator. Responsive React SPA deployed on Vercel.",
    tags: ["React", "Vite", "Vercel"],
    link: { href: "https://cblt-cofee-website.vercel.app", label: "Live Demo", kind: "live" },
  },
  {
    title: "Coffee Shop Website",
    image: "/assets/proj-coffee-shop.jpg",
    description:
      "Full-stack coffee shop landing page with categorized menu, checkout & order flow, newsletter signup, contact form, and real authentication (signup, login, forgot password). Supabase backend with Row Level Security.",
    tags: ["React", "Vite", "Tailwind", "Supabase"],
    link: { href: "https://cofee-website-alpha-psi.vercel.app/", label: "Live Demo", kind: "live" },
  },
  {
    title: "Hostel Management System",
    image: "/assets/proj-hostel.jpg",
    description:
      "Full-stack hostel management platform with Admin and Student dashboards. Includes room management, fee tracking, invoices, notices, mess schedule, complaints, and role-based access with JWT auth.",
    tags: ["React", "Node.js", "MySQL", "JWT"],
    link: { href: "https://my-react-app-omega-nine-26.vercel.app", label: "Live Demo", kind: "live" },
  },
  {
    title: "AI-Based Travel Planner",
    image: "/assets/proj-travel.jpg",
    description:
      "AI-powered travel platform with destination suggestions, cost estimation, hotel/transport booking, AI chatbot, budget planner, expense tracker, weather updates, SOS module, and eco-friendly tips. MERN + Python/Flask.",
    tags: ["MERN", "Python", "AI", "AWS"],
  },
  {
    title: "Gurgaon Real Estate Market Analysis",
    image: "/assets/proj-realestate.jpg",
    description:
      "Analyzed property prices and trends across the Gurgaon real estate market, studying the impact of location, property type, and size on pricing. Performed data cleaning and EDA.",
    tags: ["Python", "Pandas", "EDA"],
  },
  {
    title: "E-Commerce Database Design",
    image: "/assets/proj-ecommerce.jpg",
    description:
      "Designed a normalized relational schema with tables for users, products, orders, payments, and inventory. Defined PK/FK relationships for scalability and integrity.",
    tags: ["MySQL", "Schema Design"],
  },
  {
    title: "User Authentication System",
    image: "/assets/proj-auth.jpg",
    description:
      "Full-stack auth system with secure registration, login, JWT-based session management, bcrypt hashing, protected routes, Context API for global auth state, and localStorage persistence.",
    tags: ["MERN", "JWT", "Security"],
  },
  {
    title: "Twitter/X Frontend Clone",
    image: "/assets/proj-twitter.jpg",
    description: "Fully responsive front-end clone of Twitter/X using HTML and Tailwind CSS with pixel-perfect UI replication across all devices.",
    tags: ["HTML", "Tailwind CSS"],
  },
  {
    title: "PssOp — Password Manager",
    image: "/assets/proj-password.jpg",
    description: "Secure password manager with React.js frontend and Express.js/MongoDB backend.",
    tags: ["MERN", "Security"],
  },
  {
    title: "CryptoWallet Dashboard",
    image: "/assets/proj-crypto.jpg",
    description: "Responsive React.js admin dashboard with analytics and transaction tracking.",
    tags: ["React.js", "Dashboard"],
  },
  {
    title: "Personal Portfolio Website",
    image: "/assets/proj-portfolio.jpg",
    description: "This portfolio, built with Next.js, React and Tailwind CSS, with scroll animations and a fully responsive layout.",
    tags: ["Next.js", "React", "Tailwind CSS"],
  },
];

export const certifications = [
  { title: "Data Analyst Course", detail: "Python, NumPy, Pandas, Seaborn — Code With Harry" },
  { title: "Soft Skills Development Program", detail: "PEEF — Nov 2024" },
  { title: "MS Word, Excel, PowerPoint", detail: "TEVTA — Jun–Aug 2022" },
  { title: "Frontend Development Internship", detail: "CodeAlpha — Apr–May 2025" },
  { title: "Back End Development Internship", detail: "DevelopersHub Corporation — Mar–Apr 2026" },
];

export const testimonials = [
  {
    quote: "Faizan delivered clean, well-structured backend APIs ahead of schedule. His understanding of REST principles and database design made collaboration seamless.",
    name: "Saad Hassan",
    title: "Supervisor, DevelopersHub",
    initials: "SH",
  },
  {
    quote: "Great front-end skills and a quick learner. Faizan adapted to our React.js workflow in days and contributed meaningfully to the project.",
    name: "CodeAlpha Team",
    title: "Frontend Internship",
    initials: "CA",
  },
  {
    quote: "Collaborated with Faizan on the AI Travel Planner project. He handled the backend architecture and database design with minimal supervision.",
    name: "Abdullah Khan",
    title: "Project Teammate",
    initials: "AK",
  },
];

export const achievements = [
  { icon: "trophy", title: "Dean's List Honor", detail: "Awarded for academic excellence in BS Computer Science" },
  { icon: "users", title: "PEEF Soft Skills Program", detail: "Selected for Punjab Educational Endowment Fund training — Nov 2024" },
  { icon: "code", title: "Top Project — AI Travel Planner", detail: "Recognized as standout team project in university capstone showcase" },
  { icon: "cert", title: "Backend Development Certification", detail: "Completed intensive internship at DevelopersHub Corporation — 2026" },
] as const;
