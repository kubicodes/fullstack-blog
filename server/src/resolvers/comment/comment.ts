import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Comment } from "../../entities/Comment";
import { User } from "../../entities/User";
import { isAuth } from "../../middleware/isAuth";
import { CommentResponse } from "../types/CommentResponse";
import { CustomContext } from "../types/CustomContext";
import { mapAuthorArrayToEntity } from "../utils/mapAuthorArrayToEntity";

@Resolver(Comment)
export class CommentResolver {
  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("postId", () => Int) postId: number,
    @Arg("body") body: string,
    @Ctx() { req }: CustomContext
  ): Promise<CommentResponse> {
    if (!postId) {
      return {
        errors: [{ field: "postId", message: "Post ID cannot be empty" }],
      };
    }

    if (!body || body.length < 5) {
      return {
        errors: [
          {
            field: "body",
            message: "Comment must be at least 5 characters logn",
          },
        ],
      };
    }

    let createdComment;
    try {
      createdComment = await Comment.create({
        authorId: req.session.userId,
        body,
        postId,
      }).save();

      const currentUserId = req.session?.userId;

      if (!currentUserId) {
        throw new Error("Not Authenticated");
      }

      const authorObject = await User.findOne(currentUserId);

      if (!authorObject) {
        return {
          errors: [
            {
              message: "Could not create Comment",
            },
          ],
        };
      }

      createdComment.author = authorObject;
    } catch (error) {
      console.log(error);
      return {
        errors: [
          {
            message: "Could not create comment",
          },
        ],
      };
    }

    return { comments: [createdComment] };
  }

  @Mutation(() => Boolean)
  async deleteComment(
    @Arg("commentId", () => Int) commentId: number
  ): Promise<boolean> {
    if (!commentId) {
      return false;
    }

    try {
      await Comment.delete(commentId);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async updateComment(
    @Arg("commentId", () => Int) commentId: number,
    @Arg("body") body: string,
    @Ctx() { req }: CustomContext
  ): Promise<CommentResponse> {
    if (!commentId) {
      return {
        errors: [
          {
            message: "CommentId cannot be empty",
          },
        ],
      };
    }

    if (!body || body.length < 5) {
      return {
        errors: [
          {
            field: "body",
            message: "A comment must be at least 5 characters long",
          },
        ],
      };
    }

    try {
      const matchedComment = await Comment.findOne(commentId);

      if (!matchedComment) {
        return {
          errors: [
            {
              field: "commentId",
              message: "No Comment found with this ID",
            },
          ],
        };
      }

      if (req.session.userId !== matchedComment.authorId) {
        throw new Error("not authenticated");
      }

      await Comment.update({ id: commentId }, { body });

      const updatedComment = await Comment.findOne(commentId);

      return {
        comments: [{ ...updatedComment }] as any,
      };
    } catch (error) {
      return { errors: [{ message: "Internal Server Error" }] };
    }
  }

  @Query(() => CommentResponse)
  async comments(
    @Arg("postId", () => Int, { nullable: true }) postId?: number
  ): Promise<CommentResponse> {
    if (!postId) {
      return {
        errors: [{ field: "postId", message: "Post ID cannot be empty" }],
      };
    }

    try {
      const result = await getConnection()
        .getRepository(Comment)
        .createQueryBuilder("comment")
        .leftJoinAndMapMany(
          "comment.author",
          User,
          "user",
          "comment.authorId=user.id"
        )
        .where("`comment`.`postId`=:postId", { postId })
        .orderBy("comment.createdAt", "DESC")
        .getMany();

      mapAuthorArrayToEntity(result);

      if (!result) {
        return { comments: [] };
      }

      return { comments: [...result] };
    } catch (error) {
      console.log(error);

      return { errors: [{ message: "Internal Server Error" }] };
    }
  }
}
