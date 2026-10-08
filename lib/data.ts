export const company = {
  name: "Bitzsol Digital",
  legalName: "Bitzsol Digital (SMC-PVT) Ltd",
  initials: "BD",
  role: "Digital Solutions Company",
  tagline: "Driving growth, shaping the future through transformation.",
  website: "https://www.bitzsol.com",
  websiteLabel: "www.bitzsol.com",
  email: "Hello@bitzsol.com",
  phone: "+92 303 0608794",
  phoneHref: "tel:+923030608794",
  phone2: "+92 339 0449978",
  phone2Href: "tel:+923390449978",
  linkedin: "https://pk.linkedin.com/company/bitzsol",
  about:
    "Bitzsol Digital (SMC-PVT) Ltd is a technology-driven digital solutions company. We build web, e-commerce and cloud products, automate workflows with AI and GoHighLevel, and grow brands through marketing, SEO and social media — all at fixed, transparent rates.",
  philosophy:
    "As a leading contributor to driving change, we understand the importance of continued self-reinvention. We accomplish this by investing in next-generation capabilities that enhance our differentiation in key growth areas and by investing in talent to ensure we have specialized skills to resolve business problems. Backed by our expertise and diverse global workforce, our ultimate goal is to offer sustainable and meaningful value across all directions.",
  mission:
    "To empower businesses of every size with fast, scalable and affordable digital solutions — combining modern technology, creative thinking and transparent pricing so our clients can optimize how they work, transform how they engage and scale with confidence.",
  vision:
    "To be a globally trusted digital partner that helps enterprises and ambitious startups embrace modern technology, rethink their processes and elevate every customer experience — building the next era of digital business.",
  ctaLine: "Embrace modern technology, rethink processes, and elevate experiences.",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Work" },
  { href: "/contact", label: "Contact" },
];

export const values = [
  { num: "01", title: "Innovation", text: "We invest in next-generation capabilities and stay ahead of the curve." },
  { num: "02", title: "Transparency", text: "Fixed, honest pricing and clear communication at every step." },
  { num: "03", title: "Quality", text: "Careful craft and specialized talent behind every deliverable." },
  { num: "04", title: "Partnership", text: "We treat every client's goals as our own and grow alongside them." },
];

export const solutions = [
  {
    title: "Business Applications",
    text: "We empower enterprises to manage and optimize mission-critical operations across diverse environments, ensuring smooth interactions at every customer touchpoint.",
    points: ["ERP, workflow & management systems", "Booking, billing & inventory tools", "Dashboards, portals & reporting"],
  },
  {
    title: "Digital Ecommerce",
    text: "Dedicated digital commerce solutions that help businesses grow by transforming how they sell and interact in a world where online commerce is part of daily life.",
    points: ["Custom online stores & marketplaces", "Shopify apps & integrations", "Payments, shipping & orders"],
  },
  {
    title: "Cloud Applications",
    text: "We help organizations improve functionality, enhance customer experience and reduce maintenance costs with applications built to handle higher workloads and increase ROI.",
    points: ["Scalable web & SaaS applications", "Performance tuning & maintenance", "Continuous updates & support"],
  },
];

export const services = [
  { num: "01", title: "Web Development", text: "Fast, secure and scalable websites and web applications, custom-built around your goals and your users." },
  { num: "02", title: "AI Automations", text: "Custom AI workflows and chatbots that automate repetitive tasks and free your team to focus on growth." },
  { num: "03", title: "GoHighLevel (GHL)", text: "GoHighLevel setup and automation: CRM, funnels, follow-ups and appointment booking in one platform." },
  { num: "04", title: "Digital Marketing", text: "Data-informed campaigns that build awareness, generate leads and turn attention into measurable growth." },
  { num: "05", title: "Social Media Management", text: "Strategy, content and community management that keep your brand active, engaging and consistent." },
  { num: "06", title: "SEO", text: "Technical and content optimization that lifts your search visibility and attracts qualified organic traffic." },
  { num: "07", title: "Graphic Design", text: "Logos, brand identities and marketing creatives with a distinctive look across every channel." },
  { num: "08", title: "Video Editing", text: "Polished, scroll-stopping edits for promos, social content and product stories." },
];

export const advantages = [
  { num: "1", title: "Fixed, low fee", text: "Transparent, fixed pricing across development, automation, marketing, SEO, design and video — premium quality that fits businesses of every size." },
  { num: "2", title: "Fast", text: "Streamlined processes and a dedicated team deliver quickly, so you stay ahead of the competition and hit your objectives on time." },
  { num: "3", title: "Scalable", text: "Solutions designed to grow with you — from startups chasing rapid growth to enterprises expanding their digital footprint." },
  { num: "4", title: "Efficient", text: "Modern technology and best practices optimize your workflows, maximizing return on investment with minimal resource expenditure." },
];

