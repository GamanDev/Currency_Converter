import React, { FC, useEffect, useState } from "react";
import ConverterSection from "./ConverterSection";
import FeeSection, { itemsType } from "./FeeSection";
import { useCurrencyFetch } from "../hooks/currencyFetch";
import styles from "./index.module.css";

const Main: FC = () => {
  const [currencies, isLoading, error] = useCurrencyFetch();
  const [state, setState] = useState<itemsType[]>([]);

  const [result, setResult] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState(0);

  function CountResult(
    amount: number,
    fromRate: number,
    toRate: number,
    fee: number = 0.15
  ) {
    let result = (amount - amount * fee) * (toRate / fromRate);
    setResult(result);
  }

  const feeIsSet = state.find(
    (pair) => pair.from === fromCurrency && pair.to === toCurrency
  );

  useEffect(() => {
    if (feeIsSet) {
      CountResult(
        amount,
        currencies[fromCurrency],
        currencies[toCurrency],
        feeIsSet.fee
      );
    } else {
      CountResult(amount, currencies[fromCurrency], currencies[toCurrency]);
    }
  }, [state, amount, fromCurrency, toCurrency, currencies, feeIsSet]);

  console.log(result);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className={styles.main}>
      <div className={styles.fee}>
        <FeeSection
          CurrencyRate={currencies}
          setState={(items) => setState(items)}
        />
      </div>
      <div>
        <ConverterSection
          CurrencyRate={currencies}
          setFromCurrency={(currency: string) => setFromCurrency(currency)}
          setToCurrency={(currency: string) => setToCurrency(currency)}
          setAmount={(amount: number) => setAmount(amount)}
        />
        {!!result && <div className={styles.result}>Result: {result}</div>}
      </div>
    </div>
  );
};

export default Main;
