import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Password has to be at between 3 and 20 chars' })
  password: string;

  @IsString()
  @IsOptional()
  name?: string;
}
