"use client";
import React, { useState } from 'react'
import Chip from '../common/chip.component'

const arr = [
  { key: 1, title: "Top Gainers" },
  { key: 2, title: "Top Losers" },
]
const sortMapper = [
  { key: 1, title: "Sort by percentage" },
  { key: 2, title: "Sort by price" },
]
const Menu = () => {
  const [selected, setSelected] = useState(1)
  const [sortType, setSortType]=useState(1)
  return (
    <div className='flex bg-white dark:bg-black items-center justify-between w-11/12 mx-auto my-3'>
      <div className='relative flex items-center justify-between'>
        {
          arr.map(item => {
            return <button key={item.key} onClick={() => setSelected(item.key)} className={` mx-3 hover:scale-105 transition-all cursor-pointer toggle-tab`}>
              <h1 className='text-xl text-black dark:text-white font-semibold'>{item.title}</h1>
            </button>
          })
        }
        <div className={`toggle-line ${selected===2?'move-line':''}`}></div>
      </div>
      <div className='flex items-center justify-between'>
        {
          sortMapper.map(item => {
            return <Chip key={item.key} isSelected={sortType===item.key} text={item.title} onClick={() => setSortType(item.key)} />
          })
        }
      </div>

    </div>
  )
}

export default Menu