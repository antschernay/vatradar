import React from 'react';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faCircleArrowRight, faXmark } from '@fortawesome/free-solid-svg-icons';




const FlightInfo = ({ pilot, setSelectedFlight }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
    
            <div className='flight_info_sidebar'>
                 <div className="ba b--near-black bg-dark-gray ma1 bw1 code">
                    <div onClick={()=> setSelectedFlight([])}>
                        <FontAwesomeIcon className='white dib f5 pa2 pointer' icon={faXmark} />
                    </div>
                        <p className="f3 b white tc top">{pilot.callsign}</p>
                        <div className='flex justify-center bg-gray mb2 bt bb b--near-white'>
                            <div className='w-25 white tc items-center'>
                                <p className='f4 b bottom'>{pilot.dep}</p>
                                <p className='fw1 top'>City</p>
                            </div>
                            <div className='w-10 white tc flex items-center'>
                            <FontAwesomeIcon className='white f2 dib v-mid' icon={faCircleArrowRight} />
                            </div>
                            <div className='w-25 white tc items-center'>
                                <p className='f4 b bottom'>{pilot.arr}</p>
                                <p className='fw1 top'>City</p>
                            </div>
                        </div>
                       
                        <table className='tl pa3'>
                            <th className='b white f6 pr2'>
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
                            <FontAwesomeIcon className='white f5' icon={faGripLines} />
                            </div>
                        </div>

                        {isExpanded ? 
                        
                            <table className='tl pa3'>
                                <th className='white pr2'>
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
                     

                        :null}  
                                               
                                
                </div>
                    
            </div>
        
    )
}

export default FlightInfo;

//<FontAwesomeIcon className='white dib f5 pa2 pointer' icon={faXmark} /></div>