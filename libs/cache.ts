const TTL=1000*60*15
export const StorageUtils = {
    _save: (key: string, value: any) => {
        const now=Date.now()
        localStorage.setItem(key, JSON.stringify({
            value,
            ttl:now+TTL
        }));
    },
    _retrieve: (key: string) => {
        const now = Date.now()
        const data = localStorage.getItem(key)
        if (!data) {
            return null;
        }

        const parsedData = JSON.parse(data)
        if (parsedData.ttl >= now) {
            localStorage.removeItem(key)
            return null;
        } else {
            return localStorage.getItem(key)
        }
         
    }
}