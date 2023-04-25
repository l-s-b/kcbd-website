import React from 'react';
import seedDetails from '../data/seed-details.json';

export default function Description({data}) {
    
    const oilDescription = [
        `Aceite de ${data.dosage} CBD de alta pureza`,
        `Sabor ${data.flavor}`,
        "Elaborado en California, Estados Unidos",
        "Testeamos en Montevideo, Uruguay",
        "Apto vegano",
        "Apto celíacos",
        "Envíos a todo el país"
    ]

    const seedDescription = seedDetails.filter(x => x.name === data.name)[0];
    
    const describeOil = data.type === 'oil' && 
    <div className="flex col m1y h-fit autoY">
        {oilDescription.map((x, index) => 
            <span key={index}>{x}</span>
        )}
    </div>;

    const describeSeeds = data.type === 'seedpack' &&
    <div className="flex col m1 h-fit autoY">
        {seedDescription?.desc.map((x, index) => 
            <p key={index}>{x}</p>
        )}
    </div>;

    const hasDescription = data.type === 'oil' || seedDescription?.desc.length > 0

    console.log('SD length: ', seedDescription?.desc.length)

  return (
    hasDescription && <div className="bBox _hLimit _yFade br1 m1y">
        {describeOil}
        {describeSeeds}
    </div>
  )
}
