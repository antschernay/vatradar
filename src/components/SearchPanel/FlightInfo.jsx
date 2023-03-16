import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';

const FlightInfo = ({pilot, getDistance}) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [arr, setArr] = useState([]);
    const [dep, setDep] = useState([]);
    const [status, setStatus] = useState("");



    useEffect(()=>{
        try {
            fetch(`https://tender-teal-panda.cyclic.app/airport/${pilot.arr}`)
            .then((response) => response.json())
            .then((responseData) => {
             
                setArr(responseData);
            })
        } 
        catch (error) {
           
            console.error(error.message)
        }
        try {
            fetch(`https://tender-teal-panda.cyclic.app/airport/${pilot.dep}`)
            .then((response) => response.json())
            .then((responseData) => {
                
                setDep(responseData);
            })
        } catch (error) {
            
            console.log(error)
        }
    },[]);


    useEffect(() => {
        
    
        const getStatus = (speed, latOfPlane, lonOfPlane, latOfAirport, lonOfAirport) => {
            
            if (latOfAirport==="Nan" || lonOfAirport==="NaN") {
                return setStatus("N/A");
            }
    
            if (getDistance(latOfPlane, lonOfPlane, latOfAirport, lonOfAirport) < 40){
                if (speed < 5){
                    return setStatus("Arrived");
                } 
                else if (speed < 40){
                    return setStatus("Landing");
                }
                else if (speed < 150){
                    return setStatus("Arriving Shortly");
                }
              
            }
    
            else if (getDistance(latOfPlane, lonOfPlane, latOfAirport, lonOfAirport) > 40) {
                if (speed < 5){
                    return setStatus("Pre-Departure");
                }
                else if (speed < 40){
                    return setStatus("Left Gate");
                }
                else if (speed < 150){
                    return setStatus("Departed");
                }
            }
    
            else return setStatus("Enroute");
    
        }
        getStatus(pilot.speed, pilot.lat, pilot.lon, arr.lat_decimal, arr.lon_decimal);
    }, [pilot.speed, arr.city]);


    return(
        <>
            <div className='flex justify-center white br bl b--silver w-100' style={{backgroundColor:'#1B573F'}}>
                   
                        <div className='w-50 tc bb b--silver items-center'>
                            <p className='f6 mb0'>From</p>
                            <p className='b f5 mt1 mb2'>{dep.city}</p>
                        </div>
                        
                        <div className='w-50 tc bl bb b--silver items-center'>
                            
                            <p className='f6 mb0'>To</p>
                            <p className='b f5 mt1 mb2'>{arr.city}</p>
                        </div>
               
                   
                    
            </div>
            <div className='pa2 br bl bb b--silver w-100' style={{backgroundColor:'#1B573F'}}>
                
                <table className='tl'>
                    <th className='b white f6'>
                        <tr>
                            <td>Name</td>
                            <td className='fw1 pl2'>{pilot.name}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td className='fw1 pl2'>{status}</td>
                        </tr>
                        <tr>
                            <td>Speed</td>
                            <td className='fw1 pl2'>{pilot.speed} kt</td>
                        </tr>
                        <tr>
                            <td>Altitude</td>
                            <td className='fw1 pl2'>{pilot.alti} ft</td>
                        </tr>
                        <tr>
                            <td>Aircraft</td>
                            <td className='fw1 pl2'>{pilot.aircraft}</td>                                       
                        </tr>
                    </th>
                                                                                
                </table>
            <div className='flex justify-around'>
                <div className='' onClick={()=> setIsExpanded(!isExpanded)}>
                <FontAwesomeIcon className='white f7 pointer' icon={faGripLines} />
                </div>
            </div>

            {isExpanded && 
            <>
            
                <table className='tl white'>
                    <th className='f7 pr2'>
                        <tr>
                            <td>Transponder</td>
                            <td className='fw1 pl2'>{pilot.transp}</td>
                        </tr>
                        <tr>
                            <td>Alternate</td>
                            <td className='fw1 pl2'>{pilot.alter}</td>
                        </tr>
                        <tr>
                            <td>EnrouteTime</td>
                            <td className='fw1 pl2'>{pilot.en_time}</td>
                        </tr>                                  
                        
                    </th>                                                             
                </table> 
                <p className="code f7 white mt1 ml1"><b>Route:</b> {pilot.route}</p>
                <p className="code f7 white mt1 ml1"><b>Remarks:</b> {pilot.remarks}</p>
                </>
            }  
                        
                
            </div>
        </>
      )
  };


export default FlightInfo;
  





