import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Comment } from "../../entities/Comment";
import { isAuth } from "../../middleware/isAuth";
import { CommentResponse } from "../types/CommentResponse";
import { CustomContext } from "../types/CustomContext";

@Resolver(Comment)
export class CommentResolver {
  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg("postId") postId: number,
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
        authorId: 61,
        body,
        postId,
      }).save();
    } catch (error) {
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
}
