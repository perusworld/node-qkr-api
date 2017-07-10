"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtrequest_1 = require("./jwtrequest");
;
class QKRApi extends jwtrequest_1.JWTRequest {
    constructor(conf) {
        super(conf);
    }
    buildJWTHeader(ctx) {
        let ret = {
            "kid": this.conf.publicKey,
            "api.qkr.com/uri": ctx.url,
            "api.qkr.com/timestamp": "" + this.getTimestamp(),
            "api.qkr.com/nonce": "" + this.getNonce()
        };
        if (ctx.userAuth) {
            ret["api.qkr.com/token"] = ctx.userAuth.accessToken.token;
        }
        return ret;
    }
    /**
     * getItem
     */
    getItem(userAuth, id, endPoint) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}/${id}`,
            method: "GET",
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * getItems
     */
    getItems(userAuth, endPoint) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}`,
            method: "GET",
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp.list;
        });
    }
    /**
     * addItem
     */
    addItem(userAuth, req, endPoint) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}`,
            method: "POST",
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * updateItem
     */
    updateItem(userAuth, id, req, endPoint) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}/${id}`,
            method: "PUT",
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * deleteItem
     */
    deleteItem(userAuth, id, endPoint) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}/${id}`,
            method: "DELETE",
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * getSecurityQuestions
 :any    */
    getSecurityQuestions() {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/securityQuestion`,
            method: "GET",
            payload: {}
        }).then(resp => {
            return resp.list;
        });
    }
    ;
    /**
     * register
     */
    register(regReq) {
        this.userAuth = null;
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/user`,
            method: "POST",
            payload: regReq
        }).then(resp => {
            return resp;
        });
    }
    /**
     * login
     */
    login(email, password) {
        this.userAuth = null;
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/userSession`,
            method: "POST",
            payload: {
                emailAddress: email,
                password: password
            }
        }).then(resp => {
            return resp;
        });
    }
    /**
     * getMerchants
 :any    */
    getMerchants() {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/merchant`,
            method: "GET",
            payload: {}
        }).then(resp => {
            return resp.list;
        });
    }
    ;
    /**
     * getProducts
     */
    getProducts(id) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/prodGroup/${id}`,
            method: "GET",
            payload: {}
        });
    }
    /**
     * getCarts
 : Promise<any>    */
    getCarts(userAuth) {
        return this.getItems(userAuth, "cart");
    }
    /**
     * addCart
     */
    addCart(userAuth, req) {
        return this.addItem(userAuth, req, "cartItem");
    }
    /**
     * getCards
     */
    getCards(userAuth) {
        return this.getItems(userAuth, "card");
    }
    /**
     * addCard
     */
    addCard(userAuth, req) {
        return this.addItem(userAuth, req, "card");
    }
    /**
     * updateCard
     */
    updateCard(userAuth, id, req, endPoint) {
        return this.updateItem(userAuth, id, req, "card");
    }
    /**
     * deleteCard
     */
    deleteCard(userAuth, id) {
        return this.deleteItem(userAuth, id, "card");
    }
    /**
     * doPayment
     */
    doPayment(userAuth, req) {
        return this.addItem(userAuth, req, "payment");
    }
    /**
     * buyCart
     */
    buyCart(userAuth, req) {
        return this.addItem(userAuth, req, "trans");
    }
    /**
     * getLightbox
     */
    getLightbox(req) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/lightbox`,
            method: "POST",
            payload: req
        }).then(resp => {
            return resp;
        });
    }
    /**
     * getAddresses
     */
    getAddresses(userAuth) {
        return this.getItems(userAuth, "address");
    }
    /**
     * getAddress
     */
    getAddress(userAuth, id) {
        return this.getItem(userAuth, id, "address");
    }
    /**
     * addAddress
     */
    addAddress(userAuth, req) {
        return this.addItem(userAuth, req, "address");
    }
    /**
     * updateAddress
     */
    updateAddress(userAuth, id, req, endPoint) {
        return this.updateItem(userAuth, id, req, "address");
    }
    /**
     * deleteAddress
     */
    deleteAddress(userAuth, id) {
        return this.deleteItem(userAuth, id, "address");
    }
}
exports.QKRApi = QKRApi;
//# sourceMappingURL=qkrapi.js.map