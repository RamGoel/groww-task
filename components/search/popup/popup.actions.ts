import { API } from "@/api/client"
import { saveRecentSearches } from "@/redux/slices/miscSlice"
import { saveResults } from "@/redux/slices/stockSlice"

export const fetchSearchResults = (_query:string,setTypes:Function, setLoading:Function, _recentSearches:any) => {
    return async (dispatch: Function) => {
        try {
        setLoading(true)
        const res = await API.get('/', { params: { function: 'SYMBOL_SEARCH', keywords: _query } })
        const uniqueTypes: Array<string> = Array.from(new Set(res.data.bestMatches.map((item: any) => item['3. type'])))
        const uniqueTypesArr = ['All', ...uniqueTypes]
        dispatch(saveResults(res.data.bestMatches))
        setTypes([...uniqueTypesArr])
        if (_recentSearches) {
          if (_recentSearches.includes(_query)) return
          dispatch(saveRecentSearches([..._recentSearches, _query]));
        } else {
          dispatch(saveRecentSearches([_query]));
        }
      } catch (error) {
        console.log(error)
        return error
      } finally {
        setLoading(false)
      }
    }
}