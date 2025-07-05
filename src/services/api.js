const API_KEY = import.meta.env.VITE_IP_API_KEY

async function api(ipOrDomain='') {
    const uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}${ipOrDomain ? `&ipAddress=${ipOrDomain}` : ''}`
    
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