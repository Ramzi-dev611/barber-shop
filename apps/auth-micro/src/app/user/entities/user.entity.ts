import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "../enums/role.enums";

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
  @Column({
      name: 'usernmae',
      type: String,
      unique: true,
      nullable: false
  })
  username?: string;
  @Column({
      name: 'email',
      type: String,
      unique: true,
      nullable: false
  })
  email?: string;
  @Column({
      name: 'firstname',
      type: String,
      nullable: false
  })
  firstname?: string;
  @Column({
      name: 'lastname',
      type: String,
      nullable: false
  })
  lastname?: string;
  @Column({
      name: 'password',
      type: String,
      nullable: false
  })
  password?: string;
  @Column({
      name: 'role',
      type: 'enum',
      enum: RoleEnum,
      default: RoleEnum.USER
  })
  role?: RoleEnum;
}