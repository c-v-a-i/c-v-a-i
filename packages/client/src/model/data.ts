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
      'Led the implementation of a chatbot to assist users in product configuration.',
      'Worked independently and as part of small teams, contributing to decision-making and liaising with UX/Management teams.',
    ],
  },
  // Add more work experiences here
]

export const educationData: EducationData[] = [
  {
    institution: 'Brno University of Technology',
    degree: 'Bachelor in Information Technology',
    duration: 'October 2020 — Present',
  },
  // Add more education data here
]

export const skillsData: SkillsData = {
  softSkills: [ 'Teamwork', 'Problem Solving', 'Fast Learning' ],
  hardSkills: [ 'JS/TS', 'Python', 'C/C++', 'CSS/HTML', 'Bash' ],
  tools: [ 'React', 'Node.js', 'Koa.js', 'Next.js', 'Pytorch', 'HuggingFace', 'Django' ],
}

export const projectsData: ProjectData[] = [
  {
    name: 'Fine-tuning of OpenAI Whisper model',
    description: 'Using Python and HuggingFace.',
  },
  // Add more project data here
]

export const achievementsData: AchievementData[] = [
  {
    name: 'Led the creation of the first AI 3D product configurator',
    description: '',
  },
  // Add more achievement data here
]