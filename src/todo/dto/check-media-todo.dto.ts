import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from 'src/todo/enum/mediaType.enum';

export class CheckMediaTodo {
  @ApiProperty()
  readonly mediaId: number;

  @ApiProperty()
  @IsEnum(MediaType)
  readonly mediaType: MediaType;
}
