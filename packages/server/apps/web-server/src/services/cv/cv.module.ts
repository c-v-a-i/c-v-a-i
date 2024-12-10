import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Cv, CvSchema } from './cv.schema';
import { CvService } from './cv.service';
import { CvResolver } from './cv.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cv.name, schema: CvSchema }]),
  ],
  providers: [CvService, CvResolver],
  exports: [CvService],
})
export class CvModule {}
