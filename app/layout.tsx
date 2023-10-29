"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { ReduxProvider } from '@/redux/provider'
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import addInterceptor from '@/api/interceptor';
import { API } from '@/api/client';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  useEffect(() => {
    addInterceptor(API)
  }, [])
  return (
    <html lang="en" className=''>
      <title>GrowwStonks</title>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={inter.className}>
        <ReduxProvider>
          <>
            <Toaster />
            {children}
          </>
        </ReduxProvider>
      </body>
    </html>
  )
}
