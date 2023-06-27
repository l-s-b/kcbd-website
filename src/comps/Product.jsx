import { useState } from 'react';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
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
initMercadoPago("APP_USR-2074cd4c-4f91-475c-803f-60a4f640c72f");

export default function Found({p}) {
  const [qty, setQty] = useState(1);
  const [preferenceId, setPreferenceId] = useState(null);
  
  const handleCounter = count => { 
    setQty(count);
  }
  const handleCart = () => {
    let cartMessage = `https://api.whatsapp.com/send?phone=${data.contact.phone}&text=${data.contact.cart}%0D%0AProducto: ${p.detail}%0D%0ACantidad: ${qty}%0D%0A%0D%0A*Precio total: $${p.price * qty}*`
    window.open(cartMessage, '_blank');
  }
  const createPref = async () => {
    try {
      const response = await axios.post(
          `${data.backend2}/create_preference`,
          {
            detail: p.detail,
            price: p.price,
            qty: qty,
            currency_id: "ARS"
          }
        );
        const { id } = response.data;
        return id;
    } catch (error) {
      console.log(error);
    }
  };
  const handleMP = async () => {
    const id = await createPref();
    if (id) { setPreferenceId(id) }
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
                <span className="fs1-2">Cantidad: </span>
                <Counter qty={qty} changeFx={count => handleCounter(count)} className="flex row m1x _scaleWhenMobile" btn="bg1 pill fs1-2 bold hoverToBG2 hw2 t200 pointer _scaleWhenMobile" />
                <b className="_scaleWhenMobile">(${qty * p.price})</b>
                </center>
                <button
                  className="pad1 pill bg2 fs1-2 bold hoverToDark t400 centerXY pointer"
                  onClick={handleCart}
                >
                  Enviar Pedido!
                </button>
                
                {preferenceId ?
                <div id="_mp"><Wallet initialization={{preferenceId}} /></div>
                : <button
                className="pad1 m1y pill bg2 fs1-2 bold hoverToDark t400 centerXY pointer"
                onClick={handleMP}
              >
                MP
              </button>
              }
            </div>
        </div>
    </div>
  )
}
