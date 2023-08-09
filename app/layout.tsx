"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { VehicleContextProvider } from './store/provider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <VehicleContextProvider>
          {children}
        </VehicleContextProvider>
      </body>
    </html>
  )
}
