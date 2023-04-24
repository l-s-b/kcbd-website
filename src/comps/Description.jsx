import React from 'react'

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
    const describeOil = data.type === 'oil' && 
        <div className="flex col">
            {oilDescription.map((x, index) => 
                <span key={index}>{x}</span>
            )}
        </div>
  return (
    <div>{describeOil}</div>
  )
}
