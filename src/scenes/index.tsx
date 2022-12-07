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

  const [currency, setCurrency] = useState({ from: "USD", to: "JPY" });

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
    // feeIsSet name change
    const fee = items.find(
      (pair) => pair.from === currency.from && pair.to === currency.to
    );

    countResult(
      amount,
      currencies[currency.from],
      currencies[currency.to],
      fee && fee.fee
      // feeIsSet?.fee
    );
  }, [items, amount, currency.from, currency.to, currencies]);

  function onSwitchChange(from: string, to: string) {
    setCurrency({ from: to, to: from });
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
          setAmount={(amount: number) => setAmount(amount)}
          // setAmount={setAmount}
          currency={currency}
          setCurrency={(from, to) => setCurrency({ from, to })}
          onSwitchChange={(from, to) => onSwitchChange(from, to)}
        />
        {!!result && <div className={styles.result}>Result: {result}</div>}
      </div>
    </main>
  );
};

export default Main;
