import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: "id" })
  author!: User;

  @OneToMany(() => Comment, (comment) => comment.postId)
  @Field(() => [Comment], { nullable: true })
  @JoinColumn({ name: "postId" })
  comments?: Comment[];

  @Field()
  @CreateDateColumn()
  createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt!: Date;
}
