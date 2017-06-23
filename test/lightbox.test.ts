import { qkrInstance } from './base.test'

describe('check lightbox login/register url', () => {

    it('should get lightbox login/register url', (done) => {
        let qkrApi = qkrInstance();
        qkrApi.getLightbox({
            countryOfResidence: 'US',
            callbackUrl: 'myapp://lightbox'
        }).then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});