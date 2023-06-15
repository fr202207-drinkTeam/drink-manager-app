import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Autoplay, Swiper as RealSwiper } from "swiper";
RealSwiper.use([Autoplay]);
type Props = {
  images: string[];
  slidesPerView: number;
  loop: boolean;
  autoplay: any;
  navigation: boolean;
};
const Slider = (props: Props) => {
  const { images, slidesPerView, loop, autoplay, navigation } = props;
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar]}
      slidesPerView={slidesPerView}
      loop={loop}
      pagination={{ clickable: true }}
      navigation={navigation}
      autoplay={autoplay}
      className="itemSwiper"
      style={{height: "30vw"}}
      // #f4e9d2
    >
      {images.map((image: string, index: number) => (
        <SwiperSlide key={index} style={{height: "100%"}} >
          <img src={image} alt="" style={{ width: "100%", height: "30vw" }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
