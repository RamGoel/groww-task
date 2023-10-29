"use client";
import Chip from '@/components/common/textChip/chip.component';
import Header from '@/components/common/pageHeader/header.component';
import Info from '@/components/common/insightBox/info.component';
import CompanyAbout from '@/components/company/companyAbout/about.component';
import CompanyHeader from '@/components/company/companyDetails/details.component';
import Chart from '@/components/company/priceChart/chart.component';
import {GlobalState} from '@/redux/store';
import React, {useEffect} from 'react'
import {useSelector} from 'react-redux';
import {getCompanyData} from './company.actions';
import {useAppDispatch} from '@/redux/provider';
import {ActionLoader} from "@/components/loader/actionLoader/loader.component";


const CompanyPage = () => {
    const companyData = useSelector((state: GlobalState) => state.stock.companyData)
    const selectedCard = useSelector((state: GlobalState) => state.stock.selectedCard)
    const isDarkMode = useSelector((state: GlobalState) => state.misc.isDarkMode)
    let dispatch = useAppDispatch()


    useEffect(() => {

        function fetchCompanyDataAction(_id: any) {
            dispatch(getCompanyData(_id))
        }


        if (selectedCard && selectedCard.ticker) {
            fetchCompanyDataAction(selectedCard.ticker)
        }
    }, [dispatch, selectedCard])

    if (!selectedCard) {
        return <>Unable to view this page, please retry</>
    }
    if (!companyData) {
        return <ActionLoader/>;
    }


    return (
        <div className={`${isDarkMode ? 'dark' : ''}`}>
            <div className='bg-white dark:bg-black '>

                <Header/>
                {selectedCard ? <CompanyHeader Symbol={selectedCard.ticker} price={selectedCard.price}
                                               change_amount={selectedCard.change_amount}
                                               change_percentage={selectedCard.change_percentage} {...companyData} />
                    : null}
                <div className="flex flex-wrap gap-2 items-center w-10/12 mx-auto my-3">
                    <Chip isSelected={false} text={`SECTOR: ${companyData.Sector}`}/>
                    <Chip isSelected={false} text={`INDUSTRY: ${companyData.Industry}`}/>
                </div>
                <Chart Symbol={selectedCard.ticker}/>

                <CompanyAbout {...companyData} />

                <div className="flex gap-3 flex-wrap items-center w-10/12 mx-auto mt-4 py-4">
                    <Info title={'Price/Earning Ratio '} value={companyData?.PERatio}/>
                    <Info title={'PE to Growth Ratio'} value={companyData?.PEGRatio}/>
                    <Info title={'Dividend per share'} value={companyData?.DividendPerShare}/>
                    <Info title={'Currency'} value={companyData?.Currency}/>
                    <Info title={'Market Capitalization'} value={companyData?.Currency}/>
                </div>


            </div>

        </div>
    )
}

export default CompanyPage
