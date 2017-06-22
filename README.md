# Simple Node.js library to interact with Mastercard Qkr! APIs #

## Install ##
```bash
npm install github:perusworld/node-qkr-api --save
```

## Create instance ##
```javascript
import { QKRApi } from 'node-qkr-api';

let qkrApi = new QKRApi({
        publicKey: process.env.QKR_PUBLIC_KEY,
        privateKey: process.env.QKR_PRIVATE_KEY,
        urlPrefix: process.env.QKR_URL
    });

```

## Get merchants ##
```javascript
qkrApi.getMerchants().then(resp => {
    console.log(JSON.stringify(resp, null, 2));
}).catch(err => {
    console.log(err);
});

```