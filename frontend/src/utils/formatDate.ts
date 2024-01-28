export const formatDate = (date: any, config: any = null) => {
  const defaultOptions = { day: "numeric", month: "short", year: "numeric" };
  const options = config ? config : defaultOptions;

  return new Date(date).toLocaleDateString("en-US", options);
};
