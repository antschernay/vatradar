import React from "react";
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from "leaflet";
import Planes from "../Planes/Planes";
import { useState, useEffect, useRef } from 'react';
import Toolbar from "../Toolbar/Toolbar";
import SearchPanel from "../SearchPanel/SearchPanel";
import Airports from "../Airports/Airports";
import Atc from "../Atc/Atc";
import LinesToFlights from "../LinesToFlights/LinesToFLights";
import Sectors from "../Sectors/Sectors";



const Home = ({pilots, selectedPlanes, setSelectedPlanes, selectedAirports, setSelectedAirports, user, airports, controllers}) => {

    const [planesAreShown, setPlanesAreShown] = useState(true);
    const [panelIsShown, setPanelIsShown] = useState(false);
    const [airportsAreShown, setAirportsAreShown] = useState(false);
    const [accordionItem, setAccordionItem] = useState("");
    const [selectedFlight, setSelectedFlight] = useState([]);
    const [selectedAirport, setSelectedAirport] = useState({"icao_code": '', "lat_decimal":0, "lon_decimal":0});
    const [atcAreShown, setAtcAreShown] = useState(false);
    const [polygonsAreShown, setPolygonsAreShown] = useState(false);
    const [zoom, setZoom] = useState(6);
    const [center, setCenter] = useState([48.5,10])
    const [loading, setLoading] = useState(true);
    const mapRef = useRef(null);


    useEffect(() => {
        const storageAirports = localStorage.getItem('selectedAirports')
        const storageZoom = localStorage.getItem('zoom')
        const storageCenter = localStorage.getItem('center')
        if (storageZoom) {
          setZoom(JSON.parse(storageZoom))
          
        }
    
        if (storageAirports) {
          setSelectedAirports(JSON.parse(storageAirports));
        }     
        
    
        if (storageCenter) {
      
          setCenter(JSON.parse(storageCenter))
         
        }
        setLoading(false);
      }, []);



      useEffect(()=> {
        
        setSelectedPlanes(selectedPlanes.filter((plane)=> pilots.some((pilot)=>pilot.callsign===plane.callsign)))

      }, [pilots])


      const blueIcon = new L.icon({
        iconUrl: require("../../img/fot_b.png"),
        iconSize: 35,
       
      })


        const handleSetView = (coords) => {
            mapRef.current.setView(coords, 5)
        }


        const handleAddPlane = (plane) => {
            const newValue = {"callsign": plane.callsign, "dep": plane.dep, "arr": plane.arr, "speed": plane.speed, "lat": plane.lat, "lon":plane.lon};
        
            if (!selectedPlanes.some((value) => (value.callsign === newValue.callsign && value.dep === newValue.dep && value.arr === newValue.arr))) {
                setSelectedPlanes(previousArray => [...previousArray, newValue]);                  
        
        }}


        if (loading) {
            return <div>LOADING</div>
        }




    return( 
        <>
        <div className="flex home">
            {panelIsShown &&
                <SearchPanel pilots={pilots} selectedPlanes={selectedPlanes} setSelectedPlanes={setSelectedPlanes}
                                selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports}
                                selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} handleAddPlane={handleAddPlane}
                                accordionItem={accordionItem} setAccordionItem={setAccordionItem} setSelectedAirport={setSelectedAirport}
                                selectedAirport={selectedAirport} controllers={controllers} handleSetView={handleSetView}/>
            }

            <MapContainer center={center} zoom={zoom} minZoom={2} scrollWheelZoom={true} zoomControl={false}
                        style={{ width:'100vw', height:'100vh'}} ref={mapRef} > 
                            
                
                <TileLayer
                    //attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    //url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    url="https://api.maptiler.com/maps/basic-v2/{z}/{x}/{y}.png?key=O1Bqw80hgGnLYmBXIA59"
                    attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                />

                <Toolbar planesAreShown={planesAreShown} setPlanesAreShown={setPlanesAreShown} 
                         panelIsShown={panelIsShown} setPanelIsShown={setPanelIsShown}
                         airportsAreShown={airportsAreShown} setAirportsAreShown={setAirportsAreShown} 
                         atcAreShown={atcAreShown} setAtcAreShown={setAtcAreShown}
                         polygonsAreShown={polygonsAreShown} setPolygonsAreShown={setPolygonsAreShown}/>
             
                {planesAreShown &&
                
                    <Planes pilots={pilots} selectedFlight={selectedFlight} user={user} handleAddPlane={handleAddPlane}
                                setSelectedFlight={setSelectedFlight} setAccordionItem={setAccordionItem} setPanelIsShown={setPanelIsShown}
                            /> 

                }

                {airportsAreShown && 
                    <Airports airports={airports} selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports}
                              setAccordionItem={setAccordionItem} setPanelIsShown={setPanelIsShown} selectedAirport={selectedAirport} 
                              setSelectedAirport={setSelectedAirport} pilots={pilots}/>
                }

                {selectedAirport.icao_code &&
                    <Marker  position={[selectedAirport.lat_decimal, selectedAirport.lon_decimal]}
                            icon={blueIcon}
                            zIndexOffset={5000}
                            eventHandlers={{
                                click: () => {
                                    setSelectedAirport({"icao_code": '', "lat_decimal":0, "lon_decimal":0})}
                                }}
                    >
                        <LinesToFlights lat={selectedAirport.lat_decimal} lon={selectedAirport.lon_decimal} 
                                        icao_code={selectedAirport.icao_code} pilots={pilots}/>
                        </Marker>
                
                }



                {atcAreShown &&
                <Atc airports={airports} selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports}
                    setAccordionItem={setAccordionItem} setPanelIsShown={setPanelIsShown} selectedAirport={selectedAirport} 
                    setSelectedAirport={setSelectedAirport} />

                }

                {polygonsAreShown &&

                <Sectors />

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


