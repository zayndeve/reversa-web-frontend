import { Swiper as SwiperReact, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface SwiperProps {
  slides: React.ReactNode[];
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  loop?: boolean;
  navigation?: any;
}

const Swiper = ({ slides, slidesPerView = 4, spaceBetween = 30, loop = true, navigation }: SwiperProps) => (
  <SwiperReact
    modules={[Navigation]}
    slidesPerView={slidesPerView}
    spaceBetween={spaceBetween}
    loop={loop}
    navigation={navigation}
  >
    {slides.map((slide, index) => (
      <SwiperSlide key={index}>{slide}</SwiperSlide>
    ))}
  </SwiperReact>
);

export default Swiper;
