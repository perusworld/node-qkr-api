import { qkrInstance } from './base.test'

describe('check product list', () => {

    it('should get product list', (done) => {
        let qkrApi = qkrInstance();
        qkrApi.getMerchants().then(resp => {
            return qkrApi.getProducts(resp[0].outlets[0].prodGroupSummaries[0].id);
        }).then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});