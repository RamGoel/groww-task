import { StorageUtils } from "@/libs/cache"
import { API } from "@/libs/client"
import { disableLoader, enableLoader } from "@/redux/slices/miscSlice"
import { saveCompanyData } from "@/redux/slices/stockSlice"
import { CommonConstants } from "@/utils/constants"
import toast from "react-hot-toast"

export const getCompanyData = (_id: string | number) => {
  return async (dispatch: Function) => {
    const dataFromCache = StorageUtils._retrieve(CommonConstants.companyDataCacheKey)
    if (dataFromCache) {
      const parsedData = JSON.parse(dataFromCache)
      if (parsedData.Symbol === _id) {
        dispatch(saveCompanyData(parsedData))
        return;
      }
    }
        dispatch(enableLoader())
      try {
        const res = await API.get('/', { params: { function: 'OVERVIEW', symbol: _id } })
        dispatch(saveCompanyData(res.data))
        StorageUtils._save(CommonConstants.companyDataCacheKey, res.data)
      } catch (err) {
                  // @ts-ignore
            const {message}=err
            toast.error(message ? message : "Something went wrong!")
        console.log(err)
        dispatch(saveCompanyData(null))
      } finally {
        dispatch(disableLoader())
      }
    }
}