export const hideHalfOfText = (value) => {
  const halfLength = Math.floor(value.length / 2);
  const result = value.slice(0, halfLength + 1);
  return result + "****";
};
