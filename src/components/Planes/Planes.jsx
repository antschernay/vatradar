import React from 'react';
import L from "leaflet";
import {  Marker, Popup } from 'react-leaflet';
import "leaflet-rotatedmarker";
import Trajectory from './Trajectory.jsx';


const Planes = ({ pilots, setSelectedFlight, handleAddPlane, selectedFlight, setAccordionItem, setPanelIsShown }) => {

 
  const icon = new L.icon({
    iconUrl: require("../../img/plane1-smol0.png"),
    iconSize: 23,
   
  })

  const redIcon = new L.icon({
    iconUrl: require("../../img/plane11.png"),
    iconSize: 23,  
   
  })




    return ( 
      
        
      pilots.map((pilot) => {
        const { callsign, cid, lat, lon, head, dep, arr, aircraft, alti, speed } = pilot;
        const isSelectedFlight = pilot.callsign === selectedFlight.callsign;
        const markerColor = isSelectedFlight ? redIcon : icon;
        const key = `${callsign}-${head}`;
        const zIndex = isSelectedFlight ? 99999 : -1000;
    
      
        return (
          <Marker
            position={[Number(lat), Number(lon)]}
            rotationOrigin={'center'}
            icon={markerColor}
            rotationAngle={head}
            key={key}
            zIndexOffset={zIndex}
            eventHandlers={{
              click: () => {
                setSelectedFlight(isSelectedFlight ? [] : { "callsign": callsign, "dep": dep, "arr": arr });
                handleAddPlane(pilot);
                setAccordionItem(callsign);
                setPanelIsShown(true);
               
              },
              mouseover: (event) => event.target.openPopup(),
              mouseout: (event) => event.target.closePopup(),
            }}>
           <Popup>
              <div className='ph2'>
                <p className='b'>{callsign} {aircraft}</p>
                <p className=''>{alti} {speed}</p>
                <p className=''>{dep} {arr}</p>
              </div>
              
            </Popup>
            {isSelectedFlight && <Trajectory lat={Number(lat)} lon={Number(lon)} arrIcao={arr} depIcao={dep}/>}
          </Marker>
        );
       
}))
}

export default React.memo(Planes);

/* (prevProps, nextProps) => {
  // only re-render if pilots or selectedFlight have changed
  if (prevProps.pilots !== nextProps.pilots || prevProps.selectedFlight !== nextProps.selectedFlight) {
    return false;
  }
  return true;
});*/
