usage
!in the root of the project must be .env file 
```ts
import MainInterface from "./json-web-token-utility.js";
import { config } from "dotenv";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: __dirname + "/../.env" });

const mainInterface = new MainInterface(__dirname + "/../.env"); // __dirname + "/../.env" <= path to env 
const token = await mainInterface.signEncryptedToken({ username: "admin", password: "admin" }, "1h");
console.log(token);
console.log("1 token ^^^")
const result = await mainInterface.verifyDecryptedToken(token);
console.log(result);
console.log("verify 1 token ^^^")
let update = mainInterface.updateIvKey()
if (update.status === "success") {
    const token2 = await mainInterface.signEncryptedToken({ username: "admin", password: "admin" }, "1h");
    console.log(token2);
    console.log("2 token with new signature ^^^")
    const result2 = await mainInterface.verifyDecryptedToken(token2);
    console.log(result2);
    console.log("verify 2 token with new signature ^^^")
    const result3 = await mainInterface.verifyDecryptedToken(token);
    console.log(result3);
    console.log("verify 1 token with old signature ^^^")
} else {
    console.log("update failed")
}
```
