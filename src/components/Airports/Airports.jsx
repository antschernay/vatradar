import React from 'react';
import L from "leaflet";
import {  Marker, Popup } from 'react-leaflet';


const Airports = ({ airports, selectedAirports, setSelectedAirports, setAccordionItem, setPanelIsShown, selectedAirport, setSelectedAirport}) => {


  const icon = new L.icon({
    iconUrl: require("../../img/fot.png"),
    iconSize: 30,
   
  })

  const blueIcon = new L.icon({
    iconUrl: require("../../img/fot_b.png"),
    iconSize: 35,
   
  })

  const handleAdd = (array, item, event) => {
    console.log(array)
    if (!array.some(value => value.icao_code === item.icao_code)) {
      event(prevArray => [...prevArray, item])
    } 
  }
 
    return ( 

      
      
        
      airports.map((airport) => {
    
        const isSelectedAirport = airport.icao_code === selectedAirport.icao_code;
        const markerColor = isSelectedAirport ? blueIcon : icon;
        const zIndex = isSelectedAirport ? 99999 : -2000;
   
      
        return (
          
          <Marker
            position={[airport.lat_decimal, airport.lon_decimal]}
            icon={markerColor}
            zIndexOffset={zIndex}
            eventHandlers={{
              click: () => {
                  setSelectedAirport(isSelectedAirport ? [] : { "icao_code": airport.icao_code});
                  handleAdd(selectedAirports, airport, setSelectedAirports)
                  setAccordionItem(airport.icao_code)
                  setPanelIsShown(true);
              },
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
            }
            }>
            <Popup>
              <div className='flex justify-center'>
                <p className='b'>{airport.icao_code}</p>
              </div>
              
            </Popup>
             
          </Marker>
        );
      })

             

    );
}

export default React.memo(Airports, (prevProps, nextProps) => {
  // only re-render if pilots or selectedFlight have changed
  if (prevProps.airports !== nextProps.airports || prevProps.selectedAirport !== nextProps.selectedAirport) {
    return false;
  }
  return true;
});
