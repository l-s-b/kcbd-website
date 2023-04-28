import React from 'react';
import TabLink from './TabLink';

export default function NotFound() {
  return (
    <div className="flex col rel centerXY centerY center-txt z30 br2">
        <div className="dark-bg o50 h100 w100 abs" />
        <div className="z40 pad2">
            <h1>404</h1>
            <h1>🤷‍♂️🤷‍♀️</h1>
            <p className="m1">Ese producto no existe en nuestro inventario.</p>
            <TabLink id="bg1" className="pad1 pill m2" to="/">Volver al inicio</TabLink>
        </div>
    </div>
  )
}
