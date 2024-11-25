import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CV } from './cv.entity';
import { BaseEntity } from '../base-entity';
import { User } from '@server/entities';

@ObjectType()
@Entity()
export class AboutMe extends BaseEntity {
  @Field(() => String)
  @Column()
  fieldName!: string;

  @Field(() => String)
  @Column()
  description!: string;

  @OneToOne(() => CV, (cv) => cv.aboutMe)
  @JoinColumn({ name: 'cvId' })
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;

  @ManyToOne(() => User, (user) => user.aboutMeEntries)
  user!: User;

  @Column()
  userId!: string;
}
