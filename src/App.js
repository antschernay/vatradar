import React from 'react';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker} from 'react-leaflet';
import L from "leaflet";
import '../node_modules/leaflet/dist/leaflet.css'
import PlaneList from "./PlaneList";



function App() {


  const jsonUrl = 'https://data.vatsim.net/v3/vatsim-data.json';

  const [pilots, setData] = useState([]);


  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setData(json.pilots))
      .catch((error) => console.error(error))
  }, []);


  function getIcon(_iconSize){
    return L.icon({
      iconUrl: require("./img/point.png"),
      iconSize: [_iconSize]
    })
  }


  
  
  return (   

    <MapContainer center={[-35.52, 5.34]} zoom={3} minZoom={2} scrollWheelZoom={true} style={{ width:'100vw', height:'100vw'}}>
      <TileLayer
        //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        //url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=O1Bqw80hgGnLYmBXIA59"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
        />
        <Marker position={[51.505, -0.09]} icon={getIcon(7)}></Marker>
        <PlaneList pilots={pilots}/>      
    </MapContainer>

  );
}


export default App;
