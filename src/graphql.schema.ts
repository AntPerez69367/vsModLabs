
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Role {
    admin = "admin",
    moderator = "moderator",
    user = "user"
}

export class CreateModpackInput {
    name: string;
    mods?: Nullable<Nullable<number>[]>;
    public?: Nullable<boolean>;
}

export class UpdateModpackInput {
    name?: Nullable<string>;
    mods?: Nullable<Nullable<number>[]>;
    public?: Nullable<boolean>;
}

export class AddModToModpackInput {
    modpackId: number;
    modId: number;
}

export class CreateModInput {
    modId: number;
    assetId: number;
    downloads?: Nullable<number>;
    follows?: Nullable<number>;
    name: string;
    summary?: Nullable<string>;
    modIdStrs?: Nullable<Nullable<string>[]>;
    author?: Nullable<string>;
    urlAlias?: Nullable<string>;
    type?: Nullable<string>;
    logo?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    lastReleased?: Nullable<string>;
}

export class UpdateModInput {
    modId: number;
    assetId?: Nullable<number>;
    downloads?: Nullable<number>;
    follows?: Nullable<number>;
    name?: Nullable<string>;
    summary?: Nullable<string>;
    modIdStrs?: Nullable<Nullable<string>[]>;
    author?: Nullable<string>;
    urlAlias?: Nullable<string>;
    type?: Nullable<string>;
    logo?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    lastReleased?: Nullable<string>;
}

export class AuthenticatedUser {
    id: number;
    token: string;
    roles: Role[];
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export abstract class IMutation {
    abstract login(username: string, password: string): Nullable<AuthenticatedUser> | Promise<Nullable<AuthenticatedUser>>;

    abstract updateModDetails(id: number): ModDetail | Promise<ModDetail>;

    abstract createModpack(input: CreateModpackInput): Modpack | Promise<Modpack>;

    abstract updateModpack(id: number, input: UpdateModpackInput): Modpack | Promise<Modpack>;

    abstract addModToModpack(input?: Nullable<AddModToModpackInput>): Modpack | Promise<Modpack>;

    abstract removeModpack(id: number): Nullable<number> | Promise<Nullable<number>>;

    abstract updateModDB(): Nullable<Nullable<Mod>[]> | Promise<Nullable<Nullable<Mod>[]>>;

    abstract createUser(username: string, password: string, email: string): Nullable<User> | Promise<Nullable<User>>;
}

export class ModDetail {
    modId: number;
    name: string;
    html?: Nullable<string>;
    releases?: Nullable<Nullable<ModRelease>[]>;
}

export abstract class IQuery {
    abstract ModDetails(): Nullable<ModDetail>[] | Promise<Nullable<ModDetail>[]>;

    abstract ModDetail(id: number): Nullable<ModDetail> | Promise<Nullable<ModDetail>>;

    abstract modpacks(): Nullable<Modpack>[] | Promise<Nullable<Modpack>[]>;

    abstract modpack(id: number): Nullable<Modpack> | Promise<Nullable<Modpack>>;

    abstract modpacksByUser(username?: Nullable<string>): Nullable<Nullable<Modpack>[]> | Promise<Nullable<Nullable<Modpack>[]>>;

    abstract mods(): Nullable<Mod>[] | Promise<Nullable<Mod>[]>;

    abstract mod(id: number): Nullable<Mod> | Promise<Nullable<Mod>>;

    abstract currentUser(): Nullable<User> | Promise<Nullable<User>>;
}

export class Modpack {
    id: number;
    name: string;
    ownerId: number;
    mods?: Nullable<Nullable<number>[]>;
    updated?: Nullable<string>;
    public?: Nullable<boolean>;
}

export class ModRelease {
    releaseId: number;
    modId: number;
    mainFile: string;
    fileName: string;
    fileId: number;
    tags?: Nullable<Nullable<string>[]>;
    version: string;
    created?: Nullable<string>;
}

export class Mod {
    modId: number;
    assetId: number;
    downloads?: Nullable<number>;
    follows?: Nullable<number>;
    name: string;
    summary?: Nullable<string>;
    modIdStrs?: Nullable<Nullable<string>[]>;
    author?: Nullable<string>;
    urlAlias?: Nullable<string>;
    type?: Nullable<string>;
    logo?: Nullable<string>;
    tags?: Nullable<Nullable<string>[]>;
    lastReleased?: Nullable<string>;
    details?: Nullable<ModDetail>;
}

export class User {
    id: number;
    username: string;
    email: string;
    roles: Role[];
}

type Nullable<T> = T | null;
