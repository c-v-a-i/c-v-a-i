import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { CvResolver } from './cv.resolver';

describe('CvResolver', () => {
  let resolver: CvResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CvResolver],
    }).compile();

    resolver = module.get<CvResolver>(CvResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
