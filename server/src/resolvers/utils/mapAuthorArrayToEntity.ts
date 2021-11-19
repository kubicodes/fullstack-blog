import { Comment } from "../../entities/Comment";
import { User } from "../../entities/User";

interface Entity {
  author: User;
  comments: Comment[];
}

export const mapAuthorArrayToEntity = (result: Array<any>): void => {
  result.map((entity: Entity) => {
    //comming as single indexed array containing user object, only object is required
    entity.author = (entity.author as any)[0];

    entity.comments?.map((comment: Comment) => {
      comment.author = (comment.author as any)[0];
    });
  });
};
