import { User } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { BaseEntity } from '@server/entities/base-entity';
import { VAR_CHAR } from '@server/entities/constants';

@Entity()
export class RefreshToken extends BaseEntity {
  @PrimaryColumn({ ...VAR_CHAR, nullable: false, generated: false })
  token!: string;

  @Column('timestamptz')
  public validSince!: Date;

  @Column('timestamptz')
  public validUntil!: Date;

  @Column({ type: 'timestamptz', nullable: true })
  public lastUsed?: Date | null;

  @Column({ type: 'boolean', default: false })
  public blackListed!: boolean;

  @Column('uuid')
  public userId!: string;

  @ManyToOne(() => User, (user) => user.refreshTokens)
  public user!: User;
}
