import React from 'react';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer} from 'react-leaflet';
import '../node_modules/leaflet/dist/leaflet.css'
import PlaneList from "./PlaneList";



function App() {

  const [pilots, setData] = useState([]);
 

  function fetchJson(){
    fetch("https://tender-teal-panda.cyclic.app")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }



  React.useEffect(() => {
    fetchJson();
    const interval = setInterval(() => {
      fetchJson()
    }, 60000); 
    return () => clearInterval(interval);     
  }, []);

  
  
  return (   


    <MapContainer center={[-35.52, 5.34]} zoom={3} minZoom={2} scrollWheelZoom={true} style={{ width:'100vw', height:'100vw'}}>
      <TileLayer
        //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=O1Bqw80hgGnLYmBXIA59"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        <PlaneList pilots={pilots}/>      
    </MapContainer>

  );
}


export default App;

