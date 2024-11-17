import { IsString } from 'class-validator';

export class AuthJwtPayload {
  @IsString()
  sub!: string;
}
