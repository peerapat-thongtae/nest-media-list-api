import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MediasService } from 'src/medias/medias.service';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AddTodoRequestDto } from './dto/add-todo-request.dto';

@Controller('todo')
@UseInterceptors(TransformInterceptor)
export class TodoController {
  constructor(
    private readonly todoService: TodoService,
    private readonly mediaService: MediasService,
  ) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async create(@Req() request, @Body() todoRequest: AddTodoRequestDto) {
    await this.mediaService.create(todoRequest);
    console.log('yes');
    const todo = await this.todoService.create(todoRequest, request.user.id);
    return { message: 'add todo', todo };
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
