import { FetchMoreQueryOptions } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React, { SetStateAction } from "react";

type FetchMoreProps = {
  limit: number;
  offset: number;
  fetchMore: (variables: Record<any, any>) => {};
  variablesLimit: number;
  variablesOffset: number;
  setPaginationOffset: SetStateAction<any>;
};

const FetchMore: React.FC<FetchMoreProps> = ({
  limit,
  offset,
  fetchMore,
  variablesLimit,
  variablesOffset,
  setPaginationOffset,
}) => {
  return (
    <Flex>
      <Button
        colorScheme={"twitter"}
        m={"auto"}
        mt={8}
        mb={8}
        onClick={() => {
          setPaginationOffset(offset + limit);
          fetchMore({
            variables: {
              limit: variablesLimit,
              offset: variablesOffset + limit,
            },
          });
        }}
      >
        Fetch More
      </Button>
    </Flex>
  );
};

export default FetchMore;
