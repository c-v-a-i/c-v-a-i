import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@server/entities';
import { DataloaderService } from './dataloader.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DataloaderService],
  exports: [DataloaderService],
})
export class DataloaderModule {}
