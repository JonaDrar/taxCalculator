import React from 'react';

type IncomeInputProps = {
  income: number | '';
  onChange: (value: number) => void;
};

const IncomeInput: React.FC<IncomeInputProps> = ({ income, onChange }) => (
  <div className="mb-4">
    <label className="block mb-2 text-gray-700">Ingresos Brutos:</label>
    <input
      type="number"
      value={income}
      onChange={(e) => onChange(Number(e.target.value))}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      placeholder="Ejemplo: 1500000"
    />
  </div>
);

export default IncomeInput;