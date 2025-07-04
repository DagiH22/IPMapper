import './styles/App.css'
import InfoCard from './components/InfoCard.jsx'
import SearchInput from './components/SearchInput.jsx'
import MapArea from './components/mapArea.jsx'
import api from './services/api.js'
import { useState,useEffect } from 'react'
import 'leaflet/dist/leaflet.css';


function App() {
  const [result,setResult] =useState()
  const [error, setError] = useState(null) //rememebr to make error page 

  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const data = await api() 
        setResult(data)
      } catch (err) {
        setError(err.message)
      }
    }
    fetchUserIP()
  }, [])

  const handleSearch = async (ipOrDomain) => {
    try {
      const res = await api(ipOrDomain)
      setResult(res)
      setError(null)
      console.log('this is res \n',res)
    } catch (err) {
      setError(err.message)
      setResult(null)
    }
  }
  return (
    <>
      <div className='container'>
        <div className='nonMap'>
          <h1>IPMapper</h1>
          <SearchInput onSearch={handleSearch}/>
        </div>
        {error && <p>Error: {error}</p>}
        {result && <InfoCard data={result} />}
        {result &&<MapArea data={result}/>}
      </div>
    </>
  )
}

export default App
