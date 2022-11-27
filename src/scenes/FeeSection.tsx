import React, { FC, useEffect, useState } from "react";
import Input from "./FeeInput";
import Section from "../components/Section";
import { Currency } from "../types/currencyTypes";
import styles from "./FeeSection.module.css";

type FeeSectionType = {
  CurrencyRate: Currency;
  setState: (items: itemsType[]) => void;
};

export type itemsType = {
  from: string;
  to: string;
  fee: number;
};

const FeeSection: FC<FeeSectionType> = ({ CurrencyRate, setState }) => {
  const [items, setItems] = useState<itemsType[]>([]);

  const FromToUsed: any = {};
  const ToFromUsed: any = {};

  useEffect(() => {
    setState(items);
  }, [items, setState]);

  // useMemo // reuse function
  items.forEach(({ from, to }) => {
    let used: any = FromToUsed[from];
    if (!used) {
      used = new Set([from]);
      FromToUsed[from] = used;
    }
    used.add(to);
  });

  // useMemo
  items.forEach(({ from, to }) => {
    let used: any = ToFromUsed[to];
    if (!used) {
      used = new Set([to]);
      ToFromUsed[to] = used;
    }
    used.add(from);
  });

  function onAdd() {
    const currencies = Object.keys(CurrencyRate);

    let option;
    currencies.some((from) => {
      const used = FromToUsed[from] || new Set([from]);

      if (used.size === currencies.length) {
        return false;
      }

      const to = currencies.find((to) => {
        if (used.has(to)) return null;
        return to;
      });

      option = { fee: 0.15, from, to };
      return true;
    });

    if (option) {
      setItems([...items, option]);
    }
  }

  function onChange(i: number, fee: number, from = "", to = "") {
    items[i] = { fee, from, to };
    setItems([...items]);
  }
  // fees.slice().splice(i,1)
  function onDeleteFee(i: number) {
    setItems([...items.filter((item) => item !== items[i])]);
  }

  return (
    <div>
      <Section title="Fee">
        <div>
          Please set a fee and direction <strong>(0.2 === 20%)</strong>
        </div>
        {items.map(({ from, to, fee }, i) => {
          return (
            <Input
              key={from + to}
              from={from}
              to={to}
              fee={fee}
              onChange={(fee, from, to) => onChange(i, fee, from, to)}
              onDeleteFee={() => onDeleteFee(i)}
              FromToUsed={FromToUsed}
              ToFromUsed={ToFromUsed}
              CurrencyRate={CurrencyRate}
            />
          );
        })}
        <button onClick={onAdd} className={styles.add}>
          Add
        </button>
      </Section>
    </div>
  );
};

export default FeeSection;
