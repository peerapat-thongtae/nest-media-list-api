import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MediaType } from '../enum/mediaType.enum';
import { TodoStatus } from '../enum/todoStatus.enum';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tmdbId: number;

  @Column()
  mediaName: string;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.MOVIE,
  })
  mediaType: MediaType;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.WATCHLIST,
  })
  status: TodoStatus;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;

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
