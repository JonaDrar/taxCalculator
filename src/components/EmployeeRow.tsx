import React from 'react';

type EmployeeRowProps = {
  employeeName: string;
  income: number;
  tax: number;
};

const EmployeeRow: React.FC<EmployeeRowProps> = ({ employeeName, income, tax }) => {
  return (
    <tr className="border-t bg-gray-50 hover:bg-gray-100 transition-colors">
      <td className="py-3 px-4">{employeeName}</td>
      <td className="py-3 px-4 text-right">${Math.round(income)}</td>
      <td className="py-3 px-4 text-right">${Math.round(tax)}</td>
    </tr>
  );
};

export default EmployeeRow;