import { qkrInstance } from './base.test'

describe('check config defaults', () => {

    it('should validate entries', (done) => {
        let qkrApi = qkrInstance();
        expect(qkrApi.conf.privateKey).toBeDefined();
        expect(qkrApi.conf.privateKey).not.toBeNull();
        expect(qkrApi.conf.privateKeyDecoded).toBeDefined();
        expect(qkrApi.conf.privateKeyDecoded).not.toBeNull();
        done();
    });

});