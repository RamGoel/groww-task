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
              dispatch(saveCompanyData(JSON.parse(dataFromCache)))

    }
        dispatch(enableLoader())
      try {
        const res = await API.get('/', { params: { function: 'OVERVIEW', symbol: _id } })
        if (res.data['Error Message']) {
          toast.error('No Data Found')
          throw new Error('API Limit Reached')
        }
        dispatch(saveCompanyData(res.data))
        StorageUtils._save(CommonConstants.companyDataCacheKey, res.data)
      } catch (err) {
                  // @ts-ignore
            const {message}=error
            toast.error(message ? message : "Something went wrong!")
        console.log(err)
        dispatch(saveCompanyData(null))
      } finally {
        dispatch(disableLoader())
      }
    }
}