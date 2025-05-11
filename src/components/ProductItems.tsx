import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IProductList } from '@/types'
import { formatVND } from '@/utils'

interface IProps {
  allProducts: IProductList
}

const ProductItems: React.FC<IProps> = ({ allProducts }) => {

  return (
    <div className="w-full max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4">
      {allProducts.map((i, index) => (
        <div key={index} id="card-items" className="px-4 flex flex-col items-center">
          <div className="image-container">
            <Link href={`product/` + i.slug} title={i.name}>
              {/* Image main */}
              <Image
                alt="Card background"
                src={i.images[0]}
                width={0}
                height={0}
                className="w-full md:h-full object-cover image-main"
                sizes="100vw"
                loading="lazy"
              />
              {/* Image hover */}
              <Image
                alt="Card background"
                src={i.images[1]}
                width={0}
                height={0}
                className="w-full md:h-full image-hover"
                sizes="100vw"
                loading="lazy"
              />
            </Link>
          </div>
          <div className="text-center">
            <Link href={`product/` + i.slug} title={i.name}>
              <h3 className="text-[10px] md:text-[12px] leading-[18px] md:leading-[22px] font-semibold md:font-bold">{i.name}</h3>
            </Link>
            <p className="text-[10px] md:text-[14px]">{formatVND(i.price)}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductItems