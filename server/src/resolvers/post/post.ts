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
import { PostResponse } from "../types/PostResponse";
import { UserResponse } from "../types/UserResponse";
import { useIsBodyValid } from "./utils/useIsBodyValid";
import { useIsHeadlineValid } from "./utils/useIsHeadlineValid";
import { useMapRawResultToEntity } from "./utils/useMapRawResultToEntity";

@Resolver(Post)
export class PostResolver {
  @Query(() => PostResponse)
  async posts(
    @Arg("postId", () => Int, { nullable: true }) postId?: number
  ): Promise<PostResponse> {
    if (postId) {
      let currentPostMapping: Record<string, any> = {};
      let currentUserMapping: Record<string, any> = {};
      let currentCommentMapping: Record<string, any> = {};

      try {
        const rawResult = await getConnection()
          .getRepository(Post)
          .createQueryBuilder("p")
          .leftJoinAndSelect(User, "u", "p.authorId = u.id")
          .leftJoinAndSelect(Comment, "c", "c.postId = p.id")
          .where(`p.id = ${postId.toString()}`)
          .getRawMany();

        if (rawResult && rawResult[0]) {
          useMapRawResultToEntity(
            rawResult,
            currentPostMapping,
            currentUserMapping,
            currentCommentMapping
          );
        }
      } catch (error) {
        return {
          errors: [
            { field: "postId", message: `No Post found with ID ${postId}` },
          ],
        };
      }
      const postObject = await Post.create(currentPostMapping);

      if (currentCommentMapping.id) {
        const commentObject = await Comment.create(currentCommentMapping);
        commentObject.author = (await User.findOne(
          commentObject.authorId
        )) as User;
        (postObject.comments as any) = [{ ...commentObject }];
      }

      const userObject = await User.create(currentUserMapping);

      (postObject.author as any) = { ...userObject };

      return {
        posts: [postObject],
      };
    }

    let currentPostMapping: Record<string, any> = {};
    let currentUserMapping: Record<string, any> = {};
    let currentCommentMapping: Record<string, any> = {};
    let allPosts: Post[] = [];

    const rawResult: Record<string, any>[] = await getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .leftJoinAndSelect(User, "u", "p.authorId = u.id")
      .leftJoinAndSelect(Comment, "c", "c.postId = p.id")
      .getRawMany();

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
      });
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

    let currentPostMapping: Record<string, any> = {};
    let currentUserMapping: Record<string, any> = {};
    let currentCommentMapping: Record<string, any> = {};

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
        const rawResult = await getConnection()
          .getRepository(Post)
          .createQueryBuilder("p")
          .leftJoinAndSelect(User, "u", "p.authorId = u.id")
          .leftJoinAndSelect(Comment, "c", "c.postId = p.id")
          .where(`p.id = ${createdPost.id.toString()}`)
          .getRawMany();

        if (rawResult && rawResult[0]) {
          useMapRawResultToEntity(
            rawResult,
            currentPostMapping,
            currentUserMapping,
            currentCommentMapping
          );
        }
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
      const postObject = await Post.create(currentPostMapping);

      if (currentCommentMapping.id) {
        const commentObject = await Comment.create(currentCommentMapping);

        commentObject.author = (await User.findOne(
          commentObject.authorId
        )) as User;
        (postObject.comments as any) = [{ ...commentObject }];
      }

      const userObject = await User.create(currentUserMapping);

      (postObject.author as any) = { ...userObject };

      console.log({ posts: [postObject] });

      return {
        posts: [postObject],
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
