import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { HashtagEnum } from '../enums/hashtag.enum';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({
    name: 'user_id',
    type: String,
    nullable: false
  })
  userId: string;

  @Column({
    name: 'content',
    type: String,
    nullable: false,
    length: 120
  })
  content?: string;

  @Column({
    name: 'hashtag',
    type: 'enum',
    nullable: false,
    enum: HashtagEnum,
  })
  hashtag?: HashtagEnum | string;
}
