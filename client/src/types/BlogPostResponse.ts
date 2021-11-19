import {
  AuthorSnippetFragment,
  CommentSnippetFragment,
} from "../generated/graphql";

export interface BlogPostResponse {
  __typename?: string;
  id: number;
  headline: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  author: AuthorSnippetFragment;
  comments?: CommentSnippetFragment[];
}
