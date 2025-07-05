const API_KEY = import.meta.env.VITE_IP_API_KEY
// const url = 'https://jsonplaceholder.typicode.com/users'

async function api(ipOrDomain='') {
    const uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}${ipOrDomain ? `&ipAddress=${ipOrDomain}` : ''}`
    // const res= await fetch (uri)
    // if (!res.ok) throw new Error('failed to fetch the data')
    // return await res.json()      
    try {
        const res = await fetch(uri)
        if (!res.ok) {
          const error = new Error(`Failed to fetch data`)
          error.status = res.status
          error.statusText = res.statusText
          error.url = uri
          throw error
        }
        return await res.json()
      } catch (err) {
        // This could be a network error (TypeError)
        if (!err.status) {
          err.message = 'Network error: Failed to fetch (maybe CORS or no internet)'
          err.status = 'N/A'
          err.statusText = 'Unknown'
          err.url = uri
        }
        throw err
      }
}

export default api