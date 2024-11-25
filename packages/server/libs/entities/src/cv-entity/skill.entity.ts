import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { CV } from './cv.entity';
import { User } from '@server/entities/user.entity';

@ObjectType()
@Entity()
export class Skill extends BaseEntity {
  @Field(() => String)
  @Column()
  category!: string; // e.g., Programming Languages, Tools

  @Field(() => [String])
  @Column('simple-array')
  items!: string[];

  @ManyToOne(() => CV, (cv) => cv.skillEntries)
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;

  @ManyToOne(() => User, (user) => user.skillEntries)
  user!: User;

  @Column()
  userId!: string;
}
