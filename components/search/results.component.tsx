import { API } from '@/api/client'
import { saveResults } from '@/redux/slices/stockSlice'
import { GlobalState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionLoader } from '../loader/actionloader.component'
import SearchCard from './search.card'



const SearchResults = ({ query }: { query: string }) => {
  const results = useSelector((state: GlobalState) => state.stock.searchResults)
  const [category, setCategory] = React.useState('All' as string)
  const dispatch = useDispatch()
  
  useEffect(() => {
    const fetchResults = async (_query: string) => {
      try {
        const res = await API.get('/', { params: { function: 'SYMBOL_SEARCH', keywords: _query, apikey: process.env.NEXT_PUBLIC_API_KEY } })
        dispatch(saveResults(res.data.bestMatches))
      } catch (error) {
        console.log(error)
        return error
      }
    }
    fetchResults(query)
  }, [query, dispatch])


  return (
    <div className=' absolute z-100 bg-white dark:bg-black mt-2 shadow-lg p-6 rounded-2xl' style={{ width: 500 }}>
      {
        results?results.map((item: any) => {
          return <SearchCard item={item} key={item['1. symbol']} />
        }) : <ActionLoader />
      }
    </div>
  )
}

export default SearchResults