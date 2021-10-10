import { Media } from 'src/medias/entities/media.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoStatus } from '../enum/todoStatus.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Media)
  @JoinColumn()
  media: Media;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.WATCHLIST,
  })
  status: TodoStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(7)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(7)',
    onUpdate: 'CURRENT_TIMESTAMP(7)',
  })
  public updatedAt: Date;
}
