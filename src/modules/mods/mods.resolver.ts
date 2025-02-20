import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ModsService } from './mods.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';

@Resolver('Mod')
export class ModsResolver {
  constructor(private readonly modsService: ModsService) {}

  @Mutation('updateModDB')
  @UseGuards(JwtAuthGuard)
  updateModDB() {
    return this.modsService.updateModDB();
  }

  @Query('mods')
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.modsService.findAll();
  }

  @Query('mod')
  @UseGuards(JwtAuthGuard)
  findOne(@Args('id') id: number) {
    return this.modsService.findOne(id);
  }
}
