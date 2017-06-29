import { qkrInstance } from './base.test'

let email = process.env.QKR_TEST_USER;
let password = process.env.QKR_TEST_PWD;

describe('check cards', () => {

  it('should get cards', (done) => {
    let qkrApi = qkrInstance();
    let ctx = <any>{};
    let userAuth = null;
    qkrApi.login(email, password).then(resp => {
      userAuth = resp;
      return qkrApi.getCards(userAuth);
    }).then(resp => {
      if (0 == resp.length) {
        console.log('No cards, so adding one');
        return resp;
      } else {
        console.log('Has cards, so deleting one');
        return qkrApi.deleteCard(userAuth, resp[0].id);
      };
    }).then(resp => {
      console.log('Adding a card');
      return qkrApi.addCard(userAuth, {
        addressCity: "San Carlos",
        addressCountry: "US",
        addressLine1: "Mastercard",
        addressLine2: "959 Skyway Rd",
        addressZip: "94070",
        alias: "testcard",
        cvc: "123",
        expMonth: 4,
        expYear: 18,
        isDefault: true,
        name: "John Doe",
        pan: "5555555555554444"
      });
    }).then(resp => {
      console.log('Added card');
      return qkrApi.getCards(userAuth);
    }).then(resp => {
      console.log('Got Cards');
      console.log(JSON.stringify(resp, null, 2));
      done();
    }).catch(err => {
      console.log(err);
      done();
    });
  });
});