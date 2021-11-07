import { PostResponse } from "../../types/PostResponse";

export const useIsHeadlineValid = (
  headline: string
): PostResponse | boolean => {
  if (!headline || headline.length < 10) {
    return {
      errors: [
        {
          field: "headline",
          message: "Headline must be at least 10 characters long",
        },
      ],
    };
  }

  if (headline.length > 100) {
    return {
      errors: [
        {
          field: "headline",
          message: "Headline can only contain 100 characters",
        },
      ],
    };
  }

  return true;
};
