import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { CV } from './cv.entity';

@ObjectType()
@Entity()
export class Project extends BaseEntity {
  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => String)
  @Column({ type: 'text' })
  description!: string;

  @Field(() => [String])
  @Column('simple-array')
  skills!: string[];

  @ManyToOne(() => CV, (cv) => cv.projectEntries)
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;
}
