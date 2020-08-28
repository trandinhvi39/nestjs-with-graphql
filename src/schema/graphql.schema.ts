/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateCatInput {
  name: string;
  age: number;
}

export class Token {
  accessToken: string;
}

export abstract class IQuery {
  abstract login(username: Email, password: string): Token | Promise<Token>;

  abstract getCats(): Cat[] | Promise<Cat[]>;

  abstract cat(id: string): Cat | Promise<Cat>;
}

export class Cat {
  id?: string;
  name?: string;
  age?: number;
}

export abstract class IMutation {
  abstract createCat(createCatInput?: CreateCatInput): Cat | Promise<Cat>;
}

export abstract class ISubscription {
  abstract catCreated(): Cat | Promise<Cat>;
}

export type Email = any;
