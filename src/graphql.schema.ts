
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    role?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
}

export abstract class IMutation {
    abstract login(username: string, password: string): Nullable<AuthenticatedUser> | Promise<Nullable<AuthenticatedUser>>;

    abstract updateModDB(): Nullable<Nullable<Mod>[]> | Promise<Nullable<Nullable<Mod>[]>>;

    abstract createUser(username: string, password: string, email: string): Nullable<User> | Promise<Nullable<User>>;
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
}

export abstract class IQuery {
    abstract mods(): Nullable<Mod>[] | Promise<Nullable<Mod>[]>;

    abstract mod(id: number): Nullable<Mod> | Promise<Nullable<Mod>>;

    abstract currentUser(): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: number;
    username: string;
    email: string;
}

type Nullable<T> = T | null;
