import axios from "axios";

export default function addInterceptor(_API: any) {
    _API.interceptors.request.use((config: any) => {
        
        if (!navigator.onLine) {
            new axios.Cancel("No Internet Connection")
            throw new Error("No Internet Connection")
        }
        config.params = {
            ...config.params,
            apikey: process.env.NEXT_PUBLIC_API_KEY
        }

        console.log("API called with params: ", config.params)
        return config;
    })

    return _API;
}