import React from 'react';
import data from '../data/variables.json';
import kLogo from '../assets/kLogo.jpeg';

export default function Footer() {
  return (
    
    <div className="vw100 bg1 flex col centerX">
        <img className="centerXY" src={kLogo} alt={data.logoAlt} width="80" />
        Footer
    </div>
  )
}
