export const generateId = (): string => {
  return `id-${Math.random().toString(36).substring(2)}`;
};
