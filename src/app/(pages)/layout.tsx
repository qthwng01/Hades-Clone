import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Marquee02 from '@/components/Marquee02'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Marquee02 />
      <Footer />
    </>
  )
}

export default MainLayout
