'use server'

import prisma from '@/lib/prisma'
import { OrderItemInput, CheckoutInfoInput } from '@/types'

export async function createOrder(orderItems: OrderItemInput[], checkoutInfo: CheckoutInfoInput) {
  try {
    // Tính tổng giá trị đơn hàng
    const subTotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Tạo order
      const order = await prisma.order.create({
        data: {
          userId: '',
          total: subTotal + 25000,
          status: 'PENDING',
        },
      })
      // 2. Tạo orderItems
      const createdOrderItems = await Promise.all(
        orderItems.map((item) => {
          return prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            },
          })
        })
      )
      // 3. Tạo checkoutInfo
      const createCheckoutInfo = await prisma.checkoutInfo.create({
        data: {
          orderId: order.id,
          address: checkoutInfo.address,
          phone: checkoutInfo.phone,
          paymentMethod: checkoutInfo.paymentMethod,
        },
      })

      return {
        order,
        orderItems: createdOrderItems,
        checkoutInfo: createCheckoutInfo,
      }
    })
    return {
      success: true,
      orderId: result.order.id,
    }
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi tạo đơn hàng',
    }
  }
}
