import { useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Box, Divider, Heading, Text } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React, { useState } from "react";
import BlogPost from "../../components/BlogPost";
import CommentSection from "../../components/CommentSection";
import CreateComment from "../../components/CreateComment";
import FetchMore from "../../components/FetchMore";
import { Layout } from "../../components/Layout";
import {
  useCommentsQuery,
  useMeQuery,
  usePostWithAuthorQuery,
} from "../../generated/graphql";
import { deleteCommentCache } from "../../utils/deleteCommentCache";
import { withApollo } from "../../utils/withApollo";

const Post: React.FC<{}> = () => {
  const [showCommentSection, setShowCommentSection] = useState(false);

  const commentsPaginationLimit = 5;
  const [commentsPaginationOffset, setCommentsPaginationOffset] = useState(0);

  const router = useRouter();
  const postId = router.query.id;
  const postIdAsInt = parseInt(postId as string);
  const { data: meData, loading: meDataLoading } = useMeQuery();

  const {
    data: postData,
    loading: postLoading,
    error: postError,
  } = usePostWithAuthorQuery({ variables: { postId: postIdAsInt } });

  const {
    data: commentsData,
    loading: commnentsLoading,
    error: commentsError,
    fetchMore: fetchMoreComments,
    variables: commentsVariables,
  } = useCommentsQuery({
    variables: {
      postId: postIdAsInt,
      limit: commentsPaginationLimit,
      offset: commentsPaginationOffset,
    },
  });

  if ((postLoading || commnentsLoading) && (!postData || !commentsData)) {
    return <div>Loading ....</div>;
  }

  if (
    (!postLoading || !commnentsLoading) &&
    (!postData || !commentsData) &&
    (postError || commentsError)
  ) {
    return (
      <>
        <div>{postError ?? postError}</div>
        <div>{commentsError ?? commentsError}</div>
      </>
    );
  }

  // deleteCommentCache();

  return (
    <Layout>
      <BlogPost
        blogPost={postData.post.posts[0]}
        comments={commentsData.comments?.comments}
      />
      <Divider />
      <Heading fontSize="large" mt={12}>
        Comments
      </Heading>
      {postData.post.posts.map((post, index) =>
        !commentsData.comments.comments.length ? (
          <Text key={index} mt={5}>
            There are no comments yet
          </Text>
        ) : (
          <CommentSection
            key={index}
            postId={post.id}
            comments={commentsData.comments.comments}
            meId={meData.me?.users[0].id}
          />
        )
      )}
      {!commentsData.comments.hasMore ? null : (
        <FetchMore
          limit={commentsPaginationLimit}
          offset={commentsPaginationOffset}
          fetchMore={fetchMoreComments}
          variablesLimit={commentsVariables?.limit}
          variablesOffset={commentsVariables?.offset}
          setPaginationOffset={setCommentsPaginationOffset}
        />
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
