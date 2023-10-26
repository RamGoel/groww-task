"use client";
import { API } from '@/api/client';
import Chip from '@/components/common/chip.component';
import Header from '@/components/common/header.component';
import Info from '@/components/common/info.component';
import CompanyAbout from '@/components/company/about.component';
import CompanyHeader from '@/components/company/card';
import Chart from '@/components/company/chart.component';
import { disableLoader, enableLoader } from '@/redux/slices/miscSlice';
import { saveCompanyData } from '@/redux/slices/stockSlice';
import { GlobalState } from '@/redux/store';
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';


const CompanyPage = () => {
  const searchParams = useSearchParams();
  const companyData = useSelector((state: GlobalState) => state.stock.companyData)
  const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)

  const id = searchParams.get('id')
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchCompanyData = async () => {
      dispatch(enableLoader())
      try {
        const res = await API.get('/', { params: { function: 'OVERVIEW', symbol: id, apikey: process.env.NEXT_PUBLIC_API_KEY } })
        dispatch(saveCompanyData(res.data))
      } catch (err) {
        console.log(err)
      } finally {
        dispatch(disableLoader())
      }
    }
    fetchCompanyData();
  }, [dispatch, id])

  if (!companyData) {
    return null;
  }


  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <div className='bg-white dark:bg-black '>

        <Header />
        <CompanyHeader {...companyData} />
        <div className="flex items-center w-10/12 mx-auto my-3">
          <Chip isSelected={false} text={`SECTOR: ${companyData.Sector}`} />
          <Chip isSelected={false} text={`INDUSTRY: ${companyData.Industry}`} />
        </div>
        <Chart Symbol={id ?? 'IBM'} />

        <CompanyAbout {...companyData} />

        <div className="flex items-center w-10/12 mx-auto mt-4 py-4">
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