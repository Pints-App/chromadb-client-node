"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsomorphicFetchClientAuthProtocolAdapter = exports.TokenClientAuthProvider = exports.TokenCredentialsProvider = exports.BasicAuthCredentialsProvider = void 0;
var AuthInfoType;
(function (AuthInfoType) {
    AuthInfoType["COOKIE"] = "cookie";
    AuthInfoType["HEADER"] = "header";
    AuthInfoType["URL"] = "url";
    AuthInfoType["METADATA"] = "metadata";
})(AuthInfoType || (AuthInfoType = {}));
class SecretStr {
    constructor(secret) {
        this.secret = secret;
    }
    getSecret() {
        return this.secret;
    }
}
const base64Encode = (str) => {
    return Buffer.from(str).toString('base64');
};
class BasicAuthCredentials {
    constructor(_creds) {
        this.credentials = new SecretStr(base64Encode(_creds));
    }
    getCredentials() {
        //encode base64
        return this.credentials;
    }
}
class BasicAuthClientAuthResponse {
    constructor(credentials) {
        this.credentials = credentials;
    }
    getAuthInfo() {
        return { key: "Authorization", value: "Basic " + this.credentials.getCredentials().getSecret() };
    }
    getAuthInfoType() {
        return AuthInfoType.HEADER;
    }
}
class BasicAuthCredentialsProvider {
    /**
     * Creates a new BasicAuthCredentialsProvider. This provider loads credentials from provided text credentials or from the environment variable CHROMA_CLIENT_AUTH_CREDENTIALS.
     * @param _creds - The credentials
     * @throws {Error} If neither credentials provider or text credentials are supplied.
     */
    constructor(_creds) {
        if (_creds === undefined && !process.env.CHROMA_CLIENT_AUTH_CREDENTIALS)
            throw new Error("Credentials must be supplied via environment variable (CHROMA_CLIENT_AUTH_CREDENTIALS) or passed in as configuration.");
        this.credentials = new BasicAuthCredentials((_creds !== null && _creds !== void 0 ? _creds : process.env.CHROMA_CLIENT_AUTH_CREDENTIALS));
    }
    getCredentials() {
        return this.credentials;
    }
}
exports.BasicAuthCredentialsProvider = BasicAuthCredentialsProvider;
class BasicAuthClientAuthProvider {
    /**
     * Creates a new BasicAuthClientAuthProvider.
     * @param options - The options for the authentication provider.
     * @param options.textCredentials - The credentials for the authentication provider.
     * @param options.credentialsProvider - The credentials provider for the authentication provider.
     * @throws {Error} If neither credentials provider or text credentials are supplied.
     */
    constructor(options) {
        if (!options.credentialsProvider && !options.textCredentials) {
            throw new Error("Either credentials provider or text credentials must be supplied.");
        }
        this.credentialsProvider = options.credentialsProvider || new BasicAuthCredentialsProvider(options.textCredentials);
    }
    authenticate() {
        return new BasicAuthClientAuthResponse(this.credentialsProvider.getCredentials());
    }
}
class TokenAuthCredentials {
    constructor(_creds) {
        this.credentials = new SecretStr(_creds);
    }
    getCredentials() {
        return this.credentials;
    }
}
class TokenCredentialsProvider {
    constructor(_creds) {
        if (_creds === undefined && !process.env.CHROMA_CLIENT_AUTH_CREDENTIALS)
            throw new Error("Credentials must be supplied via environment variable (CHROMA_CLIENT_AUTH_CREDENTIALS) or passed in as configuration.");
        this.credentials = new TokenAuthCredentials((_creds !== null && _creds !== void 0 ? _creds : process.env.CHROMA_CLIENT_AUTH_CREDENTIALS));
    }
    getCredentials() {
        return this.credentials;
    }
}
exports.TokenCredentialsProvider = TokenCredentialsProvider;
class TokenClientAuthProvider {
    constructor(options) {
        if (!options.credentialsProvider && !options.textCredentials) {
            throw new Error("Either credentials provider or text credentials must be supplied.");
        }
        if (options.providerOptions === undefined || !options.providerOptions.hasOwnProperty("headerType")) {
            this.providerOptions = { headerType: "AUTHORIZATION" };
        }
        else {
            this.providerOptions = { headerType: options.providerOptions.headerType };
        }
        this.credentialsProvider = options.credentialsProvider || new TokenCredentialsProvider(options.textCredentials);
    }
    authenticate() {
        return new TokenClientAuthResponse(this.credentialsProvider.getCredentials(), this.providerOptions.headerType);
    }
}
exports.TokenClientAuthProvider = TokenClientAuthProvider;
const TokenHeader = {
    AUTHORIZATION: (value) => ({ key: "Authorization", value: `Bearer ${value}` }),
    X_CHROMA_TOKEN: (value) => ({ key: "X-Chroma-Token", value: value })
};
class TokenClientAuthResponse {
    constructor(credentials, headerType = 'AUTHORIZATION') {
        this.credentials = credentials;
        this.headerType = headerType;
    }
    getAuthInfo() {
        if (this.headerType === 'AUTHORIZATION') {
            return TokenHeader.AUTHORIZATION(this.credentials.getCredentials().getSecret());
        }
        else if (this.headerType === 'X_CHROMA_TOKEN') {
            return TokenHeader.X_CHROMA_TOKEN(this.credentials.getCredentials().getSecret());
        }
        else {
            throw new Error("Invalid header type: " + this.headerType + ". Valid types are: " + Object.keys(TokenHeader).join(", "));
        }
    }
    getAuthInfoType() {
        return AuthInfoType.HEADER;
    }
}
class IsomorphicFetchClientAuthProtocolAdapter {
    /**
     * Creates a new adapter of IsomorphicFetchClientAuthProtocolAdapter.
     * @param api - The API to wrap.
     * @param authConfiguration - The configuration for the authentication provider.
     */
    constructor(api, authConfiguration) {
        this.api = api;
        switch (authConfiguration.provider) {
            case "basic":
                this.authProvider = new BasicAuthClientAuthProvider({
                    textCredentials: authConfiguration.credentials,
                    credentialsProvider: authConfiguration.credentialsProvider
                });
                break;
            case "token":
                this.authProvider = new TokenClientAuthProvider({
                    textCredentials: authConfiguration.credentials,
                    credentialsProvider: authConfiguration.credentialsProvider,
                    providerOptions: authConfiguration.providerOptions
                });
                break;
            default:
                this.authProvider = undefined;
                break;
        }
        if (this.authProvider !== undefined) {
            this.wrapperApi = this.wrapMethods(this.api);
        }
    }
    getApi() {
        var _a;
        return (_a = this.wrapperApi) !== null && _a !== void 0 ? _a : this.api;
    }
    getAllMethods(obj) {
        let methods = [];
        let currentObj = obj;
        do {
            const objMethods = Object.getOwnPropertyNames(currentObj)
                .filter(name => typeof currentObj[name] === 'function' && name !== 'constructor');
            methods = methods.concat(objMethods);
            currentObj = Object.getPrototypeOf(currentObj);
        } while (currentObj);
        return methods;
    }
    wrapMethods(obj) {
        let self = this;
        const methodNames = Object.getOwnPropertyNames(Object.getPrototypeOf(obj))
            .filter(name => typeof obj[name] === 'function' && name !== 'constructor');
        return new Proxy(obj, {
            get(target, prop) {
                if (methodNames.includes(prop)) {
                    return new Proxy(target[prop], {
                        apply(fn, thisArg, args) {
                            const modifiedArgs = args.map(arg => {
                                if (arg && typeof arg === 'object' && 'method' in arg) {
                                    return self.injectCredentials(arg);
                                }
                                return arg;
                            });
                            if (Object.keys(modifiedArgs[modifiedArgs.length - 1]).length === 0) {
                                modifiedArgs[modifiedArgs.length - 1] = self.injectCredentials({});
                            }
                            else {
                                modifiedArgs[modifiedArgs.length - 1] = self.injectCredentials(modifiedArgs[modifiedArgs.length - 1]);
                            }
                            return fn.apply(thisArg, modifiedArgs);
                        }
                    });
                }
                return target[prop];
            }
        });
    }
    injectCredentials(injectionContext) {
        var _a;
        const authInfo = (_a = this.authProvider) === null || _a === void 0 ? void 0 : _a.authenticate().getAuthInfo();
        if (authInfo) {
            const { key, value } = authInfo;
            injectionContext = Object.assign(Object.assign({}, injectionContext), { headers: {
                    [key]: value
                } });
        }
        return injectionContext;
    }
}
exports.IsomorphicFetchClientAuthProtocolAdapter = IsomorphicFetchClientAuthProtocolAdapter;
//# sourceMappingURL=auth.js.map