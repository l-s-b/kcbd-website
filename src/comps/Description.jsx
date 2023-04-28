import React from 'react';
import seedDetails from '../data/seed-details.json';

export default function Description({data}) {

    const notPets = ["Frutilla", "Menta", "Uva"].includes(data.flavor);
    const foundSeedDesc = seedDetails.filter(x => x.name === data.name)[0]
    const descriptions = {
        "lotion": [
            "Crema CBD Karst 50 gr.",
            "Concentración CBD: 45%",
            "Aroma neutro, apto para todo el cuerpo, ideal para el tratamiento localizado del dolor.",
            "Apto vegano",
            "Apto celíacos",
            "Envíos a todo el país"
        ],
        "oil": [
            `Aceite de ${data.concentration} CBD de alta pureza`,
            `Sabor ${data.flavor}`,
            "Elaborado en California, Estados Unidos",
            "Testeamos en Montevideo, Uruguay",
            "Ideal para dolores, ansiedad, tratamiento de cáncer y más patologías.",
            notPets && "Apto vegano",
            notPets && "Apto celíacos",
            "Envíos a todo el país"
        ],
        "seedpack": foundSeedDesc ? foundSeedDesc.desc : []
    }

    function describe(data) {
    return <div className="flex col m1 h-fit autoY">
        {descriptions[data.type].map((x, index) => 
            <p key={index}>{x}</p>
        )}
    </div>;
    }

    const hasDescription = descriptions[data.type].length > 0

  return (
    hasDescription && <div className="bBox _hLimit _yFade br1 m1y">
        {describe(data)}
    </div>
  )
}
