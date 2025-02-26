import { User, Role, Modpack, Mod } from 'src/graphql.schema';

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((
      user: User,
      data: Permissions[Key]['dataType'],
      existing: Permissions[Key]['dataType'],
    ) => boolean);

type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>;
    }>;
  }>;
};

export type Permissions = {
  Mod: {
    dataType: Mod;
    action: 'query' | 'create' | 'update' | 'delete';
  };
  Modpack: {
    dataType: Modpack;
    action: 'create' | 'update' | 'delete';
  };
};

const ROLES = {
  admin: {
    Mod: {
      update: true,
    },
    Modpack: {
      create: true,
      update: true,
      delete: true,
    },
  },
  moderator: {
    Mod: {
      update: false,
    },
    Modpack: {
      create: true,
      update: (user, data, existing) => user.id === existing.ownerId,
      delete: (user, data, existing) => user.id === existing.ownerId,
    },
  },
  user: {
    Modpack: {
      create: true,
      update: (user, data, existing) => user.id === existing.ownerId,
      delete: (user, data, existing) => user.id === existing.ownerId,
    },
  },
} as const satisfies RolesWithPermissions;

export interface PermissionContext<Resource extends keyof Permissions> {
  user: User;
  resource: Resource;
  action: Permissions[Resource]['action'];
  data?: Permissions[Resource]['dataType'];
  existing?: Permissions[Resource]['dataType'];
}
export function hasPermission<Resource extends keyof Permissions>(
  context: PermissionContext<Resource>,
) {
  const { user, resource, action, data, existing } = context;
  return user.roles.some((role) => {
    const permission = (ROLES as RolesWithPermissions)[role]?.[resource]?.[
      action
    ];
    if (permission == null) return false;
    if (typeof permission === 'boolean') return permission;
    return data != null && existing != null && permission(user, data, existing);
  });
}
