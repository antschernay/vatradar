import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import inAir from '../../img/inair4.svg';
import standing from '../../img/standing3.svg';
import landing from '../../img/landing2.svg';
import takeoff from '../../img/takeoff2.svg';
import pin from '../../img/pin1.svg';
import FlightInfo from './FlightInfo';


const SelectedPlanes = ({planes, pilots, accordionItem, setAccordionItem, handleFunction, setSelectedPlanes, cardType, selectedFlight, setSelectedFlight, handleSetView}) => {



        
    const getDistance = (lat1, lon1, lat2, lon2) => {
        const earthRadiusKm = 6371; // Radius of the earth in kilometers
        const dLat = deg2rad(lat2-lat1);
        const dLon = deg2rad(lon2-lon1);
        const a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const distance = earthRadiusKm * c; // Distance in km
       
        return distance*0.54;
      }
      
      const deg2rad = (deg) => {
        return deg * (Math.PI/180)
      }
  



    


    return (
        <div>
        {
        planes.map((plane) => {
            const filteredPilots = pilots.filter((pilot) => pilot.callsign === plane.callsign && accordionItem === plane.callsign);
            return (
                <>       
                
                    <div key={plane.callsign} className=" ba b--silver w-100 mt2" style={{backgroundColor: plane.callsign===selectedFlight.callsign ?'#777777' :'#71967E'}}>
                        <div className="flex justify-between">
                            <div className='flex'>
                                {cardType !== "normal" ?
                                <div className='flex br b--silver tc pa2 items-center'>
                                    {pilots.map((pilot) => {
                                        if (plane.callsign===pilot.callsign && cardType === "arrival"){
                                            return <p className="code f6 white ma0">{plane.estTime==='000000'? 'ARRIVD':plane.estTime}</p>
                                    }})}

                                        
                                    {cardType==="departure" && <p className="code f6 white ma0">{plane.estTime}</p>}
                                </div> 
                                : null}
                            
                                
                                <div className='flex pa2 items-center'>
                                    <p className="code f6 white ma0"><b>{plane.callsign}</b>, {plane.dep} - {plane.arr}</p>
                                
                            
                            </div>

                            </div>
                            <div className='flex pa2 items-center'>
                            {pilots.map((pilot) => {
                                if (plane.callsign===pilot.callsign && cardType !== "normal") {
                                    
                                    if (pilot.speed < 5) {
                                        return  <img className='ph2 o-80' src={standing} alt="glass" width="17" height="17"></img>
                                    }
                                    else if (pilot.speed < 150 && cardType==="arrival" ) {
                                       
                                        if (getDistance(pilot.lat, pilot.lon, plane.latAir, plane.lonAir) < 40){
                                            return <img className='ph2 o-80' src={landing} alt="glass" width="17" height="17"></img>
                                        }
                                        else return <img className='ph2 o-80' src={takeoff} alt="glass" width="17" height="17"></img>
                                    }
                                    else if (pilot.speed < 150 && cardType==="departure") {
                                       
                                        if (getDistance(pilot.lat, pilot.lon, plane.latAir, plane.lonAir) < 40){
                                            return <img className='ph2 o-80' src={takeoff} alt="glass" width="17" height="17"></img>
                                        }
                                        else return <img className='ph2 o-80' src={landing} alt="glass" width="17" height="17"></img>
                                    }
                        
                                    else return <img className='ph2 o-80' src={inAir} alt="glass" width="17" height="17"></img>
                                }
                            })}
                            
                             
                                
                        
                                <FontAwesomeIcon
                                    className='white dib f7 ph2 pointer'
                                    icon={faLocationDot}
                                    onClick={() => {
                                        if (plane.callsign===selectedFlight.callsign) {
                                           
                                            setSelectedFlight([]);
                                       
                                        } else {
                                            
                                            setSelectedFlight({ "callsign": plane.callsign, "dep": plane.dep, "arr": plane.arr });
                                            handleSetView([plane.lat, plane.lon + 5]);
                                        }
                                    }}
                                />
                                {accordionItem===plane.callsign ? 
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretUp} 
                                    onClick={()=> setAccordionItem("")} />
                                    :
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretDown} 
                                    onClick={()=> setAccordionItem(plane.callsign)} />
                                }
                                {cardType==="normal" ?
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faXmark} 
                                    onClick={()=> {handleFunction(planes, plane, setSelectedPlanes);
                                        if (plane.callsign===selectedFlight.callsign ) {
                                            setSelectedFlight([])
                                        }    
                                        }}/>
                                    : 
                                    <img className='dib pointer' src={pin} alt="pin" width="20" height="20" 
                                    onClick={()=> {handleFunction(plane)}}/>
                                    }
                                    
                              
                            </div>
                        </div>
                    </div>
                    
                    
                    
                    {filteredPilots.length > 0 && (
                        
                        filteredPilots.map((pilot) => (
                            <FlightInfo pilot={pilot} getDistance={getDistance} />
                        ))
                    )}

                        
                </>
               
            );
                
        })}

    </div>        
    )
};

export default React.memo(SelectedPlanes, (prevProps, nextProps) => 
    {if (prevProps.pilots !== nextProps.pilots || prevProps.planes !== nextProps.planes || prevProps.handleFunction !== nextProps.handleFunction ||
    prevProps.accordionItem !== nextProps.accordionItem || prevProps.selectedFlight !== nextProps.selectedFlight) {
    return false;
}
return true;
});;

/*
const isFound = (callsign) => pilots.some(pilot => {
        if (pilot.callsign === callsign) {
          return true;
        }
        return false;
      });
       {!isFound(plane.callsign) && accordionItem===plane.callsign
                        ?
                            <div className='pa2 ba b--silver w-100' style={{backgroundColor:'#1B573F'}}>
                                <p className="code f6 white mt1 ml1">Information about this flight is not available anymore</p>
                            </div>
                        : null
                    }
                    
                    
                    
                     useEffect(() => {
        const getAirport = (icaoCode, setFunction) => {
            try {
                fetch(`http://localhost:3001/airport/${icaoCode}`)
                .then((response) => response.json())
                .then((responseData) => {
                   console.log(responseData)
                    setFunction(responseData);
                })
            } 
            catch (error) {
                
                console.error(error.message)
            }
        }
      })
      


      {cardType==="arrival" && <p className="code f6 white ma0">{getArrivalTime(calculateArrivalTime(getDistance(plane.lat, plane.lon, plane.latAir, plane.lonAir), plane.speed))}</p>}
      const filteredPilots = pilots.filter(pilot => pilot.callsign === plane.callsign && accordionItem === plane.callsign);
      
      
      
      , (prevProps, nextProps) => {
    // only re-render if pilots or selectedFlight have changed
    if (prevProps.pilots !== nextProps.pilots || prevProps.planes !== nextProps.planes ||
         prevProps.accordionItem !== nextProps.accordionItem || prevProps.selectedFlight !== nextProps.selectedFlight) {
      return false;
    }
    return true;
});

*/