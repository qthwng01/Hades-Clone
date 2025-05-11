'use client'

import React, { useState, useEffect } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter, Button } from '@heroui/react'
import { useCart } from '@/context/CartContext'
import { IProduct } from '@/types'
import { formatVND } from '@/utils'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { useMediaQuery } from 'react-responsive'
import { X } from 'lucide-react'

const CartBar = () => {
  const { isOpen, setOpen, currentCart, deleteItem, increaseQuantity, decreaseQuantity } = useCart()
  const [cartItems, setCartItems] = useState<IProduct[]>([])
  const router = useRouter()
  const cartRaw = typeof window !== 'undefined' ? localStorage.getItem('cart') || '[]' : '[]'
  const isMobile = useMediaQuery({
    query: '(max-width: 420px)'
  })

  const handleCheckout = () => {
    const orderIdCookie = Cookies.get('orderId')

    if (!orderIdCookie) {
      const orderId = uuidv4()
      Cookies.set('orderId', orderId, { expires: 7, path: '/', secure: true })

      // Đợi 2s
      setTimeout(() => {
        router.push(`/checkouts/${orderId}`)
      }, 2000)
    } else {
      router.push(`/checkouts/${orderIdCookie}`)
    }
  }

  const getQuantity = (id: string) => {
    const cart: { id: string; quantity: number }[] = JSON.parse(cartRaw)
    const item = cart.find((item) => item.id === id)
    return item ? item.quantity : 0
  }

  useEffect(() => {
    const cartRaw = localStorage.getItem('cart') || '[]'
    const cart: { id: string; quantity: number }[] = JSON.parse(cartRaw)
    const ids = cart.map((item) => item.id)

    fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids }),
    })
      .then((res) => res.json())
      .then(setCartItems)
  }, [isOpen, currentCart])

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onOpenChange={setOpen}
        motionProps={{
          variants: {
            enter: {
              opacity: 1,
              x: isMobile ? 0 : -50,
              y: 50,
              transition: {
                duration: 0.3,
              },
            },
            exit: {
              opacity: 0,
              x: isMobile ? 0 : 50,
              y: 50,
              transition: {
                duration: 0.3,
              },
            },
          },
        }}
        className="w-full max-w-full md:max-w-[500px] h-4/6 overflow-hidden rounded-xl"
      >
        <DrawerContent>
          <div className="font-qs">
            <DrawerHeader className="flex flex-col gap-1 text-center font-semibold">Giỏ Hàng</DrawerHeader>
            <DrawerBody className="gap-0 overflow-y-auto scrollbar-hide min-h-[44vh] max-h-[45vh] px-1 mb-2 relative">
              {cartItems.length > 0 ? (
                cartItems.map((i, index) => (
                  <div key={index} className="flex items-center bg-gray-100 p-2 md:p-4 md:py-6">
                    <img src={i.images[0]} alt={i.name} className="mr-4 h-16 w-16 object-contain" />
                    <div className="flex-1">
                      <h3 className="text-[12px] md:text-md font-semibold text-gray-800 line-clamp-1">{i.name}</h3>
                      <p className="text-sm font-semibold text-gray-600">Stock: {i.stock}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center rounded-md border">
                          <button
                            onClick={() => decreaseQuantity(i.id)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 text-gray-800">{getQuantity(i.id)}</span>
                          <button
                            onClick={() => increaseQuantity(i.id)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        <div className="inline-flex items-center gap-x-4 text-right">
                          <p className="text-[10px] md:text-md font-semibold text-gray-800">
                            {formatVND(i.price * getQuantity(i.id))}
                          </p>
                          <p className="text-[10px] md:text-sm text-gray-500 line-through">5.908.000đ</p>
                        </div>
                      </div>
                      <p className="mt-2">
                        <span className="text-red-500">*</span>Số lượng tối đa là 5
                      </p>
                    </div>

                    <button onClick={() => deleteItem(i.id)} className="ml-0 mb-10 md:ml-4 text-gray-500 hover:text-gray-700">
                      <X size={15} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  Giỏ hàng trống...
                </p>
              )}
            </DrawerBody>
            <DrawerFooter>
              <Button
                color="primary"
                disabled={cartItems.length === 0}
                className="w-full text-white font-medium py-6"
                onPress={() => handleCheckout()}
              >
                Checkout
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CartBar
