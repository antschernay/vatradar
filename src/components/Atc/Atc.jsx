import React from 'react';
import L from "leaflet";
import {  Marker, Popup, Tooltip } from 'react-leaflet';


const Atc = ({ airports, selectedAirports, setSelectedAirports, setAccordionItem, setPanelIsShown, selectedAirport, setSelectedAirport}) => {


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

        
        if (airport.atc.length) {
           
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
                
                }
                }>
                <Tooltip direction="right" offset={[0, 0]} opacity={1} permanent><div className='atc-label tc'><b>{airport.icao_code}</b>{airport.atc.map((atc) =><p className='f7 label ma0 lh-solid atc-label'>{atc[atc.length-3]}</p>)}</div></Tooltip> 
                
                
                </Marker>
            )

        }
        
      
      })
      
    

    );
}

export default React.memo(Atc, (prevProps, nextProps) => {
  // only re-render if pilots or selectedFlight have changed
  if (prevProps.airports !== nextProps.airports || prevProps.selectedAirport !== nextProps.selectedAirport) {
    return false;
  }
  return true;
});