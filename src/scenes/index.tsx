import React, { FC, useEffect, useState } from "react";
import ConverterSection from "./ConverterSection";
import FeeSection, { ItemsType } from "./FeeSection";
import { useCurrencyFetch } from "../hooks/currencyFetch";
import styles from "./index.module.css";

// import type { itemsType } from "./FeeSection";

const Main: FC = () => {
  const [currencies, isLoading, error] = useCurrencyFetch();
  const [items, setItems] = useState<ItemsType[]>([]);
  const [result, setResult] = useState(0);
  const [amount, setAmount] = useState(0);
  const [currencyPair, setCurrencyPair] = useState({ from: "USD", to: "JPY" });

  function countResult(
    amount: number,
    fromRate: number,
    toRate: number,
    fee: number = 0.15
  ) {
    let result = (amount - amount * fee) * (toRate / fromRate);
    setResult(result);
  }

  useEffect(() => {
    const fee = items.find(
      (pair) => pair.from === currencyPair.from && pair.to === currencyPair.to
    );

    countResult(
      amount,
      currencies[currencyPair.from],
      currencies[currencyPair.to],
      fee && fee.fee
    );
  }, [items, amount, currencyPair.from, currencyPair.to, currencies]);

  function onSwitchChange(from: string, to: string) {
    setCurrencyPair({ from: to, to: from });
  }

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <main className={styles.main}>
      <div className={styles.fee}>
        <FeeSection
          CurrencyRate={currencies}
          setItems={setItems}
          items={items}
        />
      </div>
      <div>
        <ConverterSection
          CurrencyRate={currencies}
          setAmount={setAmount}
          currencyPair={currencyPair}
          setCurrencyPair={setCurrencyPair}
          onSwitchChange={onSwitchChange}
        />
        {!!result && <div className={styles.result}>Result: {result}</div>}
      </div>
    </main>
  );
};

export default Main;
