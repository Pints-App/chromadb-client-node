"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIEmbeddingFunction = void 0;
let OpenAIApi;
let openAiVersion = null;
let openAiMajorVersion = null;
class OpenAIAPIv3 {
    constructor(configuration) {
        this.configuration = new OpenAIApi.Configuration({
            organization: configuration.organization,
            apiKey: configuration.apiKey,
        });
        this.openai = new OpenAIApi.OpenAIApi(this.configuration);
    }
    async createEmbedding(params) {
        const embeddings = [];
        const response = await this.openai.createEmbedding({
            model: params.model,
            input: params.input,
        }).catch((error) => {
            throw error;
        });
        // @ts-ignore
        const data = response.data["data"];
        for (let i = 0; i < data.length; i += 1) {
            embeddings.push(data[i]["embedding"]);
        }
        return embeddings;
    }
}
class OpenAIAPIv4 {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.openai = new OpenAIApi({
            apiKey: this.apiKey,
        });
    }
    async createEmbedding(params) {
        const embeddings = [];
        const response = await this.openai.embeddings.create(params);
        const data = response["data"];
        for (let i = 0; i < data.length; i += 1) {
            embeddings.push(data[i]["embedding"]);
        }
        return embeddings;
    }
}
class OpenAIEmbeddingFunction {
    constructor({ openai_api_key, openai_model, openai_organization_id }) {
        try {
            // eslint-disable-next-line global-require,import/no-extraneous-dependencies
            OpenAIApi = require("openai");
            let version = null;
            try {
                const { VERSION } = require('openai/version');
                version = VERSION;
            }
            catch (e) {
                version = "3.x";
            }
            openAiVersion = version.replace(/[^0-9.]/g, '');
            openAiMajorVersion = openAiVersion.split('.')[0];
        }
        catch (_a) {
            // @ts-ignore
            if (_a.code === 'MODULE_NOT_FOUND') {
                throw new Error("Please install the openai package to use the OpenAIEmbeddingFunction, `npm install -S openai`");
            }
            throw _a; // Re-throw other errors
        }
        this.api_key = openai_api_key;
        this.org_id = openai_organization_id || "";
        this.model = openai_model || "text-embedding-ada-002";
        if (openAiMajorVersion > 3) {
            this.openaiApi = new OpenAIAPIv4(this.api_key);
        }
        else {
            this.openaiApi = new OpenAIAPIv3({
                organization: this.org_id,
                apiKey: this.api_key,
            });
        }
    }
    async generate(texts) {
        return await this.openaiApi.createEmbedding({
            model: this.model,
            input: texts,
        }).catch((error) => {
            throw error;
        });
    }
}
exports.OpenAIEmbeddingFunction = OpenAIEmbeddingFunction;
//# sourceMappingURL=OpenAIEmbeddingFunction.js.map