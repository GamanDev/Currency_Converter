import React, { FC } from "react";
import Section from "../components/Section";
import { CurrencyRate } from "../types/currencyTypes";
import ConverterInput from "./ConverterInput";

type ConverterSectionType = {
  CurrencyRate: CurrencyRate;
  setAmount: (amount: number) => void;
  currency: { from: string; to: string };
  setCurrency: (from: string, to: string) => void;
  onSwitchChange: (from: string, to: string) => void;
};
const ConverterSection: FC<ConverterSectionType> = ({
  CurrencyRate,
  setAmount,
  setCurrency,
  currency,
  onSwitchChange,
}) => {
  // any => type
  const FromToUsed: any = {};
  const ToFromUsed: any = {};

  // ==========================================
  // useMemo // function
  let usedFrom = FromToUsed[currency.from];
  if (!usedFrom) {
    FromToUsed[currency.from] = new Set([currency.from]);
    usedFrom = FromToUsed[currency.from];
  }
  usedFrom.add(currency.to);

  let usedTo = ToFromUsed[currency.to];
  if (!usedTo) {
    ToFromUsed[currency.to] = new Set([currency.to]);
    usedTo = ToFromUsed[currency.to];
  }
  usedTo.add(currency.from);
  // ==========================================

  return (
    <Section title="Converter">
      <p>
        Enter an amount <strong>(default fee is 15%)</strong>
      </p>
      <ConverterInput
        CurrencyRate={CurrencyRate}
        setAmount={(amount: number) => setAmount(amount)}
        currency={currency}
        setCurrency={(from, to) => setCurrency(from, to)}
        onSwitchChange={(from, to) => onSwitchChange(from, to)}
        // reference setCurrency, onSwitch change // not useRef!!!
        FromToUsed={FromToUsed}
        ToFromUsed={ToFromUsed}
      />
    </Section>
  );
};

export default ConverterSection;
