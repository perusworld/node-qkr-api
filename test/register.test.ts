import { qkrInstance } from './base.test'
import { UserRegistration } from '../src/index';


let email = process.env.QKR_TEST_USER;
let password = process.env.QKR_TEST_PWD;

describe('check user login', () => {

    it('should login user', (done) => {
        let qkrApi = qkrInstance();
        let phone = Math.floor(Math.random() * 9999999999) + 1111111111;
        let req = {
            emailAddress: 'testuser' + phone + '@gmail.com',
            password: "somepwd1234",
            firstName: 'firstname',
            lastName: 'lastname',
            countryOfResidence: "US",
            language: "en",
            phoneNumber: "" + phone,
            phoneNumberCountryCode: "1",
            securityQuestion: "text",
            securityQuestionAnswer: "answer"
        };
        console.log('registering ', req);
        qkrApi.getSecurityQuestions().then(resp => {
            req.securityQuestion = resp[0].text;
            qkrApi.register(req).then(resp => {
                console.log(JSON.stringify(resp, null, 2));
                done();
            }).catch(err => {
                console.log(err);
                expect(err).toBeNull();
            });
        }).catch(err => {
            console.log(err);
            expect(err).toBeNull();
        });
    });

});