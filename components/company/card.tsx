import React from 'react'
import Logo from '../common/logo.component'
import { GlobalState } from '@/redux/store'
import { useSelector } from 'react-redux'

export interface CompanyHeaderProps {
    Symbol: string,
    Name: string,
    AssetType: string,
    Exchange: string,
}
const CompanyHeader = ({ Symbol, Name, Exchange, AssetType }: CompanyHeaderProps) => {
    const selectedCard = useSelector((state: GlobalState) => state.stock.selectedCard)
    const {price, change_amount, change_percentage} = selectedCard
  return (
      <div className='bg-white dark:bg-black py-3 flex justify-between items-center w-10/12 mx-auto'>
          <div className='flex justify-between items-center'>
              
          <div>
              <Logo name={Symbol} />
          </div>
          <div className='ml-4'>
              <h1 className='text-black dark:text-white text-lg font-semibold'>{Name}</h1>
              <h1 className='text-black dark:text-white text-md font-semibold'>{Symbol}, {AssetType}</h1>
              <h1 className='text-black dark:text-white text-sm font-semibold'>{Exchange}</h1>
          </div>
          </div>
          <div>
              <h1 className=' text-black dark:text-white text-xl font-semibold text-right'>${price}</h1>
              {
                  change_amount.includes('-')
                      ? <span className='text-sm  text-red'>{change_amount} ({change_percentage}) ▼</span>
                      : <span className='text-sm  text-green'>+{change_amount} ({change_percentage})▲</span>
              }
          </div>
    </div>
  )
}

export default CompanyHeader