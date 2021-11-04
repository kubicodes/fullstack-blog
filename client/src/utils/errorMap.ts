import { FormikErrors } from "formik";
import { FieldError } from "../generated/graphql";

export const errorMap = (errors: FieldError[]): Record<string, string> => {
  const mappedErrors: Record<string, string> = {};

  errors.forEach(({ field, message }: { field: string; message: string }) => {
    mappedErrors[field] = message;
  });

  return mappedErrors;
};
