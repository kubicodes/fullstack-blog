import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Post } from "../../entities/Post";
import { isAuth } from "../../middleware/isAuth";
import { CustomContext } from "../types/CustomContext";
import { PostResponse } from "../types/PostResponse";
import { useIsBodyValid } from "./utils/useIsBodyValid";
import { useIsHeadlineValid } from "./utils/useIsHeadlineValid";

@Resolver(Post)
export class PostResolver {
  @Query(() => PostResponse)
  async posts(
    @Arg("postId", { nullable: true }) postId?: number
  ): Promise<PostResponse> {
    if (postId) {
      let matchedPost: any;
      try {
        matchedPost = await Post.findOne(postId);
      } catch (error) {
        return {
          errors: [
            { field: "postId", message: `No Post found with ID ${postId}` },
          ],
        };
      }

      return { posts: [matchedPost] };
    }

    let posts;

    try {
      posts = await Post.find({});
    } catch (error) {
      return { errors: [{ message: "Internal Server Error" }] };
    }

    if (!posts) {
      return { errors: [{ message: "No Posts exists" }] };
    }

    return { posts };
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("headline") headline: string,
    @Arg("body") body: string,
    @Ctx() { req }: CustomContext
  ): Promise<PostResponse> {
    useIsHeadlineValid(headline);
    useIsBodyValid(body);

    try {
      const createdPost: any = await Post.create({
        headline,
        body,
        authorId: req.session.userId,
      }).save();

      if (!createdPost) {
        return {
          errors: [
            {
              message: "Post could not be created",
            },
          ],
        };
      }

      return {
        posts: [{ ...createdPost }],
      };
    } catch (error) {
      return {
        errors: [
          {
            message: error?.message,
          },
        ],
      };
    }
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async updatePost(
    @Ctx() { req }: CustomContext,
    @Arg("postId", () => Int) postId: number,
    @Arg("headline", { nullable: true }) headline?: string,
    @Arg("body", { nullable: true }) body?: string
  ): Promise<PostResponse> {
    const matchedPost = await Post.findOne(postId);

    if (!matchedPost) {
      return {
        errors: [
          {
            message: `No Post found with ID ${postId}`,
          },
        ],
      };
    }

    if (req.session.userId !== matchedPost.authorId) {
      throw new Error("not authenticated");
    }

    let fieldsToChange: Record<string, string> = {};
    if (headline) {
      const headlineValidationResult = useIsHeadlineValid(headline);
      if (headlineValidationResult !== true) {
        return headlineValidationResult as PostResponse;
      }

      fieldsToChange.headline = headline;
    }

    if (body) {
      const bodyValidationResult = useIsBodyValid(body);
      if (bodyValidationResult !== true) {
        return bodyValidationResult as PostResponse;
      }

      fieldsToChange.body = body;
    }

    try {
      await Post.update({ id: postId }, fieldsToChange);
    } catch (error) {
      return { errors: [{ message: "Error while updating your Post." }] };
    }

    let updatedPost: any;
    try {
      updatedPost = await Post.findOne(postId);
    } catch (error) {
      return { errors: [{ message: "Internal Server error." }] };
    }

    return { posts: [{ ...updatedPost }] };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("postId") postId: number,
    @Ctx() { req }: CustomContext
  ): Promise<PostResponse | boolean> {
    const matchedPost = await Post.findOne(postId);

    if (!matchedPost) {
      return {
        errors: [
          {
            message: `No Post found with ID ${postId}`,
          },
        ],
      };
    }

    if (req.session.userId !== matchedPost.authorId) {
      throw new Error("not authenticated");
    }

    try {
      await Post.delete({ id: postId });
    } catch (error) {
      return { errors: [{ message: "Error while deleting Post" }] };
    }

    return true;
  }
}
