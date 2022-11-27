import React, { FC, useState } from "react";
import { Currency } from "../types/currencyTypes";
import styles from "./ConverterInput.module.css";

type ConverterInputType = {
  CurrencyRate: Currency;
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  setAmount: (amount: number) => void;
};

const ConverterInput: FC<ConverterInputType> = ({
  CurrencyRate,
  setFromCurrency,
  setToCurrency,
  setAmount,
}) => {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("JPY");

  function onFormChange({ currentTarget }: any) {
    const { amount, from, to } = currentTarget;
    setFrom(from.value);
    setTo(to.value);
    setFromCurrency(from.value);
    setToCurrency(to.value);
    setAmount(amount.value);
  }

  return (
    <div>
      {" "}
      <form onChange={onFormChange} className={styles.form}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className={styles.input}
        />
        <select name="from" className={styles.select}>
          {Object.keys(CurrencyRate)
            .filter((option) => {
              return option !== to;
            })
            .map((v) => {
              return <option key={v} label={v} value={v} />;
            })}
        </select>
        <select name="to" className={styles.select}>
          {Object.keys(CurrencyRate)
            .filter((option) => {
              return option !== from;
            })
            .map((v) => {
              return <option key={v} label={v} value={v} />;
            })}
        </select>
      </form>
    </div>
  );
};

export default ConverterInput;
