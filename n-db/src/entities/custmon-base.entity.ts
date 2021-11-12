import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity({ database: 'public' })
export abstract class CustomBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @VersionColumn()
  version: number;

  @Index()
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Index()
  @Column({ type: 'varchar', length: 300 })
  createdBy: string;

  @Index()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Index()
  @Column({ type: 'varchar', length: 300 })
  lastChangedBy: string;
}
