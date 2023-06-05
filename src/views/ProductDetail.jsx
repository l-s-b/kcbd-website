import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import data from '../data/variables.json';
import MuiNavbar from '../comps/MuiNavbar';
import Footer from '../comps/Footer';
import WB from '../comps/WhatsAppButton';
import PageContainer from '../comps/PageContainer';
import Found from '../comps/Product';
import NotFound from '../comps/Product404';

export default function ProductDetail() {
  const { id } = useParams();
  const [myProduct, setMyProduct] = useState({
    found: null,
    data: null
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${data.backend}/product/${id}`);
        const product = response.data;
        setMyProduct({found: true, data: product});
      } catch (error) {
        console.log('Error fetching product:', error);
        setMyProduct({found: false, data: null});
      }
    };

    fetchProduct();
  }, [id]);

  const renderProduct = () => {
    if (myProduct.found === true) {
      return <Found p={myProduct.data} />;
    }
    if (myProduct.found === false) {
      return <NotFound />;
    }
  };

  return (
    <>
      <MuiNavbar showSearch={false} />
      <PageContainer showPattern={true} rotate={!myProduct.found}>
        {renderProduct()}
      </PageContainer>
      <WB />
      <Footer />
    </>
  );
};
