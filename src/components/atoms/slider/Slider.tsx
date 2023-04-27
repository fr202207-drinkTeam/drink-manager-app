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
    >
      {images.map((image: string, index: any) => (
        <SwiperSlide key={index}>
          <img src={image} alt="商品画像" style={{ width: "100%" }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
