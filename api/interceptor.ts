export default function addInterceptor(_API:any) {
    _API.interceptors.request.use((config:any) => {
        config.params = {
            ...config.params,
            apikey: process.env.NEXT_PUBLIC_API_KEY
        }
        return config;
    })

    return _API;
}