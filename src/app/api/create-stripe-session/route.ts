import { stripe } from '@/payment/stripe'
import { NextRequest, NextResponse } from 'next/server'
import { IProduct } from '@/types'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const { cartItems, orderItems, orderInfo } = await req.json()
  const cookieId = cookies().get('orderId')?.value
  const linedatas = cartItems.map((item: IProduct, index: number) => ({
    price_data: {
      currency: 'vnd',
      product_data: {
        images: [`https://fe9a-116-98-254-151.ngrok-free.app${item.images[0]}`],
        name: item.name,
      },
      unit_amount_decimal: item.price,
    },
    quantity: orderItems[index]?.quantity,
  }))
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [...linedatas],
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 25000,
            currency: 'vnd',
          },
          display_name: 'Phí vận chuyển',
        },
      },
    ],
    mode: 'payment',
    success_url: `https://fe9a-116-98-254-151.ngrok-free.app/checkouts/${cookieId}?session_id={CHECKOUT_SESSION_ID}?success=true`,
    cancel_url: `https://fe9a-116-98-254-151.ngrok-free.app/checkouts/${cookieId}?cancel=true`,
    metadata: {
      productIds: JSON.stringify(cartItems.map((item: IProduct) => item.id)),
      orderInfo: JSON.stringify(orderInfo),
    },
  })
  return NextResponse.json({ urlPayment: session.url })
}
