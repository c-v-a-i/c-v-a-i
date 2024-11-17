import { ContactInfoData, EducationData, ProjectData, SkillsData, WorkExperienceData } from './types';

export const name: string = 'Aliaksandr Skuratovich';

const withDot = (str: string) => (str.endsWith('.') ? str : str + '.');

export const contactInfoData: ContactInfoData = {
  LinkedIn: 'https://www.linkedin.com/in/aliaksandr-skuratovich-4a2ab01a0/',
  GitHub: 'https://github.com/SkuratovichA',
  Email: 'skuratovich.aliaksandr@gmail.com',
  Phone: '+420 735 594 008',
};

export const workExperienceData: WorkExperienceData[] = [
  {
    position: 'Senior Software Engineer',
    company: 'Dishboard',
    type: 'Contract',
    location: 'Prague, Czechia',
    duration: '2024 - Present',
    responsibilities: [
      'Developing a financial application for restaurant businesses with a focus on data-driven features',
      'Built a data pipeline integrating an LLM with OCR for invoice auto-approval, improving approval rate by 45%',
      'Developed large features completely independently, including a whole new subscription model for the application',
      'Worked with external APIs, including Stripe API, POS integration APIs and CNB API',
    ].map(withDot),
    skills: ['NestJS', 'Python', 'TypeORM', 'ReactJS', 'OpenAI API', 'Stripe API', 'GraphQl', 'UX/UI'],
  },
  {
    position: 'Senior Software Engineer',
    company: 'Gen (ex Avast)',
    type: 'Full-time',
    location: 'Prague, Czechia',
    duration: '2024',
    responsibilities: [
      'Working on an internal projects for developers, product and project managers',
      'Built ETL pipelines to gather data from multiple sources and provide actionable insights',
      'Came up and developed AI-powered features to enhance the developer/user experience',
      'Handling different aspects of a project lifecycle: CI/CD, process establishment (Jira, Confluence), conflict resolution within the team, communication with end users/customers, and other possible stuff',
    ].map(withDot),
    skills: ['ReactJS', 'PSQL', 'TeamCity', 'GCP', 'ReactJS', 'Kubernetes', 'Docker'],
  },
  {
    position: 'Software Engineer',
    company: 'Salsita Software',
    type: 'Full-time',
    location: 'Prague, Czechia',
    duration: '2023 - 2024',
    responsibilities: [
      'Created a LLM-powered UI for a 3D product configurator, driving the company’s mid-term strategic goal',
      'Enhanced CI/CD pipelines and rescued eBay’s Social Hub platform, extending the contract by two quarters',
    ].map(withDot),
    skills: ['OpenAI API', 'Kotlin', 'NodeJS', 'ReactJS', 'GraphQL', 'Jenkins', 'ThreeJS'],
  },
  {
    position: 'AI Researcher',
    type: 'Full-time',
    company: 'BUT Speech',
    location: 'Brno, Czechia',
    duration: '2021 - 2023',
    responsibilities: [
      'Fine-tuned ASR models, enhancing Czech end-to-end ASR systems for Seznam.cz',
      'Won the 2nd place in Albaizyn challenge and the 3rd place on MTM22 marathon',
      'Specialized on data processing, joint models, efficient inference, and transformer adaptors',
      'Prepared over 20 large text and audio-visual datasets for training deep neural networks',
    ].map(withDot),
    skills: [
      'Academic Research in ASR/NLP',
      'Big Data',
      'Python',
      'Seaborn',
      'Pandas',
      'Pytorch/HuggingFace/Nvidia NeMo',
    ],
  },
];

export const projectsData: ProjectData[] = [
  {
    name: 'GPT-4 Powered CV Builder',
    description: ['Developing a CV builder using LLMs to generate, modify and review CVs'].map(withDot).join('</br>'),
    skills: ['TypeScript', 'NestJS', 'React', 'OpenAI API', 'GraphQl', 'UI/UX'],
  },
  {
    name: 'Various Coding Projects',
    description: [
      'Developed a compiler for Lua in C; a diagram editor in C++/Qt',
      'Specialized in database design and optimization. I love system design and complex DB architecture',
      'Written over 50 Python scripts for dataset processing',
      'Used to work with python Django framework for web development (a platform for research conference management)',
      'Smaller pet-projects including a packet sniffer, spreadsheet processors, and an IoT system for automatic light control',
    ]
      .map(withDot)
      .join('</br>'),
    skills: ['C/C++', 'Python', 'Django', 'Qt', 'Database Design', 'System Architecture'],
  },
  {
    name: 'Machine Learning Projects',
    description: [
      `Got the 2nd place in the Albayzin 2022 ASR challenge <a href="https://www.fit.vut.cz/research/group/speech/public/publi/2022/kocour22_iberspeech.pdf">link to paper</a>`,
      `Got the 3rd place in MTM22 (Machine Translation Marathon) by implementing an ASR model for TED talks using transformer adaptors`,
      "Created a joint model for person identification by speech and image. Implemented a logic for joining outputs from these two modalities <a href='https://github.com/SkuratovichA/SUR'>link to project</a>",
    ]
      .map(withDot)
      .join('</br>'),
    skills: ['Pytorch', 'HuggingFace', 'Nvidia NeMo', 'Seaborn', 'Pandas', 'NLP', 'ASR'],
  },
];

export const educationData: EducationData[] = [
  {
    institution: 'Brno University of Technology',
    degree: 'Bachelor in Information Technology',
    duration: '2020 — 2023',
    description: 'Top 1% student, specialized in AI, data analysis and theoretical computer science',
    keywords: ['Python', 'C/C++', 'Big Data', 'Machine Learning', 'Deep Learning'],
    location: 'Brno, Czechia',
  },
  {
    institution: 'Unicorn University',
    degree: 'Bachelor in Economics and Management',
    duration: '2018 — 2020',
    description: 'Not top 1% student',
    keywords: ['Economics', 'Management', 'Finance'],
    location: 'Prague, Czechia',
  },
];

export const skillsData: SkillsData = {
  'Soft Skills': ['Management', 'Team Leading', 'Working under tight deadlines', 'Problem Solving'],
  'Hard Skills': ['Software engineering', 'Database design', 'Prompt engineering', 'System architecture design'],
  Tools: [
    'TypeScript/Python/Kotlin',
    'ReactJS/RemixJS/NextJS',
    'NestJS/Express/Django/FastAPI/Spring',
    'Pytorch/HuggingFace',
    'REST/GraphQL',
    'Postgres/MongoDB/Redis',
    'Docker/Kubernetes',
    'TeamCity/Jenkins/Github Actions',
  ],
  Languages: ['Czech', 'English', 'Ukrainian'],
};

export const aboutMeData = [
  'An engineer with a mix of fullstack development experience and AI',
  'Proven track record in developing AI-powered solutions',
  'Skilled in managing project lifecycles from inception to deployment, including CI/CD pipelines',
  'When not working, I train for triathlons',
].map(withDot);