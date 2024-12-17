import type { AboutMe } from '../../../../../libs/schemas';

const withDot = (str: string) => (str.endsWith('.') ? str : str + '.');
type OmitId<T> = Omit<T, '_id'>;

export const exampleEducationEntries = [
  {
    name: 'Brno University of Technology',
    degree: 'Bachelor in Information Technology',
    duration: '2020 — 2023',
    description:
      'Top 1% student, specialized in AI, data analysis and theoretical computer science',
    skills: [
      'Python',
      'C/C++',
      'Big Data',
      'Machine Learning',
      'Deep Learning',
    ],
    location: 'Brno, Czechia',
  },
  {
    name: 'Unicorn University',
    degree: 'Bachelor in Economics and Management',
    duration: '2018 — 2020',
    description: 'Not top 1% student',
    skills: ['Economics', 'Management', 'Finance'],
    location: 'Prague, Czechia',
  },
];

export const exampleWorkExperienceEntries = [
  {
    position: 'Senior Software Engineer',
    name: 'Dishboard',
    type: 'Contract',
    location: 'Prague, Czechia',
    duration: '2024 - Present',
    description: [
      'Developing a financial application for restaurant businesses with a focus on data-driven features',
      'Built a data pipeline integrating an LLM with OCR for invoice auto-approval, improving approval rate by 45%',
      'Developed large features completely independently, including a whole new subscription model for the application',
      'Worked with external APIs, including Stripe API, POS integration APIs and CNB API',
    ]
      .map(withDot)
      .join('\n'),
    skills: [
      'NestJS',
      'Python',
      'TypeORM',
      'ReactJS',
      'OpenAI API',
      'Stripe API',
      'GraphQl',
      'UX/UI',
    ],
  },
  {
    position: 'Senior Software Engineer',
    name: 'Gen (ex Avast)',
    type: 'Full-time',
    location: 'Prague, Czechia',
    duration: '2024',
    description: [
      'Working on an internal projects for developers, product and project managers',
      'Built ETL pipelines to gather data from multiple sources and provide actionable insights',
      'Came up and developed AI-powered features to enhance the developer/user experience',
      'Handling different aspects of a project lifecycle: CI/CD, process establishment (Jira, Confluence), conflict resolution within the team, communication with end users/customers, and other possible stuff',
    ]
      .map(withDot)
      .join('\n'),
    skills: [
      'ReactJS',
      'PSQL',
      'TeamCity',
      'GCP',
      'ReactJS',
      'Kubernetes',
      'Docker',
    ],
  },
  {
    position: 'Software Engineer',
    name: 'Salsita Software',
    type: 'Full-time',
    location: 'Prague, Czechia',
    duration: '2023 - 2024',
    description: [
      'Created a LLM-powered UI for a 3D product configurator, driving the company’s mid-term strategic goal',
      'Enhanced CI/CD pipelines and rescued eBay’s Social Hub platform, extending the contract by two quarters',
    ]
      .map(withDot)
      .join('\n'),
    skills: [
      'OpenAI API',
      'Kotlin',
      'NodeJS',
      'ReactJS',
      'GraphQL',
      'Jenkins',
      'ThreeJS',
    ],
  },
  {
    position: 'AI Researcher',
    type: 'Full-time',
    name: 'BUT Speech',
    location: 'Brno, Czechia',
    duration: '2021 - 2023',
    description: [
      'Fine-tuned ASR models, enhancing Czech end-to-end ASR systems for Seznam.cz',
      'Won the 2nd place in Albaizyn challenge and the 3rd place on MTM22 marathon',
      'Specialized on data processing, joint models, efficient inference, and transformer adaptors',
      'Prepared over 20 large text and audio-visual datasets for training deep neural networks',
    ]
      .map(withDot)
      .join('\n'),
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

export const exampleProjectEntries = [
  {
    name: 'GPT-4 Powered CV Builder',
    description: [
      'Developing a CV builder using LLMs to generate, modify and review CVs',
    ]
      .map(withDot)
      .join('\n'),
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
      .join('\n'),
    skills: [
      'C/C++',
      'Python',
      'Django',
      'Qt',
      'Database Design',
      'System Architecture',
    ],
  },
  {
    name: 'Machine Learning Projects',
    description: [
      `Got the 2nd place in the [Albayzin 2022 ASR challenge](https://www.fit.vut.cz/research/group/speech/public/publi/2022/kocour22_iberspeech.pdf)`,
      `Got the 3rd place in MTM22 (Machine Translation Marathon) by implementing an ASR model for TED talks using transformer adaptors`,
      'Created a [joint model](https://github.com/SkuratovichA/SUR) for person identification by speech and image. Implemented a logic for joining outputs from these two modalities',
    ]
      .map(withDot)
      .join('\n'),
    skills: [
      'Pytorch',
      'HuggingFace',
      'Nvidia NeMo',
      'Seaborn',
      'Pandas',
      'NLP',
      'ASR',
    ],
  },
];

export const exampleContactInfoEntries = [
  {
    linkName: 'LinkedIn',
    link: 'https://www.linkedin.com/in/aliaksandr-skuratovich-4a2ab01a0',
  },
  {
    linkName: 'Github',
    link: 'github.com/SkuratovichA',
  },
  {
    linkName: 'Email',
    link: 'skuratovich.aliaksandr@gmail.com',
  },
];

export const exampleSkillEntries = [
  {
    category: 'Soft Skills',
    items: [
      'Management',
      'Team Leading',
      'Working under tight deadlines',
      'Problem Solving',
    ],
  },
  {
    category: 'Tools',
    items: [
      'TypeScript/Python/Kotlin',
      'ReactJS/RemixJS/NextJS',
      'NestJS/Express/Django/FastAPI/Spring',
      'Pytorch/HuggingFace',
      'REST/GraphQL',
      'Postgres/MongoDB/Redis',
      'Docker/Kubernetes',
      'TeamCity/Jenkins/Github Actions',
    ],
  },
  {
    category: 'Languages',
    items: ['Czech', 'English', 'Ukrainian'],
  },
];

export const exampleAboutMe: OmitId<AboutMe> = {
  name: 'Skuratovich Aliaksandr',
  fieldName: 'whoami',
  description: [
    'An engineer with a mix of fullstack development experience and AI',
    'Proven track record in developing AI-powered solutions',
    'Skilled in managing project lifecycles from inception to deployment, including CI/CD pipelines',
    'When not working, I train for triathlons',
  ]
    .map(withDot)
    .join('\n'),
};
