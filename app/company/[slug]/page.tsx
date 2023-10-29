"use client";
import React, {lazy, Suspense} from 'react'
import {useAppDispatch} from '@/redux/provider';
import {ActionLoader} from "@/components/loader/actionLoader/loader.component";
import {NextPageContext} from "next";

const CompanyView = lazy(() => import("@/components/company/companyInfo/companyInfo.component"));


const CompanyPage = (props: any) => {
    console.log(props)
    let dispatch = useAppDispatch()


    return (
        <Suspense fallback={<ActionLoader/>}>
            <div className={'dark'}>
                <CompanyView _id={props._id}/>
            </div>
        </Suspense>

    )
}

CompanyPage.getInitialProps = async (ctx: NextPageContext) => {
    console.log(ctx.query, "ss")
    return {_id: ctx.query.id};
}

export default CompanyPage
