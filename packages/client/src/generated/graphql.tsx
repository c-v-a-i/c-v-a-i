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

export type Cv = {
  __typename?: 'CV';
  contactInfo: ContactInfo;
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  educationEntries: Array<Education>;
  id: Scalars['ID']['output'];
  projectEntries: Array<Project>;
  skillEntries: Array<Skill>;
  title: Scalars['String']['output'];
  user: User;
  workExperienceEntries: Array<WorkExperience>;
};

export type ContactInfo = {
  __typename?: 'ContactInfo';
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  phone: Scalars['String']['output'];
};

export type Education = {
  __typename?: 'Education';
  createdAt: Scalars['Date']['output'];
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
  createNewCv: Cv;
  deleteCv: Scalars['Boolean']['output'];
  logout: Scalars['Boolean']['output'];
};


export type MutationCreateNewCvArgs = {
  templateId: Scalars['ID']['input'];
};


export type MutationDeleteCvArgs = {
  id: Scalars['ID']['input'];
};

export type PaginatedCvObjectType = {
  __typename?: 'PaginatedCvObjectType';
  count: Scalars['Int']['output'];
  items: Array<Cv>;
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser: User;
  getCvs: PaginatedCvObjectType;
  healthCheck: Scalars['String']['output'];
  protectedData: Scalars['String']['output'];
  publicData: Scalars['String']['output'];
};

export type ScopeObjectType = {
  __typename?: 'ScopeObjectType';
  googleId: Scalars['String']['output'];
};

export type Skill = {
  __typename?: 'Skill';
  category: Scalars['String']['output'];
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  id: Scalars['ID']['output'];
  items: Array<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['Date']['output'];
  cvs: Array<Cv>;
  deletedAt?: Maybe<Scalars['Date']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  googleId: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
};

export type WorkExperience = {
  __typename?: 'WorkExperience';
  createdAt: Scalars['Date']['output'];
  deletedAt?: Maybe<Scalars['Date']['output']>;
  description: Scalars['String']['output'];
  duration: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  name: Scalars['String']['output'];
  position: Scalars['String']['output'];
  skills: Array<Scalars['String']['output']>;
  type: Scalars['String']['output'];
};

export type CreateCvFromTemplateMutationVariables = Exact<{
  templateId: Scalars['ID']['input'];
}>;


export type CreateCvFromTemplateMutation = { __typename?: 'Mutation', createNewCv: { __typename?: 'CV', id: string, title: string } };

export type DeleteCvMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteCvMutation = { __typename?: 'Mutation', deleteCv: boolean };

export type GetCvsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCvsQuery = { __typename?: 'Query', getCvs: { __typename?: 'PaginatedCvObjectType', count: number, items: Array<{ __typename?: 'CV', id: string, name: string, educationEntries: Array<{ __typename?: 'Education', id: string, name: string, degree: string, duration: string, location: string, type?: string | null, description: string, skills: Array<string> }>, workExperienceEntries: Array<{ __typename?: 'WorkExperience', id: string, name: string, position: string, duration: string, location: string, type: string, description: string, skills: Array<string> }>, projectEntries: Array<{ __typename?: 'Project', id: string, name: string, description: string, skills: Array<string> }>, skillEntries: Array<{ __typename?: 'Skill', id: string, category: string, items: Array<string> }>, contactInfo: { __typename?: 'ContactInfo', id: string, email: string, phone: string } }> } };

export type HealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthCheckQuery = { __typename?: 'Query', healthCheck: string };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type GetCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserQuery = { __typename?: 'Query', currentUser: { __typename?: 'User', id: string, email: string, firstName: string, lastName: string, googleId: string, createdAt: any, deletedAt?: any | null } };


export const CreateCvFromTemplateDocument = gql`
    mutation CreateCVFromTemplate($templateId: ID!) {
  createNewCv(templateId: $templateId) {
    id
    title
  }
}
    `;
export type CreateCvFromTemplateMutationFn = Apollo.MutationFunction<CreateCvFromTemplateMutation, CreateCvFromTemplateMutationVariables>;
export type CreateCvFromTemplateComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<CreateCvFromTemplateMutation, CreateCvFromTemplateMutationVariables>, 'mutation'>;

    export const CreateCvFromTemplateComponent = (props: CreateCvFromTemplateComponentProps) => (
      <ApolloReactComponents.Mutation<CreateCvFromTemplateMutation, CreateCvFromTemplateMutationVariables> mutation={CreateCvFromTemplateDocument} {...props} />
    );
    

/**
 * __useCreateCvFromTemplateMutation__
 *
 * To run a mutation, you first call `useCreateCvFromTemplateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCvFromTemplateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCvFromTemplateMutation, { data, loading, error }] = useCreateCvFromTemplateMutation({
 *   variables: {
 *      templateId: // value for 'templateId'
 *   },
 * });
 */
export function useCreateCvFromTemplateMutation(baseOptions?: Apollo.MutationHookOptions<CreateCvFromTemplateMutation, CreateCvFromTemplateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCvFromTemplateMutation, CreateCvFromTemplateMutationVariables>(CreateCvFromTemplateDocument, options);
      }
export type CreateCvFromTemplateMutationHookResult = ReturnType<typeof useCreateCvFromTemplateMutation>;
export type CreateCvFromTemplateMutationResult = Apollo.MutationResult<CreateCvFromTemplateMutation>;
export type CreateCvFromTemplateMutationOptions = Apollo.BaseMutationOptions<CreateCvFromTemplateMutation, CreateCvFromTemplateMutationVariables>;
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
      educationEntries {
        id
        name
        degree
        duration
        location
        type
        description
        skills
      }
      workExperienceEntries {
        id
        name
        position
        duration
        location
        type
        description
        skills
      }
      projectEntries {
        id
        name
        description
        skills
      }
      skillEntries {
        id
        category
        items
      }
      contactInfo {
        id
        email
        phone
      }
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