import { MediaType } from 'src/todo/enum/mediaType.enum';
import { TodoStatus } from 'src/todo/enum/todoStatus.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryColumn()
  id: number;

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
