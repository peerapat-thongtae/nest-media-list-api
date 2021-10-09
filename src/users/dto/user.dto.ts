import { ApiProperty } from '@nestjs/swagger';
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
  readonly gender: Gender;

  @ApiProperty()
  readonly birthday: Date;

  @ApiProperty()
  readonly role: Role;

  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.gender = user.gender;
    this.birthday = user.birthday;
    this.role = user.role;
  }
}
