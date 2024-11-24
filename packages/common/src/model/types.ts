export interface ProjectData {
  name: string;
  description: string;
  skills: string[];
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
  name: string; // name
  position: string; // description
  duration: string; // same as in EductionData
  location: string; // same as in EductionData
  type: string; // full-time / contract

  description: string;
  skills: string[];
}

export interface EducationData {
  name: string; // like company
  degree: string; // like position
  duration: string;
  location: string;
  type?: string; // on-site / distance

  description: string;
  skills: string[];
}
