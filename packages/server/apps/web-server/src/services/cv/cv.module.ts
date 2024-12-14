import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CvService } from './cv.service';
import { CvResolver } from './cv.resolver';
import { Cv, CvSchema } from '../../../../../libs/schemas';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cv.name, schema: CvSchema }])],
  providers: [CvService, CvResolver],
  exports: [CvService],
})
export class CvModule {}
