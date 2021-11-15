import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Link, Stack, Wrap, WrapItem, Text, Flex } from "@chakra-ui/react";
import React from "react";
import {
  CommentSnippetFragment,
  MeQuery,
  MeQueryResult,
  UserResponse,
} from "../generated/graphql";
import BlogAuthor from "./BlogAuthor";

type CommentSectionProps = {
  comments: CommentSnippetFragment[];
  meId: number;
};

const CommentSection: React.FC<CommentSectionProps> = ({ comments, meId }) => {
  return (
    <>
      {comments.map((comment) => (
        <Stack spacing={8} mt={2} key={comment.id}>
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
            {comment.author.id !== meId ? null : (
              <Flex>
                <EditIcon mt={1} mb={1} verticalAlign={"center"} />
                <Text
                  alignItems={"center"}
                  display={"flex"}
                  flex={1}
                  pl={3}
                  fontWeight={"medium"}
                >
                  Edit
                </Text>
                <DeleteIcon mt={1} mb={1} ml={8} verticalAlign={"center"} />
                <Text
                  alignItems={"center"}
                  display={"flex"}
                  flex={1}
                  pl={3}
                  fontWeight={"medium"}
                >
                  Delete
                </Text>
              </Flex>
            )}
          </Wrap>
        </Stack>
      ))}
    </>
  );
};

export default CommentSection;
