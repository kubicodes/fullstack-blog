import { FormikErrors } from "formik";
import { FieldError } from "../generated/graphql";

export const errorMap = (errors: FieldError[]) => {
  const mappedErrors: FormikErrors<Record<string, string>> = {};

  errors.forEach(({ field, message }) => {
    mappedErrors[field] = message;
  });

  return mappedErrors;
};
