import { createContext, useState, useMemo, ReactNode } from 'react';
import { CountryCode, detectCountryFromLocation, countryToDomain, domainToCountry } from './editorial';

export interface CountryContextValue {
  country: CountryCode;
  domain: string;
  setCountry: (c: CountryCode) => void;
  setDomain: (d: string) => void;
}

export const CountryContext = createContext<CountryContextValue | null>(null);

export function CountryProvider({ children, initial }: { children: ReactNode; initial?: CountryCode }) {
  const [country, setCountryState] = useState<CountryCode>(initial ?? detectCountryFromLocation());

  const value = useMemo<CountryContextValue>(() => ({
    country,
    domain: countryToDomain(country),
    setCountry: (c) => setCountryState(c),
    setDomain: (d) => setCountryState(domainToCountry(d)),
  }), [country]);

  return <CountryContext.Provider value={value}>{children}</CountryContext.Provider>;
}
