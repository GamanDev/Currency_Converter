export type Currency = {
  [currency: string]: number;
};

export type Fee = {
  from: Currency;
  to: Currency;
  percent: number;
  isSet: boolean;
};
