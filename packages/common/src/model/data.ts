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
    company: "Dishboard",
    type: "Contract",
    location: "Prague, Czechia",
    duration: "2024 - Present",
    responsibilities: [
      "Developing a financial application for restaurant business",
      "Doing a lot of stuff, including architecture design and creating new features from scratch in a startup environment",
      "Creating a new OCR model, that reduces the cost of the service and increases the accuracy by up to 35%",
      "Skills: NestJS, TypeORM, React, Stripe API and many other APIs",
    ].map(withDot),
  },
  {
    position: "Senior Software Engineer",
    company: "Gen (ex Avast)",
    type: "Full-time",
    location: "Prague, Czechia",
    duration: "2024",
    responsibilities: [
      "Working on an internal projects for developers, product and project managers leveraging Spotify Backstage frameworks",
      "Developing AI-powered features to enhance the developer/user experience",
      "Handling different aspects of a project lifecycle, including CI/CD, process establishment (Jira, Confluence), conflict resolution within the team, communication with end users/customers, and other possible stuff",
      "Skills: Team leading, TeamCity, GCP, React, Kubernetes, Docker, and many more",
    ].map(withDot),
  },
  {
    position: "Software Engineer",
    company: "Salsita Software",
    type: "Full-time",
    location: "Prague, Czechia",
    duration: "2023 - 2024",
    responsibilities: [
      "Successfully developed an LLM-powered UI for a 3D product configurator from inception and PoC to MVP",
      "The project was a success and building LLM-based UIs became a company mid-term goal",
      "Enhanced CI/CD pipelines and streamlined development processes for eBay’s Social Hub platform, resurrected an abandoned project",
      "Because of a great success, they decided to continue working with us for the next two quarters",
      "Skills: OpenAI API, Kotlin, NodeJS, React, GraphQL, Jenkins, ThreeJS",
    ].map(withDot),
  },
  {
    position: "AI Researcher",
    type: "Full-time",
    company: "BUT Speech",
    location: "Brno, Czechia",
    duration: "2021 - 2023",
    responsibilities: [
      "Training and fine-tuning models for ASR and NLP tasks, improving Czech e2e ASR models",
      "Researching state-of-the-art streamable ASR architectures in cooperation with Seznam.cz",
      "Participated in Albaizyn challenge (got the 2nd place) and MTM22 marathon",
      "Specialized on joint models, efficient inference, and transformer adaptors",
      "Skills: Academic Research, Python, Pytorch, HuggingFace, SpeechBrain, Nvidia NeMo, ASR, NLP",
    ].map(withDot),
  },
  // {
  //   position: "Chief Executive Officer",
  //   type: "Part-time",
  //   company: "Skuratovich Aliaksandr",
  //   location: "Planet Earth · Remote",
  //   duration: "December 2000 - Present",
  //   responsibilities: [
  //     "Developing various projects, including a GPT-4 powered CV builder, a Telegram bot for managing conversations, and a GPT-powered event manager in Telegram",
  //     "Spending time on Neovim configuration and other nerdy tasks such as tmux",
  //     "Creating a multi-platform AI-powered application for managing debts and an ad aggregator platform using AI to analyze target audiences and ensure secure transactions with smart contracts",
  //   ].map(withDot),
  // },
];

export const projectsData: ProjectData[] = [
  // {
  //   name: "AI 3D Product Configurator",
  //   description: [
  //     "Developed an innovative 3D product configurator using GPT-4 API",
  //     "The project was a success and building LLM-based UIs became a company mid-term goal",
  //     // "Worked closely with the speech synthesis, prompt engineering and LLM fine-tuning",
  //     "Skills: TypeScript, NodeJS, React, OpenAI API, Prompt Engineering, UI/UX",
  //   ].map(withDot).join("</br>"),
  // },
  // {
  //   name: "The Ads Platform",
  //   description: [
  //     "Tried to build a startup from a hackathon. The idea was to develop an ad aggregator platform that connects customers with businesses using AI (embeddings) to analyze target audiences and ensure secure transactions with smart contracts",
  //     "Didn't succeed, but learned a lot about being a CTO",
  //     "Skills: System Architecture, Product Design, Team Leading, Management, Hiring, React/Remix, GraphQL, NodeJS, GCP",
  //   ].map(withDot).join("</br>"),
  // },
  {
    name: "GPT-4 Powered CV Builder",
    description: [
      "Developing a CV builder using LLMs to generate, modify and review CVs",
      "Skills: TypeScript, NestJS, React, OpenAI API, Prompt Engineering, UI/UX",
    ].map(withDot).join("</br>"),
  },
  {
    name: "Various Coding Projects",
    description: [
      "Developed a lightweight compiler for Lua in C, a diagram editor in C++/Qt, and an information system for organizing conferences using Django, React, and Postgres",
      "Created numerous smaller projects including a packet sniffer, spreadsheet processors, and an IoT system for automatic light control",
      "Written over 50 Python scripts doing data processing for training neural networks",
    ].map(withDot).join("</br>"),
  },
  {
    name: "Machine Learning Projects",
    description: [
      // "Developed several E2E ASR, fine-tuned a bunch of models, participated in ML competitions",
      `Our team got the 2nd place in the Albayzin 2022 ASR challenge <a href="https://www.fit.vut.cz/research/group/speech/public/publi/2022/kocour22_iberspeech.pdf">link to paper</a>`,
      `Our team the 3rd place in MTM22 (Machine Translation Marathon) by implementing an ASR model for TED talks using transformer adaptors`,
      "Created a joint model for person identification by speech and image. Implemented a logic for joining outputs from these two modalities <a href='https://github.com/SkuratovichA/SUR'>link to project</a>"
      // "Researched and implemented joint models: for intent classification and slot filling tasks, for ASR + NER, and for speech+image person identification",
      // "Utilized WandB extensively and explored quantization, pruning, and other optimizations for efficient inference",
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
    duration: "2018 — 2020",
    description: "Not top 1% student",
    keywords: ["Economics", "Management", "Finance"],
    location: "Prague, Czechia",
  },
];

export const skillsData: SkillsData = {
  "Soft Skills": [
    "Management",
    "Team Leading",
    "Working under tight deadlines",
    "Problem Solving"
  ],
  "Hard Skills": [
    "Software engineering",
    "Database design",
    "Prompt engineering",
    "System architecture design",
  ],
  Tools: [
    "TypeScript/Python/Kotlin",
    "React/Remix/NextJS",
    "NestJS/Express/Django/FastAPI/Spring",
    "Pytorch/HuggingFace",
    "REST/GraphQL",
    "Postgres/MongoDB",
    "Docker/Kubernetes",
    // "GCP/Heroku",
    "TeamCity/Jenkins/Github Actions"
  ],
  Languages: ["Czech", "English"],
};

export const aboutMeData = [
  "Programming since the age of -1",
  "A goulash with a blend of fullstack and AI skills.",
  "Have done product-centric academic research in AI (NLP, ASR).",
  "Now doing pretty much everything related to Backend and Frontend development.",
  "When not coding, I do triathlon.",
].map(withDot);
