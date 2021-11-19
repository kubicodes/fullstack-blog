import { Button, Heading } from "@chakra-ui/react";
import NextLink from "next/link";
import React, { useState } from "react";
import BlogPost from "../components/BlogPost";
import FetchMore from "../components/FetchMore";
import { Layout } from "../components/Layout";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { deleteCommentCache } from "../utils/deleteCommentCache";
import { withApollo } from "../utils/withApollo";

const Index = () => {
  const paginationLimit = 5;

  const [paginationOffset, setPaginationOffset] = useState(0);

  const {
    data: blogPosts,
    loading,
    error,
    fetchMore,
    variables,
  } = usePostsQuery({
    variables: { limit: paginationLimit, offset: paginationOffset },
    notifyOnNetworkStatusChange: true,
  });

  const { data: meData } = useMeQuery();
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

  //to fix pagination cache issues on single post page and merging when pagination comments
  deleteCommentCache();

  return (
    <Layout>
      <Heading as="h2" marginTop="5">
        Latest articles
      </Heading>
      {meData?.me ? (
        <NextLink href="post/create">
          <Button colorScheme="twitter" mt={5}>
            Create Post
          </Button>
        </NextLink>
      ) : null}
      {blogPosts.posts.posts.map((post) => (
        <BlogPost key={post.id} blogPost={post} />
      ))}
      {!blogPosts.posts.hasMore ? null : (
        <FetchMore
          limit={paginationLimit}
          offset={paginationOffset}
          fetchMore={fetchMore}
          variablesLimit={variables?.limit}
          variablesOffset={variables?.offset}
          setPaginationOffset={setPaginationOffset}
        />
      )}
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
