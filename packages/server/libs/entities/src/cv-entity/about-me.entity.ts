import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CV } from './cv.entity';
import { BaseEntity } from '../base-entity';

@ObjectType()
@Entity()
export class AboutMe extends BaseEntity {
  @Field(() => String)
  @Column()
  aboutMe!: string;

  @OneToOne(() => CV, (cv) => cv.aboutMe)
  @JoinColumn({ name: 'cvId' })
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;
}
