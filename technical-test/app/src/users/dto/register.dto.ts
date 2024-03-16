import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray()
  photos: string[];

  @IsNotEmpty()
  @IsString()
  creditcard_type: string;

  @IsNotEmpty()
  @IsString()
  creditcard_name: string;

  @IsNotEmpty()
  @IsString()
  creditcard_number: string;

  @IsNotEmpty()
  @IsString()
  creditcard_expired: string;

  @IsNotEmpty()
  @IsString()
  creditcard_cvv: string;
}
