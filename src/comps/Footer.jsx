import React from 'react';
import data from '../data/variables.json';
import kLogo from '../assets/kLogo.jpeg';

export default function Footer() {
  return (
    <>
      <div className="vw100 bg1 flex col centerX rel z30">
          <img className="centerXY m1y hw10" src={kLogo} alt={data.logoAlt} />
      </div>
      <div className="fixed bottom vw100 h25 z10 bg1" />
    </>
  )
}
