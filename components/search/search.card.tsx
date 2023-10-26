import React from 'react'

const SearchCard = ({item}:{item:any}) => {
  return (
      <div className='flex  hover:opacity-50 transition-all cursor-pointer items-center  py-2 justify-between'>
          <div>
              <p className='text-black font-semibold dark:text-white'>{item['1. symbol']} ({item['8. currency']})</p>
              <p className='text-sm text-black dark:text-white'>{item['5. marketOpen']} - {item['6. marketClose']}</p>
              
          </div>
          <div className='text-right'>
          <p className='text-black dark:text-white'>{item['2. name']}</p>
              <p className='text-sm text-black dark:text-white'>{item['4. region']}</p>
          </div>
    </div>
  )
}

export default SearchCard