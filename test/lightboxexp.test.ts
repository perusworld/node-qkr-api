import { qkrInstance } from './base.test'

describe('check lightbox express checkout manage url', () => {

    it('should get lightbox express checkout manage url', (done) => {
        let qkrApi = qkrInstance();
        qkrApi.getMerchants().then(resp => {
            return qkrApi.getLightbox({
                countryOfResidence: 'US',
                callbackUrl: 'myapp://lightbox',
                action: 'MANAGE_EXPRESS_CHECKOUT',
                merchantId: resp[0].id
            });
        }).then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            console.log(resp.url);
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});
