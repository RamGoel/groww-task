import React, { useEffect, useState } from 'react'
import { Line } from "@ant-design/charts";
import { API } from '@/api/client';
import { CommonConstants } from '@/utils/constants';
import { ScreenLoader } from '../../loader/screenLoader/loader.component';

export interface ChartProps {
    Symbol: string
}
const Chart = ({ Symbol }: ChartProps) => {
    const [chartData, setChartData] = useState<Array<any> | null>(null)
    const [axisMin, setAxisMin] = useState(0);
    const [axisMax, setAxisMax] = useState(0);


    useEffect(() => {
        const fetchChartData = async () => {
            const res = await API.get('/', { params: { function: 'TIME_SERIES_DAILY', symbol: Symbol, apikey: process.env.NEXT_PUBLIC_API_KEY } })
            console.log(res.data)
            const chartDates = res.data[CommonConstants.chartDataKey]
            const chartDateAndClose = Object.keys(chartDates).map((date: string) => {
                return {
                    Date: date,
                    Close: parseFloat(chartDates[date][CommonConstants.closeDataKey])
                }
            })
            setChartData(chartDateAndClose)
            setAxisMin(Math.min(...chartDateAndClose.map((item: any) => item.Close)))
            setAxisMax(Math.max(...chartDateAndClose.map((item: any) => item.Close)))
        }
        fetchChartData()
    },[Symbol])
    if (!chartData) {
        return <ScreenLoader />
    }
    return (
        <div className='w-10/12 mx-auto my-5'>
            <Line
                data={chartData.reverse()}
                height={300}
                padding="auto"
                xField="Date"
                yField="Close"
                tooltip={{
                    showMarkers: false
                }}
                xAxis={{
                    tickCount: 5,
                }}
                yAxis={{
                    grid: { line: { style: { lineWidth: 0 } } },
                    min: axisMin, 
                    max: axisMax,
                }}
                smooth
            />
        </div>
    )
}

export default Chart