import { Stack } from "@chakra-ui/layout";
import React from "react";
import { RegularPostResponseFragment } from "../generated/graphql";
import BlogArticle from "./BlogArticle";

type BlogPostProps = {
  blogPost: RegularPostResponseFragment;
};
const BlogPost: React.FC<BlogPostProps> = ({ blogPost }) => {
  const numberOfComments = blogPost.comments.length;

  return (
    <Stack spacing={8} mt={6}>
      <BlogArticle
        id={blogPost.id}
        numberOfComments={numberOfComments}
        headline={blogPost.headline}
        body={blogPost.body}
        author={blogPost.author.username}
        createdAt={blogPost.createdAt}
      />
    </Stack>
  );
};

export default BlogPost;
