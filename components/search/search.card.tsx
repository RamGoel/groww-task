import React from 'react'

const SearchCard = ({item}:{item:any}) => {
  return (
      <div className='flex  flex-col md:flex-row hover:opacity-50 transition-all cursor-pointer items-center py-1 my-3 justify-between'>
          <div className='w-full md:w-auto'>
              <p className='text-sm text-black font-semibold dark:text-white'>{item['1. symbol']} ({item['8. currency']})</p>
        <p className='text-xs text-black dark:text-white'>{item['5. marketOpen']} - {item['6. marketClose']}</p>
          </div>
          <div className='text-left md:text-right w-full md:w-auto'>
          <p className='text-sm text-black dark:text-white'>{item['2. name']}</p>
              <p className='text-xs text-black dark:text-white'>{item['4. region']}</p>
          </div>
    </div>
  )
}

export default SearchCard