import { useState } from 'react';
import data from '../data/variables.json';
import Image from './Image';
import Counter from './Counter';
import Description from './Description';

export default function Found({p}) {
    const [qty, setQty] = useState(1);
    const handleCounter = count => {
      setQty(count);
    }
    const handleCart = () => {
      let cartMessage = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${data.contact.cart}%0D%0AProducto: ${p.name}%0D%0ACantidad: ${qty}%0D%0A%0D%0A*Precio total: $${p.price * qty}*`
      window.open(cartMessage, '_blank');
    }

  return (
    <div className="flex row wrap vw75 bg1 m2 centerX2 br2 h-fit z30">
        <Image className="wrapped" fileName={p.filename} alt={p.name} />
        <div className="wrapped centerXY flexCh centerX centerXch">
            <div className="pad2 col">
                <h2>{p.name}</h2>
                <h2>${p.price}</h2>
                <Description data={p} />
                <center id="centerX2" className="w-fit pill centerYch row wrap evenly dark-bg pad1 m1">
                <span>Cantidad: </span>
                <Counter qty={qty} changeFx={count => handleCounter(count)} className="flex row m1x" btn="bg1 pill hw2 pointer" />
                <b>(${qty * p.price})</b>
                </center>
                <button className="pad1 pill bg2 centerXY pointer" onClick={handleCart}>Enviar Pedido!</button>
            </div>
        </div>
    </div>
  )
}
