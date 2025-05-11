import React from 'react'

const Marquee02 = () => {
  return (
    <div className="relative flex overflow-hidden pt-8 gap-x-80">
      <div className="flex animate-marquee3 whitespace-nowrap gap-x-80 pl-80">
        <h2 className="mx-4 text-[45px] md:text-[75px] font-bold leading-[53px] md:leading-[83px] uppercase text-outline">Streetwear Brand Limited</h2>
        <h2 className="mx-4 text-[45px] md:text-[75px] font-bold leading-[53px] md:leading-[83px] uppercase text-outline">Streetwear Brand Limited</h2>

      </div>
      <div className="absolute animate-marquee4 whitespace-nowrap flex gap-x-80 pl-80">
        <h2 className="mx-4 text-[45px] md:text-[75px] font-bold leading-[53px] md:leading-[83px] uppercase text-outline">Streetwear Brand Limited</h2>
        <h2 className="mx-4 text-[45px] md:text-[75px] font-bold leading-[53px] md:leading-[83px] uppercase text-outline">Streetwear Brand Limited</h2>
      
      </div>
    </div>
  )
}

export default Marquee02
