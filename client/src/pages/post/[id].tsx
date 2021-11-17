import { Button } from "@chakra-ui/button";
import { Box, Divider, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import BlogPost from "../../components/BlogPost";
import CommentSection from "../../components/CommentSection";
import CreateComment from "../../components/CreateComment";
import { Layout } from "../../components/Layout";
import { useMeQuery, usePostQuery } from "../../generated/graphql";
import { withApollo } from "../../utils/withApollo";

const Post = () => {
  const router = useRouter();
  const postId = router.query.id;
  const postIdAsInt = parseInt(postId as string);
  const { data: meData, loading: meDataLoading } = useMeQuery();
  const [showCommentSection, setShowCommentSection] = useState(false);

  const { data, loading, error } = usePostQuery({
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
      <BlogPost blogPost={data.post.posts[0]} />
      <Divider />
      <Heading fontSize="large" mt={12}>
        Comments
      </Heading>
      {data.post.posts.map((post, index) =>
        !post.comments.length ? (
          <Text mt={5}>There are no comments yet</Text>
        ) : (
          <CommentSection
            key={index}
            postId={post.id}
            comments={post.comments}
            meId={meData.me?.users[0].id}
          />
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
          <CreateComment
            show={showCommentSection}
            setShow={setShowCommentSection}
            postId={postIdAsInt}
          />
        </>
      ) : null}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Post);
