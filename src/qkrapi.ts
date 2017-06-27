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
        if (this.userAuth && !ctx.anonAuth) {
            ret["api.qkr.com/token"] = this.userAuth.accessToken.token;
        }
        return ret;
    }

    /**
     * getSecurityQuestions
 :any    */
    public getSecurityQuestions(): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/securityQuestion`,
            method: 'GET',
            payload: {},
            anonAuth: true
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
            payload: regReq,
            anonAuth: true
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
            this.userAuth = resp;
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
            payload: {},
            anonAuth: true
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
            payload: {},
            anonAuth: true
        });
    }

    /**
     * getCarts
 : Promise<any>    */
    public getCarts(): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/cart`,
            method: 'GET',
            payload: {}
        }).then(resp => {
            return resp.list;
        });
    }

    /**
     * addCart
     */
    public addCart(req: any): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/cartItem`,
            method: 'POST',
            payload: req
        }).then(resp => {
            return resp;
        });
    }

    /**
     * getCards
     */
    public getCards(): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/card`,
            method: 'GET',
            payload: {}
        }).then(resp => {
            return resp.list;
        });
    }

    /**
     * doPayment
     */
    public doPayment(req: any): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/payment`,
            method: 'POST',
            payload: req
        }).then(resp => {
            return resp;
        });
    }

    /**
     * buyCart
     */
    public buyCart(req: any): Promise<any> {
        return super.buildAndSendRequest({
            url: `${this.conf.urlPrefix}/trans`,
            method: 'POST',
            payload: req
        }).then(resp => {
            return resp;
        });
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

