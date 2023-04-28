import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/products.json';
import MuiNavbar from '../comps/MuiNavbar';
import Footer from '../comps/Footer';
import WB from '../comps/WhatsAppButton';
import PageContainer from '../comps/PageContainer';
import Found from '../comps/Product';
import NotFound from '../comps/Product404';

export default function Product() {
  const { id } = useParams();
  const myProduct = products.find(p => parseInt(p.id) === parseInt(id));
  
  return ( 
    <>
      <MuiNavbar />
      <PageContainer showPattern={true} animation={!myProduct && "spin"}>
        {myProduct ? <Found p={myProduct} /> : <NotFound /> }
      </PageContainer>
      <WB />
      <Footer />
    </>
  )
}
