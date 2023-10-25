import React from 'react'
import Image from 'next/image'
import { SearchNormal } from 'iconsax-react'
const Header = () => {
  return (
    <div className='flex dark:bg-black justify-between w-11/12 mx-auto p-4 items-center '>
      <div className='flex justify-start items-center'>
        <Image src={require('@/public/groww.png')} alt="logo" className='mr-2' width={50} height={50} />
        <h1 className=' text-xl text-black font-semibold dark:text-white'>GrowwStonks</h1>
      </div>
      <div className='w-full md:w-1/2 lg:w-1/3'>
        <div className='ml-auto bg-zinc-200 dark:bg-zinc-900 flex items-center justify-start py-1 md:py-2 px-2 md:px-4 rounded-full w-3/4'>
          <SearchNormal className='text-gray-500 dark:text-white' />
          <input type="text" placeholder="Search" className='bg-transparent text-gray-500 dark:text-white p-2 focus-visible:outline-none' />
        </div>
      </div>
    </div>
  )
}

export default Header