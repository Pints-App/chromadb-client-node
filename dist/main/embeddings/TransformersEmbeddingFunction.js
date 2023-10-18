"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformersEmbeddingFunction = void 0;
const utils_1 = require("../utils");
// Dynamically import module
let TransformersApi;
class TransformersEmbeddingFunction {
    /**
     * TransformersEmbeddingFunction constructor.
     * @param options The configuration options.
     * @param options.model The model to use to calculate embeddings. Defaults to 'Xenova/all-MiniLM-L6-v2', which is an ONNX port of `sentence-transformers/all-MiniLM-L6-v2`.
     * @param options.revision The specific model version to use (can be a branch, tag name, or commit id). Defaults to 'main'.
     * @param options.quantized Whether to load the 8-bit quantized version of the model. Defaults to `false`.
     * @param options.progress_callback If specified, this function will be called during model construction, to provide the user with progress updates.
     */
    constructor({ model = "Xenova/all-MiniLM-L6-v2", revision = "main", quantized = false, progress_callback = null, } = {}) {
        try {
            // Use dynamic import to support browser environments because we do not have a bundler that handles browser support.
            // The util importOptionalModule is used to prevent issues when bundlers try to locate the dependency even when it's optional.
            TransformersApi = (0, utils_1.importOptionalModule)("@xenova/transformers");
        }
        catch (e) {
            throw new Error("Please install the @xenova/transformers package to use the TransformersEmbeddingFunction, `npm install -S @xenova/transformers`.");
        }
        // Store a promise that resolves to the pipeline
        this.pipelinePromise = new Promise(async (resolve, reject) => {
            try {
                const { pipeline } = await TransformersApi;
                resolve(await pipeline("feature-extraction", model, {
                    quantized,
                    revision,
                    progress_callback,
                }));
            }
            catch (e) {
                reject(e);
            }
        });
    }
    async generate(texts) {
        let pipe = await this.pipelinePromise;
        let output = await pipe(texts, { pooling: "mean", normalize: true });
        return output.tolist();
    }
}
exports.TransformersEmbeddingFunction = TransformersEmbeddingFunction;
//# sourceMappingURL=TransformersEmbeddingFunction.js.map