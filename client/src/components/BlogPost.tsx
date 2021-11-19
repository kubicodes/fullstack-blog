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
  totalNumberOfComments?: number;
};

const BlogPost: React.FC<BlogPostProps> = ({
  blogPost,
  totalNumberOfComments,
}) => {
  const numberOfComments = totalNumberOfComments ?? blogPost.comments.length;
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
