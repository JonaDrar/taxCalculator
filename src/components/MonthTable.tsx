import React from 'react';
import EmployeeRow from './EmployeeRow';

type MonthTableProps = {
  monthName: string;
  records: {
    id: string;
    employeeName: string;
    income: number;
    tax: number;
  }[];
  totalTax: number;
};

const MonthTable: React.FC<MonthTableProps> = ({ monthName, records, totalTax }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Mes: {monthName}</h2>
      <table className="min-w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-indigo-500 text-white">
            <th className="py-3 px-4 text-left">Empleado</th>
            <th className="py-3 px-4 text-right">Ingresos</th>
            <th className="py-3 px-4 text-right">Impuesto</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <EmployeeRow
              key={record.id}
              employeeName={record.employeeName}
              income={record.income}
              tax={record.tax}
            />
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-indigo-100 font-semibold">
            <td className="py-3 px-4 text-left">Total</td>
            <td></td>
            <td className="py-3 px-4 text-right">${Math.round(totalTax)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MonthTable;