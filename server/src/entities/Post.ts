import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity, PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Comment } from "./Comment";
import { User } from "./User";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  headline!: string;

  @Field()
  @Column()
  body!: string;

  @Column()
  authorId!: number;

  @Field(() => User)
  author!: User;

  @Field(() => [Comment], { nullable: true })
  comments?: Comment[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
