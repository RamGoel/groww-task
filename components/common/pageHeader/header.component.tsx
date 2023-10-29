"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Menu, SearchNormal } from 'iconsax-react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMode } from '@/redux/slices/miscSlice'
import SearchResults from '../../search/popup/popup.component'
import { useRouter } from 'next/navigation'
import { GlobalState } from '@/redux/store'
const Header = () => {
  const [query, setQuery] = React.useState('' as string)
  const [open, setOpen] = useState(false)
  const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!open) setQuery('')
  }, [open])
  
  return (
    <div className='flex dark:bg-black justify-between w-11/12 mx-auto p-4 items-center '>
      {/* Logo */}
      <div className='flex justify-start items-center cursor-pointer' onClick={() => router.push('/')}>
        <Image src={require('@/public/groww.png')} alt="logo" className='mr-2' width={25} height={25} />
        <h1 className='hidden w-0 md:block md:w-100 text-md text-black font-semibold dark:text-white'>GrowwStonks</h1>
      </div>

      {/* Search Bar */}
      <div className='hidden md:block'>
        <div className='ml-auto bg-greylight dark:bg-greydark flex items-center justify-start py-1 md:py-1 px-2 md:px-4 rounded-full w-full'>
          <SearchNormal className='text-gray-500 dark:text-white mr-2' size={17} />
          <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Start typing for suggestions" className='bg-transparent text-gray-500 text-sm dark:text-white py-1 focus-visible:outline-none w-full' />
        </div>
        {query !== '' ? <SearchResults setQuery={(val:string)=>setQuery(val)} query={query} /> : null}
      </div>

      {/* Extras Menu */}
      <div className="relative inline-block text-left">
        <div>
          <button onClick={() => setOpen(old => !old)} type="button" className="inline-flex hover:bg-greylight dark:hover:bg-greydark p-2 rounded-full transition-all " id="menu-button" aria-expanded="true" aria-haspopup="true">
            <Menu className={`text-black dark:text-white`} size={20} />
          </button>
        </div>


        {open ? <div className="absolute transition-all divide-y divide-gray-100 right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white dark:bg-greydark text-black dark:text-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
          <div className="py-1" role="none">
            <a href="#" onClick={() => {
              dispatch(toggleMode())
              setOpen(false)
            }} className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">{
                isDarkMode ? 'Turn on Light Mode' : 'Turn on Dark Mode'
              }</a>
            <div className='md:hidden'>
              <div className='ml-auto bg-greylight border-2 border-greylight dark:bg-greydark flex items-center justify-start py-1 md:py-1 px-2 md:px-4 rounded-full w-11/12 mx-auto'>
                <SearchNormal className='text-gray-500 dark:text-white mr-2' size={17} />
                <input onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Search" className='bg-transparent text-gray-500 text-sm dark:text-white py-1 focus-visible:outline-none' />
              </div>
              {query !== '' ? <SearchResults setQuery={(val: string) => setQuery(val)} query={query} /> : null}
            </div>
          </div>
        </div> : null}
      </div>

    </div>
  )
}

export default Header