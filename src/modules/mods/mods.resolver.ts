import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ModsService } from './mods.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';

@Resolver('Mod')
export class ModsResolver {
  constructor(private readonly modsService: ModsService) {}

  @Mutation('updateModDB')
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  updateModDB() {
    return this.modsService.updateModDB();
  }

  @Query('mods')
  findAll() {
    return this.modsService.findAll();
  }

  @Query('mod')
  findOne(@Args('id') id: number) {
    return this.modsService.findOne(id);
  }
}
