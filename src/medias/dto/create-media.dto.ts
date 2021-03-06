import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from 'src/todo/enum/mediaType.enum';

export class CreateMediaDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsEnum(MediaType)
  readonly mediaType: MediaType;

  @ApiProperty()
  @IsString()
  readonly mediaName: string;
}
