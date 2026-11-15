export interface Project {
  id: string;
  number: string;
  category: string;
  titlePrimary: string;
  titleItalic: string;
  summary: string;
  description: string;
  technologies: string[];
  caseStudyUrl: string;
  sourceUrl?: string;
  demoUrl?: string;
  hasPublicRepo: boolean;
  caseStudy: {
    userAndProblem: string;
    whatBuiltAndWorkflow: string;
    keyImplementationDecision: string;
    evidenceNotes: string;
    metricsOrOutcomes: string[];
    architectureSteps: string[];
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface CapabilityItem {
  id: string;
  number: string;
  title: string;
  explanation: string;
}

export interface ExperienceItem {
  date: string;
  role: string;
  organization: string;
  description: string;
  type: 'activity' | 'achievement' | 'leadership';
}

export interface CertificationItem {
  id: string;
  title: string;
  date: string;
  organization?: string;
  hasFile: boolean;
  fileUrl?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  score: string;
  details?: string;
}

export const PERSONAL_INFO = {
  name: "Divyanshi Agarwal",
  firstName: "DIVYANSHI",
  roleTitle: "BCA Undergraduate",
  specialisation: "Artificial Intelligence and Machine Learning",
  university: "JECRC University",
  headline: "Aspiring Salesforce developer, data analyst, and software developer",
  email: "divyanshiagarwal434@gmail.com",
  emailAction: "mailto:divyanshiagarwal434@gmail.com",
  github: "https://github.com/divyanshiagarwal2505",
  linkedin: "https://www.linkedin.com/in/divyanshiagarwal1707",
  resumePath: "/Divyanshi_Agarwal_Resume.pdf",
  portraitPath: "/divyanshi-portrait.png",
  currentYear: 2026,
  statusLine: "BCA STUDENT · JECRC UNIVERSITY",
  introParagraph: "Adaptable BCA student, with a foundation in programming, website development, business-oriented project workflows and Salesforce fundamentals. Experienced in organising information around user needs, contributing to team activities and supporting event coordination. Brings problem-solving, critical-thinking, communication and teamwork skills, with a willingness to learn and contribute across technical, operations, customer-facing and administrative roles."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming and foundations",
    skills: ["C", "C++", "Python", "OOP", "Data Structures & Algorithms"]
  },
  {
    title: "Web projects",
    skills: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Website Design"]
  },
  {
    title: "Data and tools",
    skills: ["SQLite", "SQL Fundamentals", "Excel Basics", "Word", "PowerPoint"]
  },
  {
    title: "Business workflows",
    skills: ["Salesforce Fundamentals", "E-Commerce", "Consultation Booking"]
  }
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    id: "salesforce",
    number: "01",
    title: "SALESFORCE FUNDAMENTALS",
    explanation: "I’m learning Salesforce through workshops and practice, with an interest in how business requirements become workflows."
  },
  {
    id: "data-analysis",
    number: "02",
    title: "DATA ANALYSIS FOUNDATIONS",
    explanation: "I’m developing my SQL and Excel skills so I can organise data, ask clearer questions, and interpret results."
  },
  {
    id: "web-apps",
    number: "03",
    title: "WEB APPLICATIONS",
    explanation: "I design shopping and booking journeys around the decisions a visitor needs to make next."
  },
  {
    id: "backend-db",
    number: "04",
    title: "BACKEND AND DATABASE PROJECTS",
    explanation: "I’ve used Python and SQLite to model accounts, transactions, and persistent records in a banking simulation."
  },
  {
    id: "teamwork",
    number: "05",
    title: "TEAMWORK AND COORDINATION",
    explanation: "My experience includes coordinating a university event and participating in the Smart India Hackathon."
  }
];

