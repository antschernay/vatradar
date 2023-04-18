import React from "react";
import { MapContainer, TileLayer} from 'react-leaflet';
import Planes from "../Planes/Planes";
import { useState } from 'react';
import Toolbar from "../Toolbar/Toolbar";
import SearchPanel from "../SearchPanel/SearchPanel";
import Airports from "../Airports/Airports";



const Home = ({pilots, selectedPlanes, setSelectedPlanes, selectedAirports, setSelectedAirports, airports}) => {
    const [planesAreShown, setPlanesAreShown] = useState(true);
    const [panelIsShown, setPanelIsShown] = useState(false);
    const [airportsAreShown, setAirportsAreShown] = useState(false);
    const [accordionItem, setAccordionItem] = useState("");
    const [selectedFlight, setSelectedFlight] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState([]);
    


    const handleAddPlane = (plane) => {
        const newValue = {"callsign": plane.callsign, "dep": plane.dep, "arr": plane.arr, "speed": plane.speed};
    if (!selectedPlanes.some((value) => (value.callsign === newValue.callsign && value.dep === newValue.dep && value.arr === newValue.arr))) {
      setSelectedPlanes(previousArray => [...previousArray, newValue]);
      
    }}




    return( 
        <>
        <div className="flex">
            {panelIsShown &&
                <SearchPanel pilots={pilots} selectedPlanes={selectedPlanes} setSelectedPlanes={setSelectedPlanes}
                                selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports}
                                selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} handleAddPlane={handleAddPlane}
                                accordionItem={accordionItem} setAccordionItem={setAccordionItem}
                                selectedAirport={selectedAirport}/>
            }

            <MapContainer center={[30, 0]} zoom={3} minZoom={2} scrollWheelZoom={true} zoomControl={false}
                        style={{ width:'100vw', height:'100vh'}} > 
                            
                
                <TileLayer
                    //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=O1Bqw80hgGnLYmBXIA59"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />

                <Toolbar planesAreShown={planesAreShown} setPlanesAreShown={setPlanesAreShown} 
                         panelIsShown={panelIsShown} setPanelIsShown={setPanelIsShown}
                         airportsAreShown={airportsAreShown} setAirportsAreShown={setAirportsAreShown} />
             
                {planesAreShown &&
                
                    <Planes pilots={pilots} handleAddPlane={handleAddPlane} selectedFlight={selectedFlight} 
                                setSelectedFlight={setSelectedFlight} setAccordionItem={setAccordionItem} setPanelIsShown={setPanelIsShown}/> 

                }

                {airportsAreShown && 
                    <Airports airports={airports} selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports}
                              setAccordionItem={setAccordionItem} setPanelIsShown={setPanelIsShown} selectedAirport={selectedAirport} 
                              setSelectedAirport={setSelectedAirport}/>
                }
                
                
               
            
            </MapContainer>
            </div>
        </>
    )
}

export default Home;
