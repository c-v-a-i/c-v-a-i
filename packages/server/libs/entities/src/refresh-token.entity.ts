import { User } from './user.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class RefreshToken {
  @PrimaryColumn({ type: 'varchar', length: 16 })
  public id!: string;

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
