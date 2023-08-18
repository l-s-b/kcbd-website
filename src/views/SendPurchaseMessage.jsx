import React from 'react';
import MuiNavbar from '../comps/MuiNavbar';
import Footer from '../comps/Footer';
import PageContainer from '../comps/PageContainer';
import data from '../data/variables.json';

export default function SendPurchaseMessage() {

  function openMessageTab() {
    let purchaseURL = localStorage.getItem('lastPurchaseMsg')
    if (!purchaseURL) {
      purchaseURL = `https://api.whatsapp.com/` +
      `send?phone=${data.contact.phone}` +
      `&text=Hola! Acabo de comprarte productos por KundaliniCBD.com. Coordinamos para el envío?`
    }
    window.open(purchaseURL, "__blank")
  }

  function PurchaseMessage() {
    return (
    <div className="flex col z30 centerX centerXY">
      <h1>Compra exitosa!</h1>
      
      <button
        className="pad1 m2y pill bg1 hoverToDark t400 centerXY pointer"
        onClick={openMessageTab}
      >
        Enviar comprobante
      </button>
    </div>)
  }

  return (
    <>
      <MuiNavbar showSearch={false} />
      <PageContainer showPattern={true} rotate={true}>
        <PurchaseMessage />
      </PageContainer>
      <Footer />
    </>
  );
};