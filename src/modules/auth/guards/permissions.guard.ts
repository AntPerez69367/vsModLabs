import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GqlContext } from '../interfaces/GqlContext.interface';
import { GraphQLArgs, GraphQLResolveInfo } from 'graphql';
import { PermissionContext, hasPermission } from '../abac/permissions';
import { User } from 'src/graphql.schema';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { PermissionUtils } from '../abac/permission.utils';
import { ResourceClassMap } from '../abac/types';
import { ResourceQueryService } from '../abac/resource.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);
  constructor(private readonly resourceQueryService: ResourceQueryService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const { user, args, info } = this.getContextData(context);
      console.log(info);
      const permissionContext = await this.buildPermissionContext(
        user,
        args,
        info,
      );
      console.log(permissionContext);
      return hasPermission(permissionContext);
    } catch (error: unknown) {
      this.logger.error(`Permission check failed`, error);
      throw error;
    }
  }

  private getContextData(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);

    return {
      user: gqlContext.getContext<GqlContext>().req.user as User,
      args: gqlContext.getArgs<GraphQLArgs>(),
      info: gqlContext.getInfo<GraphQLResolveInfo>(),
    };
  }

  private async buildPermissionContext(
    user: User,
    args: GraphQLArgs & { id?: number; input?: any },
    info: GraphQLResolveInfo,
  ): Promise<PermissionContext<keyof typeof ResourceClassMap>> {
    const resource = PermissionUtils.extractResourceType(info);
    const action = PermissionUtils.extractAction(info.fieldName);
    const data = this.transformInput(args, resource);
    let existing: typeof data | undefined;
    if (action !== 'create' && 'id' in args && args.id) {
      existing =
        (await this.resourceQueryService.getExistingResource(
          resource,
          args.id,
        )) || undefined; // Convert null to undefined
    }
    return Promise.resolve({
      user,
      action,
      resource,
      data,
      existing,
    });
  }

  private transformInput<T extends keyof typeof ResourceClassMap>(
    args: GraphQLArgs,
    resource: T,
  ): InstanceType<(typeof ResourceClassMap)[T]> | undefined {
    const ResourceClass = ResourceClassMap[resource];

    const rawInput = args['input'] as Record<string, unknown>;
    if (!rawInput || typeof rawInput !== 'object') {
      return;
    }

    try {
      const transformed = plainToInstance(
        ResourceClass as ClassConstructor<
          InstanceType<(typeof ResourceClassMap)[T]>
        >,
        rawInput,
        {
          enableImplicitConversion: true,
          excludeExtraneousValues: false,
        },
      );

      if (!(transformed instanceof ResourceClass)) {
        throw new Error(`Failed to transform input to ${resource}`);
      }

      return transformed as InstanceType<(typeof ResourceClassMap)[T]>;
    } catch (error) {
      this.logger.error(`Failed to transform ${resource} input: `, error);
      throw new Error(`Failed to transform ${resource}`);
    }
  }
}
