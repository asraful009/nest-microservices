import { Column, Entity, Index, OneToMany } from 'typeorm';
import { CustomBaseEntity } from '../../common/entities/custmon-base.entity';

@Entity({ name: 'user' })
@Index(['email', 'isActive'])
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

  // @OneToMany(type => UserEntity, userEntity => userEntity.)
  // createdBy: UserEntity[];
}
