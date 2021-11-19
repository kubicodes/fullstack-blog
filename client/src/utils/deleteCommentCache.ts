import { useApolloClient } from "@apollo/client";

export const deleteCommentCache = (): boolean => {
  const apolloClient = useApolloClient();

  console.log(apolloClient.cache);
  return apolloClient.cache.evict({ fieldName: "comments" });
};
