import { Stack } from "@chakra-ui/layout";
import React from "react";
import {
  CommentSnippetFragment,
  RegularErrorResponseFragment,
  RegularPostResponseFragment,
} from "../generated/graphql";
import { BlogPostResponse } from "../types/BlogPostResponse";
import BlogArticle from "./BlogArticle";

type BlogPostProps = {
  blogPost: BlogPostResponse | RegularPostResponseFragment;
  comments?: CommentSnippetFragment[] | RegularErrorResponseFragment[];
};

const BlogPost: React.FC<BlogPostProps> = ({ blogPost, comments }) => {
  let numberOfComments;

  if (comments) {
    numberOfComments = comments.length;
  } else {
    numberOfComments = blogPost?.comments.length;
  }

  return (
    <Stack spacing={8} mt={6}>
      <BlogArticle
        id={blogPost.id}
        numberOfComments={numberOfComments}
        headline={blogPost.headline}
        body={blogPost.body}
        author={blogPost.author.username}
        authorId={blogPost.author.id}
        createdAt={blogPost.createdAt}
      />
    </Stack>
  );
};

export default BlogPost;
