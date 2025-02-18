
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
}

export abstract class IMutation {
    abstract updateModDB(): Nullable<Nullable<Mod>[]> | Promise<Nullable<Nullable<Mod>[]>>;
}

type Nullable<T> = T | null;
