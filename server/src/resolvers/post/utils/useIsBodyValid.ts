import { PostResponse } from "../../types/PostResponse";

export const useIsBodyValid = (body: string): PostResponse | boolean => {
  if (!body || body.length < 30) {
    return {
      errors: [
        {
          field: "body",
          message: "Body must be at least 30 characters logn",
        },
      ],
    };
  }

  if (body.length > 1000) {
    return {
      errors: [
        {
          field: "body",
          message: "Body can only contain 1000 characters",
        },
      ],
    };
  }

  return true;
};
