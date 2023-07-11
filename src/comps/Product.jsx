import { useState } from 'react';
import { register } from 'swiper/element/bundle';
import data from '../data/variables.json';
import Image from './Image';
import Counter from './Counter';
import Description from './Description';
import MuiModalMP from './MuiModalMP';
register();

export default function Found({p}) {
  const [qty, setQty] = useState(1);
  const handleCounter = count => { setQty(count); }

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
                <Counter
                  qty={qty}
                  changeFx={count => handleCounter(count)}
                  className="flex row m1x _scaleWhenMobile"
                  btn="bg1 pill fs1-2 bold hoverToBG2 hw2 t200 pointer _scaleWhenMobile"
                />
                <b className="_scaleWhenMobile">(${qty * p.price})</b>
                </center>
                <MuiModalMP data={data} p={p} qty={qty} />
            </div>
        </div>
    </div>
  )
}
