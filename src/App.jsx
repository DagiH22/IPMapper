import './styles/App.css'
import InfoCard from './components/InfoCard.jsx'
import SearchInput from './components/SearchInput.jsx'
import MapArea from './components/mapArea.jsx'

function App() {

  return (
    <>
      <div className='container'>
        <div className='nonMap'>
          <h1>IPMapper</h1>
          <SearchInput/>
        </div>
          <InfoCard/>
        <MapArea></MapArea>
      </div>
    </>
  )
}

export default App
