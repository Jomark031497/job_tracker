export const formatToCurrency = (amount: number | string, currency: string = "PHP"): string => {
  const val: number = typeof amount === "string" ? parseFloat(amount) : amount;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    maximumFractionDigits: 2,
  });

  return formatter.format(val);
};
