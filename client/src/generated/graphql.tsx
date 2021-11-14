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

export type Comment = {
  __typename?: 'Comment';
  author?: Maybe<User>;
  authorId: Scalars['Float'];
  body: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  postId: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type CommentResponse = {
  __typename?: 'CommentResponse';
  comments?: Maybe<Array<Comment>>;
  errors?: Maybe<Array<FieldError>>;
};

export type DeletePostResponse = {
  __typename?: 'DeletePostResponse';
  deleted?: Maybe<Scalars['Boolean']>;
  errors?: Maybe<Array<FieldError>>;
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
  createComment: CommentResponse;
  createPost: PostResponse;
  createRole: SingleRoleResponse;
  deletePost: DeletePostResponse;
  deleteRole: SingleRoleResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  updatePost: PostResponse;
  updateRole: SingleRoleResponse;
};


export type MutationCreateCommentArgs = {
  body: Scalars['String'];
  postId: Scalars['Float'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  headline: Scalars['String'];
};


export type MutationCreateRoleArgs = {
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int'];
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


export type MutationUpdatePostArgs = {
  body?: Maybe<Scalars['String']>;
  headline?: Maybe<Scalars['String']>;
  postId: Scalars['Int'];
};


export type MutationUpdateRoleArgs = {
  id: Scalars['Float'];
  title: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  body: Scalars['String'];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars['DateTime'];
  headline: Scalars['String'];
  id: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
};

export type PostResponse = {
  __typename?: 'PostResponse';
  errors?: Maybe<Array<FieldError>>;
  posts?: Maybe<Array<Post>>;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<UserResponse>;
  posts: PostResponse;
  role: SingleRoleResponse;
  roles: RoleResponse;
};


export type QueryPostsArgs = {
  postId?: Maybe<Scalars['Int']>;
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
  id: Scalars['Float'];
  posts?: Maybe<Array<Post>>;
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  users?: Maybe<Array<UserType>>;
};

export type UserType = {
  __typename?: 'UserType';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  role: Scalars['String'];
  role_id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
  username: Scalars['String'];
};

export type AuthorSnippetFragment = { __typename?: 'User', id: number, email: string, username: string, createdAt: any, updatedAt: any };

export type CommentSnippetFragment = { __typename?: 'Comment', id: number, body: string, postId: number, authorId: number, createdAt: any, updatedAt: any, author?: { __typename?: 'User', username: string } | null | undefined };

export type PostSnippetFragment = { __typename?: 'Post', id: number, body: string, headline: string, createdAt: any, updatedAt: any };

export type RegularErrorResponseFragment = { __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined };

export type RegularPostResponseFragment = { __typename?: 'Post', id: number, body: string, headline: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, email: string, username: string, createdAt: any, updatedAt: any }, comments?: Array<{ __typename?: 'Comment', id: number, body: string, postId: number, authorId: number, createdAt: any, updatedAt: any, author?: { __typename?: 'User', username: string } | null | undefined }> | null | undefined };

export type CreatePostMutationVariables = Exact<{
  body: Scalars['String'];
  headline: Scalars['String'];
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostResponse', posts?: Array<{ __typename?: 'Post', id: number, body: string, headline: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, email: string, username: string, createdAt: any, updatedAt: any }, comments?: Array<{ __typename?: 'Comment', id: number, body: string, postId: number, authorId: number, createdAt: any, updatedAt: any, author?: { __typename?: 'User', username: string } | null | undefined }> | null | undefined }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'DeletePostResponse', deleted?: boolean | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export type LoginMutationVariables = Exact<{
  loginOptions: LoginOptions;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', users?: Array<{ __typename?: 'UserType', id: number, email: string, username: string, role_id: number, createdAt: any, updatedAt: any }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  role: Scalars['Int'];
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', users?: Array<{ __typename?: 'UserType', id: number, email: string, username: string, createdAt: any, updatedAt: any }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export type UpdatePostMutationVariables = Exact<{
  body: Scalars['String'];
  headline: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostResponse', posts?: Array<{ __typename?: 'Post', id: number, headline: string, body: string, createdAt: any, updatedAt: any }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'UserResponse', users?: Array<{ __typename?: 'UserType', id: number, username: string, email: string, role_id: number, createdAt: any, updatedAt: any }> | null | undefined } | null | undefined };

export type PostsQueryVariables = Exact<{
  postId?: Maybe<Scalars['Int']>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostResponse', posts?: Array<{ __typename?: 'Post', id: number, body: string, headline: string, createdAt: any, updatedAt: any, author: { __typename?: 'User', id: number, email: string, username: string, createdAt: any, updatedAt: any }, comments?: Array<{ __typename?: 'Comment', id: number, body: string, postId: number, authorId: number, createdAt: any, updatedAt: any, author?: { __typename?: 'User', username: string } | null | undefined }> | null | undefined }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export type RolesQueryVariables = Exact<{ [key: string]: never; }>;


export type RolesQuery = { __typename?: 'Query', roles: { __typename?: 'RoleResponse', roles?: Array<{ __typename?: 'Role', id: number, title: string }> | null | undefined, errors?: Array<{ __typename?: 'FieldError', field?: string | null | undefined, message?: string | null | undefined }> | null | undefined } };

export const RegularErrorResponseFragmentDoc = gql`
    fragment RegularErrorResponse on FieldError {
  field
  message
}
    `;
export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
  id
  body
  headline
  body
  createdAt
  updatedAt
}
    `;
export const AuthorSnippetFragmentDoc = gql`
    fragment AuthorSnippet on User {
  id
  email
  username
  createdAt
  updatedAt
}
    `;
export const CommentSnippetFragmentDoc = gql`
    fragment CommentSnippet on Comment {
  id
  body
  postId
  authorId
  author {
    username
  }
  createdAt
  updatedAt
}
    `;
export const RegularPostResponseFragmentDoc = gql`
    fragment RegularPostResponse on Post {
  ...PostSnippet
  author {
    ...AuthorSnippet
  }
  comments {
    ...CommentSnippet
  }
}
    ${PostSnippetFragmentDoc}
${AuthorSnippetFragmentDoc}
${CommentSnippetFragmentDoc}`;
export const CreatePostDocument = gql`
    mutation CreatePost($body: String!, $headline: String!) {
  createPost(body: $body, headline: $headline) {
    posts {
      ...RegularPostResponse
    }
    errors {
      ...RegularErrorResponse
    }
  }
}
    ${RegularPostResponseFragmentDoc}
${RegularErrorResponseFragmentDoc}`;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      headline: // value for 'headline'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($postId: Int!) {
  deletePost(postId: $postId) {
    deleted
    errors {
      field
      message
    }
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginOptions: LoginOptions!) {
  login(LoginOptions: $loginOptions) {
    users {
      id
      email
      username
      role_id
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginOptions: // value for 'loginOptions'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
export const RegisterDocument = gql`
    mutation Register($role: Int!, $password: String!, $email: String!, $username: String!) {
  register(role: $role, password: $password, email: $email, username: $username) {
    users {
      id
      email
      username
      createdAt
      updatedAt
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
export const UpdatePostDocument = gql`
    mutation UpdatePost($body: String!, $headline: String!, $postId: Int!) {
  updatePost(postId: $postId, body: $body, headline: $headline) {
    posts {
      id
      headline
      body
      createdAt
      updatedAt
    }
    errors {
      field
      message
    }
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      body: // value for 'body'
 *      headline: // value for 'headline'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    users {
      id
      username
      email
      role_id
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostsDocument = gql`
    query Posts($postId: Int) {
  posts(postId: $postId) {
    posts {
      ...RegularPostResponse
    }
    errors {
      ...RegularErrorResponse
    }
  }
}
    ${RegularPostResponseFragmentDoc}
${RegularErrorResponseFragmentDoc}`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function usePostsQuery(baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
      }
export function usePostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(PostsDocument, options);
        }
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<PostsQuery, PostsQueryVariables>;
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