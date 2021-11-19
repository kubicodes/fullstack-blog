import { Field, Int, ObjectType } from "type-graphql";
import { Comment } from "../../entities/Comment";
import { FieldError } from "./FieldError";

@ObjectType()
export class CommentResponse {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => Boolean, { nullable: true })
  hasMore?: boolean;

  @Field(() => Int, { nullable: true })
  totalNumberOfComments?: number;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
