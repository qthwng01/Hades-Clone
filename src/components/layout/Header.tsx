'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import CartBar from '../CartBar'
import { ShoppingCart, Search, CircleUserRound, AlignJustify, X } from 'lucide-react'

const Header = () => {
  const { isOpen, setOpen, currentCart } = useCart()
  const [scrollY, setScrollY] = useState<number>(0)
  const [openMenu, setOpenMenu] = useState<boolean>(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setScrollY(window.scrollY)
      } else {
        setScrollY(0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrollY])

  return (
    <header
      className={`fixed top-0 left-0 z-10 w-full max-w-screen-2xl h-auto md:h-auto ${
        scrollY ? 'bg-white' : 'bg-inherit'
      }`}
    >
      <div className="container mx-auto w-full flex items-center justify-between gap-x-2 my-6 md:my-4 px-2 md:px-8 md:gap-0">
        {/* Mobile Icon Menu */}
        <div className="flex w-full h-full md:hidden">
         {openMenu ? (
           <span onClick={() => setOpenMenu(!openMenu)} className='cursor-pointer' id="menu-mobile">
            <AlignJustify size={22} />
          </span>
         ) : (
          <span onClick={() => setOpenMenu(!openMenu)} className='cursor-pointer' id="close-menu">
            <X size={25} />
          </span>
         )}
          {/* Overlay */}
          <div className={`fixed inset-0 top-24 bg-black bg-opacity-50 z-10 ${openMenu ? 'invisible transition-all duration-100' : 'visible transition-all ease-out duration-400'}`} id="overlay" />
          <nav className={`bg-white w-[85%] h-dvh fixed top-24 inset-0 z-20 translate-x-0 ease-in duration-300 visible ${openMenu && 'translate-x-[-100%] invisible'}`}>
            <ul className="flex flex-col items-left gap-x-6 text-[10px] font-normal pt-10 overflow-auto h-[80dvh]">
              <li className="relative mt-0 my-3 pl-4 border-b-1 pb-2 border-gray-200">
                <a className="li-a text-lg font-bold" href="/collections/all">
                  SHOP ALL
                </a>
              </li>
              <li className="relative my-3 pl-4 border-b-1 pb-2 border-gray-200">
                <a className="li-a text-lg font-bold" href="/collections/tops">
                  TOPS
                </a>
              </li>
              <li className="relative my-3 pl-4 border-b-1 pb-2 border-gray-200">
                <a className="li-a text-lg font-bold" href="/collections/bottoms">
                  BOTTOMS
                </a>
              </li>
              <li className="relative my-3 pl-4 border-b-1 pb-2 border-gray-200">
                <a className="li-a text-lg font-bold" href="/collections/outerwear">
                  OUTERWAER
                </a>
              </li>
              <li className="relative my-3 pl-4 border-b-1 pb-2 border-gray-200">
                <a className="li-a text-lg font-bold" href="/collections/bags">
                  BAGS
                </a>
              </li>
              <li className="relative my-3 pl-4 border-b-1 pb-2 border-gray-200">
                <a className="li-a text-lg font-bold" href="/collections/accessories">
                  ACCESSORIES
                </a>
              </li>
              <li className="relative my-3 pl-4 border-b-1 pb-2 border-gray-200">
                <a className="li-a text-lg font-bold" href="/collections/sale">
                  SALES
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="inline-flex items-center w-full h-full">
          <Link href={'/'} className="w-32">
            <h1 className="font-bold text-4xl pr-0 md:pr-8">
              <span className="hidden">HADES STUDIO</span>
              <Image
                src={'https://theme.hstatic.net/1000306633/1001194548/14/logo_menu_no_scroll.png?v=354'}
                alt="HADES STUDIO"
                width={0}
                height={0}
                unoptimized
                priority
                className="w-[200px] h-auto object-cover"
                sizes="100vw"
              ></Image>
            </h1>
          </Link>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-x-6 text-[10px] font-normal">
              <li className="relative">
                <a className="li-a" href="/collections/all">
                  SHOP ALL
                </a>
              </li>
              <li className="relative">
                <a className="li-a" href="/collections/tops">
                  TOPS
                </a>
              </li>
              <li className="relative">
                <a className="li-a" href="/collections/bottoms">
                  BOTTOMS
                </a>
              </li>
              <li className="relative">
                <a className="li-a" href="/collections/outerwear">
                  OUTERWAER
                </a>
              </li>
              <li className="relative">
                <a className="li-a" href="/collections/bags">
                  BAGS
                </a>
              </li>
              <li className="relative">
                <a className="li-a" href="/collections/accessories">
                  ACCESSORIES
                </a>
              </li>
              <li className="relative">
                <a className="li-a" href="/collections/sale">
                  SALES
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="inline-flex items-center gap-x-3 justify-end text-[10px] font-normal w-full h-full md:gap-x-4">
          {/* Desktop Icon */}
          <React.Fragment>
            <span className="hidden md:block">ĐĂNG NHẬP/ ĐĂNG KÝ</span>
            <span className="hidden md:block">TÌM KIẾM</span>
            <span className="cursor-pointer hidden md:block" onClick={() => setOpen(!isOpen)}>
              GIỎ HÀNG ({currentCart.length || 0})
            </span>
            <span className="hidden md:block">VI</span>
          </React.Fragment>
          {/* Mobile Icon */}
          <React.Fragment>
            <span className="block md:hidden">
              <CircleUserRound size={16} />
            </span>
            <span className="block md:hidden">
              <Search size={16} />
            </span>
            <span onClick={() => setOpen(!isOpen)} className="block md:hidden border-b-2 border-red-500">
              <ShoppingCart size={16} />
            </span>
          </React.Fragment>
          {/* Component CartBar */}
          <CartBar />
        </div>
      </div>
    </header>
  )
}

export default Header
