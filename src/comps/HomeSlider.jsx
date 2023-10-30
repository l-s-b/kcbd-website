import { register } from 'swiper/element/bundle';
import Image from "./Image";
import '../css/Swiper.css';
import useResize from './useResize';
register();

export default function HomeSlider() {
    return (
        <swiper-container
          class="m2y flex"
          style={{marginTop: "2rem", maxWidth: "100vw", backdropFilter: "blur(4px) brightness(0.6)"}}
          slides-per-view={useResize().slidesPerView}
          spaceBetween={0}
          effect="fade" // "flip" "slide" "cards" "fade" "coverflow" "cube"
          speed="900"
          loop="true"
          pagination="true"
          navigation="false"
          autoplay-delay="3000"
          autoplay-disable-on-interaction={false}
        >
          <swiper-slide style={{display: "flex", justifyContent: "center"}} key="1">
            <Image style={{height: "auto", width: "auto", maxHeight: "80vh", maxWidth: "100vw"}} fileName="swiper-imgs/riko.jpg" alt="Promo 4x3" />
          </swiper-slide>
          <swiper-slide style={{display: "flex", justifyContent: "center"}} key="2">
            <Image style={{height: "auto", width: "auto", maxHeight: "80vh", maxWidth: "100vw"}} fileName="swiper-imgs/cogo1.webp" alt="no img yet ..." />
          </swiper-slide>
          <swiper-slide style={{display: "flex", justifyContent: "center"}} key="3">
            <Image style={{height: "auto", width: "auto", maxHeight: "80vh", maxWidth: "100vw"}} fileName="swiper-imgs/cogo2.webp" alt="no img yet ..." />
          </swiper-slide>
          <swiper-slide style={{display: "flex", justifyContent: "center"}} key="4">
            <Image style={{height: "auto", width: "auto", maxHeight: "80vh", maxWidth: "100vw"}} fileName="swiper-imgs/cogo3.webp" alt="no img yet ..." />
          </swiper-slide>
          <swiper-slide style={{display: "flex", justifyContent: "center"}} key="4">
            <Image style={{height: "auto", width: "auto", maxHeight: "80vh", maxWidth: "100vw"}} fileName="swiper-imgs/cogo7.webp" alt="no img yet ..." />
          </swiper-slide>
        </swiper-container>
    )
}
