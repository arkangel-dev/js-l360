import 'dotenv/config';
import { env } from "node:process";
import JsL360 from "./src";

const item = new JsL360({
    __username: env.USERNAME || '',
    __password: env.PASSWORD || ''
})

item.PrintCredentials();