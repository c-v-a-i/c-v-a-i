import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { CV } from './cv.entity';
import { User } from '@server/entities/user.entity';

@ObjectType()
@Entity()
export class Education extends BaseEntity {
  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column()
  degree!: string;

  @Field(() => String)
  @Column()
  duration!: string;

  @Field(() => String)
  @Column()
  location!: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  type?: string; // On-site / Distance

  @Field(() => String)
  @Column({ type: 'text' })
  description!: string;

  @Field(() => [String])
  @Column('simple-array')
  skills!: string[];

  @ManyToOne(() => CV, (cv) => cv.educationEntries)
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;

  @ManyToOne(() => User, (user) => user.educationEntries)
  user!: User;

  @Column()
  userId!: string;
}
