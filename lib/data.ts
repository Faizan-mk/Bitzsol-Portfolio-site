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
    category: "E-Commerce · Shopify App",
    slug: "instagram-feeds-for-shopify",

    title: "Instagram Feeds for Shopify",
    image: "/assets/proj-ecommerce.jpg",
    description:
      "Connects a store to its Instagram account to showcase live feeds and stories, boosting social proof and visual appeal with easy customization.",
    tags: ["Live feeds", "Stories", "Customizable"],
  },
  {
    category: "Aviation",
    slug: "amelia-os",

    title: "Amelia OS",
    image: "/assets/proj-hostel.jpg",
    description:
      "An aviation management system for plane inspections, defect tracking, reporting and hangar planning, with OCR data capture and time-management tools.",
    tags: ["OCR", "Inspections", "Hangar planning"],
  },
  {
    category: "Travel & Planning",
    slug: "lastbadtrip",

    title: "LastBadTrip",
    image: "/assets/proj-travel.jpg",
    description:
      "A booking management platform for activity planning and voyages, with detailed financial reports, Stripe payments and multi-language support.",
    tags: ["Stripe", "Multi-language", "Reports"],
  },
  {
    category: "Healthcare",
    slug: "secret-align",

    title: "Secret Align",
    image: "/assets/proj-password.jpg",
    description:
      "Lets dentists order custom clear aligners online, with 3D scan uploads, treatment instructions, online payments and patient history in one workflow.",
    tags: ["3D scans", "Payments", "Patient history"],
  },
  {
    category: "Finance",
    slug: "consultation-amaltitek",

    title: "Consultation Amaltitek",
    image: "/assets/proj-crypto.jpg",
    description:
      "A financial management system covering assets and liabilities, tax, company finances, balance sheets, trial balance, journal entries and reporting.",
    tags: ["Balance sheets", "Journals", "Tax"],
  },
  {
    category: "Campaigns",
    slug: "official-truck-br",

    title: "Official Truck BR",
    image: "/assets/proj-twitter.jpg",
    description:
      "A coupon-redemption platform for live campaigns serving thousands of daily visitors, with effortless bulk coupon creation for businesses.",
    tags: ["Coupons", "Bulk creation", "Campaigns"],
  },
  {
    category: "E-Commerce",
    slug: "barnard-pt-moveis-online",

    title: "Barnard PT: Móveis Online",
    image: "/assets/proj-coffee-shop.jpg",
    description:
      "A full-featured furniture e-commerce platform with inventory tracking, shipping management, carts, online payments and order management.",
    tags: ["Inventory", "Shipping", "Payments"],
  },
  {
    category: "Marketing & Design",
    slug: "netbezig",

    title: "NetBezig",
    image: "/assets/proj-cblt.jpg",
    description:
      "A marketing services agency platform with seamless online payments, efficient management tools and a clean, user-friendly design.",
    tags: ["Payments", "Management tools", "UX"],
  },
  {
    category: "Education · Game",
    slug: "abcedlalecture",

    title: "Abcedlalecture",
    image: "/assets/proj-rishta.jpg",
    description:
      "An interactive game that helps students learn French through engaging challenges and educational activities.",
    tags: ["Gamified", "French", "Interactive"],
  },
  {
    category: "Billing & Fintech",
    slug: "adly",

    title: "Adly",
    image: "/assets/proj-auth.jpg",
    description:
      "Users top up accounts, pay by uploading receipts and withdraw funds, with a built-in affiliate program that rewards referrals.",
    tags: ["Top-ups", "Receipts", "Affiliate"],
  },
  {
    category: "Customizer",
    slug: "interior-design-systems",

    title: "Interior Design Systems",
    image: "/assets/proj-realestate.jpg",
    description:
      "An intuitive wardrobe configurator: customize window sizes, frames, doors, colors and materials to fit any space.",
    tags: ["Configurator", "Materials", "Custom sizes"],
  },
  {
    category: "Automotive",
    slug: "smstech-sehgal-motorsports",

    title: "Smstech – Sehgal Motorsports",
    image: "/assets/proj-portfolio.jpg",
    description:
      "A Shopify-integrated system to post ads, manage vehicle sales and purchases, run inspections and generate reports in one platform.",
    tags: ["Shopify", "Inspections", "Reports"],
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
