import React from 'react';
import MuiNavbar from '../comps/MuiNavbar';
import products from '../data/products.json';
import WB from '../comps/WhatsAppButton';
import MuiCard from '../comps/MuiCard';
import Footer from '../comps/Footer';

export default function Home() {
  return (<>
        <MuiNavbar />
        <div className="vw100 flex centerX bg2">
          <div className="flex row wrap vw90 bg2 centerX">{products.map(
            p => <MuiCard id="bg1" className="m1" item={p} />
          )}</div>
        </div>
        <WB />
        <Footer />
    </>
  )
}
