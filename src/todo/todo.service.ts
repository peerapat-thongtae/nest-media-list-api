import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTodoRequestDto } from './dto/add-todo-request.dto';
import { Todo } from './entities/todo.entity';
import { MediaType } from './enum/mediaType.enum';
import { TodoStatus } from './enum/todoStatus.enum';
import * as dayjs from 'dayjs';
import { CheckMediaTodo } from './dto/check-media-todo.dto';
@Injectable()
export class TodoService {
  private readonly configService: ConfigService;
  private readonly httpService: HttpService = new HttpService();

  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}
  async create(addTodoRequestDto: AddTodoRequestDto, userId: number) {
    try {
      const todo = await this.todosRepository.findOne({
        where: { userId: userId, mediaId: addTodoRequestDto.id },
      });
      console.log(todo);
      if (todo) {
        todo.status = addTodoRequestDto.status;
        await this.todosRepository.save(todo);
        return todo;
      }
      const newTodo = new Todo();
      newTodo.mediaId = addTodoRequestDto.id;
      newTodo.userId = userId;
      newTodo.status = addTodoRequestDto.status;

      console.log(newTodo);
      const todoData = await this.todosRepository.save(newTodo);
      return todoData;
    } catch (err) {
      console.log(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllUserTodo(userId: number) {
    const todoData = await this.todosRepository.find({
      where: { userId: userId },
    });
    return todoData;
  }

  async findUserTodoAllType(userId: number) {
    const todoData = await this.todosRepository.find({
      relations: ['media'],
      where: { userId: userId },
    });
    return todoData;
  }

  async getMedia(type: string, mediaId: number) {
    const TMDB_API_URL = process.env.TMDB_API_URL;
    const TMDB_TOKEN = process.env.TMDB_TOKEN;

    const res = await this.httpService
      .get(`${TMDB_API_URL}/3/${type}/${mediaId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${TMDB_TOKEN}`,
        },
      })
      .toPromise();
    return res.data;
  }

  async findUserTodoByStatus(
    userId: number,
    mediaType: MediaType,
    status: TodoStatus,
    query: any = {},
  ) {
    const page = query.page || 1;
    const skip = (page - 1) * 20;

    const [todos, count] = await this.todosRepository.findAndCount({
      relations: ['media'],
      where: {
        userId: userId,
        status: status,
        media: {
          mediaType: mediaType,
        },
      },
      order: {
        updatedAt: 'DESC',
      },
      take: 20,
      skip: skip,
    });

    return { todos, count };
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
  async getTVOnAir(userId: number) {
    const results = await this.findUserTodoAllType(userId);
    const tvOnTheAir = results
      .filter((result) => {
        return (
          result.media.mediaType === MediaType.TV &&
          result.media.mediaDetail?.next_episode_to_air?.air_date ===
            dayjs().format('YYYY-MM-DD')
        );
      })
      .map((res) => {
        return res.media.mediaDetail;
      });
    return tvOnTheAir;
  }

  async randomMyMovie(qty: number) {
    const randoms = await this.todosRepository
      .createQueryBuilder('todo')
      .leftJoinAndSelect('todo.media', 'media')
      .orderBy('RANDOM()')
      .where('media.mediaType = :type', { type: 'movie' })
      .andWhere('status = :status', { status: 'watchlist' })
      .limit(qty)
      .getMany();
    return randoms.map((res) => {
      return res.media.mediaDetail;
    });
  }

  async checkMediaInTodo(medias: Array<CheckMediaTodo>, userId: number) {
    const results: Array<Todo> = [];
    for (let i = 0; i < medias.length; i++) {
      const findList = await this.todosRepository.findOne({
        // relations: ['media'],
        where: {
          userId: userId,
          mediaId: medias[i].mediaId,
        },
      });

      if (findList) {
        results.push(findList);
      }
    }
    return results;
  }
}
