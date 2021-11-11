import { ChatIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Divider, Wrap, WrapItem, Link } from "@chakra-ui/react";
import React from "react";
import { CommentSnippetFragment } from "../generated/graphql";
import BlogAuthor from "./BlogAuthor";

type BlogArticle = {
  headline: string;
  body: string;
  numberOfComments: number;
  author: string;
  createdAt: string;
};

const BlogArticle: React.FC<BlogArticle> = ({
  headline,
  body,
  numberOfComments,
  author,
  createdAt,
}) => {
  const commentString =
    numberOfComments === 1
      ? `${numberOfComments} Comment`
      : `${numberOfComments} comments`;

  return (
    <>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Link
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
              ></Link>
            </Box>
            <Heading fontSize="xl" marginTop="2">
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {headline}
              </Link>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              {body}
            </Text>
            <Flex>
              <ChatIcon mt={5} mb={5} verticalAlign={"center"} />
              <Text
                alignItems={"center"}
                display={"flex"}
                flex={1}
                pl={3}
                fontWeight={"medium"}
              >
                {commentString}
              </Text>
            </Flex>
            <BlogAuthor name={author} date={new Date(`${createdAt}`)} />
          </Box>
        </WrapItem>
      </Wrap>
    </>
  );
};

export default BlogArticle;
