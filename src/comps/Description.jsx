import React from 'react';

export default function Description({data}) {

    const notPets = data.type === "oil" && ["Frutilla", "Menta", "Uva"].includes(data.oil.flavor);
    const descriptions = {
        "lotion": [
            "Crema CBD Karst 50 gr.",
            "Concentración CBD: 45%",
            "Aroma neutro, apto para todo el cuerpo, ideal para el tratamiento localizado del dolor.",
            "Apto vegano",
            "Apto celíacos",
            "Envíos a todo el país"
        ],
        "oil": data.type === "oil" && [
            `Aceite de ${data.oil.concentration} CBD de alta pureza`,
            `Sabor ${data.oil.flavor}`,
            "Elaborado en California, Estados Unidos",
            "Testeamos en Montevideo, Uruguay",
            "Ideal para dolores, ansiedad, tratamiento de cáncer y más patologías.",
            notPets && "Apto vegano",
            notPets && "Apto celíacos",
            "Envíos a todo el país"
        ],
        "seedpack": data.desc || []
    }

    function describe(data) {
    return <div className="flex col m1 h-fit autoY">
        {descriptions[data.type].map((paragraph, index) => 
            paragraph && <p key={index} className="_scaleWhenMobile">{paragraph}</p>
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
