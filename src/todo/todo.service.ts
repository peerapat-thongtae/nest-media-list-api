import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MediaDto } from 'src/medias/dto/media.dto';
import { Media } from 'src/medias/entities/media.entity';
import { Repository } from 'typeorm';
import { AddTodoRequestDto } from './dto/add-todo-request.dto';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todosRepository: Repository<Todo>,
  ) {}
  async create(addTodoRequestDto: AddTodoRequestDto, userId: number) {
    const todo = await this.todosRepository.findOne({
      where: { user: userId, media: addTodoRequestDto.id },
    });
    if (todo) {
      await this.todosRepository.update(todo.id, {
        status: addTodoRequestDto.status,
      });

      return todo;
    }
    const newTodo = new Todo();
    newTodo.mediaId = addTodoRequestDto.id;
    newTodo.userId = userId;

    const todoData = await this.todosRepository.save(newTodo);
    return todoData;
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
