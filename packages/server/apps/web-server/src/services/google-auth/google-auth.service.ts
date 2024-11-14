import { Injectable } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class GoogleAuthService {
  constructor(private readonly authService: AuthService) {}
}
