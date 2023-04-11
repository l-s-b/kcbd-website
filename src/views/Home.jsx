import React from 'react';
import MuiNavbar from '../comps/MuiNavbar';
import products from '../data/products.json';
import WB from '../comps/WhatsAppButton';

export default function Home() {
  return (<>
        <MuiNavbar />
        <div>{products.map(p => <div className="col">
          {p.name} - {p.price}
        </div>)}</div>
        <WB />
    </>
  )
}
