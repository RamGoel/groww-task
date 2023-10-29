"use client";
import Chip from '@/components/common/textChip/chip.component';
import Header from '@/components/common/pageHeader/header.component';
import Info from '@/components/common/insightBox/info.component';
import CompanyAbout from '@/components/company/companyAbout/about.component';
import CompanyHeader from '@/components/company/companyDetails/details.component';
import Chart from '@/components/company/priceChart/chart.component';
import { GlobalState } from '@/redux/store';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getCompanyData } from './company.actions';
import { useAppDispatch } from '@/redux/provider';


const CompanyPage = () => {
  const searchParams = useSearchParams();
  const companyData = useSelector((state: GlobalState) => state.stock.companyData)
  const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)

  const id = searchParams.get('id')
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCompanyData(id ?? 'IBM'))
  }, [dispatch, id])

  if (!companyData) {
    return null;
  }

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-black '>

        <Header />
        <CompanyHeader {...companyData} />
        <div className="flex flex-wrap gap-2 items-center w-10/12 mx-auto my-3">
          <Chip isSelected={false} text={`SECTOR: ${companyData.Sector}`} />
          <Chip isSelected={false} text={`INDUSTRY: ${companyData.Industry}`} />
        </div>
        <Chart Symbol={id ?? 'IBM'} />

        <CompanyAbout {...companyData} />

        <div className="flex gap-3 flex-wrap items-center w-10/12 mx-auto mt-4 py-4">
          <Info title={'Price/Earning Ratio '} value={companyData?.PERatio} />
          <Info title={'PE to Growth Ratio'} value={companyData?.PEGRatio} />
          <Info title={'Dividend per share'} value={companyData?.DividendPerShare} />
          <Info title={'Currency'} value={companyData?.Currency} />
          <Info title={'Market Capitalization'} value={companyData?.Currency} />
        </div>
      </div>

    </div>
  )
}

export default CompanyPage