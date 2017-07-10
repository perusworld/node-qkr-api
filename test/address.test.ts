import { qkrInstance } from './base.test'

let email = process.env.QKR_TEST_USER;
let password = process.env.QKR_TEST_PWD;

describe('check addresses', () => {

  it('should get addresses', (done) => {
    let qkrApi = qkrInstance();
    let ctx = <any>{};
    let userAuth = null;
    let phone = Math.floor(Math.random() * 9999999999) + 1111111111;
    qkrApi.login(email, password).then(resp => {
      userAuth = resp;
      return qkrApi.getAddresses(userAuth);
    }).then(resp => {
      if (0 == resp.length) {
        console.log('No addresses, so adding one');
        return resp;
      } else {
        console.log('Has addresses, so deleting one');
        return qkrApi.deleteAddress(userAuth, resp[0].id);
      };
    }).then(resp => {
      console.log('Adding an address');
      return qkrApi.addAddress(userAuth, {
        city: "San Carlos",
        country: "US",
        line1: "Mastercard",
        line2: "959 Skyway Rd",
        zip: "94070",
        state: "NY",
        alias: "testaddress",
        isDefault: true,
        recipientName: "John Doe",
        phoneNumber: "" + phone,
        phoneNumberCountryCode: "1",
      });
    }).then(resp => {
      console.log('Added address');
      return qkrApi.getAddresses(userAuth);
    }).then(resp => {
      console.log('Got addresses');
      console.log(JSON.stringify(resp, null, 2));
      done();
    }).catch(err => {
      console.log(err);
      done();
    });
  });
});