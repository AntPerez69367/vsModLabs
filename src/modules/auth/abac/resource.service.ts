import { Injectable } from '@nestjs/common';
import { ResourceClassMap } from '../abac/types';
import { ModpacksService } from 'src/modules/modpacks/modpacks.service';

type ResourceType = keyof typeof ResourceClassMap;
type ResourceInstance<T extends ResourceType> = InstanceType<
  (typeof ResourceClassMap)[T]
>;

@Injectable()
export class ResourceQueryService {
  constructor(private readonly modpackService: ModpacksService) {}

  async getExistingResource<T extends ResourceType>(
    resource: T,
    id: number,
  ): Promise<ResourceInstance<T> | null> {
    switch (resource) {
      case 'Modpack':
        return this.modpackService.findOne(id) as Promise<ResourceInstance<T>>;
      case 'Mod':
        return null;
      default:
        throw new Error(`Unsupported resource type: ${resource}`);
    }
  }
}
