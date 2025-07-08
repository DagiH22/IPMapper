const API_KEY = import.meta.env.VITE_IP_API_KEY

async function  api({type,input}) {
  let uri = ''
  let theIP = ''
  if(type === 'ip'){
     uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}${input ? `&ipAddress=${input}` : ''}`
  }
  else {
    const googleResolve = `https://dns.google/resolve?name=${input}&type=A`
    try {
      const res = await fetch(googleResolve)
      const d = await res.json()
      if (d.Answer && d.Answer.length > 0) {
        theIP = d.Answer[0].data
      } else {
        throw new Error('No A record found for domain')
      }
    } catch (err) {
      throw err
    }
    uri = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${theIP}`
  }  
  
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