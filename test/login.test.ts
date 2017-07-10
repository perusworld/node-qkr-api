import { qkrInstance } from './base.test'

let email = process.env.QKR_TEST_USER;
let password = process.env.QKR_TEST_PWD;

describe('check user login', () => {

    it('should login user', (done) => {
        let qkrApi = qkrInstance();
        qkrApi.login(email, password).then(resp => {
            console.log(JSON.stringify(resp, null, 2));
            done();
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});