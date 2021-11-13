import { Divider, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React from "react";
import BlogPost from "../../components/BlogPost";
import CommentSection from "../../components/CommentSection";
import { Layout } from "../../components/Layout";
import { usePostsQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const Post = () => {
  const router = useRouter();
  const postId = router.query.id;
  const postIdAsInt = parseInt(postId as string);

  const { data, loading, error } = usePostsQuery({
    variables: { postId: postIdAsInt },
  });

  if (loading && !data) {
    return <div>Loading ....</div>;
  }

  if (!loading && !data && error) {
    return <div>{error}</div>;
  }

  return (
    <Layout>
      <BlogPost blogPost={data.posts.posts[0]} />
      <Divider />
      <Heading fontSize="large" mt={12}>
        Comments
      </Heading>
      {data.posts.posts.map((post) =>
        !post.comments ? (
          <Text mt={5}>There are no comments yet</Text>
        ) : (
          <CommentSection comments={post.comments} />
        )
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
