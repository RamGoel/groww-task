import { API } from "@/api/client"
import { enableLoader, disableLoader } from "@/redux/slices/miscSlice"
import { saveGainers, saveLosers, saveActivelyTraded } from "@/redux/slices/stockSlice"
import toast from "react-hot-toast"

export const fetchStockList = () => {
    return async (dispatch: Function) => {
        dispatch(enableLoader())
        try {
            const res = await API.get('/', { params: { function: 'TOP_GAINERS_LOSERS' } })
            console.log(res.data)
            dispatch(saveGainers(res.data.top_gainers))
            dispatch(saveLosers(res.data.top_losers))
            dispatch(saveActivelyTraded(res.data.most_actively_traded))
        } catch (error) {
            toast.error("Some Error Occured")
            console.log(error)
            return error
        } finally {
            dispatch(disableLoader())
        }
    }
}

export const fetchMoreStocks = (_gainers: any, _losers: any, _activelyTraded: any) => {
    return async (dispatch: Function) => {
        dispatch(enableLoader())
        try {
            const res = await API.get('/', { params: { function: 'TOP_GAINERS_LOSERS' } })
            console.log(res.data)
            dispatch(saveGainers([..._gainers, ...res.data.top_gainers]))
            dispatch(saveLosers([..._losers, ...res.data.top_losers]))
            dispatch(saveActivelyTraded([..._activelyTraded, ...res.data.most_actively_traded]))
        } catch (error) {
            console.log(error)
            return error
        } finally {
            dispatch(disableLoader())
        }
    }
}