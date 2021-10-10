import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from '../enum/mediaType.enum';

export class CreateTodoDto {
  @ApiProperty()
  readonly tmdbId: number;

  @ApiProperty()
  @IsEnum(MediaType)
  readonly mediaType: MediaType;
}
