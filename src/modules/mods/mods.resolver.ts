import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ModsService } from './mods.service';

@Resolver('Mod')
export class ModsResolver {
  constructor(private readonly modsService: ModsService) {}

  @Mutation('updateModDB')
  updateModDB() {
    return this.modsService.updateModDB();
  }

  @Query('mods')
  findAll() {
    return this.modsService.findAll();
  }

  @Query('mod')
  findOne(@Args('modid') id: number) {
    return this.modsService.findOne(id);
  }
}
