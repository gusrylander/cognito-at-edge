import { CloudFrontRequestEvent, CloudFrontRequestResult } from 'aws-lambda';
interface AuthenticatorParams {
    region: string;
    userPoolId: string;
    userPoolAppId: string;
    userPoolAppSecret?: string;
    userPoolDomain: string;
    cookieExpirationDays?: number;
    disableCookieDomain?: boolean;
    logLevel?: 'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent';
}
export declare class Authenticator {
    _region: string;
    _userPoolId: string;
    _userPoolAppId: string;
    _userPoolAppSecret: string;
    _userPoolDomain: string;
    _cookieExpirationDays: number;
    _disableCookieDomain: boolean;
    _cookieBase: string;
    _logger: any;
    _jwtVerifier: any;
    constructor(params: AuthenticatorParams);
    /**
     * Verify that constructor parameters are corrects.
     * @param  {object} params constructor params
     * @return {void} throw an exception if params are incorects.
     */
    _verifyParams(params: any): void;
    /**
     * Exchange authorization code for tokens.
     * @param  {String} redirectURI Redirection URI.
     * @param  {String} code        Authorization code.
     * @return {Promise} Authenticated user tokens.
     */
    _fetchTokensFromCode(redirectURI: any, code: any): Promise<any>;
    /**
     * Create a Lambda@Edge redirection response to set the tokens on the user's browser cookies.
     * @param  {Object} tokens   Cognito User Pool tokens.
     * @param  {String} domain   Website domain.
     * @param  {String} location Path to redirection.
     * @return {Object} Lambda@Edge response.
     */
    _getRedirectResponse(tokens: any, domain: any, location: any): Promise<{
        status: string;
        headers: {
            location: {
                key: string;
                value: any;
            }[];
            'cache-control': {
                key: string;
                value: string;
            }[];
            pragma: {
                key: string;
                value: string;
            }[];
            'set-cookie': {
                key: string;
                value: string;
            }[];
        };
    }>;
    /**
     * Extract value of the authentication token from the request cookies.
     * @param  {Array}  cookies Request cookies.
     * @return {String} Extracted access token. Throw if not found.
     */
    _getIdTokenFromCookie(cookies: any): any;
    /**
     * Handle Lambda@Edge event:
     *   * if authentication cookie is present and valid: forward the request
     *   * if ?code=<grant code> is present: set cookies with new tokens
     *   * else redirect to the Cognito UserPool to authenticate the user
     * @param  {Object}  event Lambda@Edge event.
     * @return {Promise} CloudFront response.
     */
    handle(event: CloudFrontRequestEvent): Promise<CloudFrontRequestResult>;
}
export {};
