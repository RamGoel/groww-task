import { saveResults } from '@/redux/slices/stockSlice'
import { GlobalState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ActionLoader } from '../../loader/actionLoader/loader.component'
import SearchCard from '../item/item.component'
import Chip from '../../common/textChip/chip.component'
import { CommonConstants } from '@/utils/constants'
import { saveRecentSearches } from '@/redux/slices/miscSlice'
import { SearchNormal1, TrendUp } from 'iconsax-react'
import { fetchSearchResults } from './popup.actions'
import { useAppDispatch } from '@/redux/provider'
import { StorageUtils } from '@/libs/cache'



const SearchResults = ({ query, setQuery }: { query: string, setQuery: Function }) => {
  const results = useSelector((state: GlobalState) => state.stock.searchResults)
  const recentSearches = useSelector((state: GlobalState) => state.misc.recentSearches)
  const [types, setTypes] = React.useState<Array<string>>([])
  const [category, setCategory] = React.useState('All')
  const [isLoading, setLoading] = React.useState(false)
  const dispatch = useAppDispatch()


  useEffect(() => {
    const storedSearches = StorageUtils._retrieve(CommonConstants.recentSearchesKey);
    if (storedSearches) {
      dispatch(saveRecentSearches(JSON.parse(storedSearches)));
    }

    return () => {
      StorageUtils._save(CommonConstants.recentSearchesKey, recentSearches);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(fetchSearchResults(query, setTypes, setLoading, recentSearches))
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      dispatch(saveResults(null))
    }
  }, [query, dispatch])


  return (
    <div className='absolute  mt-2 shadow-lg p-6 rounded-2xl w-full  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-50' style={{ maxWidth: 500, zIndex: 999999999 }}>
      <div className='flex items-center mt-2 justify-start'>
        {
          types ? types.map((item: any) => {
            return <Chip key={item} isSelected={category === item} text={item} onClick={() => {
              setCategory(item)
            }} />
          }) : null
        }
      </div>
      {(!results) ? <div className='my-2'>
        <p className='text-md font-semibold text-black dark:text-white'>Recent Searches</p>
        <div>
          {
            recentSearches ? recentSearches.map((item: any) => {
              if (!item.toLowerCase().includes(query.toLowerCase())) return null
              return <p
                key={item}
                onClick={() => setQuery(item)}
                className='w-full p-2 hover:bg-brandblue cursor-pointer rounded-xl dark:text-white hover:text-white text-sm flex items-center justify-start '>
                <SearchNormal1 size={15} className='mr-2' />
                <span className='font-semibold'>{query}</span>{item.slice(query.length)}
              </p>
            }) : null
          }
        </div>
      </div> : null}
      {isLoading ? <ActionLoader /> : <div className='' >
        {
          results ? results.map((item: any) => {
            if (category !== 'All' && item[CommonConstants.typeDataKey] !== category) return null
            return <SearchCard item={item} key={item[CommonConstants.symbolDataKey]} />
          }) : null
        }
      </div>}

    </div>
  )
}

export default SearchResults