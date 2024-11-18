import { Entity, Column, ManyToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { CV } from './cv.entity';

@ObjectType()
@Entity()
export class Education extends BaseEntity {
  @Field(() => String)
  @Column()
  name!: string; // Institution name

  @Field(() => String)
  @Column()
  degree!: string; // Degree obtained

  @Field(() => String)
  @Column()
  duration!: string; // Duration of study

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

  @Column()
  cvId!: string;
}
