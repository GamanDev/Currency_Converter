import React, { FC, useMemo } from "react";
import Input from "./FeeInput";
import Section from "../components/Section";
import { CurrencyRate } from "../types/currencyTypes";
import styles from "./FeeSection.module.css";

type FeeSectionType = {
  CurrencyRate: CurrencyRate;
  setItems: React.Dispatch<React.SetStateAction<ItemsType[]>>;
  items: ItemsType[];
};

export type ItemsType = {
  from: string;
  to: string;
  fee: number;
};

export type Used = {
  [key: string]: Set<string>;
};

const FeeSection: FC<FeeSectionType> = ({ CurrencyRate, setItems, items }) => {
  const FromToUsed: Used = {};
  const ToFromUsed: Used = {};
  const defaultFee = 0.15;

  const createSet = useMemo(
    () => (first: string, second: string, obj: Used) => {
      let used: Set<string> = obj[first];
      if (!used) {
        used = new Set([first]);
        obj[first] = used;
      }
      used.add(second);
    },
    []
  );

  items.forEach(({ from, to }) => {
    createSet(from, to, FromToUsed);
    createSet(to, from, ToFromUsed);
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

      option = { fee: defaultFee, from, to };

      return true;
    });

    if (option) {
      setItems([...items, option]);
    }
  }

  function onChange(i: number, fee: number, from: string, to: string) {
    items[i] = { fee, from, to };
    setItems([...items]);
  }

  function onDeleteFee(i: number) {
    setItems([...items.filter((item) => item !== items[i])]);
  }

  function onCurrencySwap(i: number, fee: number, from: string, to: string) {
    const isPresent = items.some(
      (item) => item.from === to && item.to === from
    );

    if (isPresent) return;

    items[i] = { from: to, to: from, fee };
    setItems([...items]);
  }

  return (
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
            onCurrencySwap={(fee, from, to) => onCurrencySwap(i, fee, from, to)}
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
  );
};

export default FeeSection;
