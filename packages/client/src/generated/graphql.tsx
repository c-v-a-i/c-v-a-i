import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '../graphql/customGqlComponents';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any };
  /** The `Upload` scalar type represents a file upload. */
  Upload: { input: any; output: any };
};

export type AboutMe = {
  __typename?: 'AboutMe';
  description: Scalars['String']['output'];
  fieldName: Scalars['String']['output'];
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  _id: Scalars['ID']['output'];
  link: Scalars['String']['output'];
  linkName: Scalars['String']['output'];
  positionIndex: Scalars['Float']['output'];
};

export type ConvertPdfToCvObjectType = {
  __typename?: 'ConvertPdfToCvObjectType';
  comment: Scalars['String']['output'];
  cv?: Maybe<CvObjectType>;
};

export enum CvEntryType {
  ContactInfo = 'CONTACT_INFO',
  Education = 'EDUCATION',
  Project = 'PROJECT',
  Skill = 'SKILL',
  WorkExperience = 'WORK_EXPERIENCE',
}

export type CvObjectType = {
  __typename?: 'CvObjectType';
  _id: Scalars['ID']['output'];
  aboutMe?: Maybe<AboutMe>;
  contactInfoEntries?: Maybe<Array<ContactInfo>>;
  educationEntries?: Maybe<Array<Education>>;
  name: Scalars['String']['output'];
  projectEntries?: Maybe<Array<Project>>;
  skillEntries?: Maybe<Array<Skill>>;
  title: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  versionCreatedAt: Scalars['DateTime']['output'];
  versionId: Scalars['ID']['output'];
  versionNumber: Scalars['Float']['output'];
  workExperienceEntries?: Maybe<Array<WorkExperience>>;
};

export type CvVersionHistoryEntryObjectType = {
  __typename?: 'CvVersionHistoryEntryObjectType';
  _id: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  isCurrentVersion: Scalars['Boolean']['output'];
  versionNumber: Scalars['Float']['output'];
};

