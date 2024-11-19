import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Loader from './Loader';
import { toast } from 'react-toastify';
import MonthTable from './MonthTable';

type TaxCalculation = {
  id: string;
  employeeId: string;
  income: number;
  tax: number;
  month: string;
  date: string;
};

const History = () => {
  const [calculations, setCalculations] = useState<TaxCalculation[]>([]);
  const [employees, setEmployees] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const employeesSnapshot = await getDocs(collection(db, 'employees'));
        if (employeesSnapshot.empty) {
          throw new Error('No hay empleados registrados.');
        }

        const employeesData: Record<string, string> = {};
        employeesSnapshot.docs.forEach((doc) => {
          employeesData[doc.data().id] = doc.data().name;
        });
        setEmployees(employeesData);

        const calculationsQuery = query(
          collection(db, 'taxCalculations'),
          orderBy('month', 'asc'),
          orderBy('employeeId', 'asc')
        );
        const calculationsSnapshot = await getDocs(calculationsQuery);
        if (calculationsSnapshot.empty) {
          throw new Error('No hay cálculos registrados.');
        }

        const calculationsData = calculationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as TaxCalculation[];
        setCalculations(calculationsData);
      } catch (error: any) {
        console.error('Error al cargar los datos:', error.message);
        if (error.message.includes('empleados')) {
          toast.error('No se encontraron empleados registrados.');
        } else if (error.message.includes('cálculos')) {
          toast.error('No se encontraron registros de cálculos.');
        } else {
          toast.error('Ocurrió un error al cargar los datos. Intenta nuevamente.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loader />;

  const groupedByMonth = calculations.reduce((acc, calc) => {
    if (!acc[calc.month]) {
      acc[calc.month] = {
        totalTax: 0,
        records: [],
      };
    }
    acc[calc.month].totalTax += calc.tax;
    acc[calc.month].records.push({
      id: calc.id,
      employeeName: employees[calc.employeeId],
      income: calc.income,
      tax: calc.tax,
    });
    return acc;
  }, {} as Record<string, { totalTax: number; records: { id: string; employeeName: string; income: number; tax: number }[] }>);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Historial de Cálculos</h1>
      {Object.keys(groupedByMonth).length === 0 ? (
        <p className="text-center text-gray-600">No hay cálculos disponibles.</p>
      ) : (
        <div className="overflow-x-auto">
          {Object.entries(groupedByMonth).map(([month, data]) => (
            <MonthTable
              key={month}
              monthName={months[parseInt(month, 10) - 1]}
              records={data.records}
              totalTax={data.totalTax}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;