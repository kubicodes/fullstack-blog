import { useApolloClient } from "@apollo/client";
import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import NextLink from "next/link";
import React from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isSevrer } from "../utils/isServer";

export const NavBar = () => {
  const { data, loading } = useMeQuery({ skip: isSevrer() });
  const [logout] = useLogoutMutation();
  const router = useRouter();
  const apolloClient = useApolloClient();

  let body;
  if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
  } else if (data.me.users) {
    body = (
      <Flex align="center">
        <Box mr={2}>{data.me.users[0].username}</Box>
        <Button
          // variant="link"
          colorScheme={"black"}
          bgColor={"yellow.300"}
          onClick={async () => {
            await logout({});
            await apolloClient.resetStore();
            await router.reload();
          }}
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="twitter.200" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href="/">
          <Link>
            <Heading>Blog</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};
