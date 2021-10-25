import { Field, Int, ObjectType } from "type-graphql";
import { FieldError } from "./FieldError";
import { SingleRoleResponse } from "./SingleRoleResponse";

@ObjectType()
export class UserResponse {
  @Field(() => Int)
  id!: number;

  @Field()
  username!: string;

  @Field()
  email!: string;

  @Field(() => SingleRoleResponse)
  role!: SingleRoleResponse;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field(() => [FieldError])
  errors?: [FieldError];
}
