"use client";
import React, { useEffect } from 'react'
import StockCard from './card.component'
import { API } from '@/api/client'
import { useDispatch, useSelector } from 'react-redux';
import { GlobalState } from '@/redux/store';
import { saveActivelyTraded, saveGainers, saveLosers } from '@/redux/slices/stockSlice';
import { ActionLoader } from '../loader/actionloader.component';
import { ArrowDown2 } from 'iconsax-react';
import { disableLoader, enableLoader } from '@/redux/slices/miscSlice';
import { ScreenLoader } from '../loader/loader.component';


const StockGrid = () => {
    const gainers = useSelector((state: GlobalState) => state.stock.gainers)
    const losers = useSelector((state: GlobalState) => state.stock.losers)
    const activelyTraded = useSelector((state: GlobalState) => state.stock.activelyTraded)
    const tab = useSelector((state: GlobalState) => state.misc.tab)
    const dispatch = useDispatch()
    const loader = useSelector((state: GlobalState) => state.misc.loader)


    const fetchMoreData = async () => {
        dispatch(enableLoader())
        try {
            const res = await API.get('/', { params: { function: 'TOP_GAINERS_LOSERS', apikey: process.env.NEXT_PUBLIC_API_KEY } })
            console.log(res.data)
            dispatch(saveGainers([...gainers, ...res.data.top_gainers]))
            dispatch(saveLosers([...losers, ...res.data.top_losers]))
            dispatch(saveActivelyTraded([...activelyTraded, ...res.data.most_actively_traded]))
        } catch (error) {
            console.log(error)
            return error
        } finally {
            dispatch(disableLoader())
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            dispatch(enableLoader())
            try {
                const res = await API.get('/', { params: { function: 'TOP_GAINERS_LOSERS', apikey: process.env.NEXT_PUBLIC_API_KEY } })
                console.log(res.data)
                dispatch(saveGainers(res.data.top_gainers))
                dispatch(saveLosers(res.data.top_losers))
                dispatch(saveActivelyTraded(res.data.most_actively_traded))
            } catch (error) {
                console.log(error)
                return error
            } finally {
                dispatch(disableLoader())
            }
        }
        fetchData()
    }, [dispatch])

    if (!gainers || !losers) {
        return null;
    }
    return (
        <div>

            <div className='grid w-11/12 mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-between '>
                {
                    tab === "Top Gainers" ? gainers.map((item: any) => {
                        return <StockCard key={item.symbol} stock={item} />
                    }) : tab==="Top Losers"? losers.map((item: any) => {
                        return <StockCard key={item.symbol} stock={item} />
                    }) : activelyTraded.map((item: any) => {
                        return <StockCard key={item.symbol} stock={item} />
                    })
                }

            </div>
            {
                loader ? <ScreenLoader /> : <h1 onClick={() => fetchMoreData()} className=' text-black font-regular text-xl transition-all py-10 cursor-pointer p-2  dark:text-white flex items-center justify-center hover:mt-2'>Load more <ArrowDown2 className='ml-2' /></h1>
            }
            
        </div>
    )
}

export default StockGrid