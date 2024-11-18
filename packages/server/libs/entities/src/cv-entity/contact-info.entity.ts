import { Entity, Column, OneToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
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
  cv!: CV;

  @Column()
  cvId!: string;
}
