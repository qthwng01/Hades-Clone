'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
import { ChevronRight, ChevronLeft } from 'lucide-react'

// Import Swiper React components
import { Swiper, SwiperSlide, type SwiperRef } from 'swiper/react'
// import required modules
import { Navigation, A11y } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'

const CarouselStage = () => {
  const swiperRef = useRef<SwiperRef | null>(null)

  return (
    <div className="relative mt-20 md:mt-0">
      <Swiper ref={swiperRef} modules={[Navigation, A11y]} loop className="mySwiper">
        <SwiperSlide>
          <Image src={'/carousel/01.jpg'} className='w-full h-[335px] md:h-full object-cover' alt="Carousel" width={0} height={0} sizes="100vw" priority></Image>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={'/carousel/02.jpg'} className='w-full h-[335px] md:h-full object-cover' alt="Carousel" width={0} height={0} sizes="100vw" priority></Image>
        </SwiperSlide>
      </Swiper>
      {/* Custom navigation */}
      <div className="absolute bottom-4 right-4 z-10 flex gap-1 shadow-sm md:gap-2">
        <button
          className="bg-slate-100/50 border-2 border-transparent p-1 md:p-4"
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <ChevronLeft className='text-[12px] md:text-[35px]' />
        </button>
        <button
          className="bg-slate-100/50 border-2 border-transparent p-1 md:p-4"
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <ChevronRight className='text-[12px] md:text-[35px]' />
        </button>
      </div>
    </div>
  )
}

export default CarouselStage
