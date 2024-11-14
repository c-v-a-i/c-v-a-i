import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@server/entities/base-entity';
import { VAR_CHAR } from '@server/entities/constants';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { Entity, Column, OneToMany } from 'typeorm';

// TODO: create different entities for user, userProfile.
@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email!: string;

  @Field({ nullable: false })
  @Column({ nullable: false, ...VAR_CHAR, unique: true })
  googleId!: string;

  @Field(() => String)
  @Column({ nullable: false, ...VAR_CHAR })
  firstName!: string;

  @Field(() => String)
  @Column({ nullable: false, ...VAR_CHAR })
  lastName!: string;

  @OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
  public refreshTokens!: RefreshToken[];
}
