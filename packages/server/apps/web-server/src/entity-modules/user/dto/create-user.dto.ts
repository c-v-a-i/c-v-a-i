import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @IsString()
  firstName?: string | null;

  @IsOptional()
  @IsString()
  lastName?: string | null;

  @IsString()
  @IsEmail()
  email!: string;

  @IsString()
  googleId!: string;
}
