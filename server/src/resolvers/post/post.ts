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
import { Post } from "../../entities/Post";
import { User } from "../../entities/User";
import { isAuth } from "../../middleware/isAuth";
import { CustomContext } from "../types/CustomContext";
import { DeletePostResponse } from "../types/DeletePostResponse";
import { PostResponse } from "../types/PostResponse";
import { UserResponse } from "../types/UserResponse";
import { useIsBodyValid } from "./utils/useIsBodyValid";
import { useIsHeadlineValid } from "./utils/useIsHeadlineValid";

@Resolver(Post)
export class PostResolver {
  @Query(() => PostResponse)
  async posts(
    @Arg("postId", () => Int, { nullable: true }) postId?: number
  ): Promise<PostResponse> {
    if (postId) {
      try {
        const result = await getConnection()
          .getRepository(Post)
          .createQueryBuilder("post")
          .where("post.id=:postId", { postId })
          .leftJoinAndMapMany(
            "post.author",
            User,
            "user",
            "post.authorId=user.id"
          )
          .leftJoinAndMapMany(
            "post.comments",
            Comment,
            "comment",
            "comment.postId=post.id"
          )
          .leftJoinAndMapMany(
            "comment.author",
            User,
            "user2",
            "comment.authorId=user2.id"
          )
          .getOne();

        //comming as single indexed array containing user object, only object is required
        if (result?.author) {
          result.author = (result.author as any)[0];
        }

        if (
          result?.comments?.map((comment: Comment) => {
            comment.author = (comment.author as any)[0];
          })
        )
          return { posts: [result as Post] };
      } catch (error) {
        return {
          errors: [
            { field: "postId", message: `No Post found with ID ${postId}` },
          ],
        };
      }
    }

    let allPosts: Post[] = [];
    try {
      const result = await getConnection()
        .getRepository(Post)
        .createQueryBuilder("post")
        .leftJoinAndMapMany(
          "post.author",
          User,
          "user",
          "post.authorId=user.id"
        )
        .leftJoinAndMapMany(
          "post.comments",
          Comment,
          "comment",
          "comment.postId=post.id"
        )
        .leftJoinAndMapMany(
          "comment.author",
          User,
          "user2",
          "comment.authorId=user2.id"
        )
        .getMany();

      result.map((entity: Post) => {
        //comming as single indexed array containing user object, only object is required
        entity.author = (entity.author as any)[0];

        entity.comments?.map((comment: Comment) => {
          comment.author = (comment.author as any)[0];
        });

        allPosts.push(entity);
      });
    } catch (error) {
      console.log(error);
    }

    return { posts: allPosts };
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg("headline") headline: string,
    @Arg("body") body: string,
    @Ctx() { req }: CustomContext
  ): Promise<PostResponse> {
    const isHeadlineValid = useIsHeadlineValid(headline);
    if (!(isHeadlineValid === true)) {
      return isHeadlineValid as UserResponse;
    }

    const isBodyValid = useIsBodyValid(body);
    if (!(isBodyValid === true)) {
      return isBodyValid as UserResponse;
    }

    try {
      const createdPost: Post = await Post.create({
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

      try {
        const result = await getConnection()
          .getRepository(Post)
          .createQueryBuilder("post")
          .where("post.id=:postId", { postId: createdPost.id })
          .leftJoinAndMapMany(
            "post.author",
            User,
            "user",
            "post.authorId=user.id"
          )
          .getOne();

        //comming as single indexed array containing user object, only object is required
        if (result?.author) {
          result.author = (result.author as any)[0];
        }

        return { posts: [result as Post] };
      } catch (error) {
        return {
          errors: [
            {
              field: "postId",
              message: `No Post found with ID ${createdPost.id}`,
            },
          ],
        };
      }
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

  @Mutation(() => DeletePostResponse)
  @UseMiddleware(isAuth)
  async deletePost(
    @Arg("postId", () => Int) postId: number,
    @Ctx() { req }: CustomContext
  ): Promise<DeletePostResponse> {
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
      await Comment.delete({ postId: matchedPost.id });
    } catch (error) {
      return { errors: [{ message: "Error while deleting Post" }] };
    }

    return { deleted: true };
  }
}
