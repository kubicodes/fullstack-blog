import { Field, InputType, ObjectType } from "type-graphql";

@InputType()
export class LoginOptions {
  @Field()
  usernameOrEmail!: string;

  @Field()
  password!: string;
}
