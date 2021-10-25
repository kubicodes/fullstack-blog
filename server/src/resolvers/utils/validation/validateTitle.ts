import { SingleRoleResponse } from "../../types/SingleRoleResponse";

export const validateTitle = (
  title: string,
  requiredLength: number
): SingleRoleResponse | null => {
  if (!title) {
    return { errors: [{ field: "title", message: "Title cannot be empty" }] };
  }

  if (title.length < requiredLength) {
    return {
      errors: [
        {
          field: "title",
          message: "Title must be at least 3 characters long",
        },
      ],
    };
  }

  return null
};
