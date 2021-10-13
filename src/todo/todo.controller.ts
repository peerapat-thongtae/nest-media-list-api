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
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MediasService } from 'src/medias/medias.service';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AddTodoRequestDto } from './dto/add-todo-request.dto';
import { MediaType } from './enum/mediaType.enum';
import { TodoStatus } from './enum/todoStatus.enum';

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
    const todo = await this.todoService.create(todoRequest, request.user.id);
    return { message: 'add todo', todo };
  }
  @Get('mytodo')
  @UseGuards(AuthGuard('jwt'))
  async findMyTodo(@Req() request) {
    const todos = await this.todoService.findUserTodo(request.user.id);
    return { message: 'my todo', todos };
  }

  @Get('movie/:status')
  @UseGuards(AuthGuard('jwt'))
  async todoMovie(
    @Req() request,
    @Query() query,
    @Param('status') status: TodoStatus,
  ) {
    console.log(query);
    const todos = await this.todoService.findUserTodoByStatus(
      request.user.id,
      MediaType.MOVIE,
      status,
    );
    return { message: 'get my watchlist', todos };
  }

  @Get('tv/:status')
  @UseGuards(AuthGuard('jwt'))
  async todoTV(
    @Req() request,
    @Query() query,
    @Param('status') status: TodoStatus,
  ) {
    console.log(query);
    const todos = await this.todoService.findUserTodoByStatus(
      request.user.id,
      MediaType.TV,
      status,
    );
    return { message: 'get my watched', todos };
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
