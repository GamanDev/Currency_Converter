import React, { FC, FormEvent } from "react";
import { Used } from "./FeeSection";
import { CurrencyRate } from "../types/currencyTypes";
import styles from "./ConverterInput.module.css";

type ConverterInputType = {
  CurrencyRate: CurrencyRate;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  currencyPair: { from: string; to: string };
  setCurrencyPair: React.Dispatch<
    React.SetStateAction<{
      from: string;
      to: string;
    }>
  >;
  onSwitchChange: (from: string, to: string) => void;
  // types
  FromToUsed: Used;
  ToFromUsed: any;
};

const ConverterInput: FC<ConverterInputType> = ({
  CurrencyRate,
  currencyPair,
  FromToUsed,
  ToFromUsed,
  setAmount,
  setCurrencyPair,
  onSwitchChange,
}) => {
  function onFormChange({ currentTarget }: FormEvent<HTMLFormElement>) {
    const { amount, from, to } = currentTarget;
    setCurrencyPair({ from: from.value, to: to.value });
    setAmount(amount.value);
  }

  function onSwitch() {
    onSwitchChange(currencyPair.from, currencyPair.to);
  }

  return (
    <form
      onChange={onFormChange}
      className={styles.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        className={styles.input}
      />
      <select name="from" className={styles.select} value={currencyPair.from}>
        {Object.keys(CurrencyRate)
          .filter((option) => {
            return (
              option === currencyPair.from ||
              ToFromUsed[currencyPair.to].has(option) === false
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
      <select name="to" className={styles.select} value={currencyPair.to}>
        {Object.keys(CurrencyRate)
          .filter((option) => {
            return (
              option === currencyPair.to ||
              FromToUsed[currencyPair.from].has(option) === false
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
