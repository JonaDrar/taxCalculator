import React from 'react';

type EmployeeSelectProps = {
  employees: { id: string; name: string }[];
  selectedEmployee: string;
  onChange: (employeeId: string) => void;
  position: string | null;
};

const EmployeeSelect: React.FC<EmployeeSelectProps> = ({
  employees,
  selectedEmployee,
  onChange,
  position,
}) => (
  <div className="mb-4">
    <label className="block mb-2 text-gray-700">Seleccionar Empleado:</label>
    <select
      value={selectedEmployee}
      onChange={(e) => onChange(e.target.value)}
      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
    >
      <option value="">-- Selecciona un empleado --</option>
      {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
          {employee.name}
        </option>
      ))}
    </select>
    {position && (
      <p className="text-sm text-gray-600 mt-2">
        Puesto: <span className="font-semibold">{position}</span>
      </p>
    )}
  </div>
);

export default EmployeeSelect;