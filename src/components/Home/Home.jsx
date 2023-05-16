import React from "react";
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Planes from "../Planes/Planes";
import { useState } from 'react';
import Toolbar from "../Toolbar/Toolbar";
import SearchPanel from "../SearchPanel/SearchPanel";
import Airports from "../Airports/Airports";



const Home = ({pilots, selectedPlanes, setSelectedPlanes, selectedAirports, setSelectedAirports, user, airports, zoom, center, controllers}) => {

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
                                selectedAirport={selectedAirport} controllers={controllers}/>
            }

            <MapContainer center={center} zoom={zoom} minZoom={2} scrollWheelZoom={true} zoomControl={false}
                        style={{ width:'100vw', height:'100vh'}} onZoomEnd={e=>localStorage.setItem('zoom', JSON.stringify(e.target.getZoom()))} moveend={console.log('lk')} > 
                            
                
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
                
                    <Planes pilots={pilots} selectedFlight={selectedFlight} user={user} handleAddPlane={handleAddPlane}
                                setSelectedFlight={setSelectedFlight} setAccordionItem={setAccordionItem} setPanelIsShown={setPanelIsShown}
                            /> 

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
export default React.memo(Home, (prevProps, nextProps) => {

    if (prevProps.pilots !== nextProps.pilots || prevProps.airports !== nextProps.airports || prevProps.user !== nextProps.user ||
        prevProps.selectedAirports !== nextProps.selectedAirports || prevProps.selectedPlanes !== nextProps.selectedPlanes ||
        prevProps.zoom !== nextProps.zoom || prevProps.center !== nextProps.center) {
            return false
        }
    else return true;
});


export default React.memo(Home, (prevProps, nextProps) => {

    if (prevProps.pilots !== nextProps.pilots || prevProps.airports !== nextProps.airports || 
        prevProps.selectedAirports !== nextProps.selectedAirports || prevProps.selectedPlanes !== nextProps.selectedPlanes
        ) {
            return false
        }
    else return true;
});
