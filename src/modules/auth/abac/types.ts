import { Mod, Modpack } from 'src/graphql.schema';

export const ResourceClassMap = {
  Modpack: Modpack,
  Mod: Mod,
} as const;

export type ValidResourceType = 'Modpack' | 'Mod';

export type ValidAction = 'create' | 'update' | 'delete';
