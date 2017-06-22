import { QKRApi } from '../src/index';

export function qkrInstance(): QKRApi {
    return new QKRApi({
        publicKey: process.env.QKR_PUBLIC_KEY,
        privateKey: process.env.QKR_PRIVATE_KEY,
        urlPrefix: process.env.QKR_URL
    });
}

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

it('base test //NOOP', () => {
});
