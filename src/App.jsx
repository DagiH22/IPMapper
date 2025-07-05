import { useState,useEffect,useRef } from 'react'
import './styles/App.css'
import 'leaflet/dist/leaflet.css';
import InfoCard from './components/InfoCard.jsx'
import SearchInput from './components/SearchInput.jsx'
import MapArea from './components/MapArea.jsx'
import api from './services/api.js'
import isValidInput from './utils/validateInput.js'
import Error from './components/Error.jsx';



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
      } 
        catch (err) {
          const normalizedError = {
            title: 'Something went wrong',
            message: '',
            status: err.status || 'N/A',
          };
        
          if (err instanceof Error) {
            normalizedError.message = err.message;
          } else if (typeof err === 'string') {
            normalizedError.message = err;
          } else if (err && typeof err.message === 'string') {
            normalizedError.message = err.message;
          } else {
            normalizedError.message = 'Unknown error occurred.';
          }
        
          setError(normalizedError);
          setResult(null);
        
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
      return 
    }
  
    try {
      const res = await api(ipOrDomain)
      setResult(res)
      setError(null)
    } 
      catch (err) {
        // Normalize error into an object with known shape
        const normalizedError = {
          title: 'Something went wrong',
          message: '',
          status: err.status || 'N/A',
        };
      
        if (err instanceof Error) {
          normalizedError.message = err.message;
        } else if (typeof err === 'string') {
          normalizedError.message = err;
        } else if (err && typeof err.message === 'string') {
          normalizedError.message = err.message;
        } else {
          normalizedError.message = 'Unknown error occurred.';
        }
      
        // You can add cases for specific status codes here too
      
        setError(normalizedError);
        setResult(null);
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
        {result && !error && <InfoCard data={result} />}
        {result && !error && result.location && <MapArea data={result}/>}
      </div>
    </>
  )
}

export default App
