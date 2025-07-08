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
        const inpt = {type:'ip',input : ''}
        const data = await api(inpt) 
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
    const valid = isValidInput(ipOrDomain)
    if (valid === 'invalid') {
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid IP address or domain name.',
        status:400,
      });
      setResult(null);
      return 
    }
  
    try {
      let res 
      if (valid === 'ip'){
        const inpt = {type:'ip',input : ipOrDomain}
        res = await api(inpt)
      }
      else{
        const inpt = {type:'domain',input : ipOrDomain}
        res = await api(inpt)
      } 
      setResult(res)
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
