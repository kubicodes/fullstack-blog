import { Field, ObjectType } from "type-graphql";
import { Comment } from "../../entities/Comment";
import { FieldError } from "./FieldError";

@ObjectType()
export class CommentResponse {
  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
