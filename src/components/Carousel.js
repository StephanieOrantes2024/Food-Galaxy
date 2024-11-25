import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../assets/styles.css";


const Carousel = ({ searchHistory }) => {
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Historial de Búsquedas</h2>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {searchHistory.map((dish) => (
          <SwiperSlide key={dish.idMeal}>
            <img
              src={dish.strMealThumb}
              alt={dish.strMeal}
              className="carousel-image"
            />
            <p className="carousel-item-title">{dish.strMeal}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      
  
    </div>
  );
};

export default Carousel;
