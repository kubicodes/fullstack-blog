import { IconButton } from "@chakra-ui/button";
import { ChatIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import React from "react";

const CommentSection: React.FC<{}> = () => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton aria-label="comment post" icon={<ChatIcon />} />
    </Flex>
  );
};

export default CommentSection;
