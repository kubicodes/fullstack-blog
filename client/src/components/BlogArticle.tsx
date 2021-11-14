import { ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Divider, Link, Wrap, WrapItem } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import BlogAuthor from "./BlogAuthor";

type BlogArticle = {
  id: number;
  headline: string;
  body: string;
  numberOfComments: number;
  author: string;
  createdAt: string;
  authorId: number;
};

const BlogArticle: React.FC<BlogArticle> = ({
  id,
  headline,
  body,
  numberOfComments,
  author,
  createdAt,
  authorId,
}) => {
  const commentString =
    numberOfComments === 1
      ? `${numberOfComments} Comment`
      : `${numberOfComments} comments`;

  const { data: meData, loading: meDataLoading } = useMeQuery();

  const [deletePost] = useDeletePostMutation();

  const handleDelete = async () => {
    const confirmValue = confirm(
      "Are you sure that you want to delete this post?"
    );

    if (confirmValue) {
      const deletePostResult = await deletePost({
        variables: {
          postId: id,
        },
        update: (cache) => {
          cache.evict({ fieldName: "posts({})" });
        },
      });

      if (deletePostResult.errors) {
        alert(deletePostResult.errors[0].message);
      }
    } else {
      console.log("not confirmed");
    }
  };

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
              <NextLink href="/post/[id]" as={`/post/${id}`}>
                <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                  {headline}
                </Link>
              </NextLink>
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
            {meDataLoading || meData.me?.users[0].id !== authorId ? null : (
              <Flex>
                <EditIcon mt={4} mb={4} verticalAlign={"center"} />
                <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
                  <Link
                    mt={3}
                    textDecoration="none"
                    _hover={{ textDecoration: "none" }}
                  >
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
                </NextLink>
                <DeleteIcon mt={4} mb={4} ml={8} verticalAlign={"center"} />
                <Link
                  mt={3}
                  textDecoration="none"
                  _hover={{ textDecoration: "none" }}
                  onClick={handleDelete}
                >
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
          </Box>
        </WrapItem>
      </Wrap>
    </>
  );
};

export default BlogArticle;
