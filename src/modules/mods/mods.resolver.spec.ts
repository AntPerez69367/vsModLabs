import { Test, TestingModule } from '@nestjs/testing';
import { ModsResolver } from './mods.resolver';
import { ModsService } from './mods.service';

describe('ModsResolver', () => {
  let resolver: ModsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ModsResolver, ModsService],
    }).compile();

    resolver = module.get<ModsResolver>(ModsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
