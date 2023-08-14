import { AchievementData, ContactInfoData, EducationData, ProjectData, SkillsData, WorkExperienceData } from './types'

export const contactInfoData: ContactInfoData = {
  LinkedIn: 'https://www.linkedin.com/in/aliaksandr-skuratovich-4a2ab01a0/',
  GitHub: 'https://github.com/SkuratovichA',
  Email: 'skuratovich.aliaksandr@gmail.com',
  Phone: '+420 735 594 008',
}

export const workExperienceData: WorkExperienceData[] = [
  {
    position: 'Full Stack Developer',
    company: 'Salsita Software',
    location: 'Prague',
    duration: 'February 2023 - present',
    responsibilities: [
      'Principal contributor in the development of an AI 3D product configurator, the first of its kind.',
      'Led the implementation of a chat bot to assist users in product configuration.',
      'Worked independently and as part of small team, contributing to decision-making and liaising with UX/Management teams.',
      "Skills: Typescript, React, Node.js, OpenAI API, Prompt Engineering"
    ],
  },
  {
    position: 'Junior Researcher',
    company: 'BUT Speech@FIT',
    location: 'Brno',
    duration: 'October 2021 - October 2022',
    responsibilities: [
      "Training and fine-tuning models for ASR and NLP tasks.",
      "Researching the state-of-the-art streamable ASR architectures such as RNNT.",
      "Using and contributing to the frameworks such as SpeechBrain, Nvidia NeM and HuggingFace."
    ],
  },
  {
    position: 'Junior Researcher',
    company: 'BUT VeriFIT',
    location: 'Brno',
    duration: 'May 2021 - October 2021',
    responsibilities: [
      "Writing asymptotic complexity analyzer (Looper) based on Facebook Infer framework.",
    ],
  },

]

export const projectsData: ProjectData[] = [
  {
    name: 'Creating a GPT-based chat bot for a 3D product configurator',
    description: 'A novel approach to product configuration using GPT-4. We take GPT-4 API, write the prompt and connect it with the 3D configurator. Pretty cool, huh?',
  },
  {
    name: 'Fine-tuning of OpenAI Whisper model',
    description: 'Using Python and HuggingFace for creating a training script for OpenAI Whisper model soon after the model was released. Fine-tuned it on Spanish data for Albayzin ASR challenge.',
  },
  {
    name: 'Lightweight compiler for Lua language',
    description: 'Written in C from scratch. Deep knowledge of both the compiler design and C language.',
  },
  {
    name: 'Joint intent classification and slot filling using BERT',
    description: 'Natural language processing masters course project - I just used BERT with a linear layer on top of it, trained a bunch of models, compare them and wrote a report. Nothing special.',
  },
  {
    name: 'KNN-based image classifier and BGMM-based speech classifiers',
    description: 'Machine learning and pattern recognition masters course project. Trained on a small unbalanced dataset. The classifiers were rated as the best among all students.',
  },
  {
    name: 'Latent Dirichlet Allocation for document and topic classification project',
    description: 'Bayesian statistics masters course project. I used Gibbs sampling and variational inference to train the model. I love Bayesian statistics because of its elegance and craziness.',
  },
  {
    name: 'Domain adaptation for speech recognition',
    description: 'During Machine Translation Marathon (MTM22), I was a lead developer in a team specialized on domain adaptation for ASR using Wav2Vec2 using transformer adapters.'
  },
  {
    name: 'Diagram editor',
    description: '8k lines of code written in C++ and QT from scratch during 15 days of a programming marathon.',
  },
]

export const achievementsData: AchievementData[] = [
  {
    name: 'Led the creation of the first AI 3D product configurator',
    description: '',
  },
]


export const educationData: EducationData[] = [
  {
    institution: 'Brno University of Technology',
    degree: 'Bachelor in Information Technology',
    duration: 'October 2020 — Present',
  },
  {
    institution: 'Unicorn University',
    degree: 'Bachelor in Economics and Management',
    duration: 'October 2018 — October 2020',
  },
]

export const skillsData: SkillsData = {
  'Soft Skills': [ 'Teamwork', 'Problem Solving', 'Fast Learning' ],
  'Hard Skills': [ 'JS/TS', 'Python', 'C/C++', 'CSS/HTML', 'Bash' ],
  'Tools': [ 'React', 'Node.js/Koa.js/Next.js', 'Pytorch', 'HuggingFace', 'Django/Flask', 'Postgres/MongoDB', 'Docker/Kubernetes' ],
  'Languages': [ 'Russian', 'English', 'Czech', 'Belarusian' ]
}

export const aboutMeData = [
  `Programming since the age of 15,`,
  `I'm a software engineer with a rich blend of full-stack and machine learning experience.`,
  `Originally from Belarus, I came to the Czech Republic to study at Brno University of Technology and Unicorn University, excelling as the top student with the highest grades.`,
  `My career spans from writing static analyzers, computer graphic engines, and compilers to leading novel approaches in AI 3D product configuration and prompt engineering.`,
  `I've also contributed to open-source frameworks and have been part of a machine learning research lab`,
  `focusing on speech technologies and natural language processing.`,
  `When not coding, I indulge in hobbies like cycling, running, swimming, learning neural biology economics and history.`,
  `My initiative, motivation, and ability to bridge theoretical knowledge with practical application set me apart in this rapidly evolving field.`
].join(' ')