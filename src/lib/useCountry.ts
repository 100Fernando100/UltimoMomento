import { useContext } from 'react';
import { CountryContext, CountryContextValue } from './countryContext';

export function useCountry(): CountryContextValue {
  const ctx = useContext(CountryContext);
  if (!ctx) {
    throw new Error('useCountry must be used inside <CountryProvider>');
  }
  return ctx;
}
