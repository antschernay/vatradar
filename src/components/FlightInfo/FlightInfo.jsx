import React from 'react';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faCircleArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';




const FlightInfo = ({ pilot, setSelectedFlight }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const [dep, setDep] = useState("");
    const [arr, setArr] = useState("");


    useEffect(()=>{
        try {
            fetch(`http://localhost:3001/airport/${pilot.arr}`)
            .then((response) => response.json())
            .then((responseData) => {
               
                setArr(responseData.city);
            })
        } 
        catch (error) {
            setArr("Unknown")
            console.error(error.message)
        }
        try {
            fetch(`http://localhost:3001/airport/${pilot.dep}`)
            .then((response) => response.json())
            .then((responseData) => {
               
                setDep(responseData.city);
            })
        } catch (error) {
            setDep("Unknown")
            console.log(error)
        }
    },[pilot]);

       

    return (
    
            <div className='flight_info_sidebar'>
                 <div className="ba b--near-black white bg-dark-gray ma1 bw1 code">
                    <div onClick={()=> setSelectedFlight([])}>
                        <FontAwesomeIcon className=' dib f5 pa2 pointer' icon={faXmark} />
                    </div>
                        <p className="f3 b  tc top">{pilot.callsign}</p>
                        <div className='flex justify-center bg-gray mb2 bt bb b--near-white'>
                            <div className='w-25 tc items-center'>
                                <p className='f4 b bottom'>{pilot.dep}</p>
                                <p className='fw1 top'>{dep}</p>
                            </div>
                            <div className='w-10  tc flex items-center'>
                            <FontAwesomeIcon className=' f2 dib v-mid' icon={faCircleArrowRight} />
                            </div>
                            <div className='w-25  tc items-center'>
                                <p className='f4 b bottom'>{pilot.arr}</p>
                                <p className='fw1 top'>{arr}</p>
                            </div>
                        </div>
                       
                        <table className='tl pa3'>
                            <th className='b  f6 pr2'>
                                <tr>
                                <td>Name</td>
                                <td className='fw1 pl2'>{pilot.name}</td>
                                
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
                            <div className='mr3' onClick={()=> setIsExpanded(!isExpanded)}>
                            <FontAwesomeIcon className=' f5' icon={faGripLines} />
                            </div>
                        </div>

                        {isExpanded && 
                        
                            <table className='tl pa3'>
                                <th className=' pr2'>
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
                                    <tr>
                                        <td>Remarks</td>
                                        <td className='fw1 pl2'>{pilot.remarks}</td>
                                    </tr>
                                    <tr>
                                        <td>Route</td>
                                        <td className='fw1 pl2'>{pilot.route}</td>
                                    </tr>
                                </th>                                                             
                            </table> 
                        }  
                                               
                                
                </div>
                    
            </div>
        
    )
}

export default FlightInfo;

//<FontAwesomeIcon className=' dib f5 pa2 pointer' icon={faXmark} /></div>