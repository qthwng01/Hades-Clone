'use client'

import React, { useState, useEffect } from 'react'
import { ShoppingBag } from 'lucide-react'
import { Form, Input, Button, Select, SelectItem, Radio, RadioGroup, Checkbox } from '@heroui/react'
import OrderSucess from '../OrderSucess'
import { IProduct } from '@/types'
import { formatVND } from '@/utils'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { createOrder } from '@/app/actions/createOrder'
import { OrderItemInput, CheckoutInfoInput } from '@/types'
import { useCart } from '@/context/CartContext'
import { useSearchParams } from 'next/navigation'

const animals = [
  { key: 'cat', label: 'Cat' },
  { key: 'dog', label: 'Dog' },
  { key: 'elephant', label: 'Elephant' },
  { key: 'lion', label: 'Lion' },
  { key: 'tiger', label: 'Tiger' },
  { key: 'giraffe', label: 'Giraffe' },
  { key: 'dolphin', label: 'Dolphin' },
  { key: 'penguin', label: 'Penguin' },
  { key: 'zebra', label: 'Zebra' },
  { key: 'shark', label: 'Shark' },
  { key: 'whale', label: 'Whale' },
  { key: 'otter', label: 'Otter' },
  { key: 'crocodile', label: 'Crocodile' },
]

