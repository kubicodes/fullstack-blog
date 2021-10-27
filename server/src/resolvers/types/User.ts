import { Field, Int, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { SingleRoleResponse } from "./SingleRoleResponse";

@ObjectType()
export class User {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field()
  role?: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;
}
