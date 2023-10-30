"use client";
import {Inter} from 'next/font/google'
import './globals.css'
import {ReduxProvider} from '@/providers/ReduxProvider'
import {Toaster} from 'react-hot-toast';
import {useEffect} from 'react';
import addInterceptor from '@/libs/interceptor';
import {API} from '@/libs/client';
import {ThemeProvider} from "@/providers/ThemeProvider";

const inter = Inter({subsets: ['latin']})


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
        <link rel="icon" href="/favicon.ico" sizes="any"/>
        <body className={inter.className}>
        <ReduxProvider>
            <ThemeProvider>
                <>
                    <Toaster/>
                    {children}
                </>
            </ThemeProvider>
        </ReduxProvider>
        </body>
        </html>
    )
}
