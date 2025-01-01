  // return (
  //   <div className='flex flex-col sm:flex-row border border-gray-400 rounded-lg overflow-hidden shadow-lg'>
  //     {/* Hero left side */}
  //     <div className='w-full sm:w-1/2 flex items-center justify-center bg-gradient-to-r from-gray-100 via-white to-gray-100 p-10 sm:p-0'>
  //         <div className='text-gray-800'>
  //               <div className='flex items-center gap-2 mb-3'>
  //                   <p className='w-8 md:w-11 h-[2px] bg-gray-800'></p>
  //                   <p className='font-medium text-sm md:text-base'>OUR BESTSELLER</p>
  //               </div>
  //               <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
  //               <div className='flex items-center gap-2 mt-3'>
  //                   <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
  //                   <p className='w-8 md:w-11 h-[1px] bg-gray-800'></p>
  //               </div>
  //         </div>
  //     </div>
  //     {/* Hero right side */}
  //     <div className='w-full sm:w-1/2'>
  //       <img className='w-full h-full object-cover' src={assets.hero_img} alt='Hero' />
  //     </div>
  //   </div>
  // )

import React, { useRef, useState, useEffect } from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  const carouselRef = useRef(null);
  const [speed, setSpeed] = useState(1.2);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const moveCarousel = () => {
      setPosition((prevPosition) => {
        let newPosition = prevPosition - speed;
        if (newPosition < -320) {
          newPosition = 0;
          const carousel = carouselRef.current;
          carousel.appendChild(carousel.firstElementChild);
        }
        return newPosition;
      });
      requestAnimationFrame(moveCarousel);
    };

    moveCarousel();
  }, [speed]);

  return (
    <div className="relative pt-8 lg:pt-12 overflow-hidden bg-gradient-to-b from-orange-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner */}
        <div className="text-center mb-8">
          <span className="bg-orange-100 text-orange-800 px-4 py-1.5 rounded-full text-sm font-semibold inline-block 
            shadow-sm hover:bg-orange-200 transition-colors duration-300 animate-fade-in">
            Blooming Gifts, Unforgettable Moments!
          </span>
        </div>

        {/* Main Content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold mb-4 
            tracking-tight bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent
            animate-fade-in-up">
            Welcome to GiftBloom!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed
            font-medium animate-fade-in-up delay-100">
            Explore a world of unique and thoughtful gifts, perfect for every occasion. 
            From personalized treasures to creative surprises, we offer something special 
            for everyone.
          </p>
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-8 lg:mt-12 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none h-48 bottom-0" />
        <div className="carousel-wrapper relative">
          <div className="carousel-container absolute left-1/2 -translate-x-1/2">
            <div
              className="carousel-track flex gap-4"
              ref={carouselRef}
              style={{ transform: `rotate(-5deg) translateX(${position}px)` }}
              
            >
              {[assets.hero_img, assets.hero_img1, assets.hero_img2, 
                assets.hero_img3, assets.hero_img4, assets.hero_img6].map((img, index) => (
                <div key={index} className="carousel-card transform transition-transform duration-300 hover:scale-105">
                  <img
                    src={img}
                    alt={`Carousel image ${index + 1}`}
                    className="rounded-xl shadow-lg h-48 w-64 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
 