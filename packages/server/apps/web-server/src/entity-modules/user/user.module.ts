import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@server/entities';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { CvModule } from '../../services/cv/cv.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => CvModule)],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
