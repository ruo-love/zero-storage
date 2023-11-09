declare module "crypto-js";
export interface StorageData<T> {
  value: T;
  expire: number | null;
}
export interface Local {
  [key: string]: any;
}
declare module "@zrcode/storage" {
  export function createLocalStorage<T extends Local>(
    prefix?: string,
    encrypt?: boolean,
    salt?: string
  ): {
    set<K extends keyof T>(key: K, value: T[K], expire: number | null): void;
    get<K extends keyof T>(key: K): T[K] | null;
    remove<K extends keyof T>(key: K);
    clear();
  };
}
