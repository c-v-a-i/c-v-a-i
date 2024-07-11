import {
  AchievementData,
  ContactInfoData,
  EducationData,
  ProjectData,
  SkillsData,
  WorkExperienceData,
} from "./types";

export const name: string = "Aliaksandr Skuratovich";

const withDot = (str: string) => (str.endsWith(".") ? str : str + ".");

export const contactInfoData: ContactInfoData = {
  LinkedIn: "https://www.linkedin.com/in/aliaksandr-skuratovich-4a2ab01a0/",
  GitHub: "https://github.com/SkuratovichA",
  Email: "skuratovich.aliaksandr@gmail.com",
  Phone: "+420 735 594 008",
};

export const workExperienceData: WorkExperienceData[] = [
  {
    position: "Senior Software Engineer",
    company: "Gen (ex Avast)",
    type: "Full-time",
    location: "Prague, Czechia",
    duration: "2024 - Present",
    responsibilities: [
      "Working on an internal projects for developers, product and project managers leveraging Spotify Backstage frameworks",
      "Developing AI-powvered features to enhace the developer/user experience",
      "Handling various aspects of a project lifecycle, including CI/CD, process establishment (Jira, Confluence), conflict resolution within the team, communication with end users/customers, and other possible stuff",
      "Skills: Team leading, TeamCity, GCP, React, Kubernetes, Docker, and many more",
    ].map(withDot),
  },
  {
    position: "Chief Technology Officer",
    company: "TAP",
    location: "Planet Earth",
    type: "Part-time",
    duration: "2024 - Present",
    responsibilities: [
      "We are developing an ad aggregator platform that connects customers with businesses (telegram public channels)",
      "We use AI to analyze their target audience and find the best matches for both businesses and platforms",
      "Additionally, the platform serves as an escrow agent, ensuring secure and trustworthy transactions with smart contracts",
      "Skills: System Architecture, Team leading, Management, Hiring, React/Remix, GraphQL, NodeJS, GCP, you name it",
    ].map(withDot),
  },
  {
    position: "Software Engineer",
    company: "Salsita Software",
    type: "Full-time",
    location: "Prague, Czechia · Hybrid",
    duration: "2023 - 2024",
    responsibilities: [
      "Successfully developed an LLM-powered UI for a 3D product configurator from inception and PoC to MVP",
      "Enhanced CI/CD pipelines and streamlined development processes for eBay’s Social Hub platform",
      "Skills: OpenAI API, NodeJS, React, GraphQL, Jenkins",
    ].map(withDot),
  },
  {
    position: "AI Researcher",
    type: "Full-time",
    company: "BUT Speech",
    location: "Brno, South Moravia, Czechia · On-site",
    duration: "April 2022 - December 2022",
    responsibilities: [
      "Training and fine-tuning models for ASR and NLP tasks",
      "Researching state-of-the-art streamable ASR architectures",
      "Using and contributing to frameworks such as SpeechBrain, Nvidia NeMo, and HuggingFace",
      "Skills: Academic Research, Python, Pytorch, HuggingFace, SpeechBrain, Nvidia NeMo, ASR, NLP",
    ].map(withDot),
  },
  {
    position: "Chief Executive Officer",
    type: "Part-time",
    company: "Skuratovich Aliaksandr",
    location: "Planet Earth · Remote",
    duration: "December 2000 - Present",
    responsibilities: [
      "Developing various projects, including a GPT-4 powered CV builder, a Telegram bot for managing conversations, and a GPT-powered event manager in Telegram",
      "Spending time on Neovim configuration and other nerdy tasks such as tmux",
      "Creating a multi-platform AI-powered application for managing debts and an ad aggregator platform using AI to analyze target audiences and ensure secure transactions with smart contracts",
    ].map(withDot),
  },
];

export const projectsData: ProjectData[] = [
  {
    name: "AI 3D Product Configurator",
    description: [
      "Developed an innovative 3D product configurator using GPT-4 API for prompt engineering and UI/UX design",
      "Skills: TypeScript, NodeJS, React, OpenAI API, Prompt Engineering, UI/UX",
    ].map(withDot).join("</br>"),
  },
  {
    name: "Various Coding Projects",
    description: [
      "Developed a lightweight compiler for Lua in C, a diagram editor in C++/Qt, and an information system for organizing conferences using Django, React, and Postgres",
      "Created numerous smaller projects including a packet sniffer, spreadsheet processors, and an IoT project",
      "Written over 50 Python scripts for dataset preparation",
    ].map(withDot).join("</br>"),
  },
  {
    name: "Machine Learning Projects",
    description: [
      "Developed several E2E ASR, fine-tuned a bunch of models, participated in Albaizyn challenge and MTM22 challenge",
      "Utilized WandB extensively and explored quantization, pruning, and other optimizations for efficient inference",
    ].map(withDot).join("</br>"),
  },
];

export const achievementsData: AchievementData[] = [
  {
    name: "Led the creation of the first AI 3D product configurator",
    description: "",
  },
  {
    name: "Developed a GPT-4 powered CV builder",
    description: "",
  },
];

export const educationData: EducationData[] = [
  {
    institution: "Brno University of Technology",
    degree: "Bachelor in Information Technology",
    duration: "2020 — 2023",
    description: "Top 1% student",
    keywords: ["Python", "C/C++", "Machine Learning", "Deep Learning"],
    location: "Brno, Czechia",
  },
  {
    institution: "Unicorn University",
    degree: "Bachelor in Economics and Management",
    duration: "October 2018 — October 2020",
    description: "Not top 1% student",
    keywords: ["Economics", "Management", "Finance"],
    location: "Prague, Czechia",
  },
];

export const skillsData: SkillsData = {
  "Soft Skills": [
    "Management",
    "Hiring",
    "Team Leading",
    "Problem Solving"
  ],
  "Hard Skills": [
    "Software Engineering",
    "Prompt Engineering",
    "System Architecture Design",
  ],
  Tools: [
    "TypeScript/Python/Kotlin/Go/Rust",
    "React/Remix/NextJS",
    "Koa/Express/Flask/Django/NestJS",
    "Pytorch/HuggingFace",
    "Postgres/MongoDB/Redis/GraphQL",
    "Docker/Kubernetes/GCP/AWS/Heroku/Azure",
    "TeamCity/Jenkins/Github Actions"
  ],
  Languages: ["Russian", "English", "Czech"],
};

export const aboutMeData = [
  "Programming since the age of -1",
  "A goulash with a blend of software engineering, AI, and a pinch of soft skills",
  "Have done some product-centric academic research in AI (NLP, ASR) during the university times",
  "When not coding, I do cycling, swimming, learn history", 
  "Also, I build custom keyboards and use neovim",
].map(withDot);
