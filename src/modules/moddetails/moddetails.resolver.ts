import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ModDetailsService } from './moddetails.service';

@Resolver('ModDetail')
export class ModDetailsResolver {
  constructor(private readonly moddetailsService: ModDetailsService) {}

  @Mutation('updateModDetails')
  create(@Args('id') id: number) {
    return this.moddetailsService.update(id);
  }
}
