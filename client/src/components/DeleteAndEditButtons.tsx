import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, Link, Text } from "@chakra-ui/layout";
import NextLink from "next/link";
import React from "react";

type DeleteAndEditButtonsProps = {
  handleDelete: () => {};
  linkHref: string;
  linkAs: string;
};

const DeleteAndEditButtons: React.FC<DeleteAndEditButtonsProps> = ({
  handleDelete,
  linkHref,
  linkAs,
}) => {
  return (
    <Flex>
      <EditIcon mt={4} mb={4} verticalAlign={"center"} />
      <NextLink href={linkHref} as={linkAs}>
        <Link mt={3} textDecoration="none" _hover={{ textDecoration: "none" }}>
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
  );
};

export default DeleteAndEditButtons;
