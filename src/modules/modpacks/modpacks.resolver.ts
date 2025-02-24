import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ModpacksService } from './modpacks.service';
import { CreateModpackInput } from './dto/create-modpack.input';
import { UpdateModpackInput } from './dto/update-modpack.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { PermissionsGuard } from '../auth/guards/permissions.guard';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserEntity } from '../users/entities/user.entity';

@Resolver('Modpack')
export class ModpacksResolver {
  constructor(private readonly modpacksService: ModpacksService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createModpack')
  create(
    @Args('input') input: CreateModpackInput,
    @CurrentUser() user: UserEntity,
  ) {
    return this.modpacksService.create(input, user);
  }

  @Query('modpacks')
  findAll() {
    return this.modpacksService.findAll();
  }

  @Query('modpack')
  findOne(@Args('id') id: number) {
    return this.modpacksService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation('updateModpack')
  async update(
    @Args('id') id: number,
    @Args('input') input: UpdateModpackInput,
  ) {
    return await this.modpacksService.update(id, input);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Mutation('removeModpack')
  remove(@Args('id') id: number) {
    return this.modpacksService.remove(id);
  }
}
