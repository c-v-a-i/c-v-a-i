import {
  AchievementData,
  ContactInfoData,
  EducationData,
  ProjectData,
  SkillsData,
  WorkExperienceData,
} from "./types";

export const name: string = "Aliaksandr Skuratovich";

export const contactInfoData: ContactInfoData = {
  LinkedIn: "https://www.linkedin.com/in/aliaksandr-skuratovich-4a2ab01a0/",
  GitHub: "https://github.com/SkuratovichA",
  Email: "skuratovich.aliaksandr@gmail.com",
  Phone: "+420 735 594 008",
};

export const workExperienceData: WorkExperienceData[] = [
  {
    position: "Senior Software Engineer",
    company: "Gen",
    type: "Full-time",
    location: "Prague, Czechia",
    duration: "May 2024 - Present",
    responsibilities: [
      "Doing internal projects for developers, product and project managers leveraging Spotify Backstage frameworks",
      "Handling various aspects of the project lifecycle, including CI/CD, process establishment (Jira, Confluence), conflict resolution within the team, and communication with end users/customers and product shaping",
      "Skills: Team leading, TeamCity, React, TypeScript, Kubernetes, Docker, etc",
    ],
  },
  {
    position: "Chief Technology Officer",
    company: "TAP",
    location: "Planet Earth",
    type: "Part-time",
    duration: "May 2024 - Present",
    responsibilities: [
      "We are developing an ad aggregator platform that connects customers with businesses (telegram public channels)",
      "We use AI to analyze their target audience. They both can then match each other based on their target audience",
      "Additionally, the platform serves as an escrow agent, ensuring secure and trustworthy transactions with smart contracts",
      "Skills: Team leading, Management, Conflict resolution, Communication, Hiring, React/Remix, GraphQL, Node, GCP, you name it",
    ],
  },
  {
    position: "Full Stack Engineer",
    company: "Salsita Software",
    type: "Full-time",
    location: "Prague, Czechia · Hybrid",
    duration: "February 2023 - May 2024",
    responsibilities: [
      "Successfully developed an LLM-powered UI for a 3D product configurator from inception to MVP",
      "Enhanced CI/CD pipelines and streamlined development processes for eBay’s Social Hub platform",
      "Key Skills: NodeJS (Koa), OpenAI API, TypeScript/React, RxJS, Emotion React, Framer Motion, Kotlin (Spring Boot), Microservices, GraphQL, Jenkins",
    ],
  },
  {
    position: "Junior Researcher",
    type: "Full-time",
    company: "BUT Speech",
    location: "Brno, South Moravia, Czechia · On-site",
    duration: "April 2022 - December 2022",
    responsibilities: [
      "Training and fine-tuning models for ASR and NLP tasks",
      "Researching state-of-the-art streamable ASR architectures",
      "Using and contributing to frameworks such as SpeechBrain, Nvidia NeMo, and HuggingFace",
    ],
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
    ],
  },
];

export const projectsData: ProjectData[] = [
  {
    name: "AI 3D Product Configurator",
    description: [
      "Developed an innovative 3D product configurator using GPT-4 API for prompt engineering and UI/UX design.",
      "Skills: TypeScript, Node.js, React, OpenAI API, Prompt Engineering, Koa.js, UI/UX",
    ].join("</br>"),
  },
  {
    name: "Various Coding Projects",
    description: [
      "Developed a lightweight compiler for Lua in C, a diagram editor in C++/Qt, and an information system for organizing conferences using Django, React, and Postgres.",
      "Created numerous smaller projects including a packet sniffer, spreadsheet processors, and an IoT project.",
      "Written over 50 Python scripts for dataset preparation.",
    ].join("</br>"),
  },
  {
    name: "Machine Learning Projects",
    description: [
      "Developed several E2E ASR systems and fine-tuned Whisper model for Albaizyn ASR challenge and MTM22 challenge.",
      "Worked on NER using CRF and BERT, voice and image identification, and document classification using LDA.",
      "Utilized WandB extensively and explored quantization, pruning, and other optimizations for efficient inference.",
    ].join("</br>"),
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
    duration: "October 2020 — Present",
    description: "Top student with the highest grades",
    keywords: ["Python", "C/C++", "Machine Learning", "Deep Learning"],
    location: "Brno, Czechia",
  },
  {
    institution: "Unicorn University",
    degree: "Bachelor in Economics and Management",
    duration: "October 2018 — October 2020",
    description: "Top student with the highest grades",
    keywords: ["Economics", "Management", "Finance"],
    location: "Prague, Czechia",
  },
];

export const skillsData: SkillsData = {
  "Soft Skills": ["Teamwork", "Problem Solving", "Fast Learning"],
  "Hard Skills": [
    "JavaScript/TypeScript",
    "Python",
    "C/C++",
    "CSS/HTML",
    "Bash",
  ],
  Tools: [
    "React",
    "Node.js/Koa.js/Next.js",
    "Pytorch",
    "HuggingFace",
    "Django/Flask",
    "Postgres/MongoDB",
    "Docker/Kubernetes",
  ],
  Languages: ["Russian", "English", "Czech", "Belarusian"],
};

export const aboutMeData = [
  "Programming since the age of 17.",
  "I'm a software engineer with a blend of full-stack and machine learning experience.",
  "Studied at Brno University of Technology and Unicorn University, excelling as the top student with the highest grades. Pointlessly spent 3 years of my life studying 15 hours/day.",
  "Did some academic research at BUT Speech, mostly preparing data, pipelines, and experimenting with architectures (mostly for ASR and NER).",
  "When not coding, I indulge in hobbies like cycling, running, swimming, learning neural biology, economics and history.",
].join(" ");
