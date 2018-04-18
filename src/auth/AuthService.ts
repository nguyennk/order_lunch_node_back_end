import * as express from 'express';
// import * as request from 'request';
import { Service } from 'typedi';
import * as jwt from 'jsonwebtoken';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { env } from '../env';
import { TokenInfoInterface } from './TokenInfoInterface';

@Service()
export class AuthService {

    // private httpRequest: typeof request;

    constructor(
        // @Require('request') r: any,
        @Logger(__filename) private log: LoggerInterface
    ) {
        // this.httpRequest = r;
    }

    public parseTokenFromRequest(req: express.Request): object | undefined {
        const authorization = req.header('authorization');
        const token_available = authorization && authorization.split(' ')[0] === 'Bearer';
        if (!token_available) {
            this.log.info('No Token provided by the client');
            return undefined;
        }
        const token = authorization.split(' ')[1];
        try {
            const decoded_token = jwt.verify(token, env.auth.token);
            this.log.info('Token provided by the client');
            return decoded_token as object;
        } catch {
            this.log.info('Invalid Token provided by the client');
            return undefined;
        }
    }

    public getTokenInfo(token: any): Promise<TokenInfoInterface> {
        return new Promise((resolve, reject) => {
            return resolve(token.data);

            // this.httpRequest({
            //     method: 'POST',
            //     url: env.auth.route,
            //     form: {
            //         id_token: token,
            //     },
            // }, (error: any, response: request.RequestResponse, body: any) => {
            //     // Verify if the requests was successful and append user
            //     // information to our extended express request object
            //     if (!error) {
            //         if (response.statusCode === 200) {
            //             const tokeninfo = JSON.parse(body);
            //             return resolve(tokeninfo);
            //         }
            //         return reject(body);
            //     }
            //     return reject(error);
            // });
        });
    }

}
