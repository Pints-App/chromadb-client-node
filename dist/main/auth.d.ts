import { ApiApi as DefaultApi } from "./generated";
export interface ClientAuthProvider {
    /**
     * Abstract method for authenticating a client.
     */
    authenticate(): ClientAuthResponse;
}
export interface ClientAuthConfigurationProvider<T> {
    /**
     * Abstract method for getting the configuration for the client.
     */
    getConfig(): T;
}
export interface ClientAuthCredentialsProvider<T> {
    /**
     * Abstract method for getting the credentials for the client.
     * @param user
     */
    getCredentials(user?: string): T;
}
declare enum AuthInfoType {
    COOKIE = "cookie",
    HEADER = "header",
    URL = "url",
    METADATA = "metadata"
}
export interface ClientAuthResponse {
    getAuthInfoType(): AuthInfoType;
    getAuthInfo(): {
        key: string;
        value: string;
    };
}
export interface AbstractCredentials<T> {
    getCredentials(): T;
}
export interface ClientAuthProtocolAdapter<T> {
    injectCredentials(injectionContext: T): T;
    getApi(): any;
}
declare class SecretStr {
    private readonly secret;
    constructor(secret: string);
    getSecret(): string;
}
declare class BasicAuthCredentials implements AbstractCredentials<SecretStr> {
    private readonly credentials;
    constructor(_creds: string);
    getCredentials(): SecretStr;
}
export declare class BasicAuthCredentialsProvider implements ClientAuthCredentialsProvider<BasicAuthCredentials> {
    private readonly credentials;
    /**
     * Creates a new BasicAuthCredentialsProvider. This provider loads credentials from provided text credentials or from the environment variable CHROMA_CLIENT_AUTH_CREDENTIALS.
     * @param _creds - The credentials
     * @throws {Error} If neither credentials provider or text credentials are supplied.
     */
    constructor(_creds: string | undefined);
    getCredentials(): BasicAuthCredentials;
}
declare class TokenAuthCredentials implements AbstractCredentials<SecretStr> {
    private readonly credentials;
    constructor(_creds: string);
    getCredentials(): SecretStr;
}
export declare class TokenCredentialsProvider implements ClientAuthCredentialsProvider<TokenAuthCredentials> {
    private readonly credentials;
    constructor(_creds: string | undefined);
    getCredentials(): TokenAuthCredentials;
}
export declare class TokenClientAuthProvider implements ClientAuthProvider {
    private readonly credentialsProvider;
    private readonly providerOptions;
    constructor(options: {
        textCredentials: any;
        credentialsProvider: ClientAuthCredentialsProvider<any> | undefined;
        providerOptions?: {
            headerType: TokenHeaderType;
        };
    });
    authenticate(): ClientAuthResponse;
}
type TokenHeaderType = 'AUTHORIZATION' | 'X_CHROMA_TOKEN';
export declare class IsomorphicFetchClientAuthProtocolAdapter implements ClientAuthProtocolAdapter<RequestInit> {
    private api;
    authProvider: ClientAuthProvider | undefined;
    wrapperApi: DefaultApi | undefined;
    /**
     * Creates a new adapter of IsomorphicFetchClientAuthProtocolAdapter.
     * @param api - The API to wrap.
     * @param authConfiguration - The configuration for the authentication provider.
     */
    constructor(api: DefaultApi, authConfiguration: AuthOptions);
    getApi(): DefaultApi;
    getAllMethods(obj: any): string[];
    wrapMethods(obj: any): any;
    injectCredentials(injectionContext: RequestInit): RequestInit;
}
export type AuthOptions = {
    provider: ClientAuthProvider | string | undefined;
    credentialsProvider?: ClientAuthCredentialsProvider<any> | undefined;
    configProvider?: ClientAuthConfigurationProvider<any> | undefined;
    credentials?: any | undefined;
    providerOptions?: any | undefined;
};
export {};
//# sourceMappingURL=auth.d.ts.map