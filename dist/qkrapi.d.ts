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
     * getItem
     */
    getItem(userAuth: any, id: any, endPoint: string): Promise<any>;
    /**
     * getItems
     */
    getItems(userAuth: any, endPoint: string): Promise<any>;
    /**
     * addItem
     */
    addItem(userAuth: any, req: any, endPoint: string): Promise<any>;
    /**
     * updateItem
     */
    updateItem(userAuth: any, id: any, req: any, endPoint: string): Promise<any>;
    /**
     * deleteItem
     */
    deleteItem(userAuth: any, id: any, endPoint: string): Promise<any>;
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
    getCarts(userAuth: any): Promise<any>;
    /**
     * addCart
     */
    addCart(userAuth: any, req: any): Promise<any>;
    /**
     * getCards
     */
    getCards(userAuth: any): Promise<any>;
    /**
     * addCard
     */
    addCard(userAuth: any, req: any): Promise<any>;
    /**
     * updateCard
     */
    updateCard(userAuth: any, id: any, req: any, endPoint: string): Promise<any>;
    /**
     * deleteCard
     */
    deleteCard(userAuth: any, id: any): Promise<any>;
    /**
     * doPayment
     */
    doPayment(userAuth: any, req: any): Promise<any>;
    /**
     * buyCart
     */
    buyCart(userAuth: any, req: any): Promise<any>;
    /**
     * getLightbox
     */
    getLightbox(req: any): Promise<any>;
    /**
     * getAddresses
     */
    getAddresses(userAuth: any): Promise<any>;
    /**
     * getAddress
     */
    getAddress(userAuth: any, id: any): Promise<any>;
    /**
     * addAddress
     */
    addAddress(userAuth: any, req: any): Promise<any>;
    /**
     * updateAddress
     */
    updateAddress(userAuth: any, id: any, req: any, endPoint: string): Promise<any>;
    /**
     * deleteAddress
     */
    deleteAddress(userAuth: any, id: any): Promise<any>;
    /**
     * expressPayment
     */
    expressPayment(userAuth: any, id: any): Promise<any>;
    /**
     * getUserProfile
     */
    getUserProfile(userAuth: any, id: any): Promise<any>;
    /**
     * getCurrentUserProfile
     */
    getCurrentUserProfile(userAuth: any): Promise<any>;
}
