import { ApiProperty } from '@nestjs/swagger';
import { Todo } from 'src/todo/entities/todo.entity';
import { User } from '../entities/user.entity';
import { Gender } from '../enum/gender.enum';
import { Role } from '../enum/role.enum';

export class UserDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly username: string;

  @ApiProperty()
  readonly gender: Gender;

  @ApiProperty()
  readonly birthday: Date;

  @ApiProperty()
  readonly role: Role;

  @ApiProperty()
  readonly todos: Todo[];

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.username = user.username;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.role = user.role;
    this.todos = user.todos;
  }
}
