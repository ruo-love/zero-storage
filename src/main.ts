import { createLocalStorage } from "@zrcode/storage";

const local = createLocalStorage("ai@", true, "zr");
console.log("local", local);
//@ts-ignore
window.local = local;
