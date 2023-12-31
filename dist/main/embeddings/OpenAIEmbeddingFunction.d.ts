import { IEmbeddingFunction } from "./IEmbeddingFunction";
export declare class OpenAIEmbeddingFunction implements IEmbeddingFunction {
    private api_key;
    private org_id;
    private model;
    private openaiApi;
    constructor({ openai_api_key, openai_model, openai_organization_id }: {
        openai_api_key: string;
        openai_model?: string;
        openai_organization_id?: string;
    });
    generate(texts: string[]): Promise<number[][]>;
}
//# sourceMappingURL=OpenAIEmbeddingFunction.d.ts.map