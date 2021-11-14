import { Button } from "@chakra-ui/button";
import { Box, Divider, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import BlogPost from "../../components/BlogPost";
import CommentSection from "../../components/CommentSection";
import CreateComment from "../../components/CreateComment";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostsQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const Post = () => {
  const router = useRouter();
  const postId = router.query.id;
  const postIdAsInt = parseInt(postId as string);
  const { data: meData, loading: meDataLoading } = useMeQuery();
  const [showCommentSection, setShowCommentSection] = useState(false);

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
      {data.posts.posts.map((post, index) =>
        !post.comments ? (
          <Text mt={5}>There are no comments yet</Text>
        ) : (
          <CommentSection key={index} comments={post.comments} />
        )
      )}
      {!meDataLoading && meData.me ? (
        <>
          <Button
            colorScheme="twitter"
            mt={5}
            onClick={() => setShowCommentSection(!showCommentSection)}
          >
            Comment Now
          </Button>
          <Box mt={5} />
          <CreateComment show={showCommentSection} />
        </>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
