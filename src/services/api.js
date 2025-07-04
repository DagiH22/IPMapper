const API_KEY = import.meta.env.VITE_IP_API_KEY
// const url = 'https://jsonplaceholder.typicode.com/users'

async function api(ipOrDomain='') {
    const uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}${ipOrDomain ? `&ipAddress=${ipOrDomain}` : ''}`
    const res= await fetch (uri)
    if (!res.ok) throw new Error('failed to fetch the data')
    console.log(res.json)
    return await res.json()      
}

export default api