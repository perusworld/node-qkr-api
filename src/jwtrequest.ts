import * as request from "request";
import * as jwt from 'jsonwebtoken';

export abstract class JWTRequest {
    conf: any;
    public constructor(conf: any) {
        this.conf = {
            algorithm: 'HS256',
            publicKey: '',
            privateKey: '',
            ...conf
        };
        this.conf.privateKeyDecoded = new Buffer(this.conf.privateKey, 'base64');

        if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
            console.log('using proxy', this.conf.httpProxy);
        }
    }

    protected getTimestamp(): string {
        return "" + Math.floor((new Date()).getTime());
    }

    protected getNonce = function (): string {
        var hrtime = process.hrtime();
        return "" + (hrtime[0] * 1e9 + hrtime[1]);
    };

    private buildRequestHeader(ctx: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                ctx.jwthdr = this.buildJWTHeader(ctx);
                resolve(ctx);
            } catch (error) {
                reject(error);
            }
        });
    };

    private signHeader(ctx: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                ctx.jwt = jwt.sign(ctx.payload,
                    this.conf.privateKeyDecoded, {
                        algorithm: this.conf.algorithm,
                        header: ctx.jwthdr,
                        noTimestamp: true
                    });
                resolve(ctx);
            } catch (error) {
                reject(error);
            }
        });
    };

    private buildHeaderString(ctx: any): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                if ('GET' == ctx.method || 'DELETE' == ctx.method) {
                    ctx.headerString = "JWS " + ctx.jwt;
                } else {
                    ctx.payload = ctx.jwt;
                }
                resolve(ctx);
            } catch (error) {
                reject(error);
            }
        });
    };

    abstract buildJWTHeader(ctx: any): any;

    private send(ctx: any): Promise<any> {
        return new Promise((resolve, reject) => {

            let req = <any>{
                uri: ctx.url,
                method: ctx.method,
                headers: <any>{}
            };
            if ('GET' == req.method || 'DELETE' == req.method) {
                req.headers.Authorization = ctx.headerString;
            } else {
                req.body = ctx.jwt;
            }
            if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
                req.proxy = this.conf.httpProxy;
            }
            request(req, function (error: any, response: request.RequestResponse, body: any) {
                if (error) {
                    reject(error);
                } else if (200 == response.statusCode) {
                    resolve(JSON.parse(body));
                } else {
                    reject(body);
                }
            });
        });
    };

    protected buildAndSendRequest(ctx: any): Promise<any> {
        return new Promise((resolve, reject) => {
            this.buildRequestHeader(ctx)
                .then(ctx => this.signHeader(ctx))
                .then(ctx => this.buildHeaderString(ctx))
                .then(ctx => this.send(ctx))
                .then(resp => {
                    resolve(resp);
                }).catch(err => {
                    reject(err);
                });
        });
    };

}


