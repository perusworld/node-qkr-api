import { JWTRequest } from "./jwtrequest";
export interface UserRegistration {
    emailAddress: string;
    password: string;
    firstName: string;
    lastName: string;
    countryOfResidence: string;
    language: string;
    phoneNumber: string;
    phoneNumberCountryCode: string;
    securityQuestion: string;
    securityQuestionAnswer: string;
}
export declare class QKRApi extends JWTRequest {
    urlConf: any;
    private userAuth;
    constructor(conf: any);
    buildJWTHeader(ctx: any): any;
    /**
     * getSecurityQuestions
 :any    */
    getSecurityQuestions(): Promise<any>;
    /**
     * register
     */
    register(regReq: UserRegistration): Promise<any>;
    /**
     * login
     */
    login(email: string, password: string): Promise<any>;
    /**
     * getMerchants
 :any    */
    getMerchants(): Promise<any>;
    /**
     * getProducts
     */
    getProducts(id: string): Promise<any>;
    /**
     * getCarts
 : Promise<any>    */
    getCarts(): Promise<any>;
    /**
     * addCart
     */
    addCart(req: any): Promise<any>;
    /**
     * getCards
     */
    getCards(): Promise<any>;
    /**
     * doPayment
     */
    doPayment(req: any): Promise<any>;
    /**
     * buyCart
     */
    buyCart(req: any): Promise<any>;
    /**
     * getLightbox
     */
    getLightbox(req: any): Promise<any>;
}
