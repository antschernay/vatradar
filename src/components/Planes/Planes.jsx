import React from 'react';
import L from "leaflet";
import {  Marker, Popup } from 'react-leaflet';
import "leaflet-rotatedmarker";
import Trajectory from './Trajectory.jsx';


const Planes = ({ pilots, handleAddPlane, selectedFlight, setSelectedFlight, setAccordionItem, setPanelIsShown, user }) => {

 
  const icon = new L.icon({
    iconUrl: require("../../img/plane1-smol0-min.png"),
    iconSize: 23,
   
  })

  const redIcon = new L.icon({
    iconUrl: require("../../img/plane11.png"),
    iconSize: 23,  
   
  })

  const orangeIcon = new L.icon({
    iconUrl: require("../../img/plane13.png"),
    iconSize: 23, 
  })


    return ( 
    
        
      pilots.map((pilot) => {
        const { callsign, cid, lat, lon, head, dep, arr, aircraft, alti, speed } = pilot;
        const isSelectedFlight = pilot.callsign === selectedFlight.callsign;
        const isUser = cid.toString() === user;
        const markerColor = isSelectedFlight ? redIcon : (isUser ? orangeIcon : icon);
        const key = `${callsign}-${head}`;
        const zIndex = isSelectedFlight || isUser ? 99999 : -1000;
    
      
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
                setAccordionItem((prevAccordionItem) => {
                  if (!isSelectedFlight) {
                    return prevAccordionItem === callsign ? callsign :callsign;
                  }
                  return prevAccordionItem;
                });
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
            {isSelectedFlight && <Trajectory callsign={callsign} lat={Number(lat)} lon={Number(lon)} arrIcao={arr} depIcao={dep}/>}
          </Marker>
     
        );
         
}))
};

export default Planes;


           
                      
    /*<Polyline positions={[
        [0, 0], [30, 30]
        ]} color={'black'} weight={1}/>
        
        
         const { callsign, cid, lat, lon, head, dep, arr } = pilot;
        const isSelectedFlight = pilot.callsign === selectedFlight.callsign;
        const isUser = cid.toString() === user;
        const markerColor = isSelectedFlight ? redIcon : (isUser ? orangeIcon : icon);
        const key = `${callsign}-${head}`;
        const zIndex = isSelectedFlight || isUser ? 999999 : 3000;
      
        return (
          <Marker
            position={[lat, lon]}
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
            <Popup>{callsign}</Popup>
          </Marker>
        );
      })

             
<Polyline positions={[[arrAirport.lat_decimal, arrAirport.lon_decimal], [lat, lon],
                                   depAirport.lat_decimal, depAirport.lon_decimal]} color={'black'} weight={1}
    );*/
