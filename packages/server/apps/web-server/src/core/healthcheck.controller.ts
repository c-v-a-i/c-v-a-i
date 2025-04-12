import { Controller, Get } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';

@Public()
@Controller('healthcheck')
export class HealthcheckController {
  @Get()
  get() {
    return 'Works!';
  }
}
