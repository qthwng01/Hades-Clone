import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CarouselStage from '@/components/CarouselStage'
import ProductStage from '@/components/ProductStage'
import FeaturesItems from '@/components/FeaturesItems'
import Marquee01 from '@/components/Marquee01'
import Marquee02 from '@/components/Marquee02'
import ProductItems from '@/components/ProductItems'
import prisma from '@/lib/prisma'

export default async function Home() {
  const allProducts = await prisma.product.findMany()

  return (
    <>
      <Header />
      <CarouselStage />
      <ProductStage />
      <FeaturesItems />
      <Marquee01 />
      <ProductItems allProducts={allProducts} />
      <Marquee02 />
      <Footer />
    </>
  )
}
