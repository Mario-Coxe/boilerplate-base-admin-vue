export const buildQueryParams = (params: Record<string, any>): string => {
  return new URLSearchParams(params).toString();
};
