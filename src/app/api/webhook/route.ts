import { stripe } from '@/payment/stripe'
import { NextResponse, NextRequest } from 'next/server'
import { createOrderWithStripe } from '@/app/actions/createOrderWithStripe'
import { LineItems } from '@/types'

export async function POST(req: NextRequest) {
  const payload = await req.text()
  const signature = req.headers.get('stripe-signature') as string
  if (!signature) return NextResponse.json({ status: 'error', error: 'Missing signature' })

  try {
    const event = stripe.webhooks.constructEvent(payload, signature, 'whsec_aUgGkoMWtfADxzbAVhxkg0GISFec6108')
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any
      const products = await stripe.checkout.sessions.listLineItems(session.id)
      //const infos = await stripe.checkout.sessions.retrieve(session.id, { expand: ['line_items.data.price.product'] })
      //console.log(JSON.parse(session?.metadata?.productIds))
      //console.log(JSON.parse(session?.metadata?.productIds[0]))
      //console.log(products.data)
      await createOrderWithStripe(session, products.data as LineItems)
    }
    return NextResponse.json({ status: 'success', received: true })
  } catch (error) {
    return NextResponse.json({ status: 'error', error: error })
  }
}
