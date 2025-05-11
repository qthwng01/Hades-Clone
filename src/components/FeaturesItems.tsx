import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const FeaturesItems = () => {
  return (
    <div className="mx-auto relative overflow-hidden">
      <Link href={'#'}>
        <Image
          src={'/product/ftitem.jpg'}
          className="w-full h-full object-cover"
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          priority
        ></Image>
      </Link>
    </div>
  )
}

export default FeaturesItems