export type Education = {
  __typename?: 'Education';
  _id: Scalars['ID']['output'];
  degree: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  positionIndex: Scalars['Int']['output'];
  skills?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type GenerateNewEntryItemObjectType = {
  __typename?: 'GenerateNewEntryItemObjectType';
  contactInfoEntries?: Maybe<Array<ContactInfo>>;
  educationEntries?: Maybe<Array<Education>>;
  projectEntries?: Maybe<Array<Project>>;
  skillEntries?: Maybe<Array<Skill>>;
  workExperienceEntries?: Maybe<Array<WorkExperience>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  convertPdfToCv: ConvertPdfToCvObjectType;
  createCvFromVersion: CvObjectType;
  createNewCv: CvObjectType;
  deleteCv: Scalars['Boolean']['output'];
  deleteCvEntryItem: Scalars['Boolean']['output'];
  deleteEntryItem: Scalars['Boolean']['output'];
  generateNewEntryItem: GenerateNewEntryItemObjectType;
  logout: Scalars['Boolean']['output'];
  redoCvVersion: CvObjectType;
  reviewCv: ReviewCvOutput;
  transformCv: TransformCvObjectType;
  undoCvVersion: CvObjectType;
  updateCv: CvObjectType;
};

export type MutationConvertPdfToCvArgs = {
  file: Scalars['Upload']['input'];
};

export type MutationCreateCvFromVersionArgs = {
  cvId: Scalars['ID']['input'];
  versionId: Scalars['ID']['input'];
};

export type MutationCreateNewCvArgs = {
  templateId: Scalars['ID']['input'];
};

export type MutationDeleteCvArgs = {
  cvId: Scalars['ID']['input'];
};

export type MutationDeleteCvEntryItemArgs = {
  cvId: Scalars['ID']['input'];
  entryFieldName: CvEntryType;
  entryItemId: Scalars['ID']['input'];
};

export type MutationDeleteEntryItemArgs = {
  cvId: Scalars['ID']['input'];
  entryFieldName: CvEntryType;
  entryItemId: Scalars['ID']['input'];
};

export type MutationGenerateNewEntryItemArgs = {
  cvId: Scalars['ID']['input'];
  entryFieldName: CvEntryType;
};

export type MutationRedoCvVersionArgs = {
  cvId: Scalars['ID']['input'];
};

export type MutationReviewCvArgs = {
  cvId: Scalars['ID']['input'];
};

export type MutationTransformCvArgs = {
  message: Scalars['String']['input'];
  templateId: Scalars['String']['input'];
};

export type MutationUndoCvVersionArgs = {
  cvId: Scalars['ID']['input'];
};

export type MutationUpdateCvArgs = {
  cvId: Scalars['ID']['input'];
  data: UpdateCvInput;
};

export type PaginatedCvVersionHistoryObjectType = {
  __typename?: 'PaginatedCvVersionHistoryObjectType';
  items: Array<CvVersionHistoryEntryObjectType>;
  paginationMetadata: PaginationMetadataObjectType;
};

export type PaginationMetadataObjectType = {
  __typename?: 'PaginationMetadataObjectType';
  currentPage: Scalars['Int']['output'];
  pageSize: Scalars['Int']['output'];
  totalItems: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  positionIndex: Scalars['Int']['output'];
  skills?: Maybe<Array<Scalars['String']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  getCv: CvObjectType;
  getCvVersionHistory: PaginatedCvVersionHistoryObjectType;
  getCvs: Array<CvObjectType>;
  getReviewStatus: ReviewStatusType;
  getVersioningActionsMetadata: VersioningActionsMetadataObjectType;
};

export type QueryGetCvArgs = {
  cvId: Scalars['ID']['input'];
  versionId?: InputMaybe<Scalars['ID']['input']>;
};

export type QueryGetCvVersionHistoryArgs = {
  cvId: Scalars['ID']['input'];
};

export type QueryGetReviewStatusArgs = {
  cvId: Scalars['ID']['input'];
};

export type QueryGetVersioningActionsMetadataArgs = {
  cvId: Scalars['ID']['input'];
};

export type ReviewCvOutput = {
  __typename?: 'ReviewCvOutput';
  messages: Array<Scalars['String']['output']>;
};

export enum ReviewStatusType {
  AlreadyReviewed = 'ALREADY_REVIEWED',
  NoReviewsRemain = 'NO_REVIEWS_REMAIN',
  NoSubscription = 'NO_SUBSCRIPTION',
  ReadyForReview = 'READY_FOR_REVIEW',
}

export type ScopeObjectType = {
  __typename?: 'ScopeObjectType';
  googleId: Scalars['String']['output'];
};

export type Skill = {
  __typename?: 'Skill';
  _id: Scalars['ID']['output'];
  category: Scalars['String']['output'];
  positionIndex: Scalars['Int']['output'];
  skills: Array<Scalars['String']['output']>;
};

export type TransformCvObjectType = {
  __typename?: 'TransformCvObjectType';
  comment: Scalars['String']['output'];
  cv: CvObjectType;
};

export type UpdateAboutMeInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  fieldName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContactInfoInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  link?: InputMaybe<Scalars['String']['input']>;
  linkName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCvInput = {
  aboutMe?: InputMaybe<UpdateAboutMeInput>;
  contactInfoEntries?: InputMaybe<Array<UpdateContactInfoInput>>;
  educationEntries?: InputMaybe<Array<UpdateEducationInput>>;
  name?: InputMaybe<Scalars['String']['input']>;
  projectEntries?: InputMaybe<Array<UpdateProjectInput>>;
  skillEntries?: InputMaybe<Array<UpdateSkillInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
  workExperienceEntries?: InputMaybe<Array<UpdateWorkExperienceInput>>;
};

export type UpdateEducationInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  degree?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProjectInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateSkillInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  category?: InputMaybe<Scalars['String']['input']>;
  positionIndex?: InputMaybe<Scalars['Int']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateWorkExperienceInput = {
  _id?: InputMaybe<Scalars['ID']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  deletedAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  googleId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type VersioningActionsMetadataObjectType = {
  __typename?: 'VersioningActionsMetadataObjectType';
  canRedo: Scalars['Boolean']['output'];
  canUndo: Scalars['Boolean']['output'];
};

export type WorkExperience = {
  __typename?: 'WorkExperience';
  _id: Scalars['ID']['output'];
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  positionIndex: Scalars['Int']['output'];
  skills?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type CvFragment = {
  __typename?: 'CvObjectType';
  _id: string;
  title: string;
  name: string;
  aboutMe?: {
    __typename?: 'AboutMe';
    fieldName: string;
    description: string;
  } | null;
  contactInfoEntries?: Array<{
    __typename?: 'ContactInfo';
    _id: string;
    linkName: string;
    positionIndex: number;
    link: string;
  }> | null;
  workExperienceEntries?: Array<{
    __typename?: 'WorkExperience';
    _id: string;
    name: string;
    position: string;
    duration?: string | null;
    location?: string | null;
    type?: string | null;
    description?: string | null;
    skills?: Array<string> | null;
    positionIndex: number;
  }> | null;
  projectEntries?: Array<{
    __typename?: 'Project';
    _id: string;
    name: string;
    description?: string | null;
    skills?: Array<string> | null;
    positionIndex: number;
  }> | null;
  educationEntries?: Array<{
    __typename?: 'Education';
    _id: string;
    name: string;
    description?: string | null;
    degree: string;
    location?: string | null;
    duration?: string | null;
    skills?: Array<string> | null;
    positionIndex: number;
  }> | null;
  skillEntries?: Array<{
    __typename?: 'Skill';
    _id: string;
    category: string;
    skills: Array<string>;
    positionIndex: number;
  }> | null;
};

export type AboutMeFragment = {
  __typename?: 'AboutMe';
  fieldName: string;
  description: string;
};

export type ContactInfoFragment = {
  __typename?: 'ContactInfo';
  _id: string;
  linkName: string;
  positionIndex: number;
  link: string;
};

export type WorkExperienceFragment = {
  __typename?: 'WorkExperience';
  _id: string;
  name: string;
  position: string;
  duration?: string | null;
  location?: string | null;
  type?: string | null;
  description?: string | null;
  skills?: Array<string> | null;
  positionIndex: number;
};

export type ProjectFragment = {
  __typename?: 'Project';
  _id: string;
  name: string;
  description?: string | null;
  skills?: Array<string> | null;
  positionIndex: number;
};

export type EducationFragment = {
  __typename?: 'Education';
  _id: string;
  name: string;
  description?: string | null;
  degree: string;
  location?: string | null;
  duration?: string | null;
  skills?: Array<string> | null;
  positionIndex: number;
};

export type SkillFragment = {
  __typename?: 'Skill';
  _id: string;
  category: string;
  skills: Array<string>;
  positionIndex: number;
};

export type UpdateCvMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  data: UpdateCvInput;
}>;

export type UpdateCvMutation = {
  __typename?: 'Mutation';
  updateCv: {
    __typename?: 'CvObjectType';
    _id: string;
    title: string;
    name: string;
    aboutMe?: {
      __typename?: 'AboutMe';
      fieldName: string;
      description: string;
    } | null;
    contactInfoEntries?: Array<{
      __typename?: 'ContactInfo';
      _id: string;
      linkName: string;
      positionIndex: number;
      link: string;
    }> | null;
    workExperienceEntries?: Array<{
      __typename?: 'WorkExperience';
      _id: string;
      name: string;
      position: string;
      duration?: string | null;
      location?: string | null;
      type?: string | null;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    projectEntries?: Array<{
      __typename?: 'Project';
      _id: string;
      name: string;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    educationEntries?: Array<{
      __typename?: 'Education';
      _id: string;
      name: string;
      description?: string | null;
      degree: string;
      location?: string | null;
      duration?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    skillEntries?: Array<{
      __typename?: 'Skill';
      _id: string;
      category: string;
      skills: Array<string>;
      positionIndex: number;
    }> | null;
  };
};

export type GenerateNewEntryItemMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  entryType: CvEntryType;
}>;

export type GenerateNewEntryItemMutation = {
  __typename?: 'Mutation';
  generateNewEntryItem: {
    __typename?: 'GenerateNewEntryItemObjectType';
    contactInfoEntries?: Array<{
      __typename?: 'ContactInfo';
      _id: string;
      linkName: string;
      positionIndex: number;
      link: string;
    }> | null;
    educationEntries?: Array<{
      __typename?: 'Education';
      _id: string;
      name: string;
      description?: string | null;
      degree: string;
      location?: string | null;
      duration?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    projectEntries?: Array<{
      __typename?: 'Project';
      _id: string;
      name: string;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    skillEntries?: Array<{
      __typename?: 'Skill';
      _id: string;
      category: string;
      skills: Array<string>;
      positionIndex: number;
    }> | null;
    workExperienceEntries?: Array<{
      __typename?: 'WorkExperience';
      _id: string;
      name: string;
      position: string;
      duration?: string | null;
      location?: string | null;
      type?: string | null;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
  };
};

export type UpdateCvNameMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
}>;

export type UpdateCvNameMutation = {
  __typename?: 'Mutation';
  updateCv: { __typename?: 'CvObjectType'; name: string };
};

export type DeleteEntryItemMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  entryType: CvEntryType;
  entryItemId: Scalars['ID']['input'];
}>;

export type DeleteEntryItemMutation = {
  __typename?: 'Mutation';
  deleteEntryItem: boolean;
};

export type GetSkillEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetSkillEntriesQuery = {
  __typename?: 'Query';
  getCv: {
    __typename?: 'CvObjectType';
    skillEntries?: Array<{
      __typename?: 'Skill';
      _id: string;
      category: string;
      skills: Array<string>;
      positionIndex: number;
    }> | null;
  };
};

export type GetNameQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetNameQuery = {
  __typename?: 'Query';
  getCv: { __typename?: 'CvObjectType'; name: string };
};

export type GetEducationEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetEducationEntriesQuery = {
  __typename?: 'Query';
  getCv: {
    __typename?: 'CvObjectType';
    educationEntries?: Array<{
      __typename?: 'Education';
      _id: string;
      name: string;
      description?: string | null;
      degree: string;
      location?: string | null;
      duration?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
  };
};

export type GetCvQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
  versionId?: InputMaybe<Scalars['ID']['input']>;
}>;

export type GetCvQuery = {
  __typename?: 'Query';
  getCv: {
    __typename?: 'CvObjectType';
    _id: string;
    title: string;
    name: string;
    aboutMe?: {
      __typename?: 'AboutMe';
      fieldName: string;
      description: string;
    } | null;
    contactInfoEntries?: Array<{
      __typename?: 'ContactInfo';
      _id: string;
      linkName: string;
      positionIndex: number;
      link: string;
    }> | null;
    workExperienceEntries?: Array<{
      __typename?: 'WorkExperience';
      _id: string;
      name: string;
      position: string;
      duration?: string | null;
      location?: string | null;
      type?: string | null;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    projectEntries?: Array<{
      __typename?: 'Project';
      _id: string;
      name: string;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    educationEntries?: Array<{
      __typename?: 'Education';
      _id: string;
      name: string;
      description?: string | null;
      degree: string;
      location?: string | null;
      duration?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    skillEntries?: Array<{
      __typename?: 'Skill';
      _id: string;
      category: string;
      skills: Array<string>;
      positionIndex: number;
    }> | null;
  };
};

export type GetContactInfoEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetContactInfoEntriesQuery = {
  __typename?: 'Query';
  getCv: {
    __typename?: 'CvObjectType';
    contactInfoEntries?: Array<{
      __typename?: 'ContactInfo';
      _id: string;
      linkName: string;
      positionIndex: number;
      link: string;
    }> | null;
  };
};

export type GetAboutMeQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetAboutMeQuery = {
  __typename?: 'Query';
  getCv: {
    __typename?: 'CvObjectType';
    aboutMe?: {
      __typename?: 'AboutMe';
      fieldName: string;
      description: string;
    } | null;
  };
};

export type GetWorkExperienceEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetWorkExperienceEntriesQuery = {
  __typename?: 'Query';
  getCv: {
    __typename?: 'CvObjectType';
    workExperienceEntries?: Array<{
      __typename?: 'WorkExperience';
      _id: string;
      name: string;
      position: string;
      duration?: string | null;
      location?: string | null;
      type?: string | null;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
  };
};

export type GetProjectEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetProjectEntriesQuery = {
  __typename?: 'Query';
  getCv: {
    __typename?: 'CvObjectType';
    projectEntries?: Array<{
      __typename?: 'Project';
      _id: string;
      name: string;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
  };
};

export type CheckCvQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type CheckCvQuery = {
  __typename?: 'Query';
  getCv: { __typename?: 'CvObjectType'; _id: string };
};

export type ConvertPdfToCvMutationVariables = Exact<{
  file: Scalars['Upload']['input'];
}>;

export type ConvertPdfToCvMutation = {
  __typename?: 'Mutation';
  convertPdfToCv: { __typename?: 'ConvertPdfToCvObjectType'; comment: string };
};

export type GetReviewStatusQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetReviewStatusQuery = {
  __typename?: 'Query';
  getReviewStatus: ReviewStatusType;
};

export type ReviewCvMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type ReviewCvMutation = {
  __typename?: 'Mutation';
  reviewCv: { __typename?: 'ReviewCvOutput'; messages: Array<string> };
};

export type UndoCvVersionMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type UndoCvVersionMutation = {
  __typename?: 'Mutation';
  undoCvVersion: {
    __typename?: 'CvObjectType';
    _id: string;
    title: string;
    name: string;
    aboutMe?: {
      __typename?: 'AboutMe';
      fieldName: string;
      description: string;
    } | null;
    contactInfoEntries?: Array<{
      __typename?: 'ContactInfo';
      _id: string;
      linkName: string;
      positionIndex: number;
      link: string;
    }> | null;
    workExperienceEntries?: Array<{
      __typename?: 'WorkExperience';
      _id: string;
      name: string;
      position: string;
      duration?: string | null;
      location?: string | null;
      type?: string | null;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    projectEntries?: Array<{
      __typename?: 'Project';
      _id: string;
      name: string;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    educationEntries?: Array<{
      __typename?: 'Education';
      _id: string;
      name: string;
      description?: string | null;
      degree: string;
      location?: string | null;
      duration?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    skillEntries?: Array<{
      __typename?: 'Skill';
      _id: string;
      category: string;
      skills: Array<string>;
      positionIndex: number;
    }> | null;
  };
};

export type RedoCvVersionMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type RedoCvVersionMutation = {
  __typename?: 'Mutation';
  redoCvVersion: {
    __typename?: 'CvObjectType';
    _id: string;
    title: string;
    name: string;
    aboutMe?: {
      __typename?: 'AboutMe';
      fieldName: string;
      description: string;
    } | null;
    contactInfoEntries?: Array<{
      __typename?: 'ContactInfo';
      _id: string;
      linkName: string;
      positionIndex: number;
      link: string;
    }> | null;
    workExperienceEntries?: Array<{
      __typename?: 'WorkExperience';
      _id: string;
      name: string;
      position: string;
      duration?: string | null;
      location?: string | null;
      type?: string | null;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    projectEntries?: Array<{
      __typename?: 'Project';
      _id: string;
      name: string;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    educationEntries?: Array<{
      __typename?: 'Education';
      _id: string;
      name: string;
      description?: string | null;
      degree: string;
      location?: string | null;
      duration?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    skillEntries?: Array<{
      __typename?: 'Skill';
      _id: string;
      category: string;
      skills: Array<string>;
      positionIndex: number;
    }> | null;
  };
};

export type CreateCvFromVersionMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  versionId: Scalars['ID']['input'];
}>;

export type CreateCvFromVersionMutation = {
  __typename?: 'Mutation';
  createCvFromVersion: {
    __typename?: 'CvObjectType';
    _id: string;
    title: string;
    name: string;
    aboutMe?: {
      __typename?: 'AboutMe';
      fieldName: string;
      description: string;
    } | null;
    contactInfoEntries?: Array<{
      __typename?: 'ContactInfo';
      _id: string;
      linkName: string;
      positionIndex: number;
      link: string;
    }> | null;
    workExperienceEntries?: Array<{
      __typename?: 'WorkExperience';
      _id: string;
      name: string;
      position: string;
      duration?: string | null;
      location?: string | null;
      type?: string | null;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    projectEntries?: Array<{
      __typename?: 'Project';
      _id: string;
      name: string;
      description?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    educationEntries?: Array<{
      __typename?: 'Education';
      _id: string;
      name: string;
      description?: string | null;
      degree: string;
      location?: string | null;
      duration?: string | null;
      skills?: Array<string> | null;
      positionIndex: number;
    }> | null;
    skillEntries?: Array<{
      __typename?: 'Skill';
      _id: string;
      category: string;
      skills: Array<string>;
      positionIndex: number;
    }> | null;
  };
};

export type GetCvVersionHistoryQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetCvVersionHistoryQuery = {
  __typename?: 'Query';
  getCvVersionHistory: {
    __typename?: 'PaginatedCvVersionHistoryObjectType';
    items: Array<{
      __typename?: 'CvVersionHistoryEntryObjectType';
      _id: string;
      versionNumber: number;
      isCurrentVersion: boolean;
      createdAt: any;
    }>;
    paginationMetadata: {
      __typename?: 'PaginationMetadataObjectType';
      totalItems: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
    };
  };
};

export type GetVersioningActionsMetadataQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type GetVersioningActionsMetadataQuery = {
  __typename?: 'Query';
  getVersioningActionsMetadata: {
    __typename?: 'VersioningActionsMetadataObjectType';
    canUndo: boolean;
    canRedo: boolean;
  };
};

export type CreateCvMutationVariables = Exact<{
  templateId: Scalars['ID']['input'];
}>;

export type CreateCvMutation = {
  __typename?: 'Mutation';
  createNewCv: { __typename?: 'CvObjectType'; _id: string; title: string };
};

export type DeleteCvMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;

export type DeleteCvMutation = { __typename?: 'Mutation'; deleteCv: boolean };

export type GetCvsQueryVariables = Exact<{ [key: string]: never }>;

export type GetCvsQuery = {
  __typename?: 'Query';
  getCvs: Array<{ __typename?: 'CvObjectType'; _id: string; name: string }>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type GetCurrentUserQuery = {
  __typename?: 'Query';
  currentUser: {
    __typename?: 'User';
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    googleId: string;
    createdAt: any;
    deletedAt?: any | null;
  };
};

export type TransformCvMutationVariables = Exact<{
  templateId: Scalars['String']['input'];
  message: Scalars['String']['input'];
}>;

export type TransformCvMutation = {
  __typename?: 'Mutation';
  transformCv: {
    __typename?: 'TransformCvObjectType';
    comment: string;
    cv: { __typename?: 'CvObjectType'; _id: string };
  };
};

export const AboutMeFragmentDoc = gql`
  fragment AboutMeFragment on AboutMe {
    fieldName
    description
  }
`;
export const ContactInfoFragmentDoc = gql`
  fragment ContactInfoFragment on ContactInfo {
    _id
    linkName
    positionIndex
    link
  }
`;
export const WorkExperienceFragmentDoc = gql`
  fragment WorkExperienceFragment on WorkExperience {
    _id
    name
    position
    duration
    location
    type
    description
    skills
    positionIndex
  }
`;
export const ProjectFragmentDoc = gql`
  fragment ProjectFragment on Project {
    _id
    name
    description
    skills
    positionIndex
  }
`;
export const EducationFragmentDoc = gql`
  fragment EducationFragment on Education {
    _id
    name
    description
    degree
    location
    duration
    skills
    positionIndex
  }
`;
export const SkillFragmentDoc = gql`
  fragment SkillFragment on Skill {
    _id
    category
    skills
    positionIndex
  }
`;
export const CvFragmentDoc = gql`
  fragment CvFragment on CvObjectType {
    _id
    title
    name
    aboutMe {
      ...AboutMeFragment
    }
    contactInfoEntries {
      ...ContactInfoFragment
    }
    workExperienceEntries {
      ...WorkExperienceFragment
    }
    projectEntries {
      ...ProjectFragment
    }
    educationEntries {
      ...EducationFragment
    }
    skillEntries {
      ...SkillFragment
    }
  }
  ${AboutMeFragmentDoc}
  ${ContactInfoFragmentDoc}
  ${WorkExperienceFragmentDoc}
  ${ProjectFragmentDoc}
  ${EducationFragmentDoc}
  ${SkillFragmentDoc}
`;
export const UpdateCvDocument = gql`
  mutation UpdateCv($cvId: ID!, $data: UpdateCvInput!) {
    updateCv(cvId: $cvId, data: $data) {
      ...CvFragment
    }
  }
  ${CvFragmentDoc}
`;
export type UpdateCvMutationFn = Apollo.MutationFunction<
  UpdateCvMutation,
  UpdateCvMutationVariables
>;
export type UpdateCvComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCvMutation,
    UpdateCvMutationVariables
  >,
  'mutation'
>;

export const UpdateCvComponent = (props: UpdateCvComponentProps) => (
  <ApolloReactComponents.Mutation<UpdateCvMutation, UpdateCvMutationVariables>
    mutation={UpdateCvDocument}
    {...props}
  />
);

/**
 * __useUpdateCvMutation__
 *
 * To run a mutation, you first call `useUpdateCvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCvMutation, { data, loading, error }] = useUpdateCvMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCvMutation,
    UpdateCvMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateCvMutation, UpdateCvMutationVariables>(
    UpdateCvDocument,
    options
  );
}
export type UpdateCvMutationHookResult = ReturnType<typeof useUpdateCvMutation>;
export type UpdateCvMutationResult = Apollo.MutationResult<UpdateCvMutation>;
export type UpdateCvMutationOptions = Apollo.BaseMutationOptions<
  UpdateCvMutation,
  UpdateCvMutationVariables
>;
export const GenerateNewEntryItemDocument = gql`
  mutation GenerateNewEntryItem($cvId: ID!, $entryType: CvEntryType!) {
    generateNewEntryItem(cvId: $cvId, entryFieldName: $entryType) {
      contactInfoEntries {
        ...ContactInfoFragment
      }
      educationEntries {
        ...EducationFragment
      }
      projectEntries {
        ...ProjectFragment
      }
      skillEntries {
        ...SkillFragment
      }
      workExperienceEntries {
        ...WorkExperienceFragment
      }
    }
  }
  ${ContactInfoFragmentDoc}
  ${EducationFragmentDoc}
  ${ProjectFragmentDoc}
  ${SkillFragmentDoc}
  ${WorkExperienceFragmentDoc}
`;
export type GenerateNewEntryItemMutationFn = Apollo.MutationFunction<
  GenerateNewEntryItemMutation,
  GenerateNewEntryItemMutationVariables
>;
export type GenerateNewEntryItemComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    GenerateNewEntryItemMutation,
    GenerateNewEntryItemMutationVariables
  >,
  'mutation'
>;

export const GenerateNewEntryItemComponent = (
  props: GenerateNewEntryItemComponentProps
) => (
  <ApolloReactComponents.Mutation<
    GenerateNewEntryItemMutation,
    GenerateNewEntryItemMutationVariables
  >
    mutation={GenerateNewEntryItemDocument}
    {...props}
  />
);

/**
 * __useGenerateNewEntryItemMutation__
 *
 * To run a mutation, you first call `useGenerateNewEntryItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateNewEntryItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateNewEntryItemMutation, { data, loading, error }] = useGenerateNewEntryItemMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      entryType: // value for 'entryType'
 *   },
 * });
 */
export function useGenerateNewEntryItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateNewEntryItemMutation,
    GenerateNewEntryItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    GenerateNewEntryItemMutation,
    GenerateNewEntryItemMutationVariables
  >(GenerateNewEntryItemDocument, options);
}
export type GenerateNewEntryItemMutationHookResult = ReturnType<
  typeof useGenerateNewEntryItemMutation
>;
export type GenerateNewEntryItemMutationResult =
  Apollo.MutationResult<GenerateNewEntryItemMutation>;
export type GenerateNewEntryItemMutationOptions = Apollo.BaseMutationOptions<
  GenerateNewEntryItemMutation,
  GenerateNewEntryItemMutationVariables
>;
export const UpdateCvNameDocument = gql`
  mutation UpdateCvName($cvId: ID!, $name: String!) {
    updateCv(cvId: $cvId, data: { name: $name }) {
      name
    }
  }
`;
export type UpdateCvNameMutationFn = Apollo.MutationFunction<
  UpdateCvNameMutation,
  UpdateCvNameMutationVariables
>;
export type UpdateCvNameComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UpdateCvNameMutation,
    UpdateCvNameMutationVariables
  >,
  'mutation'
>;

export const UpdateCvNameComponent = (props: UpdateCvNameComponentProps) => (
  <ApolloReactComponents.Mutation<
    UpdateCvNameMutation,
    UpdateCvNameMutationVariables
  >
    mutation={UpdateCvNameDocument}
    {...props}
  />
);

/**
 * __useUpdateCvNameMutation__
 *
 * To run a mutation, you first call `useUpdateCvNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCvNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCvNameMutation, { data, loading, error }] = useUpdateCvNameMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateCvNameMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCvNameMutation,
    UpdateCvNameMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateCvNameMutation,
    UpdateCvNameMutationVariables
  >(UpdateCvNameDocument, options);
}
export type UpdateCvNameMutationHookResult = ReturnType<
  typeof useUpdateCvNameMutation
>;
export type UpdateCvNameMutationResult =
  Apollo.MutationResult<UpdateCvNameMutation>;
export type UpdateCvNameMutationOptions = Apollo.BaseMutationOptions<
  UpdateCvNameMutation,
  UpdateCvNameMutationVariables
>;
export const DeleteEntryItemDocument = gql`
  mutation DeleteEntryItem(
    $cvId: ID!
    $entryType: CvEntryType!
    $entryItemId: ID!
  ) {
    deleteEntryItem(
      cvId: $cvId
      entryFieldName: $entryType
      entryItemId: $entryItemId
    )
  }
`;
export type DeleteEntryItemMutationFn = Apollo.MutationFunction<
  DeleteEntryItemMutation,
  DeleteEntryItemMutationVariables
>;
export type DeleteEntryItemComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteEntryItemMutation,
    DeleteEntryItemMutationVariables
  >,
  'mutation'
>;

export const DeleteEntryItemComponent = (
  props: DeleteEntryItemComponentProps
) => (
  <ApolloReactComponents.Mutation<
    DeleteEntryItemMutation,
    DeleteEntryItemMutationVariables
  >
    mutation={DeleteEntryItemDocument}
    {...props}
  />
);

/**
 * __useDeleteEntryItemMutation__
 *
 * To run a mutation, you first call `useDeleteEntryItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEntryItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEntryItemMutation, { data, loading, error }] = useDeleteEntryItemMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      entryType: // value for 'entryType'
 *      entryItemId: // value for 'entryItemId'
 *   },
 * });
 */
export function useDeleteEntryItemMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEntryItemMutation,
    DeleteEntryItemMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteEntryItemMutation,
    DeleteEntryItemMutationVariables
  >(DeleteEntryItemDocument, options);
}
export type DeleteEntryItemMutationHookResult = ReturnType<
  typeof useDeleteEntryItemMutation
>;
export type DeleteEntryItemMutationResult =
  Apollo.MutationResult<DeleteEntryItemMutation>;
export type DeleteEntryItemMutationOptions = Apollo.BaseMutationOptions<
  DeleteEntryItemMutation,
  DeleteEntryItemMutationVariables
>;
export const GetSkillEntriesDocument = gql`
  query GetSkillEntries($cvId: ID!) {
    getCv(cvId: $cvId) {
      skillEntries {
        ...SkillFragment
      }
    }
  }
  ${SkillFragmentDoc}
`;
export type GetSkillEntriesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetSkillEntriesQuery,
    GetSkillEntriesQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetSkillEntriesQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetSkillEntriesComponent = (
  props: GetSkillEntriesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetSkillEntriesQuery,
    GetSkillEntriesQueryVariables
  >
    query={GetSkillEntriesDocument}
    {...props}
  />
);

/**
 * __useGetSkillEntriesQuery__
 *
 * To run a query within a React component, call `useGetSkillEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSkillEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSkillEntriesQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetSkillEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSkillEntriesQuery,
    GetSkillEntriesQueryVariables
  > &
    (
      | { variables: GetSkillEntriesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>(
    GetSkillEntriesDocument,
    options
  );
}
export function useGetSkillEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSkillEntriesQuery,
    GetSkillEntriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSkillEntriesQuery,
    GetSkillEntriesQueryVariables
  >(GetSkillEntriesDocument, options);
}
export function useGetSkillEntriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetSkillEntriesQuery,
        GetSkillEntriesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetSkillEntriesQuery,
    GetSkillEntriesQueryVariables
  >(GetSkillEntriesDocument, options);
}
export type GetSkillEntriesQueryHookResult = ReturnType<
  typeof useGetSkillEntriesQuery
>;
export type GetSkillEntriesLazyQueryHookResult = ReturnType<
  typeof useGetSkillEntriesLazyQuery
>;
export type GetSkillEntriesSuspenseQueryHookResult = ReturnType<
  typeof useGetSkillEntriesSuspenseQuery
>;
export type GetSkillEntriesQueryResult = Apollo.QueryResult<
  GetSkillEntriesQuery,
  GetSkillEntriesQueryVariables
>;
export function refetchGetSkillEntriesQuery(
  variables: GetSkillEntriesQueryVariables
) {
  return { query: GetSkillEntriesDocument, variables: variables };
}
export const GetNameDocument = gql`
  query GetName($cvId: ID!) {
    getCv(cvId: $cvId) {
      name
    }
  }
`;
export type GetNameComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetNameQuery,
    GetNameQueryVariables
  >,
  'query'
> &
  ({ variables: GetNameQueryVariables; skip?: boolean } | { skip: boolean });

export const GetNameComponent = (props: GetNameComponentProps) => (
  <ApolloReactComponents.Query<GetNameQuery, GetNameQueryVariables>
    query={GetNameDocument}
    {...props}
  />
);

/**
 * __useGetNameQuery__
 *
 * To run a query within a React component, call `useGetNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNameQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetNameQuery(
  baseOptions: Apollo.QueryHookOptions<GetNameQuery, GetNameQueryVariables> &
    ({ variables: GetNameQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetNameQuery, GetNameQueryVariables>(
    GetNameDocument,
    options
  );
}
export function useGetNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetNameQuery, GetNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetNameQuery, GetNameQueryVariables>(
    GetNameDocument,
    options
  );
}
export function useGetNameSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetNameQuery, GetNameQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetNameQuery, GetNameQueryVariables>(
    GetNameDocument,
    options
  );
}
export type GetNameQueryHookResult = ReturnType<typeof useGetNameQuery>;
export type GetNameLazyQueryHookResult = ReturnType<typeof useGetNameLazyQuery>;
export type GetNameSuspenseQueryHookResult = ReturnType<
  typeof useGetNameSuspenseQuery
>;
export type GetNameQueryResult = Apollo.QueryResult<
  GetNameQuery,
  GetNameQueryVariables
>;
export function refetchGetNameQuery(variables: GetNameQueryVariables) {
  return { query: GetNameDocument, variables: variables };
}
export const GetEducationEntriesDocument = gql`
  query GetEducationEntries($cvId: ID!) {
    getCv(cvId: $cvId) {
      educationEntries {
        ...EducationFragment
      }
    }
  }
  ${EducationFragmentDoc}
`;
export type GetEducationEntriesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetEducationEntriesQuery,
    GetEducationEntriesQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetEducationEntriesQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetEducationEntriesComponent = (
  props: GetEducationEntriesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetEducationEntriesQuery,
    GetEducationEntriesQueryVariables
  >
    query={GetEducationEntriesDocument}
    {...props}
  />
);

/**
 * __useGetEducationEntriesQuery__
 *
 * To run a query within a React component, call `useGetEducationEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEducationEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEducationEntriesQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetEducationEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetEducationEntriesQuery,
    GetEducationEntriesQueryVariables
  > &
    (
      | { variables: GetEducationEntriesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetEducationEntriesQuery,
    GetEducationEntriesQueryVariables
  >(GetEducationEntriesDocument, options);
}
export function useGetEducationEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEducationEntriesQuery,
    GetEducationEntriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetEducationEntriesQuery,
    GetEducationEntriesQueryVariables
  >(GetEducationEntriesDocument, options);
}
export function useGetEducationEntriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetEducationEntriesQuery,
        GetEducationEntriesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetEducationEntriesQuery,
    GetEducationEntriesQueryVariables
  >(GetEducationEntriesDocument, options);
}
export type GetEducationEntriesQueryHookResult = ReturnType<
  typeof useGetEducationEntriesQuery
>;
export type GetEducationEntriesLazyQueryHookResult = ReturnType<
  typeof useGetEducationEntriesLazyQuery
>;
export type GetEducationEntriesSuspenseQueryHookResult = ReturnType<
  typeof useGetEducationEntriesSuspenseQuery
>;
export type GetEducationEntriesQueryResult = Apollo.QueryResult<
  GetEducationEntriesQuery,
  GetEducationEntriesQueryVariables
>;
export function refetchGetEducationEntriesQuery(
  variables: GetEducationEntriesQueryVariables
) {
  return { query: GetEducationEntriesDocument, variables: variables };
}
export const GetCvDocument = gql`
  query GetCv($cvId: ID!, $versionId: ID) {
    getCv(cvId: $cvId, versionId: $versionId) {
      ...CvFragment
    }
  }
  ${CvFragmentDoc}
`;
export type GetCvComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetCvQuery, GetCvQueryVariables>,
  'query'
> &
  ({ variables: GetCvQueryVariables; skip?: boolean } | { skip: boolean });

export const GetCvComponent = (props: GetCvComponentProps) => (
  <ApolloReactComponents.Query<GetCvQuery, GetCvQueryVariables>
    query={GetCvDocument}
    {...props}
  />
);

/**
 * __useGetCvQuery__
 *
 * To run a query within a React component, call `useGetCvQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCvQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      versionId: // value for 'versionId'
 *   },
 * });
 */
export function useGetCvQuery(
  baseOptions: Apollo.QueryHookOptions<GetCvQuery, GetCvQueryVariables> &
    ({ variables: GetCvQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCvQuery, GetCvQueryVariables>(
    GetCvDocument,
    options
  );
}
export function useGetCvLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCvQuery, GetCvQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCvQuery, GetCvQueryVariables>(
    GetCvDocument,
    options
  );
}
export function useGetCvSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetCvQuery, GetCvQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCvQuery, GetCvQueryVariables>(
    GetCvDocument,
    options
  );
}
export type GetCvQueryHookResult = ReturnType<typeof useGetCvQuery>;
export type GetCvLazyQueryHookResult = ReturnType<typeof useGetCvLazyQuery>;
export type GetCvSuspenseQueryHookResult = ReturnType<
  typeof useGetCvSuspenseQuery
>;
export type GetCvQueryResult = Apollo.QueryResult<
  GetCvQuery,
  GetCvQueryVariables
>;
export function refetchGetCvQuery(variables: GetCvQueryVariables) {
  return { query: GetCvDocument, variables: variables };
}
export const GetContactInfoEntriesDocument = gql`
  query GetContactInfoEntries($cvId: ID!) {
    getCv(cvId: $cvId) {
      contactInfoEntries {
        ...ContactInfoFragment
      }
    }
  }
  ${ContactInfoFragmentDoc}
`;
export type GetContactInfoEntriesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetContactInfoEntriesQuery,
    GetContactInfoEntriesQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetContactInfoEntriesQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetContactInfoEntriesComponent = (
  props: GetContactInfoEntriesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetContactInfoEntriesQuery,
    GetContactInfoEntriesQueryVariables
  >
    query={GetContactInfoEntriesDocument}
    {...props}
  />
);

/**
 * __useGetContactInfoEntriesQuery__
 *
 * To run a query within a React component, call `useGetContactInfoEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactInfoEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactInfoEntriesQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetContactInfoEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetContactInfoEntriesQuery,
    GetContactInfoEntriesQueryVariables
  > &
    (
      | { variables: GetContactInfoEntriesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetContactInfoEntriesQuery,
    GetContactInfoEntriesQueryVariables
  >(GetContactInfoEntriesDocument, options);
}
export function useGetContactInfoEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContactInfoEntriesQuery,
    GetContactInfoEntriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetContactInfoEntriesQuery,
    GetContactInfoEntriesQueryVariables
  >(GetContactInfoEntriesDocument, options);
}
export function useGetContactInfoEntriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetContactInfoEntriesQuery,
        GetContactInfoEntriesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetContactInfoEntriesQuery,
    GetContactInfoEntriesQueryVariables
  >(GetContactInfoEntriesDocument, options);
}
export type GetContactInfoEntriesQueryHookResult = ReturnType<
  typeof useGetContactInfoEntriesQuery
>;
export type GetContactInfoEntriesLazyQueryHookResult = ReturnType<
  typeof useGetContactInfoEntriesLazyQuery
>;
export type GetContactInfoEntriesSuspenseQueryHookResult = ReturnType<
  typeof useGetContactInfoEntriesSuspenseQuery
>;
export type GetContactInfoEntriesQueryResult = Apollo.QueryResult<
  GetContactInfoEntriesQuery,
  GetContactInfoEntriesQueryVariables
>;
export function refetchGetContactInfoEntriesQuery(
  variables: GetContactInfoEntriesQueryVariables
) {
  return { query: GetContactInfoEntriesDocument, variables: variables };
}
export const GetAboutMeDocument = gql`
  query GetAboutMe($cvId: ID!) {
    getCv(cvId: $cvId) {
      aboutMe {
        ...AboutMeFragment
      }
    }
  }
  ${AboutMeFragmentDoc}
`;
export type GetAboutMeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAboutMeQuery,
    GetAboutMeQueryVariables
  >,
  'query'
> &
  ({ variables: GetAboutMeQueryVariables; skip?: boolean } | { skip: boolean });

export const GetAboutMeComponent = (props: GetAboutMeComponentProps) => (
  <ApolloReactComponents.Query<GetAboutMeQuery, GetAboutMeQueryVariables>
    query={GetAboutMeDocument}
    {...props}
  />
);

/**
 * __useGetAboutMeQuery__
 *
 * To run a query within a React component, call `useGetAboutMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAboutMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAboutMeQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetAboutMeQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetAboutMeQuery,
    GetAboutMeQueryVariables
  > &
    (
      | { variables: GetAboutMeQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAboutMeQuery, GetAboutMeQueryVariables>(
    GetAboutMeDocument,
    options
  );
}
export function useGetAboutMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAboutMeQuery,
    GetAboutMeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAboutMeQuery, GetAboutMeQueryVariables>(
    GetAboutMeDocument,
    options
  );
}
export function useGetAboutMeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAboutMeQuery, GetAboutMeQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetAboutMeQuery, GetAboutMeQueryVariables>(
    GetAboutMeDocument,
    options
  );
}
export type GetAboutMeQueryHookResult = ReturnType<typeof useGetAboutMeQuery>;
export type GetAboutMeLazyQueryHookResult = ReturnType<
  typeof useGetAboutMeLazyQuery
>;
export type GetAboutMeSuspenseQueryHookResult = ReturnType<
  typeof useGetAboutMeSuspenseQuery
>;
export type GetAboutMeQueryResult = Apollo.QueryResult<
  GetAboutMeQuery,
  GetAboutMeQueryVariables
>;
export function refetchGetAboutMeQuery(variables: GetAboutMeQueryVariables) {
  return { query: GetAboutMeDocument, variables: variables };
}
export const GetWorkExperienceEntriesDocument = gql`
  query GetWorkExperienceEntries($cvId: ID!) {
    getCv(cvId: $cvId) {
      workExperienceEntries {
        ...WorkExperienceFragment
      }
    }
  }
  ${WorkExperienceFragmentDoc}
`;
export type GetWorkExperienceEntriesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetWorkExperienceEntriesQuery,
    GetWorkExperienceEntriesQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetWorkExperienceEntriesQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetWorkExperienceEntriesComponent = (
  props: GetWorkExperienceEntriesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetWorkExperienceEntriesQuery,
    GetWorkExperienceEntriesQueryVariables
  >
    query={GetWorkExperienceEntriesDocument}
    {...props}
  />
);

/**
 * __useGetWorkExperienceEntriesQuery__
 *
 * To run a query within a React component, call `useGetWorkExperienceEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWorkExperienceEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWorkExperienceEntriesQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetWorkExperienceEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetWorkExperienceEntriesQuery,
    GetWorkExperienceEntriesQueryVariables
  > &
    (
      | { variables: GetWorkExperienceEntriesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetWorkExperienceEntriesQuery,
    GetWorkExperienceEntriesQueryVariables
  >(GetWorkExperienceEntriesDocument, options);
}
export function useGetWorkExperienceEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetWorkExperienceEntriesQuery,
    GetWorkExperienceEntriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetWorkExperienceEntriesQuery,
    GetWorkExperienceEntriesQueryVariables
  >(GetWorkExperienceEntriesDocument, options);
}
export function useGetWorkExperienceEntriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetWorkExperienceEntriesQuery,
        GetWorkExperienceEntriesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetWorkExperienceEntriesQuery,
    GetWorkExperienceEntriesQueryVariables
  >(GetWorkExperienceEntriesDocument, options);
}
export type GetWorkExperienceEntriesQueryHookResult = ReturnType<
  typeof useGetWorkExperienceEntriesQuery
>;
export type GetWorkExperienceEntriesLazyQueryHookResult = ReturnType<
  typeof useGetWorkExperienceEntriesLazyQuery
>;
export type GetWorkExperienceEntriesSuspenseQueryHookResult = ReturnType<
  typeof useGetWorkExperienceEntriesSuspenseQuery
>;
export type GetWorkExperienceEntriesQueryResult = Apollo.QueryResult<
  GetWorkExperienceEntriesQuery,
  GetWorkExperienceEntriesQueryVariables
>;
export function refetchGetWorkExperienceEntriesQuery(
  variables: GetWorkExperienceEntriesQueryVariables
) {
  return { query: GetWorkExperienceEntriesDocument, variables: variables };
}
export const GetProjectEntriesDocument = gql`
  query GetProjectEntries($cvId: ID!) {
    getCv(cvId: $cvId) {
      projectEntries {
        ...ProjectFragment
      }
    }
  }
  ${ProjectFragmentDoc}
`;
export type GetProjectEntriesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetProjectEntriesQuery,
    GetProjectEntriesQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetProjectEntriesQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetProjectEntriesComponent = (
  props: GetProjectEntriesComponentProps
) => (
  <ApolloReactComponents.Query<
    GetProjectEntriesQuery,
    GetProjectEntriesQueryVariables
  >
    query={GetProjectEntriesDocument}
    {...props}
  />
);

/**
 * __useGetProjectEntriesQuery__
 *
 * To run a query within a React component, call `useGetProjectEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectEntriesQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetProjectEntriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetProjectEntriesQuery,
    GetProjectEntriesQueryVariables
  > &
    (
      | { variables: GetProjectEntriesQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetProjectEntriesQuery,
    GetProjectEntriesQueryVariables
  >(GetProjectEntriesDocument, options);
}
export function useGetProjectEntriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetProjectEntriesQuery,
    GetProjectEntriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetProjectEntriesQuery,
    GetProjectEntriesQueryVariables
  >(GetProjectEntriesDocument, options);
}
export function useGetProjectEntriesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetProjectEntriesQuery,
        GetProjectEntriesQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetProjectEntriesQuery,
    GetProjectEntriesQueryVariables
  >(GetProjectEntriesDocument, options);
}
export type GetProjectEntriesQueryHookResult = ReturnType<
  typeof useGetProjectEntriesQuery
>;
export type GetProjectEntriesLazyQueryHookResult = ReturnType<
  typeof useGetProjectEntriesLazyQuery
>;
export type GetProjectEntriesSuspenseQueryHookResult = ReturnType<
  typeof useGetProjectEntriesSuspenseQuery
>;
export type GetProjectEntriesQueryResult = Apollo.QueryResult<
  GetProjectEntriesQuery,
  GetProjectEntriesQueryVariables
>;
export function refetchGetProjectEntriesQuery(
  variables: GetProjectEntriesQueryVariables
) {
  return { query: GetProjectEntriesDocument, variables: variables };
}
export const CheckCvDocument = gql`
  query CheckCv($cvId: ID!) {
    getCv(cvId: $cvId) {
      _id
    }
  }
`;
export type CheckCvComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    CheckCvQuery,
    CheckCvQueryVariables
  >,
  'query'
> &
  ({ variables: CheckCvQueryVariables; skip?: boolean } | { skip: boolean });

export const CheckCvComponent = (props: CheckCvComponentProps) => (
  <ApolloReactComponents.Query<CheckCvQuery, CheckCvQueryVariables>
    query={CheckCvDocument}
    {...props}
  />
);

/**
 * __useCheckCvQuery__
 *
 * To run a query within a React component, call `useCheckCvQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckCvQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckCvQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useCheckCvQuery(
  baseOptions: Apollo.QueryHookOptions<CheckCvQuery, CheckCvQueryVariables> &
    ({ variables: CheckCvQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CheckCvQuery, CheckCvQueryVariables>(
    CheckCvDocument,
    options
  );
}
export function useCheckCvLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CheckCvQuery, CheckCvQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CheckCvQuery, CheckCvQueryVariables>(
    CheckCvDocument,
    options
  );
}
export function useCheckCvSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<CheckCvQuery, CheckCvQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<CheckCvQuery, CheckCvQueryVariables>(
    CheckCvDocument,
    options
  );
}
export type CheckCvQueryHookResult = ReturnType<typeof useCheckCvQuery>;
export type CheckCvLazyQueryHookResult = ReturnType<typeof useCheckCvLazyQuery>;
export type CheckCvSuspenseQueryHookResult = ReturnType<
  typeof useCheckCvSuspenseQuery
>;
export type CheckCvQueryResult = Apollo.QueryResult<
  CheckCvQuery,
  CheckCvQueryVariables
>;
export function refetchCheckCvQuery(variables: CheckCvQueryVariables) {
  return { query: CheckCvDocument, variables: variables };
}
export const ConvertPdfToCvDocument = gql`
  mutation ConvertPdfToCv($file: Upload!) {
    convertPdfToCv(file: $file) {
      comment
    }
  }
`;
export type ConvertPdfToCvMutationFn = Apollo.MutationFunction<
  ConvertPdfToCvMutation,
  ConvertPdfToCvMutationVariables
>;
export type ConvertPdfToCvComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ConvertPdfToCvMutation,
    ConvertPdfToCvMutationVariables
  >,
  'mutation'
>;

export const ConvertPdfToCvComponent = (
  props: ConvertPdfToCvComponentProps
) => (
  <ApolloReactComponents.Mutation<
    ConvertPdfToCvMutation,
    ConvertPdfToCvMutationVariables
  >
    mutation={ConvertPdfToCvDocument}
    {...props}
  />
);

/**
 * __useConvertPdfToCvMutation__
 *
 * To run a mutation, you first call `useConvertPdfToCvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertPdfToCvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertPdfToCvMutation, { data, loading, error }] = useConvertPdfToCvMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useConvertPdfToCvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConvertPdfToCvMutation,
    ConvertPdfToCvMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConvertPdfToCvMutation,
    ConvertPdfToCvMutationVariables
  >(ConvertPdfToCvDocument, options);
}
export type ConvertPdfToCvMutationHookResult = ReturnType<
  typeof useConvertPdfToCvMutation
>;
export type ConvertPdfToCvMutationResult =
  Apollo.MutationResult<ConvertPdfToCvMutation>;
export type ConvertPdfToCvMutationOptions = Apollo.BaseMutationOptions<
  ConvertPdfToCvMutation,
  ConvertPdfToCvMutationVariables
>;
export const GetReviewStatusDocument = gql`
  query getReviewStatus($cvId: ID!) {
    getReviewStatus(cvId: $cvId)
  }
`;
export type GetReviewStatusComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetReviewStatusQuery,
    GetReviewStatusQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetReviewStatusQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetReviewStatusComponent = (
  props: GetReviewStatusComponentProps
) => (
  <ApolloReactComponents.Query<
    GetReviewStatusQuery,
    GetReviewStatusQueryVariables
  >
    query={GetReviewStatusDocument}
    {...props}
  />
);

/**
 * __useGetReviewStatusQuery__
 *
 * To run a query within a React component, call `useGetReviewStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReviewStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReviewStatusQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetReviewStatusQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetReviewStatusQuery,
    GetReviewStatusQueryVariables
  > &
    (
      | { variables: GetReviewStatusQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetReviewStatusQuery, GetReviewStatusQueryVariables>(
    GetReviewStatusDocument,
    options
  );
}
export function useGetReviewStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetReviewStatusQuery,
    GetReviewStatusQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetReviewStatusQuery,
    GetReviewStatusQueryVariables
  >(GetReviewStatusDocument, options);
}
export function useGetReviewStatusSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetReviewStatusQuery,
        GetReviewStatusQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetReviewStatusQuery,
    GetReviewStatusQueryVariables
  >(GetReviewStatusDocument, options);
}
export type GetReviewStatusQueryHookResult = ReturnType<
  typeof useGetReviewStatusQuery
>;
export type GetReviewStatusLazyQueryHookResult = ReturnType<
  typeof useGetReviewStatusLazyQuery
>;
export type GetReviewStatusSuspenseQueryHookResult = ReturnType<
  typeof useGetReviewStatusSuspenseQuery
>;
export type GetReviewStatusQueryResult = Apollo.QueryResult<
  GetReviewStatusQuery,
  GetReviewStatusQueryVariables
>;
export function refetchGetReviewStatusQuery(
  variables: GetReviewStatusQueryVariables
) {
  return { query: GetReviewStatusDocument, variables: variables };
}
export const ReviewCvDocument = gql`
  mutation ReviewCv($cvId: ID!) {
    reviewCv(cvId: $cvId) {
      messages
    }
  }
`;
export type ReviewCvMutationFn = Apollo.MutationFunction<
  ReviewCvMutation,
  ReviewCvMutationVariables
>;
export type ReviewCvComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ReviewCvMutation,
    ReviewCvMutationVariables
  >,
  'mutation'
>;

export const ReviewCvComponent = (props: ReviewCvComponentProps) => (
  <ApolloReactComponents.Mutation<ReviewCvMutation, ReviewCvMutationVariables>
    mutation={ReviewCvDocument}
    {...props}
  />
);

/**
 * __useReviewCvMutation__
 *
 * To run a mutation, you first call `useReviewCvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReviewCvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reviewCvMutation, { data, loading, error }] = useReviewCvMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useReviewCvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReviewCvMutation,
    ReviewCvMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ReviewCvMutation, ReviewCvMutationVariables>(
    ReviewCvDocument,
    options
  );
}
export type ReviewCvMutationHookResult = ReturnType<typeof useReviewCvMutation>;
export type ReviewCvMutationResult = Apollo.MutationResult<ReviewCvMutation>;
export type ReviewCvMutationOptions = Apollo.BaseMutationOptions<
  ReviewCvMutation,
  ReviewCvMutationVariables
>;
export const UndoCvVersionDocument = gql`
  mutation UndoCvVersion($cvId: ID!) {
    undoCvVersion(cvId: $cvId) {
      ...CvFragment
    }
  }
  ${CvFragmentDoc}
`;
export type UndoCvVersionMutationFn = Apollo.MutationFunction<
  UndoCvVersionMutation,
  UndoCvVersionMutationVariables
>;
export type UndoCvVersionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    UndoCvVersionMutation,
    UndoCvVersionMutationVariables
  >,
  'mutation'
>;

export const UndoCvVersionComponent = (props: UndoCvVersionComponentProps) => (
  <ApolloReactComponents.Mutation<
    UndoCvVersionMutation,
    UndoCvVersionMutationVariables
  >
    mutation={UndoCvVersionDocument}
    {...props}
  />
);

/**
 * __useUndoCvVersionMutation__
 *
 * To run a mutation, you first call `useUndoCvVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUndoCvVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [undoCvVersionMutation, { data, loading, error }] = useUndoCvVersionMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useUndoCvVersionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UndoCvVersionMutation,
    UndoCvVersionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UndoCvVersionMutation,
    UndoCvVersionMutationVariables
  >(UndoCvVersionDocument, options);
}
export type UndoCvVersionMutationHookResult = ReturnType<
  typeof useUndoCvVersionMutation
>;
export type UndoCvVersionMutationResult =
  Apollo.MutationResult<UndoCvVersionMutation>;
export type UndoCvVersionMutationOptions = Apollo.BaseMutationOptions<
  UndoCvVersionMutation,
  UndoCvVersionMutationVariables
>;
export const RedoCvVersionDocument = gql`
  mutation RedoCvVersion($cvId: ID!) {
    redoCvVersion(cvId: $cvId) {
      ...CvFragment
    }
  }
  ${CvFragmentDoc}
`;
export type RedoCvVersionMutationFn = Apollo.MutationFunction<
  RedoCvVersionMutation,
  RedoCvVersionMutationVariables
>;
export type RedoCvVersionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    RedoCvVersionMutation,
    RedoCvVersionMutationVariables
  >,
  'mutation'
>;

export const RedoCvVersionComponent = (props: RedoCvVersionComponentProps) => (
  <ApolloReactComponents.Mutation<
    RedoCvVersionMutation,
    RedoCvVersionMutationVariables
  >
    mutation={RedoCvVersionDocument}
    {...props}
  />
);

/**
 * __useRedoCvVersionMutation__
 *
 * To run a mutation, you first call `useRedoCvVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedoCvVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redoCvVersionMutation, { data, loading, error }] = useRedoCvVersionMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useRedoCvVersionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RedoCvVersionMutation,
    RedoCvVersionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RedoCvVersionMutation,
    RedoCvVersionMutationVariables
  >(RedoCvVersionDocument, options);
}
export type RedoCvVersionMutationHookResult = ReturnType<
  typeof useRedoCvVersionMutation
>;
export type RedoCvVersionMutationResult =
  Apollo.MutationResult<RedoCvVersionMutation>;
export type RedoCvVersionMutationOptions = Apollo.BaseMutationOptions<
  RedoCvVersionMutation,
  RedoCvVersionMutationVariables
>;
export const CreateCvFromVersionDocument = gql`
  mutation CreateCvFromVersion($cvId: ID!, $versionId: ID!) {
    createCvFromVersion(cvId: $cvId, versionId: $versionId) {
      ...CvFragment
    }
  }
  ${CvFragmentDoc}
`;
export type CreateCvFromVersionMutationFn = Apollo.MutationFunction<
  CreateCvFromVersionMutation,
  CreateCvFromVersionMutationVariables
>;
export type CreateCvFromVersionComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateCvFromVersionMutation,
    CreateCvFromVersionMutationVariables
  >,
  'mutation'
>;

export const CreateCvFromVersionComponent = (
  props: CreateCvFromVersionComponentProps
) => (
  <ApolloReactComponents.Mutation<
    CreateCvFromVersionMutation,
    CreateCvFromVersionMutationVariables
  >
    mutation={CreateCvFromVersionDocument}
    {...props}
  />
);

/**
 * __useCreateCvFromVersionMutation__
 *
 * To run a mutation, you first call `useCreateCvFromVersionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCvFromVersionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCvFromVersionMutation, { data, loading, error }] = useCreateCvFromVersionMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      versionId: // value for 'versionId'
 *   },
 * });
 */
export function useCreateCvFromVersionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCvFromVersionMutation,
    CreateCvFromVersionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateCvFromVersionMutation,
    CreateCvFromVersionMutationVariables
  >(CreateCvFromVersionDocument, options);
}
export type CreateCvFromVersionMutationHookResult = ReturnType<
  typeof useCreateCvFromVersionMutation
>;
export type CreateCvFromVersionMutationResult =
  Apollo.MutationResult<CreateCvFromVersionMutation>;
export type CreateCvFromVersionMutationOptions = Apollo.BaseMutationOptions<
  CreateCvFromVersionMutation,
  CreateCvFromVersionMutationVariables
>;
export const GetCvVersionHistoryDocument = gql`
  query GetCvVersionHistory($cvId: ID!) {
    getCvVersionHistory(cvId: $cvId) {
      items {
        _id
        versionNumber
        isCurrentVersion
        createdAt
      }
      paginationMetadata {
        totalItems
        currentPage
        pageSize
        totalPages
      }
    }
  }
`;
export type GetCvVersionHistoryComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetCvVersionHistoryQuery,
    GetCvVersionHistoryQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetCvVersionHistoryQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetCvVersionHistoryComponent = (
  props: GetCvVersionHistoryComponentProps
) => (
  <ApolloReactComponents.Query<
    GetCvVersionHistoryQuery,
    GetCvVersionHistoryQueryVariables
  >
    query={GetCvVersionHistoryDocument}
    {...props}
  />
);

/**
 * __useGetCvVersionHistoryQuery__
 *
 * To run a query within a React component, call `useGetCvVersionHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCvVersionHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCvVersionHistoryQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetCvVersionHistoryQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetCvVersionHistoryQuery,
    GetCvVersionHistoryQueryVariables
  > &
    (
      | { variables: GetCvVersionHistoryQueryVariables; skip?: boolean }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetCvVersionHistoryQuery,
    GetCvVersionHistoryQueryVariables
  >(GetCvVersionHistoryDocument, options);
}
export function useGetCvVersionHistoryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCvVersionHistoryQuery,
    GetCvVersionHistoryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetCvVersionHistoryQuery,
    GetCvVersionHistoryQueryVariables
  >(GetCvVersionHistoryDocument, options);
}
export function useGetCvVersionHistorySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCvVersionHistoryQuery,
        GetCvVersionHistoryQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCvVersionHistoryQuery,
    GetCvVersionHistoryQueryVariables
  >(GetCvVersionHistoryDocument, options);
}
export type GetCvVersionHistoryQueryHookResult = ReturnType<
  typeof useGetCvVersionHistoryQuery
>;
export type GetCvVersionHistoryLazyQueryHookResult = ReturnType<
  typeof useGetCvVersionHistoryLazyQuery
>;
export type GetCvVersionHistorySuspenseQueryHookResult = ReturnType<
  typeof useGetCvVersionHistorySuspenseQuery
>;
export type GetCvVersionHistoryQueryResult = Apollo.QueryResult<
  GetCvVersionHistoryQuery,
  GetCvVersionHistoryQueryVariables
>;
export function refetchGetCvVersionHistoryQuery(
  variables: GetCvVersionHistoryQueryVariables
) {
  return { query: GetCvVersionHistoryDocument, variables: variables };
}
export const GetVersioningActionsMetadataDocument = gql`
  query GetVersioningActionsMetadata($cvId: ID!) {
    getVersioningActionsMetadata(cvId: $cvId) {
      canUndo
      canRedo
    }
  }
`;
export type GetVersioningActionsMetadataComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetVersioningActionsMetadataQuery,
    GetVersioningActionsMetadataQueryVariables
  >,
  'query'
> &
  (
    | { variables: GetVersioningActionsMetadataQueryVariables; skip?: boolean }
    | { skip: boolean }
  );

export const GetVersioningActionsMetadataComponent = (
  props: GetVersioningActionsMetadataComponentProps
) => (
  <ApolloReactComponents.Query<
    GetVersioningActionsMetadataQuery,
    GetVersioningActionsMetadataQueryVariables
  >
    query={GetVersioningActionsMetadataDocument}
    {...props}
  />
);

/**
 * __useGetVersioningActionsMetadataQuery__
 *
 * To run a query within a React component, call `useGetVersioningActionsMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVersioningActionsMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVersioningActionsMetadataQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetVersioningActionsMetadataQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetVersioningActionsMetadataQuery,
    GetVersioningActionsMetadataQueryVariables
  > &
    (
      | {
          variables: GetVersioningActionsMetadataQueryVariables;
          skip?: boolean;
        }
      | { skip: boolean }
    )
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetVersioningActionsMetadataQuery,
    GetVersioningActionsMetadataQueryVariables
  >(GetVersioningActionsMetadataDocument, options);
}
export function useGetVersioningActionsMetadataLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetVersioningActionsMetadataQuery,
    GetVersioningActionsMetadataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetVersioningActionsMetadataQuery,
    GetVersioningActionsMetadataQueryVariables
  >(GetVersioningActionsMetadataDocument, options);
}
export function useGetVersioningActionsMetadataSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetVersioningActionsMetadataQuery,
        GetVersioningActionsMetadataQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetVersioningActionsMetadataQuery,
    GetVersioningActionsMetadataQueryVariables
  >(GetVersioningActionsMetadataDocument, options);
}
export type GetVersioningActionsMetadataQueryHookResult = ReturnType<
  typeof useGetVersioningActionsMetadataQuery
>;
export type GetVersioningActionsMetadataLazyQueryHookResult = ReturnType<
  typeof useGetVersioningActionsMetadataLazyQuery
>;
export type GetVersioningActionsMetadataSuspenseQueryHookResult = ReturnType<
  typeof useGetVersioningActionsMetadataSuspenseQuery
>;
export type GetVersioningActionsMetadataQueryResult = Apollo.QueryResult<
  GetVersioningActionsMetadataQuery,
  GetVersioningActionsMetadataQueryVariables
>;
export function refetchGetVersioningActionsMetadataQuery(
  variables: GetVersioningActionsMetadataQueryVariables
) {
  return { query: GetVersioningActionsMetadataDocument, variables: variables };
}
export const CreateCvDocument = gql`
  mutation CreateCv($templateId: ID!) {
    createNewCv(templateId: $templateId) {
      _id
      title
    }
  }
`;
export type CreateCvMutationFn = Apollo.MutationFunction<
  CreateCvMutation,
  CreateCvMutationVariables
>;
export type CreateCvComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateCvMutation,
    CreateCvMutationVariables
  >,
  'mutation'
>;

export const CreateCvComponent = (props: CreateCvComponentProps) => (
  <ApolloReactComponents.Mutation<CreateCvMutation, CreateCvMutationVariables>
    mutation={CreateCvDocument}
    {...props}
  />
);

/**
 * __useCreateCvMutation__
 *
 * To run a mutation, you first call `useCreateCvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCvMutation, { data, loading, error }] = useCreateCvMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *   },
 * });
 */
export function useCreateCvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCvMutation,
    CreateCvMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCvMutation, CreateCvMutationVariables>(
    CreateCvDocument,
    options
  );
}
export type CreateCvMutationHookResult = ReturnType<typeof useCreateCvMutation>;
export type CreateCvMutationResult = Apollo.MutationResult<CreateCvMutation>;
export type CreateCvMutationOptions = Apollo.BaseMutationOptions<
  CreateCvMutation,
  CreateCvMutationVariables
>;
export const DeleteCvDocument = gql`
  mutation DeleteCv($cvId: ID!) {
    deleteCv(cvId: $cvId)
  }
`;
export type DeleteCvMutationFn = Apollo.MutationFunction<
  DeleteCvMutation,
  DeleteCvMutationVariables
>;
export type DeleteCvComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    DeleteCvMutation,
    DeleteCvMutationVariables
  >,
  'mutation'
>;

export const DeleteCvComponent = (props: DeleteCvComponentProps) => (
  <ApolloReactComponents.Mutation<DeleteCvMutation, DeleteCvMutationVariables>
    mutation={DeleteCvDocument}
    {...props}
  />
);

/**
 * __useDeleteCvMutation__
 *
 * To run a mutation, you first call `useDeleteCvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCvMutation, { data, loading, error }] = useDeleteCvMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useDeleteCvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCvMutation,
    DeleteCvMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCvMutation, DeleteCvMutationVariables>(
    DeleteCvDocument,
    options
  );
}
export type DeleteCvMutationHookResult = ReturnType<typeof useDeleteCvMutation>;
export type DeleteCvMutationResult = Apollo.MutationResult<DeleteCvMutation>;
export type DeleteCvMutationOptions = Apollo.BaseMutationOptions<
  DeleteCvMutation,
  DeleteCvMutationVariables
>;
export const GetCvsDocument = gql`
  query GetCvs {
    getCvs {
      _id
      name: title
    }
  }
`;
export type GetCvsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetCvsQuery,
    GetCvsQueryVariables
  >,
  'query'
>;

export const GetCvsComponent = (props: GetCvsComponentProps) => (
  <ApolloReactComponents.Query<GetCvsQuery, GetCvsQueryVariables>
    query={GetCvsDocument}
    {...props}
  />
);

/**
 * __useGetCvsQuery__
 *
 * To run a query within a React component, call `useGetCvsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCvsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCvsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCvsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetCvsQuery, GetCvsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCvsQuery, GetCvsQueryVariables>(
    GetCvsDocument,
    options
  );
}
export function useGetCvsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetCvsQuery, GetCvsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCvsQuery, GetCvsQueryVariables>(
    GetCvsDocument,
    options
  );
}
export function useGetCvsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetCvsQuery, GetCvsQueryVariables>
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<GetCvsQuery, GetCvsQueryVariables>(
    GetCvsDocument,
    options
  );
}
export type GetCvsQueryHookResult = ReturnType<typeof useGetCvsQuery>;
export type GetCvsLazyQueryHookResult = ReturnType<typeof useGetCvsLazyQuery>;
export type GetCvsSuspenseQueryHookResult = ReturnType<
  typeof useGetCvsSuspenseQuery
>;
export type GetCvsQueryResult = Apollo.QueryResult<
  GetCvsQuery,
  GetCvsQueryVariables
>;
export function refetchGetCvsQuery(variables?: GetCvsQueryVariables) {
  return { query: GetCvsDocument, variables: variables };
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;
export type LogoutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
  'mutation'
>;

export const LogoutComponent = (props: LogoutComponentProps) => (
  <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables>
    mutation={LogoutDocument}
    {...props}
  />
);

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const GetCurrentUserDocument = gql`
  query GetCurrentUser {
    currentUser {
      id
      email
      firstName
      lastName
      googleId
      createdAt
      deletedAt
    }
  }
`;
export type GetCurrentUserComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >,
  'query'
>;

export const GetCurrentUserComponent = (
  props: GetCurrentUserComponentProps
) => (
  <ApolloReactComponents.Query<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
    query={GetCurrentUserDocument}
    {...props}
  />
);

/**
 * __useGetCurrentUserQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(
    GetCurrentUserDocument,
    options
  );
}
export function useGetCurrentUserSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetCurrentUserQuery,
        GetCurrentUserQueryVariables
      >
) {
  const options =
    baseOptions === Apollo.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetCurrentUserQuery,
    GetCurrentUserQueryVariables
  >(GetCurrentUserDocument, options);
}
export type GetCurrentUserQueryHookResult = ReturnType<
  typeof useGetCurrentUserQuery
>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<
  typeof useGetCurrentUserLazyQuery
>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<
  typeof useGetCurrentUserSuspenseQuery
>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<
  GetCurrentUserQuery,
  GetCurrentUserQueryVariables
>;
export function refetchGetCurrentUserQuery(
  variables?: GetCurrentUserQueryVariables
) {
  return { query: GetCurrentUserDocument, variables: variables };
}
export const TransformCvDocument = gql`
  mutation transformCv($templateId: String!, $message: String!) {
    transformCv(templateId: $templateId, message: $message) {
      comment
      cv {
        _id
      }
    }
  }
`;
export type TransformCvMutationFn = Apollo.MutationFunction<
  TransformCvMutation,
  TransformCvMutationVariables
>;
export type TransformCvComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    TransformCvMutation,
    TransformCvMutationVariables
  >,
  'mutation'
>;

export const TransformCvComponent = (props: TransformCvComponentProps) => (
  <ApolloReactComponents.Mutation<
    TransformCvMutation,
    TransformCvMutationVariables
  >
    mutation={TransformCvDocument}
    {...props}
  />
);

/**
 * __useTransformCvMutation__
 *
 * To run a mutation, you first call `useTransformCvMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransformCvMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transformCvMutation, { data, loading, error }] = useTransformCvMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *      message: // value for 'message'
 *   },
 * });
 */
export function useTransformCvMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TransformCvMutation,
    TransformCvMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<TransformCvMutation, TransformCvMutationVariables>(
    TransformCvDocument,
    options
  );
}
export type TransformCvMutationHookResult = ReturnType<
  typeof useTransformCvMutation
>;
export type TransformCvMutationResult =
  Apollo.MutationResult<TransformCvMutation>;
export type TransformCvMutationOptions = Apollo.BaseMutationOptions<
  TransformCvMutation,
  TransformCvMutationVariables
>;
