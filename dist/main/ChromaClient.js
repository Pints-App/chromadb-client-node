"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChromaClient = void 0;
const generated_1 = require("./generated");
const utils_1 = require("./utils");
const Collection_1 = require("./Collection");
const auth_1 = require("./auth");
class ChromaClient {
    /**
     * Creates a new ChromaClient instance.
     * @param {Object} params - The parameters for creating a new client
     * @param {string} [params.path] - The base path for the Chroma API.
     * @returns {ChromaClient} A new ChromaClient instance.
     *
     * @example
     * ```typescript
     * const client = new ChromaClient({
     *   path: "http://localhost:8000"
     * });
     * ```
     */
    constructor({ path, fetchOptions, auth, } = {}) {
        if (path === undefined)
            path = "http://localhost:8000";
        const apiConfig = new generated_1.Configuration({
            basePath: path,
        });
        if (auth !== undefined) {
            this.apiAdapter = new auth_1.IsomorphicFetchClientAuthProtocolAdapter(new generated_1.ApiApi(apiConfig), auth);
            this.api = this.apiAdapter.getApi();
        }
        else {
            this.api = new generated_1.ApiApi(apiConfig);
        }
        this.api.options = fetchOptions !== null && fetchOptions !== void 0 ? fetchOptions : {};
    }
    /**
     * Resets the state of the object by making an API call to the reset endpoint.
     *
     * @returns {Promise<boolean>} A promise that resolves when the reset operation is complete.
     * @throws {Error} If there is an issue resetting the state.
     *
     * @example
     * ```typescript
     * await client.reset();
     * ```
     */
    async reset() {
        return await this.api.reset(this.api.options);
    }
    /**
     * Returns the version of the Chroma API.
     * @returns {Promise<string>} A promise that resolves to the version of the Chroma API.
     *
     * @example
     * ```typescript
     * const version = await client.version();
     * ```
     */
    async version() {
        const response = await this.api.version(this.api.options);
        return await (0, utils_1.handleSuccess)(response);
    }
    /**
     * Returns a heartbeat from the Chroma API.
     * @returns {Promise<number>} A promise that resolves to the heartbeat from the Chroma API.
     *
     * @example
     * ```typescript
     * const heartbeat = await client.heartbeat();
     * ```
     */
    async heartbeat() {
        const response = await this.api.heartbeat(this.api.options);
        let ret = await (0, utils_1.handleSuccess)(response);
        return ret["nanosecond heartbeat"];
    }
    /**
     * Creates a new collection with the specified properties.
     *
     * @param {Object} params - The parameters for creating a new collection.
     * @param {string} params.name - The name of the collection.
     * @param {CollectionMetadata} [params.metadata] - Optional metadata associated with the collection.
     * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
     *
     * @returns {Promise<Collection>} A promise that resolves to the created collection.
     * @throws {Error} If there is an issue creating the collection.
     *
     * @example
     * ```typescript
     * const collection = await client.createCollection({
     *   name: "my_collection",
     *   metadata: {
     *     "description": "My first collection"
     *   }
     * });
     * ```
     */
    async createCollection({ name, metadata, embeddingFunction }) {
        const newCollection = await this.api
            .createCollection({
            name,
            metadata,
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (newCollection.error) {
            throw new Error(newCollection.error);
        }
        return new Collection_1.Collection(name, newCollection.id, this.api, metadata, embeddingFunction);
    }
    /**
     * Gets or creates a collection with the specified properties.
     *
     * @param {Object} params - The parameters for creating a new collection.
     * @param {string} params.name - The name of the collection.
     * @param {CollectionMetadata} [params.metadata] - Optional metadata associated with the collection.
     * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
     *
     * @returns {Promise<Collection>} A promise that resolves to the got or created collection.
     * @throws {Error} If there is an issue getting or creating the collection.
     *
     * @example
     * ```typescript
     * const collection = await client.getOrCreateCollection({
     *   name: "my_collection",
     *   metadata: {
     *     "description": "My first collection"
     *   }
     * });
     * ```
     */
    async getOrCreateCollection({ name, metadata, embeddingFunction }) {
        const newCollection = await this.api
            .createCollection({
            name,
            metadata,
            'get_or_create': true
        }, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (newCollection.error) {
            throw new Error(newCollection.error);
        }
        return new Collection_1.Collection(name, newCollection.id, this.api, newCollection.metadata, embeddingFunction);
    }
    /**
     * Lists all collections.
     *
     * @returns {Promise<CollectionType[]>} A promise that resolves to a list of collection names.
     * @throws {Error} If there is an issue listing the collections.
     *
     * @example
     * ```typescript
     * const collections = await client.listCollections();
     * ```
     */
    async listCollections() {
        const response = await this.api.listCollections(this.api.options);
        return (0, utils_1.handleSuccess)(response);
    }
    /**
     * Gets a collection with the specified name.
     * @param {Object} params - The parameters for getting a collection.
     * @param {string} params.name - The name of the collection.
     * @param {IEmbeddingFunction} [params.embeddingFunction] - Optional custom embedding function for the collection.
     * @returns {Promise<Collection>} A promise that resolves to the collection.
     * @throws {Error} If there is an issue getting the collection.
     *
     * @example
     * ```typescript
     * const collection = await client.getCollection({
     *   name: "my_collection"
     * });
     * ```
     */
    async getCollection({ name, embeddingFunction }) {
        const response = await this.api
            .getCollection(name, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
        if (response.error) {
            throw new Error(response.error);
        }
        return new Collection_1.Collection(response.name, response.id, this.api, response.metadata, embeddingFunction);
    }
    /**
     * Deletes a collection with the specified name.
     * @param {Object} params - The parameters for deleting a collection.
     * @param {string} params.name - The name of the collection.
     * @returns {Promise<void>} A promise that resolves when the collection is deleted.
     * @throws {Error} If there is an issue deleting the collection.
     *
     * @example
     * ```typescript
     * await client.deleteCollection({
     *  name: "my_collection"
     * });
     * ```
     */
    async deleteCollection({ name }) {
        return await this.api
            .deleteCollection(name, this.api.options)
            .then(utils_1.handleSuccess)
            .catch(utils_1.handleError);
    }
}
exports.ChromaClient = ChromaClient;
//# sourceMappingURL=ChromaClient.js.map