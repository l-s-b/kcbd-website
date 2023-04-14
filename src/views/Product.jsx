import { useState } from 'react';
import { useParams } from 'react-router-dom';
import data from '../data/variables.json';
import products from '../data/products.json';
import MuiNavbar from '../comps/MuiNavbar';
import Footer from '../comps/Footer';
import WB from '../comps/WhatsAppButton';
import Image from '../comps/Image';
import Counter from '../comps/Counter';

export default function Product() {
  const { id } = useParams();
  const myProduct = products.find(p => parseInt(p.id) === parseInt(id));
  const [qty, setQty] = useState(1);
  const handleCounter = count => {
    setQty(count);
  }
  const handleCart = () => {
    let cartMessage = `https://api.whatsapp.com/send?phone=${data.contact.phone_test}&text=${data.contact.cart}%0D%0AProducto: ${myProduct.name}%0D%0ACantidad: ${qty}%0D%0A%0D%0A*Precio total: $${myProduct.price * qty}*`
    window.open(cartMessage, '_blank');
  }
  
  return ( 
    <>
      <MuiNavbar />
      <div className="vw100 flex centerX myBlack-bg">
        <div className="flex row vw75 bg2 centerX">
          <Image className="w50" fileName={myProduct.filename} alt={myProduct.name} />
          <div className="w50 centerXY flexCh centerX centerXch">
            <h2>{myProduct.name}</h2>
            <h3>${myProduct.price}</h3>
            <center id="centerX2" className="w50 pill row evenly myBlack-bg pad05 m1rem">
              Cantidad: 
              <Counter qty={qty} changeFx={count => handleCounter(count)} btn="bg1" />
              <b>(${qty * myProduct.price})</b>
            </center>
            <button className="w-fit pad1 pill flex centerXY" onClick={handleCart}>Enviar Pedido!</button>
          </div>
        </div>
      </div>
      <WB />
      <Footer />
    </>
  )
}
