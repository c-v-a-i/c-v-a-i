import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '../graphql/customGqlComponents';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Date custom scalar type */
  Date: { input: any; output: any; }
};

export type AboutMe = {
  __typename?: 'AboutMe';
  createdAt: Scalars['Date']['output'];
  cvId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description: Scalars['String']['output'];
  fieldName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type Cv = {
  __typename?: 'CV';
  aboutMe: AboutMe;
  contactInfo: ContactInfo;
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  educationEntries: Array<Education>;
  id: Scalars['ID']['output'];
  projectEntries: Array<Project>;
  skillEntries: Array<Skill>;
  title: Scalars['String']['output'];
  workExperienceEntries: Array<WorkExperience>;
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  createdAt: Scalars['Date']['output'];
  cvId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export enum CvEntryType {
  Education = 'EDUCATION',
  Project = 'PROJECT',
  WorkExperience = 'WORK_EXPERIENCE'
}

export type CvEntryUnion = Education | Project | WorkExperience;

export type Education = {
  __typename?: 'Education';
  createdAt: Scalars['Date']['output'];
  cvId: Scalars['ID']['output'];
  degree: Scalars['String']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createMultipleWorkExperiences: Array<WorkExperience>;
  createNewCv: Cv;
  createSkill: Skill;
  createWorkExperience: WorkExperience;
  deleteCv: Scalars['Boolean']['output'];
  deleteSkill: Scalars['Boolean']['output'];
  deleteWorkExperience: Scalars['Boolean']['output'];
  generateNewEntryItem: CvEntryUnion;
  logout: Scalars['Boolean']['output'];
  updateAboutMe: Scalars['Boolean']['output'];
  updateContactInfo: Scalars['Boolean']['output'];
  updateEducation: Scalars['Boolean']['output'];
  updateProject: Scalars['Boolean']['output'];
  updateSkill: Scalars['Boolean']['output'];
  updateWorkExperience: Scalars['Boolean']['output'];
};


export type MutationCreateMultipleWorkExperiencesArgs = {
  cvId: Scalars['ID']['input'];
  entries: Array<WorkExperienceInputType>;
};


export type MutationCreateNewCvArgs = {
  templateId?: InputMaybe<Scalars['ID']['input']>;
};


export type MutationCreateSkillArgs = {
  category: Scalars['String']['input'];
  cvId: Scalars['ID']['input'];
  items: Array<Scalars['String']['input']>;
};


export type MutationCreateWorkExperienceArgs = {
  cvId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  position: Scalars['String']['input'];
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteCvArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteSkillArgs = {
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationDeleteWorkExperienceArgs = {
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
};


export type MutationGenerateNewEntryItemArgs = {
  cvId: Scalars['ID']['input'];
  type: CvEntryType;
};


export type MutationUpdateAboutMeArgs = {
  cvId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  fieldName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};


export type MutationUpdateContactInfoArgs = {
  cvId: Scalars['ID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateEducationArgs = {
  cvId: Scalars['ID']['input'];
  degree?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateProjectArgs = {
  cvId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationUpdateSkillArgs = {
  category?: InputMaybe<Scalars['String']['input']>;
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  items?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type MutationUpdateWorkExperienceArgs = {
  cvId: Scalars['ID']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  location?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedCvObjectType = {
  __typename?: 'PaginatedCvObjectType';
  count: Scalars['Int']['output'];
  items: Array<Cv>;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['Date']['output'];
  cvId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  getAboutMe: AboutMe;
  getContactInfo: ContactInfo;
  getCv: Cv;
  getCvs: PaginatedCvObjectType;
  getEducationEntriesByCv: Array<Education>;
  getProjectEntries: Array<Project>;
  getSkillEntries: Array<Skill>;
  getWorkExperienceEntries: Array<WorkExperience>;
  healthCheck: Scalars['String']['output'];
};


export type QueryGetAboutMeArgs = {
  cvId: Scalars['ID']['input'];
};


export type QueryGetContactInfoArgs = {
  cvId: Scalars['ID']['input'];
};


export type QueryGetCvArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetEducationEntriesByCvArgs = {
  cvId: Scalars['ID']['input'];
};


export type QueryGetProjectEntriesArgs = {
  cvId: Scalars['ID']['input'];
};


export type QueryGetSkillEntriesArgs = {
  cvId: Scalars['ID']['input'];
};


export type QueryGetWorkExperienceEntriesArgs = {
  cvId: Scalars['ID']['input'];
};

export type ScopeObjectType = {
  __typename?: 'ScopeObjectType';
  googleId: Scalars['String']['output'];
};

export type Skill = {
  __typename?: 'Skill';
  category: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  cvId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  items: Array<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  aboutMeEntries: Array<AboutMe>;
  contactInfoEntries: Array<ContactInfo>;
  createdAt: Scalars['Date']['output'];
  cvs: Array<Cv>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
  educationEntries: Array<Education>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  googleId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  projectEntries: Array<Project>;
  skillEntries: Array<Skill>;
  workExperienceEntries: Array<WorkExperience>;
};

export type WorkExperience = {
  __typename?: 'WorkExperience';
  createdAt: Scalars['Date']['output'];
  cvId: Scalars['ID']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  duration?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  skills?: Maybe<Array<Scalars['String']['output']>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type WorkExperienceInputType = {
  description?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  position: Scalars['String']['input'];
  skills?: InputMaybe<Array<Scalars['String']['input']>>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CreateCvMutationVariables = Exact<{
  templateId?: InputMaybe<Scalars['ID']['input']>;
}>;


export type CreateCvMutation = { __typename?: 'Mutation', createNewCv: { __typename?: 'CV', id: string, title: string } };

export type DeleteCvMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCvMutation = { __typename?: 'Mutation', deleteCv: boolean };

export type GetCvsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCvsQuery = { __typename?: 'Query', getCvs: { __typename?: 'PaginatedCvObjectType', count: number, items: Array<{ __typename?: 'CV', id: string, name: string }> } };

export type WorkExperienceFragment = { __typename?: 'WorkExperience', id: string, name: string, position: string, duration?: string | null, location?: string | null, type?: string | null, description?: string | null, skills?: Array<string> | null };

export type UpdateEducationEntryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  cvId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  degree?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateEducationEntryMutation = { __typename?: 'Mutation', updateEducation: boolean };

export type UpdateContactInfoMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  cvId: Scalars['ID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateContactInfoMutation = { __typename?: 'Mutation', updateContactInfo: boolean };

export type UpdateAboutMeMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  fieldName?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateAboutMeMutation = { __typename?: 'Mutation', updateAboutMe: boolean };

export type UpdateWorkExperienceEntryMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['String']['input']>;
  duration?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type UpdateWorkExperienceEntryMutation = { __typename?: 'Mutation', updateWorkExperience: boolean };

export type UpdateProjectEntryMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type UpdateProjectEntryMutation = { __typename?: 'Mutation', updateProject: boolean };

export type UpdateSkillEntryMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
  category?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateSkillEntryMutation = { __typename?: 'Mutation', updateSkill: boolean };

export type CreateWorkExperienceEntryMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  position: Scalars['String']['input'];
  duration?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  skills?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type CreateWorkExperienceEntryMutation = { __typename?: 'Mutation', createWorkExperience: { __typename?: 'WorkExperience', id: string, name: string, position: string, duration?: string | null, location?: string | null, type?: string | null, description?: string | null, skills?: Array<string> | null } };

export type DeleteWorkExperienceEntryMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  id: Scalars['ID']['input'];
}>;


export type DeleteWorkExperienceEntryMutation = { __typename?: 'Mutation', deleteWorkExperience: boolean };

export type GenerateNewEntryItemMutationVariables = Exact<{
  cvId: Scalars['ID']['input'];
  type: CvEntryType;
}>;


export type GenerateNewEntryItemMutation = { __typename?: 'Mutation', generateNewEntryItem: { __typename: 'Education' } | { __typename: 'Project' } | { __typename: 'WorkExperience', id: string, name: string, position: string, duration?: string | null, location?: string | null, type?: string | null, description?: string | null, skills?: Array<string> | null } };

export type GetEducationEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;


export type GetEducationEntriesQuery = { __typename?: 'Query', getEducationEntriesByCv: Array<{ __typename?: 'Education', id: string, name: string, description: string, degree: string, location: string, duration: string, skills: Array<string> }> };

export type GetContactInfoQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;


export type GetContactInfoQuery = { __typename?: 'Query', getContactInfo: { __typename?: 'ContactInfo', id: string, name: string, email: string, phone: string } };

export type GetAboutMeQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;


export type GetAboutMeQuery = { __typename?: 'Query', getAboutMe: { __typename?: 'AboutMe', id: string, fieldName: string, description: string } };

export type GetWorkExperienceEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;


export type GetWorkExperienceEntriesQuery = { __typename?: 'Query', getWorkExperienceEntries: Array<{ __typename?: 'WorkExperience', id: string, name: string, position: string, duration?: string | null, location?: string | null, type?: string | null, description?: string | null, skills?: Array<string> | null }> };

export type GetProjectEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;


export type GetProjectEntriesQuery = { __typename?: 'Query', getProjectEntries: Array<{ __typename?: 'Project', id: string, name: string, description: string, skills: Array<string> }> };

export type GetSkillEntriesQueryVariables = Exact<{
  cvId: Scalars['ID']['input'];
}>;


export type GetSkillEntriesQuery = { __typename?: 'Query', getSkillEntries: Array<{ __typename?: 'Skill', id: string, category: string, items: Array<string> }> };

export type GetCvInformationQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCvInformationQuery = { __typename?: 'Query', getCv: { __typename?: 'CV', id: string, title: string } };

export type HealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthCheckQuery = { __typename?: 'Query', healthCheck: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, googleId: string, createdAt: any, deletedAt?: any | null } };

export const WorkExperienceFragmentDoc = gql`
    fragment WorkExperienceFragment on WorkExperience {
  id
  name
  position
  duration
  location
  type
  description
  skills
}
    `;
export const CreateCvDocument = gql`
    mutation CreateCv($templateId: ID) {
  createNewCv(templateId: $templateId) {
    id
    title
  }
}
    `;
export type CreateCvMutationFn = Apollo.MutationFunction<CreateCvMutation, CreateCvMutationVariables>;
export type CreateCvComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCvMutation, CreateCvMutationVariables>, 'mutation'>;

    export const CreateCvComponent = (props: CreateCvComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCvMutation, CreateCvMutationVariables> mutation={CreateCvDocument} {...props} />
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
export function useCreateCvMutation(baseOptions?: Apollo.MutationHookOptions<CreateCvMutation, CreateCvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCvMutation, CreateCvMutationVariables>(CreateCvDocument, options);
      }
export type CreateCvMutationHookResult = ReturnType<typeof useCreateCvMutation>;
export type CreateCvMutationResult = Apollo.MutationResult<CreateCvMutation>;
export type CreateCvMutationOptions = Apollo.BaseMutationOptions<CreateCvMutation, CreateCvMutationVariables>;
export const DeleteCvDocument = gql`
    mutation DeleteCv($id: ID!) {
  deleteCv(id: $id)
}
    `;
export type DeleteCvMutationFn = Apollo.MutationFunction<DeleteCvMutation, DeleteCvMutationVariables>;
export type DeleteCvComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteCvMutation, DeleteCvMutationVariables>, 'mutation'>;

    export const DeleteCvComponent = (props: DeleteCvComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteCvMutation, DeleteCvMutationVariables> mutation={DeleteCvDocument} {...props} />
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
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCvMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCvMutation, DeleteCvMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCvMutation, DeleteCvMutationVariables>(DeleteCvDocument, options);
      }
export type DeleteCvMutationHookResult = ReturnType<typeof useDeleteCvMutation>;
export type DeleteCvMutationResult = Apollo.MutationResult<DeleteCvMutation>;
export type DeleteCvMutationOptions = Apollo.BaseMutationOptions<DeleteCvMutation, DeleteCvMutationVariables>;
export const GetCvsDocument = gql`
    query GetCvs {
  getCvs {
    count
    items {
      id
      name: title
    }
  }
}
    `;
export type GetCvsComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCvsQuery, GetCvsQueryVariables>, 'query'>;

    export const GetCvsComponent = (props: GetCvsComponentProps) => (
      <ApolloReactComponents.Query<GetCvsQuery, GetCvsQueryVariables> query={GetCvsDocument} {...props} />
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
export function useGetCvsQuery(baseOptions?: Apollo.QueryHookOptions<GetCvsQuery, GetCvsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCvsQuery, GetCvsQueryVariables>(GetCvsDocument, options);
      }
export function useGetCvsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCvsQuery, GetCvsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCvsQuery, GetCvsQueryVariables>(GetCvsDocument, options);
        }
export function useGetCvsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCvsQuery, GetCvsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCvsQuery, GetCvsQueryVariables>(GetCvsDocument, options);
        }
export type GetCvsQueryHookResult = ReturnType<typeof useGetCvsQuery>;
export type GetCvsLazyQueryHookResult = ReturnType<typeof useGetCvsLazyQuery>;
export type GetCvsSuspenseQueryHookResult = ReturnType<typeof useGetCvsSuspenseQuery>;
export type GetCvsQueryResult = Apollo.QueryResult<GetCvsQuery, GetCvsQueryVariables>;
export function refetchGetCvsQuery(variables?: GetCvsQueryVariables) {
      return { query: GetCvsDocument, variables: variables }
    }
export const UpdateEducationEntryDocument = gql`
    mutation UpdateEducationEntry($id: ID!, $cvId: ID!, $name: String, $degree: String, $duration: String, $location: String, $type: String, $skills: [String!], $description: String) {
  updateEducation(
    name: $name
    degree: $degree
    duration: $duration
    location: $location
    type: $type
    description: $description
    skills: $skills
    id: $id
    cvId: $cvId
  )
}
    `;
export type UpdateEducationEntryMutationFn = Apollo.MutationFunction<UpdateEducationEntryMutation, UpdateEducationEntryMutationVariables>;
export type UpdateEducationEntryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateEducationEntryMutation, UpdateEducationEntryMutationVariables>, 'mutation'>;

    export const UpdateEducationEntryComponent = (props: UpdateEducationEntryComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateEducationEntryMutation, UpdateEducationEntryMutationVariables> mutation={UpdateEducationEntryDocument} {...props} />
    );
    

/**
 * __useUpdateEducationEntryMutation__
 *
 * To run a mutation, you first call `useUpdateEducationEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEducationEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEducationEntryMutation, { data, loading, error }] = useUpdateEducationEntryMutation({
 *   variables: {
 *      id: // value for 'id'
 *      cvId: // value for 'cvId'
 *      name: // value for 'name'
 *      degree: // value for 'degree'
 *      duration: // value for 'duration'
 *      location: // value for 'location'
 *      type: // value for 'type'
 *      skills: // value for 'skills'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateEducationEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEducationEntryMutation, UpdateEducationEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEducationEntryMutation, UpdateEducationEntryMutationVariables>(UpdateEducationEntryDocument, options);
      }
export type UpdateEducationEntryMutationHookResult = ReturnType<typeof useUpdateEducationEntryMutation>;
export type UpdateEducationEntryMutationResult = Apollo.MutationResult<UpdateEducationEntryMutation>;
export type UpdateEducationEntryMutationOptions = Apollo.BaseMutationOptions<UpdateEducationEntryMutation, UpdateEducationEntryMutationVariables>;
export const UpdateContactInfoDocument = gql`
    mutation UpdateContactInfo($id: ID!, $cvId: ID!, $email: String, $phone: String, $name: String) {
  updateContactInfo(
    id: $id
    cvId: $cvId
    email: $email
    phone: $phone
    name: $name
  )
}
    `;
export type UpdateContactInfoMutationFn = Apollo.MutationFunction<UpdateContactInfoMutation, UpdateContactInfoMutationVariables>;
export type UpdateContactInfoComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateContactInfoMutation, UpdateContactInfoMutationVariables>, 'mutation'>;

    export const UpdateContactInfoComponent = (props: UpdateContactInfoComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateContactInfoMutation, UpdateContactInfoMutationVariables> mutation={UpdateContactInfoDocument} {...props} />
    );
    

/**
 * __useUpdateContactInfoMutation__
 *
 * To run a mutation, you first call `useUpdateContactInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateContactInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateContactInfoMutation, { data, loading, error }] = useUpdateContactInfoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      cvId: // value for 'cvId'
 *      email: // value for 'email'
 *      phone: // value for 'phone'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateContactInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateContactInfoMutation, UpdateContactInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateContactInfoMutation, UpdateContactInfoMutationVariables>(UpdateContactInfoDocument, options);
      }
export type UpdateContactInfoMutationHookResult = ReturnType<typeof useUpdateContactInfoMutation>;
export type UpdateContactInfoMutationResult = Apollo.MutationResult<UpdateContactInfoMutation>;
export type UpdateContactInfoMutationOptions = Apollo.BaseMutationOptions<UpdateContactInfoMutation, UpdateContactInfoMutationVariables>;
export const UpdateAboutMeDocument = gql`
    mutation UpdateAboutMe($cvId: ID!, $id: ID!, $fieldName: String, $description: String) {
  updateAboutMe(
    id: $id
    cvId: $cvId
    fieldName: $fieldName
    description: $description
  )
}
    `;
export type UpdateAboutMeMutationFn = Apollo.MutationFunction<UpdateAboutMeMutation, UpdateAboutMeMutationVariables>;
export type UpdateAboutMeComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateAboutMeMutation, UpdateAboutMeMutationVariables>, 'mutation'>;

    export const UpdateAboutMeComponent = (props: UpdateAboutMeComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateAboutMeMutation, UpdateAboutMeMutationVariables> mutation={UpdateAboutMeDocument} {...props} />
    );
    

/**
 * __useUpdateAboutMeMutation__
 *
 * To run a mutation, you first call `useUpdateAboutMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAboutMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAboutMeMutation, { data, loading, error }] = useUpdateAboutMeMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      id: // value for 'id'
 *      fieldName: // value for 'fieldName'
 *      description: // value for 'description'
 *   },
 * });
 */
export function useUpdateAboutMeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAboutMeMutation, UpdateAboutMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAboutMeMutation, UpdateAboutMeMutationVariables>(UpdateAboutMeDocument, options);
      }
export type UpdateAboutMeMutationHookResult = ReturnType<typeof useUpdateAboutMeMutation>;
export type UpdateAboutMeMutationResult = Apollo.MutationResult<UpdateAboutMeMutation>;
export type UpdateAboutMeMutationOptions = Apollo.BaseMutationOptions<UpdateAboutMeMutation, UpdateAboutMeMutationVariables>;
export const UpdateWorkExperienceEntryDocument = gql`
    mutation UpdateWorkExperienceEntry($cvId: ID!, $id: ID!, $name: String, $position: String, $duration: String, $location: String, $type: String, $description: String, $skills: [String!]) {
  updateWorkExperience(
    cvId: $cvId
    id: $id
    name: $name
    position: $position
    duration: $duration
    location: $location
    type: $type
    description: $description
    skills: $skills
  )
}
    `;
export type UpdateWorkExperienceEntryMutationFn = Apollo.MutationFunction<UpdateWorkExperienceEntryMutation, UpdateWorkExperienceEntryMutationVariables>;
export type UpdateWorkExperienceEntryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateWorkExperienceEntryMutation, UpdateWorkExperienceEntryMutationVariables>, 'mutation'>;

    export const UpdateWorkExperienceEntryComponent = (props: UpdateWorkExperienceEntryComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateWorkExperienceEntryMutation, UpdateWorkExperienceEntryMutationVariables> mutation={UpdateWorkExperienceEntryDocument} {...props} />
    );
    

/**
 * __useUpdateWorkExperienceEntryMutation__
 *
 * To run a mutation, you first call `useUpdateWorkExperienceEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkExperienceEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkExperienceEntryMutation, { data, loading, error }] = useUpdateWorkExperienceEntryMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *      duration: // value for 'duration'
 *      location: // value for 'location'
 *      type: // value for 'type'
 *      description: // value for 'description'
 *      skills: // value for 'skills'
 *   },
 * });
 */
export function useUpdateWorkExperienceEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkExperienceEntryMutation, UpdateWorkExperienceEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkExperienceEntryMutation, UpdateWorkExperienceEntryMutationVariables>(UpdateWorkExperienceEntryDocument, options);
      }
export type UpdateWorkExperienceEntryMutationHookResult = ReturnType<typeof useUpdateWorkExperienceEntryMutation>;
export type UpdateWorkExperienceEntryMutationResult = Apollo.MutationResult<UpdateWorkExperienceEntryMutation>;
export type UpdateWorkExperienceEntryMutationOptions = Apollo.BaseMutationOptions<UpdateWorkExperienceEntryMutation, UpdateWorkExperienceEntryMutationVariables>;
export const UpdateProjectEntryDocument = gql`
    mutation UpdateProjectEntry($cvId: ID!, $id: ID!, $name: String, $description: String, $skills: [String!]) {
  updateProject(
    cvId: $cvId
    id: $id
    name: $name
    description: $description
    skills: $skills
  )
}
    `;
export type UpdateProjectEntryMutationFn = Apollo.MutationFunction<UpdateProjectEntryMutation, UpdateProjectEntryMutationVariables>;
export type UpdateProjectEntryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateProjectEntryMutation, UpdateProjectEntryMutationVariables>, 'mutation'>;

    export const UpdateProjectEntryComponent = (props: UpdateProjectEntryComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateProjectEntryMutation, UpdateProjectEntryMutationVariables> mutation={UpdateProjectEntryDocument} {...props} />
    );
    

/**
 * __useUpdateProjectEntryMutation__
 *
 * To run a mutation, you first call `useUpdateProjectEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectEntryMutation, { data, loading, error }] = useUpdateProjectEntryMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      skills: // value for 'skills'
 *   },
 * });
 */
export function useUpdateProjectEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectEntryMutation, UpdateProjectEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectEntryMutation, UpdateProjectEntryMutationVariables>(UpdateProjectEntryDocument, options);
      }
export type UpdateProjectEntryMutationHookResult = ReturnType<typeof useUpdateProjectEntryMutation>;
export type UpdateProjectEntryMutationResult = Apollo.MutationResult<UpdateProjectEntryMutation>;
export type UpdateProjectEntryMutationOptions = Apollo.BaseMutationOptions<UpdateProjectEntryMutation, UpdateProjectEntryMutationVariables>;
export const UpdateSkillEntryDocument = gql`
    mutation UpdateSkillEntry($cvId: ID!, $id: ID!, $category: String) {
  updateSkill(cvId: $cvId, id: $id, category: $category)
}
    `;
export type UpdateSkillEntryMutationFn = Apollo.MutationFunction<UpdateSkillEntryMutation, UpdateSkillEntryMutationVariables>;
export type UpdateSkillEntryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateSkillEntryMutation, UpdateSkillEntryMutationVariables>, 'mutation'>;

    export const UpdateSkillEntryComponent = (props: UpdateSkillEntryComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateSkillEntryMutation, UpdateSkillEntryMutationVariables> mutation={UpdateSkillEntryDocument} {...props} />
    );
    

/**
 * __useUpdateSkillEntryMutation__
 *
 * To run a mutation, you first call `useUpdateSkillEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSkillEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSkillEntryMutation, { data, loading, error }] = useUpdateSkillEntryMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      id: // value for 'id'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUpdateSkillEntryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSkillEntryMutation, UpdateSkillEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSkillEntryMutation, UpdateSkillEntryMutationVariables>(UpdateSkillEntryDocument, options);
      }
export type UpdateSkillEntryMutationHookResult = ReturnType<typeof useUpdateSkillEntryMutation>;
export type UpdateSkillEntryMutationResult = Apollo.MutationResult<UpdateSkillEntryMutation>;
export type UpdateSkillEntryMutationOptions = Apollo.BaseMutationOptions<UpdateSkillEntryMutation, UpdateSkillEntryMutationVariables>;
export const CreateWorkExperienceEntryDocument = gql`
    mutation CreateWorkExperienceEntry($cvId: ID!, $name: String!, $position: String!, $duration: String, $location: String, $type: String, $description: String, $skills: [String!]) {
  createWorkExperience(
    cvId: $cvId
    name: $name
    position: $position
    duration: $duration
    location: $location
    type: $type
    description: $description
    skills: $skills
  ) {
    id
    name
    position
    duration
    location
    type
    description
    skills
  }
}
    `;
export type CreateWorkExperienceEntryMutationFn = Apollo.MutationFunction<CreateWorkExperienceEntryMutation, CreateWorkExperienceEntryMutationVariables>;
export type CreateWorkExperienceEntryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateWorkExperienceEntryMutation, CreateWorkExperienceEntryMutationVariables>, 'mutation'>;

    export const CreateWorkExperienceEntryComponent = (props: CreateWorkExperienceEntryComponentProps) => (
      <ApolloReactComponents.Mutation<CreateWorkExperienceEntryMutation, CreateWorkExperienceEntryMutationVariables> mutation={CreateWorkExperienceEntryDocument} {...props} />
    );
    

/**
 * __useCreateWorkExperienceEntryMutation__
 *
 * To run a mutation, you first call `useCreateWorkExperienceEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkExperienceEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkExperienceEntryMutation, { data, loading, error }] = useCreateWorkExperienceEntryMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      name: // value for 'name'
 *      position: // value for 'position'
 *      duration: // value for 'duration'
 *      location: // value for 'location'
 *      type: // value for 'type'
 *      description: // value for 'description'
 *      skills: // value for 'skills'
 *   },
 * });
 */
export function useCreateWorkExperienceEntryMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkExperienceEntryMutation, CreateWorkExperienceEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkExperienceEntryMutation, CreateWorkExperienceEntryMutationVariables>(CreateWorkExperienceEntryDocument, options);
      }
export type CreateWorkExperienceEntryMutationHookResult = ReturnType<typeof useCreateWorkExperienceEntryMutation>;
export type CreateWorkExperienceEntryMutationResult = Apollo.MutationResult<CreateWorkExperienceEntryMutation>;
export type CreateWorkExperienceEntryMutationOptions = Apollo.BaseMutationOptions<CreateWorkExperienceEntryMutation, CreateWorkExperienceEntryMutationVariables>;
export const DeleteWorkExperienceEntryDocument = gql`
    mutation DeleteWorkExperienceEntry($cvId: ID!, $id: ID!) {
  deleteWorkExperience(cvId: $cvId, id: $id)
}
    `;
export type DeleteWorkExperienceEntryMutationFn = Apollo.MutationFunction<DeleteWorkExperienceEntryMutation, DeleteWorkExperienceEntryMutationVariables>;
export type DeleteWorkExperienceEntryComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteWorkExperienceEntryMutation, DeleteWorkExperienceEntryMutationVariables>, 'mutation'>;

    export const DeleteWorkExperienceEntryComponent = (props: DeleteWorkExperienceEntryComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteWorkExperienceEntryMutation, DeleteWorkExperienceEntryMutationVariables> mutation={DeleteWorkExperienceEntryDocument} {...props} />
    );
    

/**
 * __useDeleteWorkExperienceEntryMutation__
 *
 * To run a mutation, you first call `useDeleteWorkExperienceEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkExperienceEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkExperienceEntryMutation, { data, loading, error }] = useDeleteWorkExperienceEntryMutation({
 *   variables: {
 *      cvId: // value for 'cvId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteWorkExperienceEntryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkExperienceEntryMutation, DeleteWorkExperienceEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkExperienceEntryMutation, DeleteWorkExperienceEntryMutationVariables>(DeleteWorkExperienceEntryDocument, options);
      }
export type DeleteWorkExperienceEntryMutationHookResult = ReturnType<typeof useDeleteWorkExperienceEntryMutation>;
export type DeleteWorkExperienceEntryMutationResult = Apollo.MutationResult<DeleteWorkExperienceEntryMutation>;
export type DeleteWorkExperienceEntryMutationOptions = Apollo.BaseMutationOptions<DeleteWorkExperienceEntryMutation, DeleteWorkExperienceEntryMutationVariables>;
export const GenerateNewEntryItemDocument = gql`
    mutation GenerateNewEntryItem($cvId: ID!, $type: CvEntryType!) {
  generateNewEntryItem(cvId: $cvId, type: $type) {
    __typename
    ... on WorkExperience {
      ...WorkExperienceFragment
    }
  }
}
    ${WorkExperienceFragmentDoc}`;
export type GenerateNewEntryItemMutationFn = Apollo.MutationFunction<GenerateNewEntryItemMutation, GenerateNewEntryItemMutationVariables>;
export type GenerateNewEntryItemComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<GenerateNewEntryItemMutation, GenerateNewEntryItemMutationVariables>, 'mutation'>;

    export const GenerateNewEntryItemComponent = (props: GenerateNewEntryItemComponentProps) => (
      <ApolloReactComponents.Mutation<GenerateNewEntryItemMutation, GenerateNewEntryItemMutationVariables> mutation={GenerateNewEntryItemDocument} {...props} />
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
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGenerateNewEntryItemMutation(baseOptions?: Apollo.MutationHookOptions<GenerateNewEntryItemMutation, GenerateNewEntryItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GenerateNewEntryItemMutation, GenerateNewEntryItemMutationVariables>(GenerateNewEntryItemDocument, options);
      }
export type GenerateNewEntryItemMutationHookResult = ReturnType<typeof useGenerateNewEntryItemMutation>;
export type GenerateNewEntryItemMutationResult = Apollo.MutationResult<GenerateNewEntryItemMutation>;
export type GenerateNewEntryItemMutationOptions = Apollo.BaseMutationOptions<GenerateNewEntryItemMutation, GenerateNewEntryItemMutationVariables>;
export const GetEducationEntriesDocument = gql`
    query GetEducationEntries($cvId: ID!) {
  getEducationEntriesByCv(cvId: $cvId) {
    id
    name
    description
    degree
    location
    duration
    skills
  }
}
    `;
export type GetEducationEntriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetEducationEntriesQuery, GetEducationEntriesQueryVariables>, 'query'> & ({ variables: GetEducationEntriesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetEducationEntriesComponent = (props: GetEducationEntriesComponentProps) => (
      <ApolloReactComponents.Query<GetEducationEntriesQuery, GetEducationEntriesQueryVariables> query={GetEducationEntriesDocument} {...props} />
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
export function useGetEducationEntriesQuery(baseOptions: Apollo.QueryHookOptions<GetEducationEntriesQuery, GetEducationEntriesQueryVariables> & ({ variables: GetEducationEntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetEducationEntriesQuery, GetEducationEntriesQueryVariables>(GetEducationEntriesDocument, options);
      }
export function useGetEducationEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetEducationEntriesQuery, GetEducationEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetEducationEntriesQuery, GetEducationEntriesQueryVariables>(GetEducationEntriesDocument, options);
        }
export function useGetEducationEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetEducationEntriesQuery, GetEducationEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetEducationEntriesQuery, GetEducationEntriesQueryVariables>(GetEducationEntriesDocument, options);
        }
export type GetEducationEntriesQueryHookResult = ReturnType<typeof useGetEducationEntriesQuery>;
export type GetEducationEntriesLazyQueryHookResult = ReturnType<typeof useGetEducationEntriesLazyQuery>;
export type GetEducationEntriesSuspenseQueryHookResult = ReturnType<typeof useGetEducationEntriesSuspenseQuery>;
export type GetEducationEntriesQueryResult = Apollo.QueryResult<GetEducationEntriesQuery, GetEducationEntriesQueryVariables>;
export function refetchGetEducationEntriesQuery(variables: GetEducationEntriesQueryVariables) {
      return { query: GetEducationEntriesDocument, variables: variables }
    }
export const GetContactInfoDocument = gql`
    query GetContactInfo($cvId: ID!) {
  getContactInfo(cvId: $cvId) {
    id
    name
    email
    phone
  }
}
    `;
export type GetContactInfoComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetContactInfoQuery, GetContactInfoQueryVariables>, 'query'> & ({ variables: GetContactInfoQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetContactInfoComponent = (props: GetContactInfoComponentProps) => (
      <ApolloReactComponents.Query<GetContactInfoQuery, GetContactInfoQueryVariables> query={GetContactInfoDocument} {...props} />
    );
    

/**
 * __useGetContactInfoQuery__
 *
 * To run a query within a React component, call `useGetContactInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContactInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContactInfoQuery({
 *   variables: {
 *      cvId: // value for 'cvId'
 *   },
 * });
 */
export function useGetContactInfoQuery(baseOptions: Apollo.QueryHookOptions<GetContactInfoQuery, GetContactInfoQueryVariables> & ({ variables: GetContactInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetContactInfoQuery, GetContactInfoQueryVariables>(GetContactInfoDocument, options);
      }
export function useGetContactInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetContactInfoQuery, GetContactInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetContactInfoQuery, GetContactInfoQueryVariables>(GetContactInfoDocument, options);
        }
export function useGetContactInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetContactInfoQuery, GetContactInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetContactInfoQuery, GetContactInfoQueryVariables>(GetContactInfoDocument, options);
        }
export type GetContactInfoQueryHookResult = ReturnType<typeof useGetContactInfoQuery>;
export type GetContactInfoLazyQueryHookResult = ReturnType<typeof useGetContactInfoLazyQuery>;
export type GetContactInfoSuspenseQueryHookResult = ReturnType<typeof useGetContactInfoSuspenseQuery>;
export type GetContactInfoQueryResult = Apollo.QueryResult<GetContactInfoQuery, GetContactInfoQueryVariables>;
export function refetchGetContactInfoQuery(variables: GetContactInfoQueryVariables) {
      return { query: GetContactInfoDocument, variables: variables }
    }
export const GetAboutMeDocument = gql`
    query GetAboutMe($cvId: ID!) {
  getAboutMe(cvId: $cvId) {
    id
    fieldName
    description
  }
}
    `;
export type GetAboutMeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetAboutMeQuery, GetAboutMeQueryVariables>, 'query'> & ({ variables: GetAboutMeQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetAboutMeComponent = (props: GetAboutMeComponentProps) => (
      <ApolloReactComponents.Query<GetAboutMeQuery, GetAboutMeQueryVariables> query={GetAboutMeDocument} {...props} />
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
export function useGetAboutMeQuery(baseOptions: Apollo.QueryHookOptions<GetAboutMeQuery, GetAboutMeQueryVariables> & ({ variables: GetAboutMeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAboutMeQuery, GetAboutMeQueryVariables>(GetAboutMeDocument, options);
      }
export function useGetAboutMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAboutMeQuery, GetAboutMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAboutMeQuery, GetAboutMeQueryVariables>(GetAboutMeDocument, options);
        }
export function useGetAboutMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAboutMeQuery, GetAboutMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAboutMeQuery, GetAboutMeQueryVariables>(GetAboutMeDocument, options);
        }
export type GetAboutMeQueryHookResult = ReturnType<typeof useGetAboutMeQuery>;
export type GetAboutMeLazyQueryHookResult = ReturnType<typeof useGetAboutMeLazyQuery>;
export type GetAboutMeSuspenseQueryHookResult = ReturnType<typeof useGetAboutMeSuspenseQuery>;
export type GetAboutMeQueryResult = Apollo.QueryResult<GetAboutMeQuery, GetAboutMeQueryVariables>;
export function refetchGetAboutMeQuery(variables: GetAboutMeQueryVariables) {
      return { query: GetAboutMeDocument, variables: variables }
    }
export const GetWorkExperienceEntriesDocument = gql`
    query GetWorkExperienceEntries($cvId: ID!) {
  getWorkExperienceEntries(cvId: $cvId) {
    ...WorkExperienceFragment
  }
}
    ${WorkExperienceFragmentDoc}`;
export type GetWorkExperienceEntriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables>, 'query'> & ({ variables: GetWorkExperienceEntriesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetWorkExperienceEntriesComponent = (props: GetWorkExperienceEntriesComponentProps) => (
      <ApolloReactComponents.Query<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables> query={GetWorkExperienceEntriesDocument} {...props} />
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
export function useGetWorkExperienceEntriesQuery(baseOptions: Apollo.QueryHookOptions<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables> & ({ variables: GetWorkExperienceEntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables>(GetWorkExperienceEntriesDocument, options);
      }
export function useGetWorkExperienceEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables>(GetWorkExperienceEntriesDocument, options);
        }
export function useGetWorkExperienceEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables>(GetWorkExperienceEntriesDocument, options);
        }
export type GetWorkExperienceEntriesQueryHookResult = ReturnType<typeof useGetWorkExperienceEntriesQuery>;
export type GetWorkExperienceEntriesLazyQueryHookResult = ReturnType<typeof useGetWorkExperienceEntriesLazyQuery>;
export type GetWorkExperienceEntriesSuspenseQueryHookResult = ReturnType<typeof useGetWorkExperienceEntriesSuspenseQuery>;
export type GetWorkExperienceEntriesQueryResult = Apollo.QueryResult<GetWorkExperienceEntriesQuery, GetWorkExperienceEntriesQueryVariables>;
export function refetchGetWorkExperienceEntriesQuery(variables: GetWorkExperienceEntriesQueryVariables) {
      return { query: GetWorkExperienceEntriesDocument, variables: variables }
    }
export const GetProjectEntriesDocument = gql`
    query GetProjectEntries($cvId: ID!) {
  getProjectEntries(cvId: $cvId) {
    id
    name
    description
    skills
  }
}
    `;
export type GetProjectEntriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetProjectEntriesQuery, GetProjectEntriesQueryVariables>, 'query'> & ({ variables: GetProjectEntriesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetProjectEntriesComponent = (props: GetProjectEntriesComponentProps) => (
      <ApolloReactComponents.Query<GetProjectEntriesQuery, GetProjectEntriesQueryVariables> query={GetProjectEntriesDocument} {...props} />
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
export function useGetProjectEntriesQuery(baseOptions: Apollo.QueryHookOptions<GetProjectEntriesQuery, GetProjectEntriesQueryVariables> & ({ variables: GetProjectEntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectEntriesQuery, GetProjectEntriesQueryVariables>(GetProjectEntriesDocument, options);
      }
export function useGetProjectEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectEntriesQuery, GetProjectEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectEntriesQuery, GetProjectEntriesQueryVariables>(GetProjectEntriesDocument, options);
        }
export function useGetProjectEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetProjectEntriesQuery, GetProjectEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProjectEntriesQuery, GetProjectEntriesQueryVariables>(GetProjectEntriesDocument, options);
        }
export type GetProjectEntriesQueryHookResult = ReturnType<typeof useGetProjectEntriesQuery>;
export type GetProjectEntriesLazyQueryHookResult = ReturnType<typeof useGetProjectEntriesLazyQuery>;
export type GetProjectEntriesSuspenseQueryHookResult = ReturnType<typeof useGetProjectEntriesSuspenseQuery>;
export type GetProjectEntriesQueryResult = Apollo.QueryResult<GetProjectEntriesQuery, GetProjectEntriesQueryVariables>;
export function refetchGetProjectEntriesQuery(variables: GetProjectEntriesQueryVariables) {
      return { query: GetProjectEntriesDocument, variables: variables }
    }
export const GetSkillEntriesDocument = gql`
    query GetSkillEntries($cvId: ID!) {
  getSkillEntries(cvId: $cvId) {
    id
    category
    items
  }
}
    `;
export type GetSkillEntriesComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>, 'query'> & ({ variables: GetSkillEntriesQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetSkillEntriesComponent = (props: GetSkillEntriesComponentProps) => (
      <ApolloReactComponents.Query<GetSkillEntriesQuery, GetSkillEntriesQueryVariables> query={GetSkillEntriesDocument} {...props} />
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
export function useGetSkillEntriesQuery(baseOptions: Apollo.QueryHookOptions<GetSkillEntriesQuery, GetSkillEntriesQueryVariables> & ({ variables: GetSkillEntriesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>(GetSkillEntriesDocument, options);
      }
export function useGetSkillEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>(GetSkillEntriesDocument, options);
        }
export function useGetSkillEntriesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>(GetSkillEntriesDocument, options);
        }
export type GetSkillEntriesQueryHookResult = ReturnType<typeof useGetSkillEntriesQuery>;
export type GetSkillEntriesLazyQueryHookResult = ReturnType<typeof useGetSkillEntriesLazyQuery>;
export type GetSkillEntriesSuspenseQueryHookResult = ReturnType<typeof useGetSkillEntriesSuspenseQuery>;
export type GetSkillEntriesQueryResult = Apollo.QueryResult<GetSkillEntriesQuery, GetSkillEntriesQueryVariables>;
export function refetchGetSkillEntriesQuery(variables: GetSkillEntriesQueryVariables) {
      return { query: GetSkillEntriesDocument, variables: variables }
    }
export const GetCvInformationDocument = gql`
    query GetCvInformation($id: ID!) {
  getCv(id: $id) {
    id
    title
  }
}
    `;
export type GetCvInformationComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCvInformationQuery, GetCvInformationQueryVariables>, 'query'> & ({ variables: GetCvInformationQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GetCvInformationComponent = (props: GetCvInformationComponentProps) => (
      <ApolloReactComponents.Query<GetCvInformationQuery, GetCvInformationQueryVariables> query={GetCvInformationDocument} {...props} />
    );
    

/**
 * __useGetCvInformationQuery__
 *
 * To run a query within a React component, call `useGetCvInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCvInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCvInformationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCvInformationQuery(baseOptions: Apollo.QueryHookOptions<GetCvInformationQuery, GetCvInformationQueryVariables> & ({ variables: GetCvInformationQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCvInformationQuery, GetCvInformationQueryVariables>(GetCvInformationDocument, options);
      }
export function useGetCvInformationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCvInformationQuery, GetCvInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCvInformationQuery, GetCvInformationQueryVariables>(GetCvInformationDocument, options);
        }
export function useGetCvInformationSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCvInformationQuery, GetCvInformationQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCvInformationQuery, GetCvInformationQueryVariables>(GetCvInformationDocument, options);
        }
export type GetCvInformationQueryHookResult = ReturnType<typeof useGetCvInformationQuery>;
export type GetCvInformationLazyQueryHookResult = ReturnType<typeof useGetCvInformationLazyQuery>;
export type GetCvInformationSuspenseQueryHookResult = ReturnType<typeof useGetCvInformationSuspenseQuery>;
export type GetCvInformationQueryResult = Apollo.QueryResult<GetCvInformationQuery, GetCvInformationQueryVariables>;
export function refetchGetCvInformationQuery(variables: GetCvInformationQueryVariables) {
      return { query: GetCvInformationDocument, variables: variables }
    }
export const HealthCheckDocument = gql`
    query HealthCheck {
  healthCheck
}
    `;
export type HealthCheckComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<HealthCheckQuery, HealthCheckQueryVariables>, 'query'>;

    export const HealthCheckComponent = (props: HealthCheckComponentProps) => (
      <ApolloReactComponents.Query<HealthCheckQuery, HealthCheckQueryVariables> query={HealthCheckDocument} {...props} />
    );
    

/**
 * __useHealthCheckQuery__
 *
 * To run a query within a React component, call `useHealthCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthCheckQuery({
 *   variables: {
 *   },
 * });
 */
export function useHealthCheckQuery(baseOptions?: Apollo.QueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
      }
export function useHealthCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
        }
export function useHealthCheckSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
        }
export type HealthCheckQueryHookResult = ReturnType<typeof useHealthCheckQuery>;
export type HealthCheckLazyQueryHookResult = ReturnType<typeof useHealthCheckLazyQuery>;
export type HealthCheckSuspenseQueryHookResult = ReturnType<typeof useHealthCheckSuspenseQuery>;
export type HealthCheckQueryResult = Apollo.QueryResult<HealthCheckQuery, HealthCheckQueryVariables>;
export function refetchHealthCheckQuery(variables?: HealthCheckQueryVariables) {
      return { query: HealthCheckDocument, variables: variables }
    }
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;
export type LogoutComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LogoutMutation, LogoutMutationVariables>, 'mutation'>;

    export const LogoutComponent = (props: LogoutComponentProps) => (
      <ApolloReactComponents.Mutation<LogoutMutation, LogoutMutationVariables> mutation={LogoutDocument} {...props} />
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
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
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
export type GetCurrentUserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>, 'query'>;

    export const GetCurrentUserComponent = (props: GetCurrentUserComponentProps) => (
      <ApolloReactComponents.Query<GetCurrentUserQuery, GetCurrentUserQueryVariables> query={GetCurrentUserDocument} {...props} />
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
export function useGetCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
      }
export function useGetCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export function useGetCurrentUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentUserQuery, GetCurrentUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentUserQuery, GetCurrentUserQueryVariables>(GetCurrentUserDocument, options);
        }
export type GetCurrentUserQueryHookResult = ReturnType<typeof useGetCurrentUserQuery>;
export type GetCurrentUserLazyQueryHookResult = ReturnType<typeof useGetCurrentUserLazyQuery>;
export type GetCurrentUserSuspenseQueryHookResult = ReturnType<typeof useGetCurrentUserSuspenseQuery>;
export type GetCurrentUserQueryResult = Apollo.QueryResult<GetCurrentUserQuery, GetCurrentUserQueryVariables>;
export function refetchGetCurrentUserQuery(variables?: GetCurrentUserQueryVariables) {
      return { query: GetCurrentUserDocument, variables: variables }
    }