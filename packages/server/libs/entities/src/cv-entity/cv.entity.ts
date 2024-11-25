import { Entity, Column, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { User } from '../user.entity';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { Project } from './project.entity';
import { Skill } from './skill.entity';
import { ContactInfo } from '@server/entities/cv-entity/contact-info.entity';
import { AboutMe } from '@server/entities/cv-entity/about-me.entity';

@ObjectType()
@Entity()
export class CV extends BaseEntity {
  @Field(() => String)
  @Column()
  title!: string;

  @ManyToOne(() => User, (user) => user.cvs)
  user!: User;

  @Column()
  userId!: string;

  @Field(() => [Education])
  @OneToMany(() => Education, (education) => education.cv, { cascade: true })
  educationEntries!: Education[];

  @Field(() => [WorkExperience])
  @OneToMany(() => WorkExperience, (workExperience) => workExperience.cv, { cascade: true })
  workExperienceEntries!: WorkExperience[];

  // Cv 1..n <---> Project
  @Field(() => [Project])
  @OneToMany(() => Project, (project) => project.cv, { cascade: true })
  projectEntries!: Project[];

  // Cv 1..n <---> Skill
  @Field(() => [Skill])
  @OneToMany(() => Skill, (skill) => skill.cv, { cascade: true })
  skillEntries!: Skill[];

  @Field(() => AboutMe, { nullable: false })
  @OneToOne(() => AboutMe, (aboutMe) => aboutMe.cv, { cascade: true, nullable: false })
  aboutMe!: AboutMe;

  // Cv 1..1 <---> ContactInfo
  @Field(() => ContactInfo, { nullable: false })
  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.cv, { cascade: true, nullable: false })
  contactInfo!: ContactInfo;
}
