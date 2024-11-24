import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { CV } from './cv.entity';

@ObjectType()
@Entity()
export class WorkExperience extends BaseEntity {
  @Field(() => String)
  @Column()
  name!: string; // Company name

  @Field(() => String)
  @Column()
  position!: string;

  @Field(() => String)
  @Column()
  duration!: string;

  @Field(() => String)
  @Column()
  location!: string;

  @Field(() => String)
  @Column()
  type!: string; // Full-time / Contract

  @Field(() => String)
  @Column({ type: 'text' })
  description!: string;

  @Field(() => [String])
  @Column('simple-array')
  skills!: string[];

  @ManyToOne(() => CV, (cv) => cv.workExperienceEntries)
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;
}
