import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CV } from './cv.entity';
import { BaseEntity } from '../base-entity';
import { User } from '@server/entities/user.entity';

@ObjectType()
@Entity()
export class ContactInfo extends BaseEntity {
  @Field(() => String)
  @Column()
  name!: string;

  // TODO: email should be email actually, not string
  //  maybe add email validations on the backend + on the frontend
  @Field(() => String)
  @Column()
  email!: string;

  // TODO: add phone validations on the backend & frontend
  @Field(() => String)
  @Column()
  phone!: string;

  @OneToOne(() => CV, (cv) => cv.contactInfo)
  @JoinColumn({ name: 'cvId' })
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;

  @ManyToOne(() => User, (user) => user.contactInfoEntries)
  user!: User;

  @Column()
  userId!: string;
}
