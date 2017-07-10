"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request");
const jwt = require("jsonwebtoken");
class JWTRequest {
    constructor(conf) {
        this.getNonce = function () {
            var hrtime = process.hrtime();
            return "" + (hrtime[0] * 1e9 + hrtime[1]);
        };
        this.conf = Object.assign({ algorithm: "HS256", publicKey: "", privateKey: "" }, conf);
        this.conf.privateKeyDecoded = new Buffer(this.conf.privateKey, "base64");
        if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
            console.log("using proxy", this.conf.httpProxy);
        }
    }
    getTimestamp() {
        return "" + Math.floor((new Date()).getTime());
    }
    buildRequestHeader(ctx) {
        return new Promise((resolve, reject) => {
            try {
                ctx.jwthdr = this.buildJWTHeader(ctx);
                resolve(ctx);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    signHeader(ctx) {
        return new Promise((resolve, reject) => {
            try {
                ctx.jwt = jwt.sign(ctx.payload, this.conf.privateKeyDecoded, {
                    algorithm: this.conf.algorithm,
                    header: ctx.jwthdr,
                    noTimestamp: true
                });
                resolve(ctx);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    buildHeaderString(ctx) {
        return new Promise((resolve, reject) => {
            try {
                if ("GET" == ctx.method || "DELETE" == ctx.method) {
                    ctx.headerString = "JWS " + ctx.jwt;
                }
                else {
                    ctx.payload = ctx.jwt;
                }
                resolve(ctx);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    ;
    send(ctx) {
        return new Promise((resolve, reject) => {
            let req = {
                uri: ctx.url,
                method: ctx.method,
                headers: {}
            };
            if ("GET" == req.method || "DELETE" == req.method) {
                req.headers.Authorization = ctx.headerString;
            }
            else {
                req.body = ctx.jwt;
            }
            if (this.conf.httpProxy && "" !== this.conf.httpProxy) {
                req.proxy = this.conf.httpProxy;
            }
            request(req, function (error, response, body) {
                if (error) {
                    reject(error);
                }
                else if (200 == response.statusCode) {
                    resolve(JSON.parse(body));
                }
                else {
                    reject(body ? JSON.parse(body) : body);
                }
            });
        });
    }
    ;
    buildAndSendRequest(ctx) {
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
    }
    ;
}
exports.JWTRequest = JWTRequest;
//# sourceMappingURL=jwtrequest.js.map