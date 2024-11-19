import { taxBrackets } from '../data/taxBrackets';

export const calculateTax = (income: number): number => {
  for (const bracket of taxBrackets) {
    if (income >= bracket.lowerLimit && income <= bracket.upperLimit) {
      return income * bracket.rate - bracket.deduction;
    }
  }
  return 0;
};