import React, { FC, FormEvent, MouseEvent } from "react";
import { CurrencyRate } from "../types/currencyTypes";
import styles from "./ConverterInput.module.css";

type ConverterInputType = {
  CurrencyRate: CurrencyRate;
  setAmount: (amount: number) => void;
  currency: { from: string; to: string };
  setCurrency: (from: string, to: string) => void;
  onSwitchChange: (from: string, to: string) => void;
  // types
  FromToUsed: any;
  ToFromUsed: any;
};

const ConverterInput: FC<ConverterInputType> = ({
  CurrencyRate,
  setAmount,
  currency,
  setCurrency,
  onSwitchChange,
  FromToUsed,
  ToFromUsed,
}) => {
  function onFormChange({ currentTarget }: FormEvent<HTMLFormElement>) {
    const { amount, from, to } = currentTarget;
    setCurrency(from.value, to.value);
    setAmount(amount.value);
  }

  function onSwitch(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onSwitchChange(currency.from, currency.to);
  }

  return (
    <form onChange={onFormChange} className={styles.form}>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        className={styles.input}
      />
      <select name="from" className={styles.select} value={currency.from}>
        {Object.keys(CurrencyRate)
          .filter((option) => {
            return (
              option === currency.from ||
              ToFromUsed[currency.to].has(option) === false
            );
          })
          .map((v) => {
            return <option key={v} label={v} value={v} />;
          })}
      </select>
      <button onClick={onSwitch}>
        <img src="/assets/reverse_arrows.svg" alt="reverse_arrows" />
      </button>
      {/* onCurrencySwitch */}
      <select name="to" className={styles.select} value={currency.to}>
        {Object.keys(CurrencyRate)
          .filter((option) => {
            return (
              option === currency.to ||
              FromToUsed[currency.from].has(option) === false
            );
          })
          .map((v) => {
            return <option key={v} label={v} value={v} />;
          })}
      </select>
    </form>
  );
};

export default ConverterInput;
