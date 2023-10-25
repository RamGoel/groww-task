"use client";
import React, { useEffect } from 'react'
import StockCard from './card.component'
import { API } from '@/api/client'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '@/redux/store';
import { saveGainers, saveLosers } from '@/redux/slices/stockSlice';


// async function fetchStocks() {
//     try {
//         const res=await API.get('/', { params: { function: 'TOP_GAINERS_LOSERS', apikey: process.env.API_KEY } })
//         return res.data
//     } catch (error) {
//         console.log(error)
//         return error
//     }
// }

const StockGrid = () => {
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.losers)
    const tab = useSelector((state: GlobalState) => state.misc.tab)
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await API.get('/', { params: { function: 'TOP_GAINERS_LOSERS', apikey: process.env.NEXT_PUBLIC_API_KEY } })
                console.log(res.data)
                dispatch(saveGainers(res.data.top_gainers))
                dispatch(saveLosers(res.data.top_losers))
            } catch (error) {
                console.log(error)
                return error
            }
        }
        fetchData()
    }, [dispatch])

    if (!gainers || !losers) {
        return <p>Loading....</p>
    }
    return (
        <div className='grid w-11/12 mx-auto grid-cols-4 justify-between '>
            {
                tab === "Top Gainers" ? gainers.map((item: any) => {
                    return <StockCard key={item.symbol} stock={item} />
                }) : losers.map((item: any) => {
                    return <StockCard key={item.symbol} stock={item} />
                })
            }
        </div>
    )
}

export default StockGrid