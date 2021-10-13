import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTodoRequestDto } from './dto/add-todo-request.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { MediaType } from './enum/mediaType.enum';
import { TodoStatus } from './enum/todoStatus.enum';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}
  async create(addTodoRequestDto: AddTodoRequestDto, userId: number) {
    const todo = await this.todosRepository.findOne({
      where: { userId: userId, mediaId: addTodoRequestDto.id },
    });
    if (todo) {
      console.log(todo.id);
      todo.status = addTodoRequestDto.status;
      await this.todosRepository.save(todo);
      return todo;
    }
    const newTodo = new Todo();
    newTodo.mediaId = addTodoRequestDto.id;
    newTodo.userId = userId;
    newTodo.status = addTodoRequestDto.status;

    const todoData = await this.todosRepository.save(newTodo);
    return todoData;
  }

  async findUserTodo(userId: number) {
    const todoData = await this.todosRepository.find({
      where: { userId: userId },
    });
    return todoData;
  }

  async findUserTodoByStatus(
    userId: number,
    mediaType: MediaType,
    status: TodoStatus,
  ) {
    const todos = await this.todosRepository.find({
      relations: ['media'],
      where: {
        userId: userId,
        status: status,
        media: {
          mediaType: mediaType,
        },
      },
      take: 10,
      skip: 0,
    });
    return todos;
  }

  findAll() {
    return `This action returns all todo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
