import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet';
import PlaneList from "../Planes/PlaneList";
import { useState } from 'react';
import FlightInfo from '../FlightInfo/FlightInfo';
import Toolbar from "../Toolbar/Toolbar";





function Home ({pilots})  {

    const [selectedFlight, setSelectedFlight] = useState([]);  
    const [trackedFlight, setTrackedFlight] = useState(123);
    const [planesAreShown, setPlanesAreShown] = useState(true);



    return( 
        <>
        
            <MapContainer center={[-35.52, 5.34]} zoom={3} minZoom={2} scrollWheelZoom={true} zoomControl={false}
                        style={{ width:'100vw', height:'100vw'}} > 
                            
                
                <TileLayer
                    //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=O1Bqw80hgGnLYmBXIA59"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />

                <Toolbar planesAreShown={planesAreShown} setPlanesAreShown={setPlanesAreShown} setTrackerFlight={setTrackedFlight}
                        trackedFlight={trackedFlight} />
             
                {planesAreShown ?
                
                    <PlaneList pilots={pilots} setSelectedFlight={setSelectedFlight} 
                     callsign={selectedFlight.callsign} trackedFlight={trackedFlight}/> 

                :null
                }
                
                {selectedFlight.length !== 0 ?

                    <FlightInfo pilot = {selectedFlight} setSelectedFlight={setSelectedFlight}/>
                    
                :null}
            
            </MapContainer>
        </>
    )
}

export default Home;