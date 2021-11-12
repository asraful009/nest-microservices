import { Column, Entity, Index } from 'typeorm';
import { CustomBaseEntity } from '../custmon-base.entity';

@Entity({ name: 'user' })
export class UserEntity extends CustomBaseEntity {
  @Index()
  @Column({ name: 'email', type: 'varchar', length: 200, unique: true })
  email: string;

  @Column({
    name: 'avatar',
    type: 'varchar',
    length: 512,
    unique: false,
    nullable: true,
  })
  avatar: string;
}
