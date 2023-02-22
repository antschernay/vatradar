import React from 'react';
import L from "leaflet";
import {  Marker, Popup } from 'react-leaflet';
import "leaflet-rotatedmarker";





const PlaneList = ({ pilots, setSelectedFlight, callsign, trackedFlight }) => {

  

    

    function getIcon(_iconSize){
        return L.icon({
          iconUrl: require("../../img/plane1-smol0.png"),
          iconSize: [_iconSize]
        })
      }

      function getYellowIcon(_iconSize){
        return L.icon({
          iconUrl: require("../../img/plane11.png"),
          iconSize: [_iconSize]
        })
      }
  

  
  

    return ( 
      
        
        pilots.map((pilot, i) => {
            if ( pilots[i].callsign===callsign){
              return (
                <Marker position={[pilots[i].lat, pilots[i].lon]} icon={getYellowIcon(23)} key={pilots[i].callsign}
                        rotationOrigin="center" rotationAngle={pilots[i].head} eventHandlers={{
                        click: () => {
                        
                          setSelectedFlight([]);
                                                
                        },
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                      }}>  
                                      
                      <Popup>{pilots[i].callsign}</Popup> 
                      {setSelectedFlight(pilots[i])}
                </Marker> 
              )
            }
            else {
            return (
                
                <Marker position={[pilots[i].lat, pilots[i].lon]} icon={getIcon(22)} key={pilots[i].callsign}
                      rotationOrigin="center" rotationAngle={pilots[i].head} eventHandlers={{
                        click: () => {
                       
                          setSelectedFlight(pilots[i]);
                                                
                        },
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                      }}>  
                                      
                      <Popup>{pilots[i].callsign}</Popup>  
                </Marker>  
                                              
                 
            );
                    }
        })

             

    );
}

export default PlaneList;



                      
                      
/* <Polyline positions={[
  [0, 0], [30, 30]
  ]} color={'black'} weight={1}/>
  */
