import { JWTRequest } from "./jwtrequest";
export declare class QKRApi extends JWTRequest {
    urlConf: any;
    private userAuth;
    constructor(conf: any);
    buildJWTHeader(ctx: any): any;
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
}
