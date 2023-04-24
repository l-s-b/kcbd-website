import { useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/variables.json';
import products from '../data/products.json';
import MuiNavbar from '../comps/MuiNavbar';
import Footer from '../comps/Footer';
import WB from '../comps/WhatsAppButton';
import Image from '../comps/Image';
import Counter from '../comps/Counter';
import PageContainer from '../comps/PageContainer';
import Description from '../comps/Description';

export default function Product() {
  const { id } = useParams();
  const myProduct = products.find(p => parseInt(p.id) === parseInt(id));
  const [qty, setQty] = useState(1);
  const handleCounter = count => {
    setQty(count);
  }
  const handleCart = () => {
    let cartMessage = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${data.contact.cart}%0D%0AProducto: ${myProduct.name}%0D%0ACantidad: ${qty}%0D%0A%0D%0A*Precio total: $${myProduct.price * qty}*`
    window.open(cartMessage, '_blank');
  }
  
  return ( 
    <>
      <MuiNavbar />
      <PageContainer showPattern={true}>
        <div className="flex row wrap vw75 bg1 m2 centerX2 br2 h-fit z30">
          <Image className="wrapped" fileName={myProduct.filename} alt={myProduct.name} />
          <div className="wrapped centerXY flexCh centerX centerXch">
            <div className="pad2 col">
            <h2>{myProduct.name}</h2>
            <h2>${myProduct.price}</h2>
            <Description data={myProduct} />
            <center id="centerX2" className="w-fit pill centerYch row wrap evenly dark-bg pad1 m1">
              <span>Cantidad: </span>
              <Counter qty={qty} changeFx={count => handleCounter(count)} className="flex row m1x" btn="bg1 pill hw2 pointer" />
              <b>(${qty * myProduct.price})</b>
            </center>
            <button className="pad1 pill bg2 centerXY pointer" onClick={handleCart}>Enviar Pedido!</button>
            </div>
          </div>
        </div>
      </PageContainer>
      <WB />
      <Footer />
    </>
  )
}
