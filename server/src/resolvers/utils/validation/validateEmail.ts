export const isEmailValid = (email: string): boolean => {
  if (!email.includes("@")) {
    return false;
  }

  if (email.length < 5) {
    return false;
  }

  return true;
};
