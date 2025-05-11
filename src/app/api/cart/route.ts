import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { ids } = await req.json()

  const products = await prisma.product.findMany({
    where: {
      id: { in: ids },
    },
  })

  return NextResponse.json(products)
}
