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
     * getSecurityQuestions
 :any    */
    getSecurityQuestions() {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/securityQuestion`,
            method: 'GET',
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
            method: 'POST',
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
            method: 'POST',
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
            method: 'GET',
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
            method: 'GET',
            payload: {}
        });
    }
    /**
     * getCarts
 : Promise<any>    */
    getCarts(userAuth) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/cart`,
            method: 'GET',
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp.list;
        });
    }
    /**
     * addCart
     */
    addCart(userAuth, req) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/cartItem`,
            method: 'POST',
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * getCards
     */
    getCards(userAuth) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/card`,
            method: 'GET',
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp.list;
        });
    }
    /**
     * addCard
     */
    addCard(userAuth, req) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/card`,
            method: 'POST',
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * deleteCard
     */
    deleteCard(userAuth, id) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/card/${id}`,
            method: 'DELETE',
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * doPayment
     */
    doPayment(userAuth, req) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/payment`,
            method: 'POST',
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * buyCart
     */
    buyCart(userAuth, req) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/trans`,
            method: 'POST',
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }
    /**
     * getLightbox
     */
    getLightbox(req) {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/lightbox`,
            method: 'POST',
            payload: req
        }).then(resp => {
            return resp;
        });
    }
}
exports.QKRApi = QKRApi;
//# sourceMappingURL=qkrapi.js.map