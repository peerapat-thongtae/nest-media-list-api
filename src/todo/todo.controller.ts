import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { MediasService } from 'src/medias/medias.service';
import { TransformInterceptor } from 'src/interceptors/transform.interceptor';
import { AddTodoRequestDto } from './dto/add-todo-request.dto';
import { MediaType } from './enum/mediaType.enum';
import { TodoStatus } from './enum/todoStatus.enum';
import { query } from 'express';
import { CheckMediaTodo } from './dto/check-media-todo.dto';

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
    const todos = await this.todoService.findUserTodoAllType(request.user.id);
    return { message: 'my todo', todos };
  }

  @Get('movie/:status')
  @UseGuards(AuthGuard('jwt'))
  async todoMovie(
    @Req() request,
    @Query() query,
    @Param('status') status: TodoStatus,
  ) {
    const todos = await this.todoService.findUserTodoByStatus(
      request.user.id,
      MediaType.MOVIE,
      status,
      query,
    );
    const results = todos.map((todo) => {
      return todo.media.mediaDetail;
    });
    return {
      message: `get my movie ${status}`,
      todos,
      results,
      page: query.page,
    };
  }

  @Get('tvonair/:userId')
  // @UseGuards(AuthGuard('jwt'))
  async userTVOnAir(@Req() request, @Param('userId') userId: number) {
    const tvOnAir = await this.todoService.getTVOnAir(userId);
    return { message: `get my tv on air now`, tvOnAir };
  }

  @Get('tv/:status')
  @UseGuards(AuthGuard('jwt'))
  async todoTV(
    @Req() request,
    @Query() query,
    @Param('status') status: TodoStatus,
  ) {
    const todos = await this.todoService.findUserTodoByStatus(
      request.user.id,
      MediaType.TV,
      status,
      query,
    );
    const results = todos.map((todo) => {
      return todo.media.mediaDetail;
    });
    return { message: `get my tv ${status}`, todos, results, page: query.page };
  }

  @Get('random/movie')
  async randomMovie(@Query('qty') qty: number) {
    qty = qty || 1;
    const movies = await this.todoService.randomMyMovie(qty);
    return { message: 'Random My Movie', movies, qty };
  }

  @Post('checkmediatodo')
  @UseGuards(AuthGuard('jwt'))
  async checkMediaTodo(@Req() request, @Body() medias: Array<CheckMediaTodo>) {
    const todos = await this.todoService.checkMediaInTodo(
      medias,
      request.user.id,
    );
    return { message: 'check media in todo', todos, qty: todos.length };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
