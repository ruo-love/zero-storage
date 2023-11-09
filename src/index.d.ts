declare module "crypto-js";
declare module "@zrcode/storage" {
  export function createLocalStorage<T extends Local>(
    prefix: string,
    encrypt: boolean,
    salt: string
  ): {
    set<K extends keyof T>(
      key: K,
      value: T[K],
      expire: number | null = DEFAULT_CACHE_TIME
    ): void;
    get<K extends keyof T>(key: K): T[K] | null;
    remove<K extends keyof T>(key: K);
    clear();
  };
}
