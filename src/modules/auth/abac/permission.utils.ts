import { GraphQLResolveInfo } from 'graphql';
import { ResourceClassMap, ValidAction, ValidResourceType } from './types';

export class PermissionUtils {
  static extractAction(fieldName: string): ValidAction {
    const action = fieldName
      .toLowerCase()
      .match(/create|update|delete/)?.[0] as ValidAction;

    if (!this.isValidAction(action)) {
      throw new Error(`Unsupported action in field: ${fieldName}`);
    }

    return action;
  }

  static extractResourceType(info: GraphQLResolveInfo): ValidResourceType {
    const type = info.returnType.toString().replace(/[[\]!]/g, '');

    if (!this.isValidResourceType(type)) {
      throw new Error(`Unsupported resource type: ${type}`);
    }

    return type;
  }

  private static isValidAction(action: string): action is ValidAction {
    return ['create', 'update', 'delete'].includes(action);
  }

  private static isValidResourceType(type: string): type is ValidResourceType {
    return Object.keys(ResourceClassMap).includes(type);
  }
}
