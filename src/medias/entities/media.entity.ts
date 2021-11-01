import { MediaType } from 'src/todo/enum/mediaType.enum';
import {
  AfterLoad,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Repository,
  UpdateDateColumn,
} from 'typeorm';
import { TodoService } from 'src/todo/todo.service';
import { Todo } from 'src/todo/entities/todo.entity';

@Entity()
export class Media {
  @PrimaryColumn()
  id: number;

  @Column()
  mediaName: string;
  mediaDetail: any;

  @Column({
    type: 'enum',
    enum: MediaType,
    default: MediaType.MOVIE,
  })
  mediaType: MediaType;

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

  @AfterLoad()
  public async setMediaDetail() {
    const todoRepository = new Repository<Todo>();
    const todoService = new TodoService(todoRepository);
    this.mediaDetail = await todoService.getMedia(
      this.mediaType.toLowerCase(),
      this.id,
    );
  }
}
