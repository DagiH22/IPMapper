import './styles/App.css'
import InfoCard from './components/InfoCard.jsx'
import SearchInput from './components/SearchInput.jsx'
import MapArea from './components/mapArea.jsx'
import api from './services/api.js'
import { useState,useEffect,useRef } from 'react'
import 'leaflet/dist/leaflet.css';
import isValidInput from './utils/validateInput.js'



function App() {
  const [result,setResult] =useState()
  const [error, setError] = useState(null) //rememebr to make error page 
  const hasFetchedRef = useRef(false)
  useEffect(() => {
    if (!navigator.onLine) {
      setError({
        title: 'Offline',
        message: 'You are currently offline. Please check your internet connection.',
      });
      return;
    }
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true
    const fetchUserIP = async () => {
      try {
        const data = await api() 
        setResult(data)
        setError(null)
      } catch (err) {
        setError(err)
        setResult(null)
      }
    }
    fetchUserIP()
  }, [])
  
  const handleSearch = async (ipOrDomain) => {
    if (!isValidInput(ipOrDomain)) {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid IP address or domain name.',
        status:400,
      });
      setResult(null);
      return;
    }
  
    try {
      const res = await api(ipOrDomain)
      setResult(res)
      setError(null)
    } catch (err) {
      setError(err)
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
        {error && <Error err={error}/>}
        {result && <InfoCard data={result} />}
        {result && !error && result.location && <MapArea data={result}/>}
      </div>
    </>
  )
}

export default App
