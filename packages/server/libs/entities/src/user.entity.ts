import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '@server/entities/base-entity';
import { VAR_CHAR } from '@server/entities/constants';
import { RefreshToken } from '@server/entities/refresh-token.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { CV } from '@server/entities/cv-entity/cv.entity';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';
import { ContactInfo, Education, Project, Skill, WorkExperience } from '@server/entities/cv-entity';

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

  @Field(() => [AboutMe])
  @OneToMany(() => AboutMe, (aboutMe) => aboutMe.user)
  aboutMeEntries!: AboutMe[];

  @Field(() => [ContactInfo])
  @OneToMany(() => ContactInfo, (contactInfo) => contactInfo.user)
  contactInfoEntries!: ContactInfo[];

  @Field(() => [Education])
  @OneToMany(() => Education, (education) => education.user)
  educationEntries!: Education[];

  @Field(() => [Project])
  @OneToMany(() => Project, (project) => project.user)
  projectEntries!: Project[];

  @Field(() => [Skill])
  @OneToMany(() => Skill, (skill) => skill.user)
  skillEntries!: Skill[];

  @Field(() => [WorkExperience])
  @OneToMany(() => WorkExperience, (workExperience) => workExperience.user)
  workExperienceEntries!: WorkExperience[];
}
