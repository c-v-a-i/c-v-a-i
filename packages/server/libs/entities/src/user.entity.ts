import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@server/entities/base-entity';
import { VAR_CHAR } from '@server/entities/constants';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';

// TODO: create different entities for user, userProfile.
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  @Column({ nullable: false, ...VAR_CHAR, unique: true })
  googleId!: string;

  @Field(() => String)
  @Column({ nullable: true, ...VAR_CHAR })
  firstName?: string | null;

  @Field(() => String)
  @Column({ nullable: true, ...VAR_CHAR })
  lastName?: string | null;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  public refreshTokens!: RefreshToken[];

  @Field(() => [CV])
  @OneToMany(() => CV, (cv) => cv.user)
  cvs!: CV[];
}
