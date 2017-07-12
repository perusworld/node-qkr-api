import { qkrInstance } from "./base.test"

let email = process.env.QKR_TEST_USER;
let password = process.env.QKR_TEST_PWD;

describe("check cart checkout", () => {

  it("should get checkout cart", (done) => {
    let qkrApi = qkrInstance();
    let ctx = <any>{};
    let userAuth = null;
    let someAmount = "199";
    let txId = "txt-id-" + Math.random();
    qkrApi.login(email, password).then(resp => {
      userAuth = resp;
      return qkrApi.getMerchants();
    }).then(resp => {
      console.log("Got merchants");
      ctx.merchantId = resp[0].id;
      ctx.outletId = resp[0].outlets[0].id;
      return qkrApi.getCards(userAuth);
    }).then(resp => {
      console.log("Got cards");
      return qkrApi.expressPayment(userAuth, {
        amount: someAmount,
        cardId: resp[0].id,
        description: "Sample Desc",
        outletId: ctx.outletId,
        partnerTxId: txId
      }).then(resp => {
        console.log("Completed purchase");
        console.log(JSON.stringify(resp, null, 2));
        done();
      }).catch(err => {
        console.log(err);
        expect(err).toBeNull();
        done();
      });
    });

  });
});