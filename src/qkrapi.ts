import { JWTRequest } from "./jwtrequest";

export interface UserRegistration {
    emailAddress: string,
    password: string,
    firstName: string,
    lastName: string,
    countryOfResidence: string,
    language: string,
    phoneNumber: string,
    phoneNumberCountryCode: string,
    securityQuestion: string,
    securityQuestionAnswer: string
};

export class QKRApi extends JWTRequest {

    urlConf: any;
    private userAuth: any;
    public constructor(conf: any) {
        super(conf);
    }
    buildJWTHeader(ctx: any): any {
        let ret = <any>{
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
    public getItem(userAuth: any, id: any, endPoint: string): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}/${id}`,
            method: 'GET',
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }

    /**
     * getItems
     */
    public getItems(userAuth: any, endPoint: string): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}`,
            method: 'GET',
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp.list;
        });
    }

    /**
     * addItem
     */
    public addItem(userAuth: any, req: any, endPoint: string): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}`,
            method: 'POST',
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }

    /**
     * updateItem
     */
    public updateItem(userAuth: any, id: any, req: any, endPoint: string): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}/${id}`,
            method: 'PUT',
            payload: req,
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }

    /**
     * deleteItem
     */
    public deleteItem(userAuth: any, id: any, endPoint: string): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/${endPoint}/${id}`,
            method: 'DELETE',
            payload: {},
            userAuth: userAuth
        }).then(resp => {
            return resp;
        });
    }


    /**
     * getSecurityQuestions
 :any    */
    public getSecurityQuestions(): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/securityQuestion`,
            method: 'GET',
            payload: {}
        }).then(resp => {
            return resp.list;
        });
    };

    /**
     * register
     */
    public register(regReq: UserRegistration): Promise<any> {
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
    public login(email: string, password: string): Promise<any> {
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
    public getMerchants(): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/merchant`,
            method: 'GET',
            payload: {}
        }).then(resp => {
            return resp.list;
        });
    };

    /**
     * getProducts
     */
    public getProducts(id: string): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/prodGroup/${id}`,
            method: 'GET',
            payload: {}
        });
    }

    /**
     * getCarts
 : Promise<any>    */
    public getCarts(userAuth: any): Promise<any> {
        return this.getItems(userAuth, 'cart');
    }

    /**
     * addCart
     */
    public addCart(userAuth: any, req: any): Promise<any> {
        return this.addItem(userAuth, req, 'cartItem');
    }

    /**
     * getCards
     */
    public getCards(userAuth: any): Promise<any> {
        return this.getItems(userAuth, 'card');
    }

    /**
     * addCard
     */
    public addCard(userAuth: any, req: any): Promise<any> {
        return this.addItem(userAuth, req, 'card');
    }

    /**
     * updateCard
     */
    public updateCard(userAuth: any, id: any, req: any, endPoint: string): Promise<any> {
        return this.updateItem(userAuth, id, req, 'card');
    }

    /**
     * deleteCard
     */
    public deleteCard(userAuth: any, id: any): Promise<any> {
        return this.deleteItem(userAuth, id, 'card');
    }

    /**
     * doPayment
     */
    public doPayment(userAuth: any, req: any): Promise<any> {
        return this.addItem(userAuth, req, 'payment');
    }

    /**
     * buyCart
     */
    public buyCart(userAuth: any, req: any): Promise<any> {
        return this.addItem(userAuth, req, 'trans');
    }

    /**
     * getLightbox
     */
    public getLightbox(req: any): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/lightbox`,
            method: 'POST',
            payload: req
        }).then(resp => {
            return resp;
        });
    }

}