export const PROJECTS: Project[] = [
  {
    id: "luxeloom",
    number: "01",
    category: "FULL-STACK WEB APPLICATION",
    titlePrimary: "LuxeLoom",
    titleItalic: "Jewellery",
    summary: "A jewellery storefront that connects metal-rate pricing with checkout, order tracking, and after-sales support.",
    description: "Built with React, Node.js, Express, MongoDB, and Tailwind CSS. The application models the entire customer journey from product selection with dynamic metal-rate calculations to Razorpay test checkout, order tracking, a rule-based support chatbot, and an administrative inventory view. Payment and delivery features are implemented as transparent demonstration workflows.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Razorpay Test API"],
    caseStudyUrl: "/projects#luxeloom",
    sourceUrl: "https://github.com/divyanshiagarwal2505/LuxeLoom-E-Commerce-Jewellery-Website",
    demoUrl: "https://luxeloom-kcij.onrender.com/",
    hasPublicRepo: true,
    caseStudy: {
      userAndProblem: "Jewellery buyers often struggle with static pricing because precious metal values (gold, silver, platinum) fluctuate daily. In standard e-commerce carts, customers have little transparency into how making charges, metal purity, and weight compose the final invoice, leading to cart abandonment and trust issues.",
      whatBuiltAndWorkflow: "LuxeLoom handles the end-to-end shopping workflow: browse curated collections, inspect certified pieces with real-time metal price breakdowns, configure weight or purity options, proceed through a Razorpay test payment flow, monitor status via order tracking, and query policies with a rule-based customer support assistant.",
      keyImplementationDecision: "Server-side price recalculation: While the client calculates instant visual estimates for the user interface as options change, the Express backend strictly verifies metal rates and weight against authoritative formulas before tokenising the transaction. This eliminates client-side tampering of high-value cart calculations.",
      evidenceNotes: "Full repository available with clear setup instructions, mock data schemas for jewellery inventory, modular React UI components, and integrated order state management.",
      metricsOrOutcomes: [
        "Dynamic 22K/24K Gold & 925 Sterling Silver real-time price calculators",
        "Multi-step checkout with simulated Razorpay transaction verification",
        "Responsive rule-based chatbot for FAQs, order lookup, and returns policy"
      ],
      architectureSteps: [
        "Product Catalog & Metal Rate Service (Daily Price Ingestion)",
        "React Component Tree (Purity selector, live breakdown, cart state)",
        "Node/Express API (Secure cart calculation & order hashing)",
        "MongoDB Store (User sessions, product specs, order history)",
        "Admin Dashboard (Product catalog updates & inventory thresholds)"
      ]
    }
  },
  {
    id: "securebank",
    number: "02",
    category: "PYTHON AND DATABASES",
    titlePrimary: "SecureBank",
    titleItalic: "Server & Database",
    summary: "A Python banking simulation that connects an interactive terminal client to a multi-threaded server and a persistent SQLite database.",
    description: "Designed using object-oriented Python, multi-threaded client-server sockets, and an ACID-compliant SQLite relational database. Different account hierarchies (Savings, Checking) demonstrate OOP inheritance and encapsulation, while database transactions guarantee audit trails, balance invariants, and safe concurrent access.",
    technologies: ["Python 3", "SQLite3", "Socket Programming", "Threading", "OOP Architecture"],
    caseStudyUrl: "/projects#securebank",
    sourceUrl: "https://github.com/divyanshiagarwal2505/bank-server-database",
    hasPublicRepo: true,
    caseStudy: {
      userAndProblem: "In banking systems, data integrity and thread-safety under concurrent load are critical. Handling deposits, transfers, and balance checks across distributed clients requires robust state isolation to avoid race conditions and phantom transactions.",
      whatBuiltAndWorkflow: "A complete client-server simulation. The client CLI prompts the user for account credentials, provides interactive banking operations (balance enquiry, deposit, withdrawal, fund transfer), and transmits commands over sockets. The multi-threaded server worker parses requests, invokes polymorphic account classes, and executes parameterised transactions in SQLite with immediate rollback on error.",
      keyImplementationDecision: "Separation of account business rules from persistent storage: Account subclasses enforce business invariants (minimum balance thresholds, overdraft limits, transaction rules) in memory, while a dedicated database manager layer isolates all SQL commands, table creation, and locking mechanisms.",
      evidenceNotes: "Tested with concurrent terminal sessions; full code on GitHub demonstrating modular design, parameterized queries preventing SQL injection, and structured terminal output.",
      metricsOrOutcomes: [
        "Thread-safe socket communication with worker thread pooling",
        "Polymorphic SavingsAccount and CheckingAccount OOP model",
        "Immutable transaction ledger with timestamped audit logging"
      ],
      architectureSteps: [
        "Terminal Client UI (Input validation, command serializer)",
        "TCP Socket Transport (Command protocol & response decoding)",
        "Multi-Threaded Server Engine (Connection dispatcher)",
        "Business Logic Layer (Savings & Checking OOP models)",
        "SQLite Persistence Layer (WAL mode, parameterized audit queries)"
      ]
    }
  },
  {
    id: "law-firm-website",
    number: "03",
    category: "WEB DESIGN AND BOOKING",
    titlePrimary: "Law Firm Corporate &",
    titleItalic: "Consultation Website",
    summary: "A corporate law firm website that helps visitors understand the firm’s services and request a consultation.",
    description: "Structured to guide prospective corporate and private clients through practice areas, advocate profiles, case records, and an intuitive consultation booking workflow. Built to bridge client anxiety and complex legal services through clear visual hierarchy and straightforward consultation scheduling.",
    technologies: ["HTML5", "CSS3 / Modern Layouts", "JavaScript", "Responsive Design", "Form Validation"],
    caseStudyUrl: "/projects#law-firm-website",
    hasPublicRepo: false,
    caseStudy: {
      userAndProblem: "Prospective legal clients are frequently overwhelmed by dense legal jargon, opaque fee structures, and fragmented inquiry forms. They need immediate clarity on legal specialties, lawyer credentials, and an unhurried, friction-free way to request a consultation.",
      whatBuiltAndWorkflow: "A responsive corporate web presence featuring practice areas (Corporate Law, Intellectual Property, Civil Litigation, Dispute Resolution), partner profiles with verifiable achievements, and a 3-step consultation request workflow capturing case jurisdiction, urgency, and preferred conference times.",
      keyImplementationDecision: "Client-centric information architecture: Rather than starting with firm history, the homepage prioritizes client dilemma categorization ('I need help with: Contract / IP / Litigation') leading directly into specialized consultation booking with clear privacy disclosures.",
      evidenceNotes: "Internal case study on this portfolio showcasing wireframe flows, interactive mockups of the booking intake modal, and information architecture diagrams.",
      metricsOrOutcomes: [
        "Streamlined 3-step intake workflow reducing form completion friction",
        "Accessible, high-contrast typography adhering to WCAG standards",
        "Modular service cards with client-oriented outcome previews"
      ],
      architectureSteps: [
        "Visual Hierarchy & Value Proposition (Clear practice area taxonomy)",
        "Interactive Legal Service Explorer (Scope, process, documentation checklist)",
        "3-Step Consultation Request System (Conflict check pre-screening)",
        "Client Notification & Confirmation Workflow (Email summary generation)"
      ]
    }
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    date: "April 2025",
    role: "Core Team Member",
    organization: "Sangam Event, Rajasthan Incubation Center",
    description: "Helped manage the event and coordinate team activities across venue arrangements, participant welcoming, and schedule synchronization.",
    type: "leadership"
  },
  {
    date: "September 2024",
    role: "Participant",
    organization: "Smart India Hackathon (SIH), JECRC University",
    description: "Participated in the university-level Smart India Hackathon internal rounds, collaborating on rapid problem definition and algorithmic solutions.",
    type: "activity"
  },
  {
    date: "November 2025",
    role: "Table Tennis Tournament Winner",
    organization: "JU Innovate",
    description: "Achieved 1st place in the university table tennis competition, reflecting sportsmanship, focus, and agility.",
    type: "achievement"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "sangam-event-2025",
    title: "Certificate of Appreciation for Managing the Sangam Event",
    date: "April 2025",
    organization: "Rajasthan Incubation Center",
    hasFile: false
  },
  {
    id: "salesforce-workshop-2024",
    title: "2-Day Salesforce Workshop",
    date: "October 2024",
    organization: "Professional Training Workshop",
    hasFile: false
  },
  {
    id: "sih-participation-2024",
    title: "Certificate of Participation in Smart India Hackathon (SIH)",
    date: "September 2024",
    organization: "JECRC University / Ministry of Education",
    hasFile: false
  }
];

export const EDUCATION_RECORDS: EducationItem[] = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "JECRC University",
    period: "2024 – 2027 (expected)",
    score: "CGPA: 8.15",
    details: "Specialisation: Artificial Intelligence and Machine Learning. Coursework covering OOP, Data Structures, Python, Web Development, and Database Systems."
  },
  {
    degree: "Senior Secondary Examination (Class XII)",
    institution: "Saraswati Vidhya Peeth Senior Secondary School",
    period: "2023",
    score: "81.60%",
    details: "Rigorous foundation in mathematics, logical reasoning, and science."
  },
  {
    degree: "Secondary Examination (Class X)",
    institution: "Eternal Life Senior Secondary School",
    period: "2021",
    score: "95%",
    details: "High academic distinction and active participation in school curricular events."
  }
];

