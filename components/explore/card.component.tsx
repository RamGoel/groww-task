import React from 'react'
import Logo from '../common/logo.component'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { saveSelectedCard } from '@/redux/slices/stockSlice'

const StockCard = ({ stock }: { stock: any }) => {
    const dispatch=useDispatch()
    const {ticker, volume, price, change_amount} = stock
    return (
        <Link href={`/company?id=${'IBM'}`} onClick={() => {
            dispatch(saveSelectedCard(stock))
        }}>
        <div className='rounded-xl mx-auto transition-all cursor-pointer p-4 border-2 border-greylight  my-3' style={{ maxWidth: 300 }}>
            <div className='flex items-start justify-between'>
            <Logo name={ticker} />
            <p className='text-right font-semibold text-black dark:text-white'>{volume}+ available </p>
            </div>
            <h1 className='text-black dark:text-white text-lg font-semibold mt-2'>{ticker}</h1>
            <h1 className='text-black dark:text-white text-md font-semibold '>
                ${price}
                {change_amount.includes('-')
                    ? <span className='text-sm ml-2 text-red'>{change_amount}▼</span>
                    : <span className='text-sm ml-2 text-green'>+{change_amount}▲</span>
                }
            </h1>
            </div>
            </Link>
    )
}

export default StockCard