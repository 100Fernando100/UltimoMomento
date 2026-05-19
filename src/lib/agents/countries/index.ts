import type { CountryCode, CountryProfile } from '../types';
import { ar } from './ar';
import { mx } from './mx';
import { es } from './es';
import { co } from './co';
import { cl } from './cl';

export const countryProfiles: Record<CountryCode, CountryProfile> = {
  AR: ar,
  MX: mx,
  ES: es,
  CO: co,
  CL: cl,
};

export const supportedCountries: CountryCode[] = ['AR', 'MX', 'ES', 'CO', 'CL'];

export const defaultCountry: CountryCode = 'AR';
