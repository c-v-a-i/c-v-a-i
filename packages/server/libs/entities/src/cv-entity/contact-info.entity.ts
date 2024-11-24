import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { CV } from './cv.entity';
import { BaseEntity } from '../base-entity';

@ObjectType()
@Entity()
export class ContactInfo extends BaseEntity {
  @Field(() => String)
  @Column()
  email!: string;

  @Field(() => String)
  @Column()
  phone!: string;

  @OneToOne(() => CV, (cv) => cv.contactInfo)
  @JoinColumn({ name: 'cvId' })
  cv!: CV;

  @Field(() => ID)
  @Column({ type: 'uuid' })
  cvId!: string;
}
