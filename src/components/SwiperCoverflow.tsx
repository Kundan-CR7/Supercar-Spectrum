import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "./swiper.css";
import { ReactTyped } from "react-typed";
import { ChevronDown } from "lucide-react";

import Pic1 from "./Hellcatt.jpg";
import Pic2 from "./CarreraGT.jpg";
import Pic3 from "./Lambo.jpg";
import Pic4 from "./Mustang.jpg";
import Pic5 from "./Lexusss.jpg";
import Pic6 from "./Supra.jpg";
import Pic7 from "./720S.jpg";


const slideData = [
  {
    image: Pic1,
    audio: "/audio/Challenger Hellcat.mp3",
    name: "Dodge Hellcat",
    description:
      "A muscle beast with raw power and aggressive looks. Known for its supercharged V8 and thrilling sound.",
  },
  {
    image: Pic2,
    audio: "/audio/Carrera GT.mp3",
    name: "Porsche Carrera GT",
    description:
      "A legendary V10 hypercar that blends performance with elegance. A true collector’s dream.",
  },
  {
    image: Pic3,
    audio: "/audio/Aventador_SVJ.mp3",
    name: "Lamborghini Aventador",
    description:
      "An Italian masterpiece. Bold, loud, and fast. The Aventador commands attention on any street.",
  },
  {
    image: Pic4,
    audio: "/audio/Mustang GT350R.mp3",
    name: "Ford Mustang",
    description:
      "An American icon. The Mustang is the perfect mix of classic muscle and modern engineering.",
  },
  {
    image: Pic5,
    audio: "/audio/Lexus LFA.mp3",
    name: "Lexus LFA",
    description:
      "One of the most refined V10s ever made. Precision, beauty, and performance in perfect balance.",
  },
  {
    image: Pic6,
    audio: "/audio/Toyota Supra.mp3",
    name: "Toyota GR Supra",
    description:
      "A sleek sports car with a turbocharged engine, known for its sharp handling and iconic design.",
  },
  {
    image: Pic7,
    audio: "/audio/McLaren-720S.mp3",
    name: "720S",
    description:
      "A lightweight supercar with a twin-turbo V8, offering unmatched speed and precision handling.",
  }
  
];

const SwiperCoverflow = () => {
  const swiperRef = useRef(null);
  const [currentAudio, setCurrentAudio] = useState(null);
  const isFirstRender = useRef(true);

  const playAudioForSlide = (index) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audioSrc = slideData[index]?.audio;
    if (audioSrc) {
      const newAudio = new Audio(audioSrc);
      newAudio.play();
      setCurrentAudio(newAudio);
    }
  };

  useEffect(() => {
    const section = document.getElementById("swiper");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && currentAudio) {
            currentAudio.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [currentAudio]);

  return (
    <div className="bg-[#10172a] min-h-screen pb-10 relative" id="swiper">
      <div className="text-center py-8">
      <h2 className="text-6xl md:text-7xl font-extrabold mb-6 text-transparent text-center bg-clip-text bg-gradient-to-r from-gray-400 via-silver-600 to-gray-800 text-shadow-md metallic-boss1">
      The Symphony of Speed
        </h2>

        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-mono">
          Dive into the world of iconic supercars — where roaring engines meet timeless design.
          A curated showcase of power, beauty, and pure automotive emotion.
        </p>
      </div>

      <div className="text-2xl md:text-3xl text-center font-medium text-gray-200 mb-4">
        <span className="text-yellow-400 drop-shadow-sm">
          <ReactTyped
            strings={[
              "Tap to Awaken the Beast",
              "Legends Aren't Born — They're Engineered",
              "Every Slide Unleashes a New Icon",
            ]}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </span>
      </div>

      <div className="text-center text-sm md:text-base text-yellow-200 bg-yellow-900/10 border border-yellow-500/30 px-4 py-2 rounded-xl max-w-md mx-auto mb-6 shadow-sm">
        <strong className="font-medium">Tip:</strong> Audio will auto-play with each car.
        Turn up your speakers and feel the legacy.
      </div>

      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        initialSlide={3}
        speed={500}
        slidesPerView={"auto"}
        onClick={(swiper) => swiper.slideTo(swiper.clickedIndex)}
        pagination={{ clickable: true, el: ".swiper-pagination" }}
        coverflowEffect={{
          rotate: 0,
          stretch: 40,
          depth: 500,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Pagination]}
        className="swiper"
        onSlideChange={(swiper) => {
          playAudioForSlide(swiper.activeIndex);
        }}
      >
        {slideData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="rounded-xl shadow-lg border border-gray-700"
              />
              <p className="title text-white text-xl md:text-2xl font-semibold mt-3 tracking-wide">
                {slide.name}
              </p>
              <p className="description text-sm md:text-base text-gray-300 mt-1 mx-auto leading-relaxed">
                {slide.description}
              </p>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination" />
      </Swiper>
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-50">
          <ChevronDown size={32} color="white"/>
        </div>
    </div>
  );
};

export default SwiperCoverflow;
