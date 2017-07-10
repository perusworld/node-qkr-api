import { qkrInstance } from "./base.test"

let email = process.env.QKR_TEST_USER;
let password = process.env.QKR_TEST_PWD;

describe("check cart checkout", () => {

    it("should get checkout cart", (done) => {
        let qkrApi = qkrInstance();
        let ctx = <any>{};
        let userAuth = null;
        qkrApi.login(email, password).then(resp => {
            userAuth = resp;
            return qkrApi.getCarts(userAuth);
        }).then(resp => {
            if (0 === resp.length) {
                console.log("No cart, so building one");
                return qkrApi.getMerchants().then(resp => {
                    console.log("Got merchants");
                    ctx.merchantId = resp[0].id;
                    ctx.outletId = resp[0].outlets[0].id;
                    return qkrApi.getProducts(resp[0].outlets[0].prodGroupSummaries[0].id);
                }).then(resp => {
                    console.log("Got products");
                    return qkrApi.addCart(userAuth,{
                        locatedScanId: resp.locatedScanId,
                        outletId: ctx.outletId,
                        purchaseNote: "Some note",
                        quantity: 1,
                        variantId: resp.products[0].variants[0].id
                    });
                }).then(resp => {
                    console.log("built cart");
                    return qkrApi.getCarts(userAuth);;
                }).catch(err => {
                    console.log(err);
                    expect(err).toBeNull();
                });
            } else {
                console.log("There is a cart, so using it to checkout");
                return resp;
            }
        }).then(resp => {
            console.log("Got carts");
            ctx.cartInfo = resp;
            return qkrApi.getCards(userAuth);
        }).then(resp => {
            console.log("Got cards");
            return qkrApi.buyCart(userAuth,{
                amountMinorUnits: ctx.cartInfo[0].amountMinorUnits,
                cardId: resp[0].id,
                cartId: ctx.cartInfo[0].cartId,
                tipAmount: 0
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