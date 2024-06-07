export interface ProjectData {
  name: string;
  description: string;
}
export interface AchievementData {
  name: string;
  description: string;
}

export interface SkillsData {
  [key: string]: string[];
}

export interface ContactInfoData {
  [key: string]: string;
}

export interface WorkExperienceData {
  position: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  responsibilities: string[];
}

export interface EducationData {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  description: string;
  keywords: string[];
}
