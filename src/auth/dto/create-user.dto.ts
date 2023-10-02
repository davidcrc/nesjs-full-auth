import { IsOptional, IsString } from 'class-validator';
import { AuthDto } from './auth.dto';

export class CreateUserDto extends AuthDto {
  @IsString()
  @IsOptional()
  name?: string;
}
