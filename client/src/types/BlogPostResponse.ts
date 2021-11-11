import {
  AuthorSnippetFragment,
  CommentSnippetFragment,
} from "../generated/graphql";

export interface BlogPostResponse {
  __typename: string;
  id: number;
  headline: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  author: AuthorSnippetFragment;
  comments: CommentSnippetFragment;
}
