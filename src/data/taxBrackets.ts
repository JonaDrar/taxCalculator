import { TaxBracket } from '../types/taxBrackets';

export const taxBrackets: TaxBracket[] = [
  {
    lowerLimit: 0,
    upperLimit: 899478,
    rate: 0,
    deduction: 0,
  },
  {
    lowerLimit: 899478.01,
    upperLimit: 1998840,
    rate: 0.04,
    deduction: 35979.12,
  },
  {
    lowerLimit: 1998840.01,
    upperLimit: 3331400,
    rate: 0.08,
    deduction: 115932.72,
  },
  {
    lowerLimit: 3331400.01,
    upperLimit: 4663960,
    rate: 0.135,
    deduction: 299159.72,
  },
  {
    lowerLimit: 4663960.01,
    upperLimit: 5996520,
    rate: 0.23,
    deduction: 742235.92,
  },
  {
    lowerLimit: 5996520.01,
    upperLimit: 7995360,
    rate: 0.304,
    deduction: 1185978.4,
  },
  {
    lowerLimit: 7995360.01,
    upperLimit: 20654680,
    rate: 0.35,
    deduction: 1553764.96,
  },
  {
    lowerLimit: 20654680.01,
    upperLimit: Infinity,
    rate: 0.4,
    deduction: 2586498.96,
  },
];