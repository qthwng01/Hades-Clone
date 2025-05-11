import { cookies } from 'next/headers'
import CheckoutIndex from '@/components/pages/checkouts/CheckoutIndex'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trang thanh toán | Hades Studio',
  description: 'Description here when data is available',
}
 

export default function CheckoutPage({ params }: { params: { id: string } }) {
  const { id } = params
  const cookieStore = cookies()
  const orderId = cookieStore.get('orderId')

  if (id !== orderId?.value) {
    notFound()
  }

  return (
    <>
      <CheckoutIndex />
    </>
  )
}