const CheckoutIndex = () => {
  const [cartItems, setCartItems] = useState<IProduct[]>([])
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { removeCart } = useCart()
  const router = useRouter()
  const searchParams = useSearchParams()

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
  }, [])

  // Lấy số lượng sản phẩm trong giỏ hàng
  const getQuantity = (id: string) => {
    const cartRaw = typeof window !== 'undefined' ? localStorage.getItem('cart') || '[]' : '[]'
    const cart: { id: string; quantity: number }[] = JSON.parse(cartRaw)
    const item = cart.find((item) => item.id === id)
    return item ? item.quantity : 0
  }

  // Tính tiền
  const subTotal = cartItems?.reduce((total, item) => {
    const quantity = getQuantity(item.id)
    return total + item.price * quantity
  }, 0)

  // Hàm submit form
  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const formData = Object.fromEntries(new FormData(e.currentTarget))
      // Lấy thông tin sản phẩm
      const orderItems: OrderItemInput[] = []
      cartItems.forEach((item) => {
        orderItems.push({
          productId: item.id,
          quantity: getQuantity(item.id),
          price: item.price * getQuantity(item.id),
        })
      })
      // Lấy thông tin đơn hàng
      const orderInfo: CheckoutInfoInput = {
        address: formData.address.toString(),
        phone: formData.phone.toString(),
        paymentMethod: formData?.payment.toString(),
      }

      if (orderInfo.paymentMethod === 'cod') {
        // Gửi thông tin đơn hàng qua action
        const result = await createOrder(orderItems, orderInfo)
        if (result.success) {
          setTimeout(() => {
            handleShowModal()
          }, 1000)
        }
      } else {
        // Gửi thông tin đơn hàng qua stripe
        const res = await fetch('/api/create-stripe-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartItems, orderItems, orderInfo }),
        })

        // Chuyển hướng đến trang thanh toán stripe
        const { urlPayment } = await res.json()
        if (urlPayment) window.location.href = urlPayment
      }
    } catch (err) {
      console.log(err)
    }
  }

  // const handleTest = async () => {
  //   try {
  //     // Lấy thông tin sản phẩm
  //     const orderItems: OrderItemInput[] = []
  //     cartItems.forEach((item) => {
  //       orderItems.push({
  //         productId: item.id,
  //         quantity: getQuantity(item.id),
  //         price: item.price * getQuantity(item.id),
  //       })
  //     })
  //     // Gửi thông tin đơn hàng qua stripe
  //     const res = await fetch('/api/create-stripe-session', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ cartItems, orderItems }),
  //     })

  //     // Chuyển hướng đến trang thanh toán stripe
  //     const { urlPayment, sessionId, status } = await res.json()
  //     if (urlPayment) window.location.href = urlPayment

  //     // Nếu thanh toán thành công
  //     if (sessionId && status === 'success') {
  //       setTimeout(() => {
  //         handleShowModal()
  //       }, 1000)
  //     }
  //   } catch (e) {}
  // }

  // Hàm mở modal order success
  const handleShowModal = () => {
    setOpenModal(true)
  }

  // Hàm đóng modal order success
  const handleCloseModal = () => {
    setOpenModal(false)
    setIsLoading(false)
    removeCart()
    Cookies.remove('orderId')
    router.push('/')
  }

  // Kiểm tra trạng thái thanh toán stripe và code
  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      handleShowModal()
    }
  }, [searchParams])

  return (
    <div className="w-full font-qs">
      <OrderSucess openModal={openModal} setOpenModal={setOpenModal} handleCloseModal={handleCloseModal} />
      {/* <!-- Header --> */}
      <header className="flex justify-between items-center py-8 border-b-1 border-gray-500">
        <div className="container w-full max-w-full md:max-w-[1180px] flex items-center justify-between">
          <h1 className="text-2xl md:text-5xl font-bold">HADES STUDIO</h1>
          <div className="text-lg">
            <ShoppingBag />
          </div>
        </div>
      </header>
      {/* Form */}
      <div className="flex flex-wrap max-w-full md:max-w-[1180px] mx-auto px-8 h-auto flex-col-reverse md:flex-row">
        <Form onSubmit={handleOnSubmit} className="basis-full max-w-full md:basis-1/2 md:max-w-[50vw] h-full bg-white py-6 pr-4">
          <Select
            isRequired
            className="max-w-full mb-2"
            items={animals}
            label="Chọn tỉnh thành"
            labelPlacement="outside"
            name="province"
            placeholder="Tỉnh thành"
            errorMessage="Hãy chọn tỉnh thành"
          >
            {(animal) => <SelectItem>{animal.label}</SelectItem>}
          </Select>
          <Input
            isRequired
            className="max-w-full mb-2"
            label="Họ và tên"
            labelPlacement="outside"
            name="username"
            placeholder="Nhập họ tên"
            type="text"
            validate={(value) => {
              if (!value.trim()) return 'Hãy nhập họ và tên'
              else return true
            }}
          />
          <Input
            isRequired
            className="max-w-full mb-2"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Nhập email đúng định dạng"
            type="email"
            validate={(value) => {
              if (!/\S+@\S+\.\S+/.test(value)) return 'Email không hợp lệ'
              else return true
            }}
          />
          <Input
            isRequired
            className="max-w-full mb-2"
            errorMessage="Nhập đầy đủ địa chỉ"
            label="Địa chỉ"
            labelPlacement="outside"
            name="address"
            placeholder="Nhập đầy đủ địa chỉ nhận hàng"
            type="text"
          />
          <Input
            isRequired
            className="max-w-full mb-2"
            label="Số điện thoại"
            labelPlacement="outside"
            name="phone"
            placeholder="Nhập số điện thoại"
            type="text"
            validate={(value) => {
              if (!/^[0-9]{10,11}$/.test(value)) return 'Số điện thoại không hợp lệ'
              else return true
            }}
          />

          <div className="w-full h-full">
            <p className="my-2">Phương thức vận chuyển</p>
            <div className="w-full flex justify-between items-center gap-2 mt-4 mb-8 pr-4 pl-2 py-4 border-1 border-gray-300 rounded-md">
              <Checkbox isIndeterminate>Giao hàng tận nơi</Checkbox>
              <span>25,000đ</span>
            </div>
          </div>

          <div className="w-full h-full">
            <p className="my-2">Phương thức thanh toán</p>
            <div className="w-full flex flex-col flex-wrap gap-4 mt-4 mb-8 pr-4 pl-2 py-4 border-1 border-gray-300 rounded-md">
              <RadioGroup name="payment" defaultValue="cod">
                <Radio name="payment" value="cod">
                  Thanh toán khi nhận hàng (COD)
                </Radio>
                <Radio name="payment" value="stripe">
                  Thanh toán qua Stripe
                </Radio>
              </RadioGroup>
            </div>
          </div>

          <div className="w-full max-w-full ">
            <Button
              color="primary"
              isLoading={isLoading}
              className="w-full rounded-lg text-md font-bold text-white h-[50px]"
              type="submit"
            >
              ĐẶT ĐƠN
            </Button>
          </div>
        </Form>
        {/* <!-- Right Column: Product Info --> */}
        <div className="basis-full max-w-full md:basis-1/2 md:max-w-[50vw] bg-[length:50vw_100%] bg-right bg-no-repeat border-l-1 bg-[#ededed] border-gray-500 pl-8 pr-4 py-10">
          <div className="w-full">
            <div className="flex flex-wrap gap-4 items-center mb-4">
              {cartItems.map((i, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-4">
                    <img src={i.images[0]} alt={i.name} className="h-14 w-14 object-contain" />
                    <div className="flex-wrap">
                      <h3 className="text-lg font-semibold">{i.name}</h3>
                      <p className="text-gray-600">Qt: {getQuantity(i.id)}</p>
                    </div>
                  </div>
                  <div className="ml-auto">{formatVND(i.price)}</div>
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center mb-4">
              <input type="text" placeholder="Discount code or gift card" className="w-full p-2 border rounded-lg" />
              <button className="ml-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg">
                Apply
              </button>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Tạm tính</span>
                <span>{formatVND(subTotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-green-600">{formatVND(25000)}</span>
              </div>
              {/* <div className="flex justify-between mb-2">
                <span>Duties</span>
                <span>đ1,885,892</span>
              </div> */}
              <div className="flex justify-between mb-2">
                <span>Thuế</span>
                <span>{formatVND(0)}</span>
              </div>
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng tiền</span>
                <span>{formatVND(subTotal + 25000)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutIndex
