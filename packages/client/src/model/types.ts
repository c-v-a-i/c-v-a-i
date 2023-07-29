export interface ProjectData {
  name: string;
  description: string;
}
export interface AchievementData {
  name: string;
  description: string;
}

export interface SkillsData {
  softSkills: string[];
  hardSkills: string[];
  tools: string[];
}

export interface ContactInfoData {
  linkedIn: string;
  gitHub: string;
}

export interface WorkExperienceData {
  position: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
}

export interface EducationData {
  institution: string;
  degree: string;
  duration: string;
}
