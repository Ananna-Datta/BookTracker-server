import { Error as MongooseError } from "mongoose";

type MongooseValidationSubError = MongooseError.ValidatorError | MongooseError.CastError;

export const formatMongooseError = (error: MongooseError.ValidationError) => {
  return {
    success: false,
    message: "Validation failed",
    error: {
      name: error.name,
      errors: Object.keys(error.errors).reduce((acc, key) => {
        const err = error.errors[key] as MongooseValidationSubError;
        acc[key] = {
          message: err.message,
          name: err.name,
          kind: err instanceof MongooseError.ValidatorError ? err.kind : undefined,
          path: err.path,
          value: err.value as unknown, // ✅ Replace 'any' with 'unknown'
          properties: err instanceof MongooseError.ValidatorError ? err.properties : undefined,
        };
        return acc;
      }, {} as Record<string, {
        message: string;
        name: string;
        kind?: string;
        path: string;
        value: unknown; // ✅ Fixed here
        properties?: Record<string, unknown>;
      }>),
    },
  };
};
