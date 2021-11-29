import { UserEntity } from '../../entities/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

// @Entity({ database: 'public' })
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
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  @JoinColumn()
  createdBy: UserEntity;

  @Index()
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;

  @Index()
  @Column({ type: 'uuid' })
  lastChangedBy: string;
}
