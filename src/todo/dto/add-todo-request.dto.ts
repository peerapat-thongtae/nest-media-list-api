import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { MediaType } from 'src/todo/enum/mediaType.enum';
import { TodoStatus } from 'src/todo/enum/todoStatus.enum';

export class AddTodoRequestDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  @IsEnum(MediaType)
  readonly mediaType: MediaType;

  @ApiProperty()
  @IsString()
  readonly mediaName: string;

  @ApiProperty()
  @IsEnum(TodoStatus)
  readonly status: TodoStatus;
}
