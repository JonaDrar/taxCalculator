import React from 'react';

type TaxResultProps = {
  tax: number | null;
};

const TaxResult: React.FC<TaxResultProps> = ({ tax }) => (
  <div className="mt-4 text-lg">
    {tax !== null && (
      <p>
        El impuesto calculado es: <span className="font-bold">${tax}</span>
      </p>
    )}
  </div>
);

export default TaxResult;