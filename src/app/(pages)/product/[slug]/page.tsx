import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ProductDetail from '@/components/pages/product/ProductDetail'
import prisma from '@/lib/prisma'

async function getProduct(slug: string) {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  })
  return product
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const data = await getProduct(params.slug)
  if (!data) return notFound()

  return {
    title: {
      absolute: `${data.name}`,
    },
    description: `${data.description || 'Description here when data is available'}`,
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return (
    <>
      <ProductDetail product={product} />
    </>
  )
}
