import { API } from "@/api/client"
import { disableLoader, enableLoader } from "@/redux/slices/miscSlice"
import { saveCompanyData } from "@/redux/slices/stockSlice"
import toast from "react-hot-toast"

export const getCompanyData = (_id: string | number) => {
    return async (dispatch: Function) => {
        dispatch(enableLoader())
      try {
        const res = await API.get('/', { params: { function: 'OVERVIEW', symbol: _id } })
        if (res.data['Error Message']) {
          toast.error('No Data Found')
          throw new Error('API Limit Reached')

        }
        dispatch(saveCompanyData(res.data))
      } catch (err) {
        console.log(err)
        dispatch(saveCompanyData(null))
      } finally {
        dispatch(disableLoader())
      }
    }
}