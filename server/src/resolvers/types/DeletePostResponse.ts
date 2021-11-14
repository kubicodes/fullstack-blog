import { Field, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class DeletePostResponse {
  @Field(() => Boolean, { nullable: true })
  deleted?: boolean;

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}
