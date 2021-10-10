import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from 'src/todo/enum/mediaType.enum';
import { Media } from '../entities/media.entity';

export class MediaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  mediaType: MediaType;

  @ApiProperty()
  mediaName: string;

  constructor(media: Media) {
    this.id = media.id;
    this.mediaName = media.mediaName;
    this.mediaType = media.mediaType;
  }
}
