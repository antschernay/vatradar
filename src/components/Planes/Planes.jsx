import React from 'react';
import L from "leaflet";
import {  Marker, Popup } from 'react-leaflet';
import "leaflet-rotatedmarker";


const PlaneList = ({ pilots, setSelectedFlight, handleAddPlane, selectedFlight, setAccordionItem, setPanelIsShown }) => {


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
            if (pilot.callsign===selectedFlight.callsign){
              return (
                <Marker position={[pilot.lat, pilot.lon]} rotationOrigin={'center'} icon={redIcon} rotationAngle={pilot.head} key={`${pilot.callsign}-${pilot.head}`} zIndexOffset={999999}  
                         eventHandlers={{
                        click: () => {
                          setAccordionItem("");
                          setSelectedFlight([]);
                          
                                                
                        },
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                      }}>  
                                     
                                      
                      <Popup>{pilot.callsign}</Popup> 
                     
                      
                      
                </Marker>
               
               
              )
            }
           
            else {
            return (
                
                <Marker position={[pilot.lat, pilot.lon]} rotationOrigin={'center'} icon={icon} rotationAngle={pilot.head} key={`${pilot.callsign}-${pilot.head}`} 
                        eventHandlers={{
                        click: () => {
                          //change the color of the selected pilot to red
                          setSelectedFlight({"callsign":pilot.callsign, "dep": pilot.dep, "arr": pilot.arr});
                          //add the pilot to the searchpanel
                          handleAddPlane(pilot);
                          //open the information about the pilot
                          setAccordionItem(pilot.callsign);
                          //open the searchpanel
                          setPanelIsShown(true);

                                                
                        },
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                      }}>  
                                      
                      <Popup>{pilot.callsign}</Popup>  
                      
                      
                </Marker>  
                                              
                 
            );
                    }
        })

             

    );
}

export default React.memo(PlaneList, (prevProps, nextProps) => {
  // only re-render if pilots or selectedFlight have changed
  if (prevProps.pilots !== nextProps.pilots || prevProps.selectedFlight !== nextProps.selectedFlight) {
    return false;
  }
  return true;
});


           
                      
    /*<Polyline positions={[
        [0, 0], [30, 30]
        ]} color={'black'} weight={1}/>
        */