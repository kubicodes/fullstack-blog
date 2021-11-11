import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./Post";
import { User } from "./User";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  body!: string;

  @Field()
  @PrimaryColumn()
  postId!: number;

  @Field()
  @PrimaryColumn()
  authorId!: number;

  @Field(() => User, { nullable: true })
  @OneToOne(() => Post, (post) => post.id)
  @JoinColumn({ name: "id" })
  author?: User;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "id" })
  post!: Post;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
