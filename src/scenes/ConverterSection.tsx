import React, { FC, useMemo } from "react";
import ConverterInput from "./ConverterInput";
import { Used } from "./FeeSection";
import { CurrencyRate } from "../types/currencyTypes";
import Section from "../components/Section";

type ConverterSectionType = {
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
};
const ConverterSection: FC<ConverterSectionType> = ({
  CurrencyRate,
  setAmount,
  setCurrencyPair,
  currencyPair,
  onSwitchChange,
}) => {
  const FromToUsed: Used = {};
  const ToFromUsed: Used = {};

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
  const { from, to } = currencyPair;
  createSet(from, to, FromToUsed);
  createSet(to, from, ToFromUsed);

  return (
    <Section title="Converter">
      <p>
        Enter an amount <strong>(default fee is 15%)</strong>
      </p>
      <ConverterInput
        CurrencyRate={CurrencyRate}
        currencyPair={currencyPair}
        setAmount={setAmount}
        setCurrencyPair={setCurrencyPair}
        onSwitchChange={onSwitchChange}
        FromToUsed={FromToUsed}
        ToFromUsed={ToFromUsed}
      />
    </Section>
  );
};

export default ConverterSection;
