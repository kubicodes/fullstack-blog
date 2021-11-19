import { Stack } from "@chakra-ui/layout";
import React from "react";
import {
  RegularPostResponseFragment,
  useTotalNumberOfCommentsQuery,
} from "../generated/graphql";
import { BlogPostResponse } from "../types/BlogPostResponse";
import BlogArticle from "./BlogArticle";

type BlogPostProps = {
  blogPost: BlogPostResponse | RegularPostResponseFragment;
};

const getTotalNumberOfComments = (postId: number): number => {
  const { data, loading } = useTotalNumberOfCommentsQuery({
    variables: { postId },
  });

  if (!loading && !data) {
    return 0;
  }

  if (!loading && data) {
    return data.totalNumberOfComments;
  }
};

const BlogPost: React.FC<BlogPostProps> = ({ blogPost }) => {
  return (
    <Stack spacing={8} mt={6}>
      <BlogArticle
        id={blogPost.id}
        numberOfComments={getTotalNumberOfComments(blogPost.id)}
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
