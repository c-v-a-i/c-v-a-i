import { Entity, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { BaseEntity } from '../base-entity';
import { User } from '../user.entity';
import { Education } from './education.entity';
import { WorkExperience } from './work-experience.entity';
import { ContactInfo } from '@server/entities/cv-entity/contact-info.entity';
import { Project } from '@server/entities/cv-entity/project.entity';
import { Skill } from '@server/entities/cv-entity/skill.entity';

@ObjectType()
@Entity()
export class CV extends BaseEntity {
  @Field(() => String)
  @Column()
  title!: string;

  @Field(() => User)
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

  // Cv 1..1 <---> ContactInfo
  @Field(() => ContactInfo)
  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.cv, { cascade: true })
  @JoinColumn()
  contactInfo!: ContactInfo;
}
