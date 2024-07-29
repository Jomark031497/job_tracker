import { format } from "date-fns";

export const formatToDate = (value: Date) => {
  return format(value, "MMM dd, yyyy");
};
