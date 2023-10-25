"use client";
import Header from '@/components/common/header.component';
import StockGrid from '@/components/explore/grid.component';
import Menu from '@/components/explore/menu.component';
import { GlobalState } from '@/redux/store';
import Image from 'next/image'
import { useSelector } from 'react-redux';

export default function Home() {
  const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-black'>
        <Header />
        <Menu />
        <StockGrid />
      </div>
    </div>
  )
}
