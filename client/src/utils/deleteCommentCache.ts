import { useApolloClient } from "@apollo/client";

export const deleteCommentCache = (): boolean => {
  const apolloClient = useApolloClient();

  return apolloClient.cache.evict({ fieldName: "comments" });
};