export const approach = [
  { step: "01", title: "Optimize", text: "We leverage customer-centric, cutting-edge talent and technology to deliver higher business efficiency." },
  { step: "02", title: "Transform", text: "We reimagine processes and systems with holistic solutions that create superior enterprise value." },
  { step: "03", title: "Scale", text: "We enable future-ready enterprises with long-term growth in a state of perpetual reinvention." },
];

export const process = [
  { step: "01", title: "Discover", text: "We learn your goals, users and constraints." },
  { step: "02", title: "Design", text: "We shape the experience, structure and brand." },
  { step: "03", title: "Build", text: "Agile development with regular progress demos." },
  { step: "04", title: "Launch", text: "Rigorous testing, then go live with confidence." },
  { step: "05", title: "Support", text: "Ongoing maintenance, optimization and growth." },
];

export type Project = {
  slug: string;
  category: string;
  title: string;
  image: string;
  description: string;
  tags: string[];
  link?: string;
};

export const projects: Project[] = [
  {
    category: "Mobile App · Matchmaking",
    slug: "matrimonial-app",

    title: "Matrimonial App",
    image: "/assets/proj-matrimonial.jpg",
    description:
      "A matchmaking app in English, Roman Urdu and Urdu, with real-time chat and calls, CNIC verification, a Wali (guardian) dashboard and a paid Explore Plus tier, built on Expo, React Native and Supabase.",
    tags: ["Chat & calls", "Wali dashboard", "CNIC verified"],
  },
  {
    category: "AI Automation · Financial Advisory",
    slug: "advisory-partners",

    title: "Advisory Partners",
    image: "/assets/proj-advisory.jpg",
    description:
      "An AI automation programme for an Australian financial advisory firm that ran on manual admin across Teams, SharePoint, Zoho, XPM, Praemium and Class. A Python/FastAPI backend on Azure Functions with a reusable Claude knowledge-base pattern powers AI file notes from Teams meeting transcripts, a weekly onboarding scan that chases missing client data, letterhead letters as Word + PDF, and the client report as a SharePoint web part.",
    tags: ["Python & FastAPI", "Azure Functions", "Claude API", "SharePoint"],
  },
  {
    category: "AI Platform · Residential Construction",
    slug: "ai-for-homebuilders",

    title: "AI for Homebuilders",
    image: "/assets/proj-homebuilders.jpg",
    description:
      "Homebuilders were drowning in warranty claims — homeowner emails, photos and forms arriving unstructured and triaged by hand. We built a warranty-claims AI platform that ingests claims, extracts and classifies issues with LLMs, and routes them to the right trade with the context already attached.",
    tags: ["Next.js", "LLM triage", "MCP", "AWS"],
    link: "https://aiforhomebuilders.com/",
  },
  {
    category: "AI Agent · Operations Automation",
    slug: "starbond",

    title: "Starbond",
    image: "/assets/proj-starbond.jpg",
    description:
      "An AI digest agent for a busy ClickUp workspace. Read-only Python jobs audit the whole workspace and send daily and weekly digests by ClickUp DM: Claude condenses marketing comments into an executive summary, a rate-aware scanner flags Overdue / Stuck / Stale tasks per Space, and an independent watchdog alerts the operator if any digest stops running.",
    tags: ["Python", "Claude API", "ClickUp API", "Watchdog"],
  },
  {
    category: "LLM Product · Consumer AI",
    slug: "pocket-pinky",

    title: "Pocket Pinky",
    image: "/assets/proj-pocketpinky.jpg",
    description:
      "An AI dating companion that gives genuinely personal advice — not a generic chatbot wrapper. A conversational AI product with persona prompting and conversation memory, coaching users from first-date nerves to long-term relationship questions.",
    tags: ["Next.js", "LLM APIs", "Conversation memory"],
    link: "https://pocketpinky.com/",
  },
];

export const testimonials = [
  {
    quote:
      "Bitzsol took our idea and turned it into a polished, working product. Communication was clear throughout, deadlines were respected, and the final result matched exactly what we had in mind.",
    name: "Steven Febry",
    title: "Client",
    initials: "SF",
  },
  {
    quote:
      "The team understood our business quickly and delivered a clean, professional digital presence. They were responsive, transparent about pricing and a pleasure to work with from start to finish.",
    name: "Advisory Friends",
    title: "Client",
    initials: "AF",
  },
  {
    quote:
      "Bitzsol brought both technical depth and creative thinking to our project. Fast turnaround, reliable delivery and a genuine willingness to go the extra mile — we would happily work with them again.",
    name: "Selr AI Ltd",
    title: "Client",
    initials: "SA",
  },
];
