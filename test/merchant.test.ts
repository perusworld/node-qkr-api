import { qkrInstance } from './base.test'

describe('check merchant lists', () => {

    it('should get merchant list', (done) => {
        let qkrApi = qkrInstance();
        qkrApi.getMerchants().then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});