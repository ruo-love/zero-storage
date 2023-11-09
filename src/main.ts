import { createLocalStorage } from "@zrcode/storage";

const local = createLocalStorage();
console.log("local", local);
//@ts-ignore
window.local = local;
