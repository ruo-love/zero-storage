import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
/**
 * 加密数据
 * @param data - 数据
 */
export function encrypto(data: any, CryptoSecret: string) {
  const newData = JSON.stringify(data);
  return AES.encrypt(newData, CryptoSecret).toString();
}
/**
 * 解密数据
 * @param cipherText - 密文
 */
export function decrypto(cipherText: string, CryptoSecret: string) {
  const bytes = AES.decrypt(cipherText, CryptoSecret);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  if (originalText) {
    return JSON.parse(originalText);
  }
  return null;
}
