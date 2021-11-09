export const useMapRawResultToEntity = (
  rawResult: Record<string, any>,
  post: Record<string, any>,
  user: Record<string, any>,
  comment: Record<string, any>
): void => {
  Object.keys(rawResult[0] ?? rawResult).forEach((key: string) => {
    if (key[0] === "p") {
      const mappedstring = key.substring(2);
      post[mappedstring] = rawResult[0] ? rawResult[0][key] : rawResult[key];
    } else if (key[0] === "u") {
      const mappedString = key.substring(2);
      user[mappedString] = rawResult[0] ? rawResult[0][key] : rawResult[key];
    } else if (key[0] === "c") {
      const mappedString = key.substring(2);
      comment[mappedString] = rawResult[0] ? rawResult[0][key] : rawResult[key];
    }
  });
};
