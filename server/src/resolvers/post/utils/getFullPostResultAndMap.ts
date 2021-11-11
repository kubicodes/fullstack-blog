import { getConnection } from "typeorm";
import { Post } from "../../../entities/Post";
import { User } from "../../../entities/User";
import { useMapRawResultToEntity } from "./useMapRawResultToEntity";

export const getFullPostResultAndMap = async (
  currentPostMapping: Record<string, any>,
  currentUserMapping: Record<string, any>,
  currentCommentMapping: Record<string, any>,
  postId?: number
) => {
  if (postId) {
    const rawResult = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .leftJoinAndSelect(User, "u", "p.authorId = u.id")
      .leftJoinAndSelect(Comment, "c", "c.postId = p.id")
      .where(`p.id = ${postId.toString()}`)
      .getMany();

    if (rawResult && rawResult[0]) {
      useMapRawResultToEntity(
        rawResult,
        currentPostMapping,
        currentUserMapping,
        currentCommentMapping
      );
    }
  } else {
    const rawResult = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .leftJoinAndSelect(User, "u", "p.authorId = u.id")
      .leftJoinAndSelect(Comment, "c", "c.postId = p.id")
      .getMany();

    if (rawResult) {
      rawResult.forEach(async (rawObject: Record<string, any>) => {
        useMapRawResultToEntity(
          rawObject,
          currentPostMapping,
          currentUserMapping,
          currentCommentMapping
        );

        let currentPostObject = Post.create(currentPostMapping);

        if (currentCommentMapping.id) {
          let currentCommentObject = Comment.create(currentCommentMapping);
          (currentPostObject.comments as any) = [{ ...currentCommentObject }];
        }
        let currentUserObject = User.create(currentUserMapping);
        (currentPostObject.author as any) = { ...currentUserObject };

        if (!allPosts.includes(currentPostObject)) {
          allPosts.push(currentPostObject);
        }
      }
    }
  }
};
