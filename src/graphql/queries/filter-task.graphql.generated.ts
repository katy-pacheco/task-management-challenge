import * as Types from '../../types/graphql';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate: Scalars['DateTime']['input'];
  name: Scalars['String']['input'];
  pointEstimate: PointEstimate;
  status: Status;
  tags: Array<TaskTag>;
};

export type DeleteTaskInput = {
  id: Scalars['String']['input'];
};

export type FilterTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  ownerId?: InputMaybe<Scalars['String']['input']>;
  pointEstimate?: InputMaybe<PointEstimate>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createTask: Task;
  deleteTask: Task;
  updateTask: Task;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};

/** Estimate point for a task */
export enum PointEstimate {
  Eight = 'EIGHT',
  Four = 'FOUR',
  One = 'ONE',
  Two = 'TWO',
  Zero = 'ZERO'
}

export type Query = {
  __typename?: 'Query';
  profile: User;
  tasks: Array<Task>;
  users: Array<User>;
};


export type QueryTasksArgs = {
  input: FilterTaskInput;
};

/** Status for Task */
export enum Status {
  Backlog = 'BACKLOG',
  Cancelled = 'CANCELLED',
  Done = 'DONE',
  InProgress = 'IN_PROGRESS',
  Todo = 'TODO'
}

export type Task = {
  __typename?: 'Task';
  assignee?: Maybe<User>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  dueDate: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pointEstimate: PointEstimate;
  position: Scalars['Float']['output'];
  status: Status;
  tags: Array<TaskTag>;
};

/** Enum for tags for tasks */
export enum TaskTag {
  Android = 'ANDROID',
  Ios = 'IOS',
  NodeJs = 'NODE_JS',
  Rails = 'RAILS',
  React = 'REACT'
}

export type UpdateTaskInput = {
  assigneeId?: InputMaybe<Scalars['String']['input']>;
  dueDate?: InputMaybe<Scalars['DateTime']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  pointEstimate?: InputMaybe<PointEstimate>;
  position?: InputMaybe<Scalars['Float']['input']>;
  status?: InputMaybe<Status>;
  tags?: InputMaybe<Array<TaskTag>>;
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  type: UserType;
  updatedAt: Scalars['DateTime']['output'];
};

/** Type of the User */
export enum UserType {
  Admin = 'ADMIN',
  Candidate = 'CANDIDATE'
}


export const GetFilterTasksDocument = gql`
    query getFilterTasks($input: FilterTaskInput!) {
  tasks(input: $input) {
    id
    name
    pointEstimate
    position
    assignee {
      id
      fullName
      createdAt
      email
      type
      updatedAt
    }
    createdAt
    creator {
      id
      fullName
      createdAt
      email
      type
      updatedAt
    }
    status
    dueDate
    tags
  }
}
    `;

/**
 * __useGetFilterTasksQuery__
 *
 * To run a query within a React component, call `useGetFilterTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilterTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilterTasksQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFilterTasksQuery(baseOptions: Apollo.QueryHookOptions<GetFilterTasksQuery, GetFilterTasksQueryVariables> & ({ variables: GetFilterTasksQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilterTasksQuery, GetFilterTasksQueryVariables>(GetFilterTasksDocument, options);
      }
export function useGetFilterTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilterTasksQuery, GetFilterTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilterTasksQuery, GetFilterTasksQueryVariables>(GetFilterTasksDocument, options);
        }
export function useGetFilterTasksSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilterTasksQuery, GetFilterTasksQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilterTasksQuery, GetFilterTasksQueryVariables>(GetFilterTasksDocument, options);
        }
export type GetFilterTasksQueryHookResult = ReturnType<typeof useGetFilterTasksQuery>;
export type GetFilterTasksLazyQueryHookResult = ReturnType<typeof useGetFilterTasksLazyQuery>;
export type GetFilterTasksSuspenseQueryHookResult = ReturnType<typeof useGetFilterTasksSuspenseQuery>;
export type GetFilterTasksQueryResult = Apollo.QueryResult<GetFilterTasksQuery, GetFilterTasksQueryVariables>;
export type GetFilterTasksQueryVariables = Types.Exact<{
  input: Types.FilterTaskInput;
}>;


export type GetFilterTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id: string, name: string, pointEstimate: Types.PointEstimate, position: number, createdAt: any, status: Types.Status, dueDate: any, tags: Array<Types.TaskTag>, assignee?: { __typename?: 'User', id: string, fullName: string, createdAt: any, email: string, type: Types.UserType, updatedAt: any } | null, creator: { __typename?: 'User', id: string, fullName: string, createdAt: any, email: string, type: Types.UserType, updatedAt: any } }> };
