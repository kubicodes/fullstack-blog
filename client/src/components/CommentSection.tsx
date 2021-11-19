import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Link, Stack, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useState } from "react";
import {
  CommentSnippetFragment,
  useDeleteCommentMutation,
} from "../generated/graphql";
import BlogAuthor from "./BlogAuthor";
import EditComment from "./EditComment";

type CommentSectionProps = {
  comments: CommentSnippetFragment[];
  meId: number;
  postId: number;
};

const CommentSection: React.FC<CommentSectionProps> = ({
  comments,
  meId,
  postId,
}) => {
  const [deleteComment] = useDeleteCommentMutation();

  const [show, setShow] = useState(false);
  const [clickedCommentId, setClickedCommentId] = useState(0);

  const handleCommentDelete = async (commentId: number, postId: number) => {
    if (!commentId || !postId) {
      return;
    }

    const deleteConfirmation = confirm(
      `Do you want to delete the post with the Id ${commentId}`
    );

    if (deleteConfirmation) {
      await deleteComment({
        variables: { commentId },
        update: (cache) => {
          const evictResult = cache.evict({ fieldName: "comments" });
        },
      });
    }
  };

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
            {comment.author?.id !== meId ? null : (
              <Flex>
                <EditIcon mt={1} mb={1} verticalAlign={"center"} />
                <Link onClick={() => setClickedCommentId(comment.id)}>
                  <Text
                    alignItems={"center"}
                    display={"flex"}
                    flex={1}
                    pl={3}
                    fontWeight={"medium"}
                  >
                    Edit
                  </Text>
                </Link>
                <DeleteIcon mt={1} mb={1} ml={8} verticalAlign={"center"} />
                <Link onClick={() => handleCommentDelete(comment.id, postId)}>
                  <Text
                    alignItems={"center"}
                    display={"flex"}
                    flex={1}
                    pl={3}
                    fontWeight={"medium"}
                  >
                    Delete
                  </Text>
                </Link>
              </Flex>
            )}
          </Wrap>
          {meId === comment.authorId ? (
            <EditComment
              show={comment.id === clickedCommentId ? true : false}
              setClickedCommentId={setClickedCommentId}
              postId={postId}
              commentId={comment.id}
              commentBody={comment.body}
            />
          ) : null}
        </Stack>
      ))}
    </>
  );
};

export default CommentSection;
