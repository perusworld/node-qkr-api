# Simple Node.js library to interact with Mastercard Qkr! APIs #

If you are looking to call Qkr! APIs via a backend server then head over to [node-qkr-api-server](https://github.com/perusworld/node-qkr-api-server)


## Install ##
```bash
npm install github:perusworld/node-qkr-api --save
```

## Create instance ##
```javascript
var qkr = require('node-qkr-api');

var qkrApi = new qkr.QKRApi({
    publicKey: process.env.QKR_PUBLIC_KEY,
    privateKey: process.env.QKR_PRIVATE_KEY,
    urlPrefix: process.env.QKR_URL
});

```

## Sample Calls (check [test](./test) folder for complete list) ## 
### Get merchants ###
```javascript
qkrApi.getMerchants().then(resp => {
    console.log(JSON.stringify(resp, null, 2));
}).catch(err => {
    console.log(err);
});

```