import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { CV } from './cv.entity';

@ObjectType()
@Entity()
export class Skill extends BaseEntity {
  @Field(() => String)
  @Column()
  category!: string; // e.g., Programming Languages, Tools

  @Field(() => [String])
  @Column('simple-array')
  items!: string[];

  @ManyToOne(() => CV, (cv) => cv.skills)
  cv!: CV;

  @Column()
  cvId!: string;
}
