import { useState } from 'react';
import data from '../data/variables.json';
import products from '../data/products.json';
import { useParams } from 'react-router-dom';
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
    let cartMessage = `
    https://api.whatsapp.com/send?phone=${data.contact.phone_test}&text=${data.contact.cart}%0D%0AProducto: ${myProduct.name}%0D%0ACantidad: ${qty}%0D%0A%0D%0A*Precio total: $${myProduct.price * qty}*`
    window.open(cartMessage, '_blank');
  }
  
  return (
    <div className="vw100 flex centerX myBlack-bg">
      <div className="flex col vw75 bg2 centerX">
        <h2>{myProduct.name}</h2>
        <Image fileName={myProduct.filename} alt={myProduct.name} />
        <h3>${myProduct.price}</h3>
        <Counter qty={qty} changeFx={count => handleCounter(count)} btn="bg1" />
        <h4>(${qty * myProduct.price})</h4>
        <button className="w-fit flex centerXY" onClick={handleCart}>Enviar Pedido!</button>
      </div>
    </div>
  )
}
