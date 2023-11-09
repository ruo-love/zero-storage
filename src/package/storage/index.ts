import { Local, StorageData } from "@/index";
import { decrypto, encrypto } from "../Aes/index";

//入参本地存储的前缀，是否加密，加密盐

export function createLocalStorage<T extends Local>(
  prefix: string = "local@",
  encrypt: boolean = false,
  salt: string = "local"
) {
  /** 默认缓存期限为7天 */
  const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

  //K extends keyof T => 'themeColor' | 'themeColor' |.... 联和类型
  function set<K extends keyof T>(
    key: K,
    value: T[K],
    expire: number | null = DEFAULT_CACHE_TIME
  ) {
    const encryptoData: StorageData<T[K]> = {
      value,
      expire: expire !== null ? new Date().getTime() + expire : null,
    };
    const json = encrypt ? encrypto(encryptoData, salt) : value;
    window.localStorage.setItem(prefix + (key as string), json);
  }

  function get<K extends keyof T>(key: K): T[K] | null {
    const json = window.localStorage.getItem(prefix + (key as string));
    if (!encrypt && json) return json as T[K];
    if (encrypt && json) {
      let localKeyData: StorageData<T[K]> | null = null;
      try {
        localKeyData = decrypto(json, salt);
      } catch (err) {
        console.log("获取本地存储数据=》解密失败:", err);
      }
      if (localKeyData) {
        const { value, expire } = localKeyData;
        if (expire == null || expire >= Date.now()) {
          return value;
        }
      }
      remove(key);
      return null;
    }
    return null;
  }
  function remove<K extends keyof T>(key: K) {
    window.localStorage.removeItem(prefix + (key as string));
  }
  function clear() {
    window.localStorage.clear();
  }

  return {
    set,
    get,
    remove,
    clear,
  };
}
