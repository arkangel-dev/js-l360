import 'dotenv/config';
import { env } from "node:process";
import JsL360 from "./src";


async function main() {

    const item = new JsL360({
        username: env.USERNAME || '',
        password: env.PASSWORD || ''
    })
    // await item.GetTlsFingerprintData();
    await item.AuthenticateAsync();

    const circles = await item.GetCirclesAsync();
    const members = await item.GetMembersAsync(circles.circles[0].id);

    for (const member of members.members) {
        console.log(`Member: ${member.firstName} ${member.lastName}, ID: ${member.id}`);
        await item.ForceMemberUpdate(circles.circles[0].id, member.id);

        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

main();