# Life360 Node.js Client
![Static Badge](https://img.shields.io/badge/Node.js-24.0.4-orange)

This is a Life360 client implemented in Nodejs. Uses [node-tls-client](https://github.com/Sahil1337/node-tls-client) under the hood to avoid TLS fingerprinting.

```js
import JsL360 from 'ls-l360'

const client = new JsL360({
    username: "your-awesome-username-here",
    password: "your-totally-secure-password",
    token: 'define-token-here-if-already-authenticated'
})

// Be sure to call this before using the client
await client.AuthenticateAsync();

// Get all circles the user is a member of
const circles = await item.GetCirclesAsync();
for (const circle in circles) {
    // do something with the data...
}
```

### See also
- [PyL360](https://github.com/arkangel-dev/PyL360)