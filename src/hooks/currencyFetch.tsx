import { useState, useEffect } from "react";
import { CurrencyRate } from "../types/currencyTypes";

export function useCurrencyFetch() {
  const [currencies, setCurrencies] = useState<CurrencyRate>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch("stats/eurofxref/eurofxref-daily.xml")
      .then((res) => res.text())
      .then((data) => {
        const xmlDoc = new DOMParser().parseFromString(data, "text/xml");
        const CurencyRate: CurrencyRate = {};

        Array.from(xmlDoc.querySelectorAll("Cube[currency]")).forEach((v) => {
          CurencyRate[v.getAttribute("currency") as string] = Number(
            v.getAttribute("rate")
          );
        });

        setCurrencies(CurencyRate);
      })
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  }, []);

  return [currencies, isLoading, error] as const;
}
