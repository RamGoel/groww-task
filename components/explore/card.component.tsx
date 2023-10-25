import React from 'react'
import Logo from '../common/logo.component'

const StockCard = ({stock}:{stock:any}) => {
    const {ticker, price, change_amount} = stock
    return (
        <div className='rounded-xl mx-auto hover:scale-105 transition-all cursor-pointer p-4 border-2 border-greylight w-1/5 h-40 my-3' style={{width:300}}>
            <Logo name={ticker} />
            <h1 className='text-black dark:text-white text-3xl font-semibold mt-2'>{ticker}</h1>
            <h1 className='text-black dark:text-white text-xl font-semibold '>
                ${price}
                {change_amount.includes('-')
                    ? <span className='text-sm text-red'> {change_amount}▼</span>
                    : <span className='text-sm text-green'> +{change_amount}▲</span>
                }
            </h1>
        </div>
    )
}

export default StockCard