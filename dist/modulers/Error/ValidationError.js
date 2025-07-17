"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatMongooseError = void 0;
const mongoose_1 = require("mongoose");
const formatMongooseError = (error) => {
    return {
        success: false,
        message: "Validation failed",
        error: {
            name: error.name,
            errors: Object.keys(error.errors).reduce((acc, key) => {
                const err = error.errors[key];
                acc[key] = {
                    message: err.message,
                    name: err.name,
                    kind: err instanceof mongoose_1.Error.ValidatorError ? err.kind : undefined,
                    path: err.path,
                    value: err.value, // ✅ Replace 'any' with 'unknown'
                    properties: err instanceof mongoose_1.Error.ValidatorError ? err.properties : undefined,
                };
                return acc;
            }, {}),
        },
    };
};
exports.formatMongooseError = formatMongooseError;
