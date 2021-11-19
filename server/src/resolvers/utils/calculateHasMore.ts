import { SelectQueryBuilder } from "typeorm";
import { Comment } from "../../entities/Comment";
import { Post } from "../../entities/Post";

export const calculateHasMore = async (
  limit: number,
  offset: number,
  fullResult: SelectQueryBuilder<any>
): Promise<boolean> => {
  const maxCurrentlyShowing = limit + offset;
  const lengthOfAllPosts = await fullResult.getCount();
  const hasMore = lengthOfAllPosts > maxCurrentlyShowing;

  return hasMore;
};
