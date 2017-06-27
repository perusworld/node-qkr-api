import { qkrInstance } from './base.test';

describe('check security question lists', () => {

    it('should get security question list', (done) => {
        let qkrApi = qkrInstance();
        qkrApi.getSecurityQuestions().then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});