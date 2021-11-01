import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type FieldError = {
  __typename?: 'FieldError';
  field?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type LoginOptions = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createRole: SingleRoleResponse;
  deleteRole: SingleRoleResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updateRole: SingleRoleResponse;
};


export type MutationCreateRoleArgs = {
  title: Scalars['String'];
};


export type MutationDeleteRoleArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  LoginOptions: LoginOptions;
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: Scalars['Int'];
  username: Scalars['String'];
};


export type MutationUpdateRoleArgs = {
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  role: SingleRoleResponse;
  roles: RoleResponse;
};


export type QueryRoleArgs = {
  id: Scalars['Float'];
};

export type Role = {
  __typename?: 'Role';
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type RoleResponse = {
  __typename?: 'RoleResponse';
  errors?: Maybe<Array<FieldError>>;
  roles?: Maybe<Array<Role>>;
};

export type SingleRoleResponse = {
  __typename?: 'SingleRoleResponse';
  errors?: Maybe<Array<FieldError>>;
  role?: Maybe<Role>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  role: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<User>>;
};

export type RegisterMutationVariables = Exact<{
  role: Scalars['Int'];
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', users?: Array<{ __typename?: 'User', id: number, email: string, username: string }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', roles: { __typename?: 'RoleResponse', roles?: Array<{ __typename?: 'Role', id: number, title: string }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };


export const RegisterDocument = gql`
    mutation Register($role: Int!, $password: String!, $email: String!, $username: String!) {
  register(role: $role, password: $password, email: $email, username: $username) {
    users {
      id
      email
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      role: // value for 'role'
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RolesDocument = gql`
    query Roles {
  roles {
    roles {
      id
      title
    }
    errors {
      field
      message
    }
  }
}
    `;

/**
 * __useRolesQuery__
 *
 * To run a query within a React component, call `useRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useRolesQuery(baseOptions?: Apollo.QueryHookOptions<RolesQuery, RolesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
      }
export function useRolesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RolesQuery, RolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RolesQuery, RolesQueryVariables>(RolesDocument, options);
        }
export type RolesQueryHookResult = ReturnType<typeof useRolesQuery>;
export type RolesLazyQueryHookResult = ReturnType<typeof useRolesLazyQuery>;
export type RolesQueryResult = Apollo.QueryResult<RolesQuery, RolesQueryVariables>;