import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { CV } from './cv.entity';
import { User } from '@server/entities/user.entity';

@ObjectType()
@Entity()
export class WorkExperience extends BaseEntity {
  @Field(() => String)
  @Column()
  name!: string; // Company name

  @Field(() => String)
  @Column()
  position!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  duration?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  type?: string; // Full-time / Contract

  @Field(() => String, { nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  skills?: string[];

  @ManyToOne(() => CV, (cv) => cv.workExperienceEntries)
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;

  @ManyToOne(() => User, (user) => user.workExperienceEntries)
  user!: User;

  @Column()
  userId!: string;
}
