import { Box, Link, Stack, Wrap, WrapItem, Text } from "@chakra-ui/react";
import React from "react";
import { CommentSnippetFragment } from "../generated/graphql";
import BlogAuthor from "./BlogAuthor";

type CommentSectionProps = {
  comments: CommentSnippetFragment[];
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => (
        <Stack spacing={8} mt={2}>
          <Wrap
            spacing="30px"
            marginTop="5"
            shadow="md"
            borderWidth="1px"
            p={5}
          >
            <WrapItem
              width={{ base: "100%", sm: "100%", md: "100%", lg: "100%" }}
            >
              <Box w="100%">
                <Box borderRadius="lg" overflow="hidden">
                  <Link
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  ></Link>
                </Box>
                <Text as="p" fontSize="md" marginTop="2">
                  {comment.body}
                </Text>
                <BlogAuthor
                  name={comment.author?.username}
                  date={new Date(`${comment.createdAt}`)}
                />
              </Box>
            </WrapItem>
          </Wrap>
        </Stack>
      ))}
    </>
  );
};

export default CommentSection;
