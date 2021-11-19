import { Field, Int, ObjectType } from "type-graphql";
import { Post } from "../../entities/Post";
import { FieldError } from "./FieldError";

@ObjectType()
export class PostResponse {
  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => Boolean, { nullable: true })
  hasMore?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
