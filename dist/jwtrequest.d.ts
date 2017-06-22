export declare abstract class JWTRequest {
    conf: any;
    constructor(conf: any);
    protected getTimestamp(): string;
    protected getNonce: () => string;
    private buildRequestHeader(ctx);
    private signHeader(ctx);
    private buildHeaderString(ctx);
    abstract buildJWTHeader(ctx: any): any;
    private send(ctx);
    protected buildAndSendRequest(ctx: any): Promise<any>;
}
