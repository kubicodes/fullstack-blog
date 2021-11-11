import { HStack, Text } from "@chakra-ui/react";
import React from "react";

interface BlogAuthorProps {
  date: Date;
  name: string;
}

const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export default BlogAuthor