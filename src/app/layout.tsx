import type { Metadata } from 'next'
import UIProvider from '@/UIProvider'
import localFont from 'next/font/local'
import { CartProvider } from '@/context/CartContext'
import HolyLoader from 'holy-loader'
import './globals.css'

const os = localFont({
  src: './fonts/Oswald.woff2',
  variable: '--font-os',
  weight: '200 700',
})

const qs = localFont({
  src: './fonts/Quicksand.woff2',
  variable: '--font-qs',
  weight: '200 700',
})

export const metadata: Metadata = {
  title: 'PREMIUM QUALITY STREETWEAR – HADES STUDIO',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${os.className} ${qs.variable} antialiased light`} suppressHydrationWarning={true}>
        <UIProvider>
          <CartProvider>
            <HolyLoader
              color="linear-gradient(to right, #ff7e5f, #feb47b)"
              height="0.5rem"
              speed={250}
              easing="linear"
            />
            {children}
          </CartProvider>
        </UIProvider>
      </body>
    </html>
  )
}
