"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importOptionalModule = exports.handleSuccess = exports.handleError = exports.repack = exports.toArrayOfArrays = exports.toArray = void 0;
// a function to convert a non-Array object to an Array
function toArray(obj) {
    if (Array.isArray(obj)) {
        return obj;
    }
    else {
        return [obj];
    }
}
exports.toArray = toArray;
// a function to convert an array to array of arrays
function toArrayOfArrays(obj) {
    if (Array.isArray(obj[0])) {
        return obj;
    }
    else {
        return [obj];
    }
}
exports.toArrayOfArrays = toArrayOfArrays;
// we need to override constructors to make it work with jest
// https://stackoverflow.com/questions/76007003/jest-tobeinstanceof-expected-constructor-array-received-constructor-array
function repack(value) {
    if (Boolean(value) && typeof value === "object") {
        if (Array.isArray(value)) {
            return new Array(...value);
        }
        else {
            return Object.assign({}, value);
        }
    }
    else {
        return value;
    }
}
exports.repack = repack;
async function handleError(error) {
    if (error instanceof Response) {
        try {
            const res = await error.json();
            if ("error" in res) {
                return { error: res.error };
            }
        }
        catch (e) {
            return {
                //@ts-ignore
                error: e && typeof e === "object" && "message" in e
                    ? e.message
                    : "unknown error",
            };
        }
    }
    return { error };
}
exports.handleError = handleError;
async function handleSuccess(response) {
    switch (true) {
        case response instanceof Response:
            return repack(await response.json());
        case typeof response === "string":
            return repack(response); // currently version is the only thing that return non-JSON
        default:
            return repack(response);
    }
}
exports.handleSuccess = handleSuccess;
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
async function importOptionalModule(moduleName) {
    return Function(`return import("${moduleName}")`)();
}
exports.importOptionalModule = importOptionalModule;
//# sourceMappingURL=utils.js.map