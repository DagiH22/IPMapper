import '../styles/mapArea.css'
import { useEffect,useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from '../assets/images/icon-location.svg'
function MapArea({data}) {
  const mapRef = useRef(null)
  const location = data.location
  const lat = data.location.lat
  const lng = data.location.lng
  useEffect(() => {
    const map = L.map('map').setView([lat, lng], 13); 
    if (mapRef.current) return;
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap & CartoDB',
    }).addTo(map)

    const customIcon = L.icon({
      iconUrl: locationIcon,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -38]
    });
    L.marker([lat, lng], { icon: customIcon }).addTo(map);
    return () => {
      map.remove(); 
    };
  }, [location]);
  return (
    <div id='map'>
    </div>
  )
}
export default MapArea