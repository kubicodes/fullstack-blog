import { Button, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import BlogPost from "../components/BlogPost";
import { Layout } from "../components/Layout";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import { withApollo } from "../utils/withApollo";
import NextLink from "next/link";

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
      <Flex>
        <Button
          colorScheme={"twitter"}
          m={"auto"}
          mt={8}
          mb={8}
          onClick={() => {
            setPaginationOffset(paginationOffset + paginationLimit);
            fetchMore({
              variables: {
                limit: variables?.limit,
                offset: variables?.offset + paginationLimit,
              },
            });
          }}
        >
          Fetch More
        </Button>
      </Flex>
    </Layout>
  );
};

export default withApollo({ ssr: true })(Index);
