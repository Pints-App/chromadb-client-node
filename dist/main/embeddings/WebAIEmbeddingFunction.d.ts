import { IEmbeddingFunction } from "./IEmbeddingFunction";
/**
 * WebAIEmbeddingFunction is a function that uses the Web AI package to generate embeddings.
 * @remarks
 * This embedding function can be used in both NodeJS and browser environments.
 * Browser version of Web AI (@visheratin/web-ai) is an ESM module.
 * NodeJS version of Web AI (@visheratin/web-ai-node) is a CommonJS module.
 */
export declare class WebAIEmbeddingFunction implements IEmbeddingFunction {
    private model;
    private proxy?;
    private initPromise;
    private modality;
    /**
     * WebAIEmbeddingFunction constructor.
     * @param modality - the modality of the embedding function, either "text", "image", or "multimodal".
     * @param node - whether the embedding function is being used in a NodeJS environment.
     * @param proxy - whether to use web worker to avoid blocking the main thread. Works only in browser.
     * @param wasmPath - the path/URL to the directory with ONNX runtime WebAssembly files.
     * @param modelID - the ID of the model to use, if not specified, the default model will be used.
     */
    constructor(modality: "text" | "image" | "multimodal", node: boolean, proxy?: boolean, wasmPath?: string, modelID?: string);
    /**
     * Generates embeddings for the given values.
     * @param values - the values to generate embeddings for. For text models, this is an array of strings.
     *  For image models, this is an array of URLs to images. URLs can be data URLs.
     * @returns the embeddings.
     */
    generate(values: string[]): Promise<number[][]>;
    private initNode;
    private initBrowser;
}
//# sourceMappingURL=WebAIEmbeddingFunction.d.ts.map