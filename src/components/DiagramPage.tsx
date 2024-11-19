import React, { useEffect } from 'react';
import mermaid from 'mermaid';

const DiagramPage = () => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
  }, []);

  const diagramDefinition = `
  flowchart TD
      Start[Inicio] --> FetchEmployees[Fetch Empleados desde Firebase]
      FetchEmployees -->|Lista obtenida| SelectEmployee[Seleccionar Empleado]
      FetchEmployees -->|Error| ToastErrorEmpleados[Error: No empleados encontrados] --> FetchEmployees
      SelectEmployee --> SelectMonth[Seleccionar Mes]
      SelectEmployee -->|Empleado no seleccionado| ToastErrorEmpleado[Error: Selecciona un empleado] --> SelectEmployee
      SelectMonth --> InputIncome[Ingresar Ingresos Brutos]
      SelectMonth -->|Mes no seleccionado| ToastErrorMes[Error: Selecciona un mes] --> SelectMonth
      InputIncome --> ValidateSubmission[Validar Datos]
      InputIncome -->|Ingreso inválido| ToastErrorIngreso[Error: Ingreso inválido] --> InputIncome
      ValidateSubmission -->|Éxito| CalculateTax[Calcular Impuesto]
      ValidateSubmission -->|Duplicado| ToastErrorDuplicado[Error: Registro duplicado] --> SelectMonth
      CalculateTax --> SaveToDatabase[Guardar en Firebase]
      SaveToDatabase -->|Éxito| ToastSuccess[Impuesto calculado correctamente]
      SaveToDatabase -->|Error| ToastErrorGuardar[Error al guardar] --> SaveToDatabase
      ToastSuccess --> ShowResult[Mostrar Resultado]
      ShowResult --> History[Ver Historial]
      History --> End[Fin]
  `;

  useEffect(() => {
    mermaid.initialize({ startOnLoad: true });
    mermaid.contentLoaded();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Diagrama de Flujo</h1>
      <div className="mermaid bg-white p-4 rounded-lg shadow-lg">
        {diagramDefinition}
      </div>
    </div>
  );
};

export default DiagramPage;