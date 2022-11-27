import React, { FC } from "react";
import Section from "../components/Section";
import { Currency } from "../types/currencyTypes";
import ConverterInput from "./ConverterInput";

type ConverterSectionType = {
  CurrencyRate: Currency;
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  setAmount: (amount: number) => void;
};
const ConverterSection: FC<ConverterSectionType> = ({
  CurrencyRate,
  setFromCurrency,
  setToCurrency,
  setAmount,
}) => {
  return (
    <div>
      <Section title="Converter">
        <p>
          Enter an amount <strong>(default fee is 15%)</strong>
        </p>
        <ConverterInput
          CurrencyRate={CurrencyRate}
          setFromCurrency={(currency: string) => setFromCurrency(currency)}
          setToCurrency={(currency: string) => setToCurrency(currency)}
          setAmount={(amount: number) => setAmount(amount)}
        />
      </Section>
    </div>
  );
};

export default ConverterSection;
