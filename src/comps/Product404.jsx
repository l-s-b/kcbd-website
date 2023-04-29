import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex col rel centerXY centerY center-txt z30 br2">
        <div className="dark-bg o50 h100 w100 abs" />
        <div className="z40 pad2">
            <h1 className="fs6">404</h1>
            <h1 className="fs6">🤷‍♂️🤷‍♀️</h1>
            <p className="m2y fs1-5">Lo sentimos, no encontramos ese producto en nuestro inventario.</p>
            <Link id="bg1" className="pad1 pill m2y fs1-5 t200 hoverToDark" to="/">Volver al inicio</Link>
        </div>
    </div>
  )
}
