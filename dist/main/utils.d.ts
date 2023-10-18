import { Api } from "./generated";
import Count200Response = Api.Count200Response;
export declare function toArray<T>(obj: T | Array<T>): Array<T>;
export declare function toArrayOfArrays<T>(obj: Array<Array<T>> | Array<T>): Array<Array<T>>;
export declare function repack(value: unknown): any;
export declare function handleError(error: unknown): Promise<{
    error: any;
}>;
export declare function handleSuccess(response: Response | string | Count200Response): Promise<any>;
/**
 * Dynamically imports a specified module, providing a workaround for browser environments.
 * This function is necessary because we dynamically import optional dependencies
 * which can cause issues with bundlers that detect the import and throw an error
 * on build time when the dependency is not installed.
 * Using this workaround, the dynamic import is only evaluated on runtime
 * where we work with try-catch when importing optional dependencies.
 *
 * @param {string} moduleName - Specifies the module to import.
 * @returns {Promise<any>} Returns a Promise that resolves to the imported module.
 */
export declare function importOptionalModule(moduleName: string): Promise<any>;
//# sourceMappingURL=utils.d.ts.map