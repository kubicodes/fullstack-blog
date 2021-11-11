import { Heading } from "@chakra-ui/react";
import React from "react";
import BlogPost from "../components/BlogPost";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const { data: blogPosts, loading, error } = usePostsQuery();

  if (!loading && !blogPosts) {
    return (
      <>
        <div>There was an error</div>
        <div>{error.message}</div>
      </>
    );
  }

  if (loading && !blogPosts) {
    return <div>Loading ....</div>;
  }

  return (
    <Layout>
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      {blogPosts.posts.posts.map((post) => (
        <BlogPost key={post.id} blogPost={post} />
      ))}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
