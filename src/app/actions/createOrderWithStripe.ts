'use server'

import prisma from '@/lib/prisma'
import { ISessionStripe, LineItems } from '@/types'

export async function createOrderWithStripe(session: ISessionStripe, products: LineItems) {
 const productIds = JSON.parse(session?.metadata?.productIds)
 const infos = JSON.parse(session?.metadata?.orderInfo)

  try {
    // Tính tổng giá trị đơn hàng
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Tạo order
      const order = await prisma.order.create({
        data: {
          userId: '',
          total: session.amount_total,
          status: session.status,
        },
      })
      // 2. Tạo orderItems
      const createdOrderItems = await Promise.all(
        products.map((item, index) => {
          return prisma.orderItem.create({
            data: {
              orderId: order.id,
              productId: productIds[index],
              quantity: item.quantity,
              price: item.amount_subtotal,
            },
          })
        })
      )
      // 3. Tạo checkoutInfo
      const createCheckoutInfo = await prisma.checkoutInfo.create({
        data: {
          orderId: order.id,
          address: infos.address,
          phone: infos.phone,
          paymentMethod: infos.paymentMethod,
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
