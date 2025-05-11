import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ProductStage = () => {
  return (
    <div className="mx-auto my-2 px-2">
      <div className="grid grid-cols-2 md:grid-cols-3 w-full items-center gap-2">
        <Link href={'#'} className='col-span-1'>
          <Image
            src={'/product/01.jpg'}
            className="w-full h-full object-cover"
            alt="Product01"
            width={0}
            height={0}
            sizes="100vw"
            priority
          ></Image>
        </Link>
        <Link href={'#'} className='col-span-1'>
          <Image
            src={'/product/02.jpg'}
            className="w-full h-full object-cover"
            alt="Product02"
            width={0}
            height={0}
            sizes="100vw"
            priority
          ></Image>
        </Link>
        <Link href={'#'} className='col-span-2 md:col-span-1'>
          <Image
            src={'/product/03.jpg'}
            className="w-full h-full object-cover"
            alt="Product03"
            width={0}
            height={0}
            sizes="100vw"
            priority
          ></Image>
        </Link>
      </div>
    </div>
  )
}

export default ProductStage
