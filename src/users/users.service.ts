import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { JwtPayload } from './auth/jwt-payload.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { UserDto } from './dto/user.dto';
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
    const user = new User();
    user.email = createUserDto.email.trim().toLowerCase();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    user.gender = createUserDto.gender;
    user.username = createUserDto.username;
    user.birthday = createUserDto.birthday;

    const salt = await genSalt(10);
    user.password = await hash(createUserDto.password, salt);
    console.log(user);
    const checkUserByEmail = await this.getUserByEmail(user.email);
    console.log(checkUserByEmail);
    const checkUserByUsername = await this.getUserByUsername(user.username);
    console.log(checkUserByUsername);

    if (checkUserByEmail) {
      throw new HttpException(`${user.email} is exists`, HttpStatus.CONFLICT);
    }

    if (checkUserByUsername) {
      throw new HttpException(
        `${user.username} is exists`,
        HttpStatus.CONFLICT,
      );
    }

    const userData = await this.usersRepository.save(user);

    const token = await this.signToken(userData);
    return new UserLoginResponseDto(userData, token);
  }

  async getUser(id: string | number) {
    const user = await this.usersRepository.findOne(id, {
      relations: ['todos'],
    });
    if (!user) {
      throw new HttpException(
        'User with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return new UserDto(user);
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne(
      { email: email },
      {
        relations: ['todos'],
      },
    );
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.usersRepository.findOne(
      { username: username },
      {
        relations: ['todos'],
      },
    );
    return user;
  }

  async login(userLoginRequestDto: UserLoginRequestDto) {
    const email = userLoginRequestDto.email;
    const password = userLoginRequestDto.password;

    const user = await this.getUserByEmail(email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Invalid email or password.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = await this.signToken(user);
    return new UserLoginResponseDto(user, token);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ id: id }, updateUserDto);
    const user = this.getUser(id);
    return user;
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
