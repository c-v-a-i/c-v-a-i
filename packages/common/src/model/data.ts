import { AchievementData, ContactInfoData, EducationData, ProjectData, SkillsData, WorkExperienceData } from './types'

export const contactInfoData: ContactInfoData = {
  linkedIn: 'Aliaksandr Skuratovich',
  gitHub: 'SkuratovichA',
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
]

export const projectsData: ProjectData[] = [
  {
    name: 'Fine-tuning of OpenAI Whisper model',
    description: 'Using Python and HuggingFace. The repo could be found here: https://github.com/SkuratovichA/whisper_ft',
  },
  {
    name: 'Creating a GPT-based chat bot for a 3D product configurator',
    description: 'A novel approach to product configuration using GPT-4',
  },
  {
    name: 'Creating a GPT-based chat bot for a 3D product configurator',
    description: 'A novel approach to product configuration using GPT-4',
  },
  {
    name: 'KNN-based image classifier and BGMM-based speech classifiers',
    description: 'Machine learning and pattern recognition masters course project. Trained on a small unbalanced dataset. The classifiers were rated as the best among all students.',
  },
  {
    name: 'Latent Dirichlet Allocation for document and topic classification project',
    description: 'Bayesian statistics masters course project',
  },
  {
    name: 'Joint intent classification and slot filling using BERT',
    description: 'Natural language processing masters course project',
  },
  {
    name: 'Lightweight compiler for Lua language',
    description: 'Written in C from scratch. Deep knowledge of both the compiler design and C language.',
  },
  {
    name: 'Diagram editor',
    description: 'Written in C++ and QT from scratch during 15 days of a programming marathon.',
  },
  {
    name: 'Domain adaptation for speech recognition',
    description: 'During Machine Translation Marathon (MTM22), I was a lead developer in a team specialized on domain adaptation for ASR using Wav2Vec2 using transformer adapters.'
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
  softSkills: [ 'Teamwork', 'Problem Solving', 'Fast Learning' ],
  hardSkills: [ 'JS/TS', 'Python', 'C/C++', 'CSS/HTML', 'Bash' ],
  tools: [ 'React', 'Node.js', 'Koa.js', 'Next.js', 'Pytorch', 'HuggingFace', 'Django' ],
}