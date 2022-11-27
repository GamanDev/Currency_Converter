import React, { FC, MouseEvent, useState } from "react";
import { Currency } from "../types/currencyTypes";
import styles from "./FeeInput.module.css";

type InputType = {
  key?: string;
  onChange: (fee: number, from: string, to: string) => void;
  onDeleteFee: () => void;
  from: string;
  to: string;
  fee: number;
  FromToUsed?: any;
  ToFromUsed?: any;
  CurrencyRate: Currency;
};

const Input: FC<InputType> = ({
  from,
  to,
  fee = 0,
  onChange,
  FromToUsed,
  CurrencyRate,
  ToFromUsed,
  onDeleteFee,
}) => {
  const [isValid, setIsValid] = useState(true);

  function onFormChange({ currentTarget }: any) {
    const { fee, from, to } = currentTarget;
    let value = +fee.value;
    if (value < 0) value = 0;
    if (value > 1) value = 1;
    checkForValidNumber(fee.value);
    if (isValid) {
      onChange(value, from.value, to.value);
    }
  }

  function checkForValidNumber(num: number): void {
    if (num < 0 || num > 1) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
  }

  function onDeleteClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    onDeleteFee();
  }
  return (
    <form onChange={onFormChange} className={styles.form}>
      <input
        className={styles.input}
        type="number"
        name="fee"
        defaultValue={fee}
        placeholder="Fee"
        min={0}
        max={1}
        step={0.1}
      />

      {/* USD JPY */}

      <select name="from" defaultValue={from} className={styles.select}>
        {Object.keys(CurrencyRate)
          .filter((option) => {
            return option === from || ToFromUsed[to].has(option) === false;
          })
          .map((v) => {
            return <option key={v} label={v} value={v} />;
          })}
      </select>
      <select name="to" defaultValue={to} className={styles.select}>
        {Object.keys(CurrencyRate)
          .filter((option) => {
            return option === to || FromToUsed[from].has(option) === false;
          })
          .map((v) => {
            return <option key={v} label={v} value={v} />;
          })}
      </select>
      <button onClick={onDeleteClick} className={styles.times}>
        &times;
      </button>
      {!isValid && (
        <div className={styles.error}>Please enter a valid amount</div>
      )}
    </form>
  );
};

export default Input;
