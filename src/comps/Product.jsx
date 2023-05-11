import { useState } from 'react';
import { register } from 'swiper/element/bundle';
import data from '../data/variables.json';
import Image from './Image';
import Counter from './Counter';
import Description from './Description';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/element/css/effect-fade';
register();

export default function Found({p}) {
  const [qty, setQty] = useState(1);
  const handleCounter = count => { setQty(count); }
  const handleCart = () => {
    let cartMessage = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${data.contact.cart}%0D%0AProducto: ${p.detail}%0D%0ACantidad: ${qty}%0D%0A%0D%0A*Precio total: $${p.price * qty}*`
    window.open(cartMessage, '_blank');
  }

  return (
    <div className="flex row wrap vw75 bg1 m2y centerX2 br2 h-fit z30">
      <swiper-container
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        pagination={true}
        navigation={true}
        effect="fade"
        class="wrapped"
      >
        {p.images.map(
          (image, index) => <swiper-slide key={index} class="flex centerY">
            <Image fileName={image} alt={p.detail + index} />
          </swiper-slide>
        )}
      </swiper-container>
        <div className="wrapped centerXY flexCh centerX centerXch">
            <div className="pad2 col">
                <h2>{p.detail}</h2>
                <h2>${p.price}</h2>
                <Description data={p} />
                <center id="centerX2" className="w-fit pill centerYch row wrap evenly dark-bg pad1 m1">
                <span>Cantidad: </span>
                <Counter qty={qty} changeFx={count => handleCounter(count)} className="flex row m1x" btn="bg1 pill fs1-2 bold hoverToBG2 hw2 t200 pointer" />
                <b>(${qty * p.price})</b>
                </center>
                <button className="pad1 pill bg2 fs1-2 bold hoverToDark t400 centerXY pointer" onClick={handleCart}>Enviar Pedido!</button>
            </div>
        </div>
    </div>
  )
}
