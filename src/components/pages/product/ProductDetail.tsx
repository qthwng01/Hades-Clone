'use client'

import React, { useState } from 'react'
import { Button } from '@heroui/react'
import Image from 'next/image'
import { Ruler } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { IProduct } from '@/types'
import { formatVND } from '@/utils'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// import required modules
import { Navigation, A11y, Pagination } from 'swiper/modules'
// Import Swiper styles
import 'swiper/css'

const data = [
  {
    id: 1,
    src: '/items/hades-001-camo/01.webp',
    alt: 'Image 1',
  },
  {
    id: 2,
    src: '/items/hades-001-camo/02.webp',
    alt: 'Image 2',
  },
  {
    id: 3,
    src: '/items/hades-001-camo/03.webp',
    alt: 'Image 3',
  },
  {
    id: 4,
    src: '/items/hades-001-camo/04.webp',
    alt: 'Image 4',
  },
  {
    id: 5,
    src: '/items/hades-001-camo/05.webp',
    alt: 'Image 5',
  },
  {
    id: 6,
    src: '/items/hades-001-camo/06.webp',
    alt: 'Image 6',
  },
  {
    id: 7,
    src: '/items/hades-001-camo/07.webp',
    alt: 'Image 7',
  },
  {
    id: 8,
    src: '/items/hades-001-camo/08.webp',
    alt: 'Image 8',
  },
  {
    id: 9,
    src: '/items/hades-001-camo/09.webp',
    alt: 'Image 9',
  },
  {
    id: 10,
    src: '/items/hades-001-camo/10.webp',
    alt: 'Image 10',
  },
  {
    id: 11,
    src: '/items/hades-001-camo/11.webp',
    alt: 'Image 11',
  },
  {
    id: 12,
    src: '/items/hades-001-camo/12.webp',
    alt: 'Image 12',
  },
]

interface IProps {
  product: IProduct
}

const ProductDetail: React.FC<IProps> = ({ product }) => {
  const { addToCart } = useCart()
  const [images] = useState([...data])
  const [activeIndex, setActiveIndex] = useState(0)
  const totalSlides = data.length // Số lượng slides

  // Tính progress với minimum height 5% khi ở slide đầu
  const progress = Math.max(5, (activeIndex / (totalSlides - 1)) * 100)

  const handleTest = async () => {
    try {
      const res = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      return res
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <main className="w-full max-w-[1024px] mx-auto -mt-20 md:mt-20 py-20">
      <div className="flex flex-col justify-center">
        {/* left */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-wrap flex-col-reverse md:flex-row">
            <div className="w-full md:w-1/4">
              <div className="w-full h-[120px] md:h-[450px] flex justify-center overflow-hidden">
                <div className="h-full overflow-scroll pd-scrollbar">
                  <Swiper
                    direction={'horizontal'} // Mặc định là ngang
                    slidesPerView={'auto'}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    modules={[Navigation, A11y, Pagination]}
                    className="h-full"
                    breakpoints={{
                      768: {
                        direction: 'vertical',
                        slidesPerView: data.length,
                        spaceBetween: 0,
                      },
                    }}
                  >
                    {data.map((i, index) => (
                      <SwiperSlide
                        key={index}
                        className="!h-[75px] !w-[55px] cursor-pointer my-1 md:!h-[75px] md:!w-[100px]"
                      >
                        <Image
                          src={i.src || ''}
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full h-full object-contain"
                          priority
                          alt="#"
                          onClick={() => setActiveIndex(index)}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Progress bar - ẩn trên mobile, hiện trên desktop */}
                <div className="hidden md:block h-full w-[1px] bg-gray-200 ml-1 relative">
                  <div
                    className="absolute top-0 left-0 w-full bg-black transition-all duration-300"
                    style={{ height: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="w-full md:w-3/5 ml-0 md:ml-8">
              <div className="w-full h-auto">
                <Image
                  src={images[activeIndex].src || ''}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-full object-contain"
                  priority
                  alt=""
                ></Image>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="w-full md:w-1/2 bg-gray-50">
          <div className="w-full max-w-2xl mx-auto flex justify-center">
            <div className="py-4 md:p-4">
              <h2 className="font-bold text-lg mb-2">{product.name}</h2>
              <div className="mb-2">
                <span className="font-normal text-sm text-gray-400 mr-2">SKU: HFTT0001</span>
                <span className="font-normal text-sm text-gray-400 mr-2">Stock: {product.stock}</span>
              </div>
              <div className="mb-2">
                <span>{formatVND(product.price)}</span>
              </div>
              <div className="mb-2">
                <span className="font-normal text-gray-600">Màu sắc</span>
                <div className="mt-4 flex items-center gap-x-2">
                  <div id="color">
                    <label className="relative cursor-pointer">
                      <input type="radio" name="color" value="red" className="peer hidden" />
                      <span className="block w-8 h-8 rounded bg-gray-200 border-4 border-transparent peer-checked:border-blue-200" />
                    </label>
                  </div>
                  <div id="color">
                    <label className="relative cursor-pointer">
                      <input type="radio" name="color" value="green" className="peer hidden" />
                      <span className="block w-8 h-8 rounded bg-gray-700 border-4 border-transparent peer-checked:border-blue-200" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <span className="font-normal text-gray-600">Size</span>
                  <div className="inline-flex items-center gap-x-1">
                    <Ruler size={20} />
                    <span className="underline underline-offset-2 font-bold cursor-pointer">Bảng size</span>
                  </div>
                </div>
                <div className="flex items-center w-full gap-x-4 mt-3">
                  <div className="w-full relative">
                    <input type="radio" id="1" name="Size" value="Size S" className="peer hidden" />
                    <label
                      htmlFor="1"
                      className="cursor-pointer select-none block text-center border border-gray-400 w-full px-8 py-3 peer-checked:border-black"
                    >
                      Size S
                    </label>
                  </div>
                  <div className="w-full relative">
                    <input type="radio" id="2" name="Size" value="Size M" className="peer hidden" />
                    <label
                      htmlFor="2"
                      className="cursor-pointer select-none block text-center border border-gray-400 w-full px-8 py-3 peer-checked:border-black"
                    >
                      Size M
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-y-2">
                <Button
                  onClick={() => addToCart(product.id)}
                  className="rounded-sm w-80 text-md font-semibold h-14 bg-gray-200 text-black"
                  color="primary"
                  variant="flat"
                >
                  THÊM VÀO GIỎ HÀNG
                </Button>
                <Button
                  onClick={handleTest}
                  className="rounded-sm w-80 text-md font-semibold h-14 text-white shadow-none"
                  color="primary"
                  variant="shadow"
                >
                  MUA NGAY
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ProductDetail
