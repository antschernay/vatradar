import React, { useEffect } from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faXmark, faLocationDot, faGripLines, faMapPin, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import inAir from '../../img/inair4.svg';
import standing from '../../img/standing3.svg';
import landing from '../../img/landing2.svg';
import takeoff from '../../img/takeoff2.svg';
import FlightInfo from './FlightInfo';


const SelectedPlanes = ({planes, pilots, accordionItem, setAccordionItem, handleFunction, setSelectedPlanes, cardType, selectedFlight, setSelectedFlight}) => {


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
  

      const calculateArrivalTime = (distance, speed) => {
        // Calculate the estimated arrival time in hours
        if (speed===0) {
            return 0;
        }
        const arrivalTime = 60 * distance / speed;

        // Return the estimated arrival time in minutes
        return arrivalTime;
      };


      const getArrivalTime = (mins) => {
        if (mins===0) {
            return "'N/A'";
        }
        // Get the current GMT time
        let gmtTime = new Date();
      
        // Add the specified number of minutes to the GMT time
        let newTime = new Date(gmtTime.getTime() + mins * 60000);
      
        // Extract the hours and minutes components of the new time
        let hours = newTime.getUTCHours().toString().padStart(2, '0');
        let minutes = newTime.getUTCMinutes().toString().padStart(2, '0');
      
        // Return the new time in "hh:mm" format
        return `${hours}:${minutes}`;
      }



    return (
        <div>
        {
        planes.map((plane) => {
            return (
                <>          
                    <div className=" ba b--silver w-100 mt2" style={{backgroundColor: plane.callsign===selectedFlight.callsign ?'#999999' :'#6B9980'}}>
                        <div className="flex justify-between">
                            <div className='flex'>
                                {cardType !== "normal" ?
                                <div className='flex br b--silver tc pa2 items-center'>
                                    {pilots.map((pilot) => {
                                        if (plane.callsign===pilot.callsign && cardType === "arrival"){
                                            return <p className="code f6 white ma0">{getArrivalTime(calculateArrivalTime(getDistance(pilot.lat, pilot.lon, plane.latAir, plane.lonAir), pilot.speed))}</p>
                                    }})}

                                        
                                    {cardType==="departure" && <p className="code f6 white ma0">{plane.deptime.slice(0, 2)}:{plane.deptime.slice(2)}</p>}
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
                                        return  <img className='ph2 o-90' src={standing} alt="glass" width="17" height="17"></img>
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
                        
                                    else return <img className='ph2 o-90' src={inAir} alt="glass" width="17" height="17"></img>
                                }
                            })}
                            
                             
                                
                        
                                <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faLocationDot} 
                                    onClick={()=> setSelectedFlight({"callsign":plane.callsign, "dep": plane.dep, "arr": plane.arr})}
                                    onDoubleClick={()=> setSelectedFlight([])}/>
                                {accordionItem===plane.callsign ? 
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretUp} 
                                    onClick={()=> {setAccordionItem(""); setSelectedFlight([])}} />
                                    :
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretDown} 
                                    onClick={()=> {setAccordionItem(plane.callsign);
                                     setSelectedFlight({"callsign":plane.callsign, "dep": plane.dep, "arr": plane.arr});
                                    }} />
                                }
                                {cardType==="normal" ? <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faXmark} 
                                    onClick={()=> handleFunction(planes, plane, setSelectedPlanes)}/>
                                    : <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faMapPin} 
                                    onClick={()=> handleFunction(plane)}/>}
                              
                            </div>
                        </div>
                    </div>
                    
                    
                    {pilots.map((pilot) => {
                        if (pilot.callsign===plane.callsign && accordionItem===plane.callsign ){ 
                            return (
                            <>
                            
                            <FlightInfo pilot={pilot} getDistance={getDistance} />
                           
                            </>)
                        }

                    })}

                        
                </>
               
            );
                
        })}

    </div>        
    )
};

export default SelectedPlanes;

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
      */