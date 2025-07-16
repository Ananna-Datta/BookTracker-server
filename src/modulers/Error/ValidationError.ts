import { Error as MongooseError } from "mongoose";

export const formatMongooseError = (error: MongooseError.ValidationError) => {
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
          kind: (err as any).kind,
          path: err.path,
          value: err.value,
          properties: (err as any).properties,
        };
        return acc;
      }, {} as Record<string, any>),
    },
  };
};
