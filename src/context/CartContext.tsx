'use client'

import React, { createContext, useContext } from 'react'

type CartItem = {
  id: string
  quantity: number
}

interface CartType {
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  currentCart: CartItem[]
  addToCart: (id: string) => void
  deleteItem: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  removeCart: () => void
}

export const CartContext = createContext<CartType | null>(null)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setOpen] = React.useState<boolean>(false)
  const [currentCart, setCurrentCart] = React.useState<CartItem[]>([])
  const [flag, setFlag] = React.useState<number>(0)
  const MIN_QUANTITY = 1
  const MAX_QUANTITY = 5
  //const MAX_CART_ITEM = 10

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
      setCurrentCart(storedCart)
    }
  }, [flag])

  const handleAddToCart = (id: string, quantity: number = 1) => {
    try {
      // Tìm vị trí sản phẩm trong giỏ hàng
      const index = currentCart.findIndex((item: CartItem) => item.id === id)

      if (index !== -1 && currentCart[index].quantity < MAX_QUANTITY) {
        // Nếu đã có sản phẩm, tăng số lượng
        currentCart[index].quantity += quantity
      } else {
        // Nếu chưa có, thêm mới
        currentCart.push({ id, quantity })
      }

      // Lưu lại vào localStorage
      localStorage.setItem('cart', JSON.stringify(currentCart))

      setOpen(true)
    } catch (e) {
      console.error('Error adding to cart:', e)
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const newCart = currentCart.filter((item: any) => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(newCart))

      // Cập nhật currentCart để trigger re-render
      setCurrentCart(newCart)
    } catch (e) {
      console.error('Error delete to cart:', e)
    }
  }

  const handleInscreaseQuantity = async (id: string) => {
    try {
      const newCart = currentCart.map((item: CartItem) => {
        if (item.id === id && item.quantity < MAX_QUANTITY) {
          item.quantity += 1
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(newCart))
      // Cập nhật currentCart để trigger re-render
      setCurrentCart(newCart)
    } catch (e) {
      console.error('Error increase quantity:', e)
    }
  }

  const handleDecreaseQuantity = async (id: string) => {
    try {
      const newCart = currentCart.map((item: CartItem) => {
        if (item.id === id && item.quantity > MIN_QUANTITY) {
          item.quantity -= 1
        }
        return item
      })
      localStorage.setItem('cart', JSON.stringify(newCart))
      // Cập nhật currentCart để trigger re-render
      setCurrentCart(newCart)
    } catch (e) {
      console.error('Error decrease quantity:', e)
    }
  }

  const handleRemoveCart = () => {
    localStorage.removeItem('cart')
    setCurrentCart([])
    setFlag(flag + 1)
  }

  return (
    <CartContext.Provider
      value={{
        isOpen,
        setOpen,
        currentCart,
        addToCart: handleAddToCart,
        deleteItem: handleDeleteItem,
        increaseQuantity: handleInscreaseQuantity,
        decreaseQuantity: handleDecreaseQuantity,
        removeCart: handleRemoveCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
