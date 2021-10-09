import {
  IsString,
  IsEmail,
  IsEnum,
  IsISO8601,
  IsOptional,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../enum/gender.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @ApiProperty()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsString()
  readonly username: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(Gender)
  readonly gender: Gender;

  @ApiProperty()
  @IsOptional()
  @IsISO8601()
  readonly birthday: Date;
}
