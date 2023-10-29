import React, { useEffect, useState } from 'react'
import { Line } from "@ant-design/charts";
import { ScreenLoader } from '../../loader/screenLoader/loader.component';
import { useAppDispatch } from '@/redux/provider';
import { fetchChartData } from './chart.actions';
import { ActionLoader } from '@/components/loader/actionLoader/loader.component';

export interface ChartProps {
    Symbol: string
}
const ranges = [
    {
        text: 'Intraday',
        value: "TIME_SERIES_INTRADAY"
    }, {
        text: 'Daily',
        value: "TIME_SERIES_DAILY"
    }, {
        text: 'Weekly',
        value: "TIME_SERIES_WEEKLY"
    }, {
        text: 'Monthly',
        value: "TIME_SERIES_MONTHLY"
    },
]


const Chart = ({ Symbol }: ChartProps) => {
    const [chartData, setChartData] = useState<Array<any> | null>(null)
    const [axisMin, setAxisMin] = useState(0);
    const [axisMax, setAxisMax] = useState(0);
    const [fetchFn, setFunction] = useState('TIME_SERIES_DAILY')
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        dispatch(fetchChartData(setIsLoading, fetchFn, Symbol, setChartData, setAxisMin, setAxisMax))
    }, [Symbol, fetchFn])

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

            <div className='flex flex-wrap gap-2 items-center my-4 justify-center'>
                {
                    ranges.map((item) => {
                        return <div key={item.value} onClick={() => {
                            setFunction(item.value)
                        }} className={`${fetchFn === item.value ? 'bg-brandgreen text-white border-2 border-brandgreen' : 'bg-white border-2 border-brandgreen text-brandgreen'} hover:bg-brandgreenlight cursor-pointer py-1 px-2 rounded-full flex items-center justify-center mx-2`} style={{minWidth:70, height:30}} >
                            <span className={`text-xs font-semibold`}>{isLoading && fetchFn === item.value ? <ActionLoader /> : item.text}</span>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default Chart