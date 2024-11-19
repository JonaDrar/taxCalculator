import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import EmployeeSelect from './EmployeeSelect';
import MonthSelect from './MonthSelect';
import IncomeInput from './IncomeInput';
import TaxResult from './TaxResult';
import Loader from './Loader';
import { calculateTax } from '../utils/calculateTax';
import { Employee } from '../types';

const TaxCalculator = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [employeePosition, setEmployeePosition] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [income, setIncome] = useState<number | ''>('');
  const [tax, setTax] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const months = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(db, 'employees'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.data().id,
          name: doc.data().name,
          position: doc.data().position,
        }));
        setEmployees(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Error: ${error.message}`);
        } else {
          toast.error('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEmployee || !selectedMonth || income === '') {
      toast.error('Completa todos los campos');
      return;
    }

    setLoading(true);

    try {
      const calculatedTax = Math.round(calculateTax(income));
      const duplicateQuery = query(
        collection(db, 'taxCalculations'),
        where('employeeId', '==', selectedEmployee),
        where('month', '==', selectedMonth)
      );
      const duplicateSnapshot = await getDocs(duplicateQuery);

      if (!duplicateSnapshot.empty) {
        toast.error('Ya existe un cálculo para este empleado y mes');
        setLoading(false);
        return;
      }

      await addDoc(collection(db, 'taxCalculations'), {
        employeeId: selectedEmployee,
        month: selectedMonth,
        income,
        tax: calculatedTax,
        date: new Date().toISOString(),
      });

      setTax(calculatedTax);
      toast.success(`Impuesto calculado exitosamente: $${calculatedTax}`);
      setSelectedEmployee('');
      setSelectedMonth('');
      setIncome('');
      setTax(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Ocurrió un error desconocido');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && !tax) return <Loader />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Calculadora de Impuestos</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <EmployeeSelect
          employees={employees}
          selectedEmployee={selectedEmployee}
          onChange={(id) => {
            setSelectedEmployee(id);
            const employee = employees.find((e) => e.id === id);
            setEmployeePosition(employee?.position || null);
          }}
          position={employeePosition}
        />
        <MonthSelect
          selectedMonth={selectedMonth}
          onChange={(month) => setSelectedMonth(month)}
          months={months}
        />
        <IncomeInput
          income={income}
          onChange={setIncome}
        />
        <button
          type="submit"
          className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-md ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Calcular'}
        </button>
      </form>
      <TaxResult tax={tax} />
    </div>
  );
};

export default TaxCalculator;