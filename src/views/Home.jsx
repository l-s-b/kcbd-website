import React from 'react';
import MuiNavbar from '../comps/MuiNavbar';
import products from '../data/products.json';
import WB from '../comps/WhatsAppButton';
import MuiCard from '../comps/MuiCard';
import Footer from '../comps/Footer';
import PageContainer from '../comps/PageContainer';

export default function Home() {
  return (
    <>
      <MuiNavbar />
      <PageContainer showPattern={true}>
        <div className="flex row wrap vw90 bg2 centerX">
          {products.map(
            (p, index) => <MuiCard id="bg1" className="m1 z30 bg1 _card" item={p} />
          )}
        </div>
      </PageContainer>
      <WB />
      <Footer />
    </>
  )
}
