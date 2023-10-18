/**
 * FastAPI
 *
 *
 * OpenAPI spec version: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator+.
 * https://github.com/karlvr/openapi-generator-plus
 * Do not edit the class manually.
 */
export declare namespace Api {
    interface Add201Response {
    }
    interface AddEmbedding {
        embeddings?: Api.AddEmbedding.Embedding[];
        metadatas?: Api.AddEmbedding.Metadata[];
        documents?: string[];
        ids: string[];
    }
    /**
     * @export
     * @namespace AddEmbedding
     */
    namespace AddEmbedding {
        interface Embedding {
        }
        interface Metadata {
        }
    }
    interface ADelete200Response {
    }
    interface AGet200Response {
    }
    interface Count200Response {
    }
    interface CreateCollection {
        name: string;
        metadata?: Api.CreateCollection.Metadata;
        'get_or_create'?: boolean;
    }
    /**
     * @export
     * @namespace CreateCollection
     */
    namespace CreateCollection {
        interface Metadata {
        }
    }
    interface CreateCollection200Response {
    }
    interface DeleteCollection200Response {
    }
    interface DeleteEmbedding {
        ids?: string[];
        where?: Api.DeleteEmbedding.Where;
        'where_document'?: Api.DeleteEmbedding.WhereDocument;
    }
    /**
     * @export
     * @namespace DeleteEmbedding
     */
    namespace DeleteEmbedding {
        interface Where {
        }
        interface WhereDocument {
        }
    }
    interface GetCollection200Response {
    }
    interface GetEmbedding {
        ids?: string[];
        where?: Api.GetEmbedding.Where;
        'where_document'?: Api.GetEmbedding.WhereDocument;
        sort?: string;
        /**
         * @type {number}
         * @memberof GetEmbedding
         */
        limit?: number;
        /**
         * @type {number}
         * @memberof GetEmbedding
         */
        offset?: number;
        include?: (Api.GetEmbedding.Include.EnumValueEnum | Api.GetEmbedding.Include.EnumValueEnum2 | Api.GetEmbedding.Include.EnumValueEnum3 | Api.GetEmbedding.Include.EnumValueEnum4)[];
    }
    /**
     * @export
     * @namespace GetEmbedding
     */
    namespace GetEmbedding {
        interface Where {
        }
        interface WhereDocument {
        }
        type Include = Api.GetEmbedding.Include.EnumValueEnum | Api.GetEmbedding.Include.EnumValueEnum2 | Api.GetEmbedding.Include.EnumValueEnum3 | Api.GetEmbedding.Include.EnumValueEnum4;
        /**
         * @export
         * @namespace Include
         */
        namespace Include {
            enum EnumValueEnum {
                Documents = "documents"
            }
            enum EnumValueEnum2 {
                Embeddings = "embeddings"
            }
            enum EnumValueEnum3 {
                Metadatas = "metadatas"
            }
            enum EnumValueEnum4 {
                Distances = "distances"
            }
        }
    }
    interface GetNearestNeighbors200Response {
    }
    interface HTTPValidationError {
        detail?: Api.ValidationError[];
    }
    interface ListCollections200Response {
    }
    interface QueryEmbedding {
        where?: Api.QueryEmbedding.Where;
        'where_document'?: Api.QueryEmbedding.WhereDocument;
        'query_embeddings': Api.QueryEmbedding.QueryEmbedding2[];
        /**
         * @type {number}
         * @memberof QueryEmbedding
         */
        'n_results'?: number;
        include?: (Api.QueryEmbedding.Include.EnumValueEnum | Api.QueryEmbedding.Include.EnumValueEnum2 | Api.QueryEmbedding.Include.EnumValueEnum3 | Api.QueryEmbedding.Include.EnumValueEnum4)[];
    }
    /**
     * @export
     * @namespace QueryEmbedding
     */
    namespace QueryEmbedding {
        interface Where {
        }
        interface WhereDocument {
        }
        interface QueryEmbedding2 {
        }
        type Include = Api.QueryEmbedding.Include.EnumValueEnum | Api.QueryEmbedding.Include.EnumValueEnum2 | Api.QueryEmbedding.Include.EnumValueEnum3 | Api.QueryEmbedding.Include.EnumValueEnum4;
        /**
         * @export
         * @namespace Include
         */
        namespace Include {
            enum EnumValueEnum {
                Documents = "documents"
            }
            enum EnumValueEnum2 {
                Embeddings = "embeddings"
            }
            enum EnumValueEnum3 {
                Metadatas = "metadatas"
            }
            enum EnumValueEnum4 {
                Distances = "distances"
            }
        }
    }
    interface Update200Response {
    }
    interface UpdateCollection {
        'new_name'?: string;
        'new_metadata'?: Api.UpdateCollection.NewMetadata;
    }
    /**
     * @export
     * @namespace UpdateCollection
     */
    namespace UpdateCollection {
        interface NewMetadata {
        }
    }
    interface UpdateCollection200Response {
    }
    interface UpdateEmbedding {
        embeddings?: Api.UpdateEmbedding.Embedding[];
        metadatas?: Api.UpdateEmbedding.Metadata[];
        documents?: string[];
        ids: string[];
    }
    /**
     * @export
     * @namespace UpdateEmbedding
     */
    namespace UpdateEmbedding {
        interface Embedding {
        }
        interface Metadata {
        }
    }
    interface Upsert200Response {
    }
    interface ValidationError {
        loc: (string | number)[];
        msg: string;
        'type': string;
    }
}
//# sourceMappingURL=models.d.ts.map