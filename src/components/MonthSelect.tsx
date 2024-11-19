import React from 'react';

type MonthSelectProps = {
  selectedMonth: string;
  onChange: (month: string) => void;
  months: { value: string; label: string }[];
};

const MonthSelect: React.FC<MonthSelectProps> = ({
  selectedMonth,
  onChange,
  months,
}) => (
  <div className="mb-4">
    <label className="block mb-2 text-gray-700">Seleccionar Mes:</label>
    <select
      value={selectedMonth}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option value="">-- Selecciona un mes --</option>
      {months.map((month) => (
        <option key={month.value} value={month.value}>
          {month.label}
        </option>
      ))}
    </select>
  </div>
);

export default MonthSelect;