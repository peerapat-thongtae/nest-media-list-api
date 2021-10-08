import { List } from 'src/lists/entities/list.entity';
import { Media } from 'src/medias/entities/media.entity';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class MediaList {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Media)
  @JoinColumn()
  media: Media;

  @ManyToOne(() => List, (list) => list.medias)
  list: List;

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
