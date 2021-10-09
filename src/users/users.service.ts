import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { JwtPayload } from './auth/jwt-payload.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly jwtPrivateKey: string;

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    this.jwtPrivateKey = 'media-list-secret';
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const user = new User();
      user.email = createUserDto.email.trim().toLowerCase();
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.gender = createUserDto.gender;
      user.birthday = createUserDto.birthday;

      const salt = await genSalt(10);
      user.password = await hash(createUserDto.password, salt);

      const userData = await this.usersRepository.save(user);

      const token = await this.signToken(userData);
      return new UserLoginResponseDto(userData, token);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async signToken(user: User) {
    const payload: JwtPayload = {
      email: user.email,
    };

    return sign(payload, this.jwtPrivateKey, {});
  }
}
