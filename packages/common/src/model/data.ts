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
    description: [
      `A novel approach to product configuration using GPT-4. We take GPT-4 API, write the prompt and connect it with the 3D configurator.`,
      `Skills: Typescript, Node.js, React.js, OpenAI API, Prompt Engineering, Koa.js, UI/UX`
      ].join('</br>'),
  },
  {
    name: 'A couple of coding projects',
    description: [
      `As light-weight compiler for Lua language as possible written purely in C without any side tools.`,
      `A diagram editor written in C++ and QT from scratch during 15 days of a programming marathon.`,
      `Information system for organizing conferences: Django + React + Postgres.`,
      `Smaller projects - packet sniffer, spreadsheet processors, a simple 3D engine in pure C++, IoT projects, bash scripts etc.`,
      `Written over 50 different Python scripts for dataset preparation`
    ].join('</br>'),
  },
  {
    name: 'A couple of ML projects',
    description: [
      `A dozen of different E2E ASR systems (including a streamable ones). Created a script for fine-tuning Whisper model back then when it was released. Participated in Albaizyn ASR challenge, MTM22 challenge (domain adaptation for ASR using W2V and transformer adaptors).`,
      `NER (both using CRF and BERT + projection layer).`,
      `Voice identification (BGMM) + image identification. Everything was trained on a small unbalanced dataset. The system won the challenge among all master students (I was in the second year of bachelor's).`,
      `Document and topic classification using LDA (trained using Gibbs sampling and Variational Bayes techniques).`,
      `Used WandB a lot. Still want to learn more about quantization, pruning and other optimizations for efficient inference.`
    ].join('</br>'),
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
  `Programming since the age of 17.`,
  `I'm a software engineer with a blend of full-stack and machine learning experience.`,
  `Studied at Brno University of Technology and Unicorn University, excelling as the top student with the highest grades. Pointlessly spent 3 years of my life studying 15 hours/day.`,
  `Did some academic research at BUT@Speech, mostly preparing data, pipelines, and experimenting with architectures (mostly for ASR and NER).`,
  `When not coding, I indulge in hobbies like cycling, running, swimming, learning neural biology, economics and history.`,
].join(' ')