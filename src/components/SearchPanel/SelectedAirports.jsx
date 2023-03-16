import React from 'react';
import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import SelectedPlanes from './SelectedPlanes';

const SelectedAirports = ({airports, pilots, accordionItem, setAccordionItem, handleDelete, setSelectedAirports, selectedFlight, setSelectedFlight, handleAddPlane}) => {


    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [accordionFlight, setAccordionFlight] = useState("");

    const convertToDegrees = (decimal) => {
        const degrees = Math.floor(decimal);
        const minutes = (decimal - degrees) * 60;
        const seconds = (minutes - Math.floor(minutes)) * 60;
        return `${degrees}° ${Math.floor(minutes)}' ${Math.floor(seconds)}"`;
    }

    const getFlights = (icao, lat, lon) => {
        {pilots.forEach(pilot => {
            if (pilot.arr===icao){
                setArrivals(arrivals => [...arrivals, {...pilot, "latAir": lat, "lonAir":lon}])
              
            }
            if (pilot.dep===icao) {
                setDepartures(departures => [...departures, {...pilot, "latAir": lat, "lonAir":lon}])
            }
        })};
    }

  


    return (
        <div>
        {
        airports.map((airport) => {
            
            
            return (
                
                <>

                    
                
                    <div className="pa2 ba b--silver w-100 mt2" style={{backgroundColor:'#7C90A3'}}>
                        <div className="flex justify-between">
                            <p className="code f6 white ma0"><b>{airport.icao_code}</b>, {airport.city}</p>
                            <div className='flex'>
                                {accordionItem===airport.icao_code ? 
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretUp} 
                                    onClick={()=> {setAccordionItem(""); setAccordionFlight("")
                                    }} />
                                    :
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretDown} 
                                    onClick={()=> {setArrivals([]); setDepartures([]); setAccordionItem(airport.icao_code) ;
                                                    
                                                getFlights(airport.icao_code, airport.lat_decimal, airport.lon_decimal)}}  />
                                }
                                <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faXmark} 
                                    onClick={()=> handleDelete(airports, airport, setSelectedAirports)}/>
                            </div>
                        </div>
                    </div>
                    
                    {accordionItem===airport.icao_code ? 
                    <>
                      

                        <div className='pa2 ba b--silver w-100' style={{backgroundColor:'#2E3B47'}}>
                             <table className='tl'>
                            <th className='b white f6'>
                                <tr>
                                <td>Name</td>
                                <td className='fw1 pl2'>{airport.name}</td>
                                
                                </tr>
                                <tr>
                                <td>Country</td>
                                <td className='fw1 pl2'>{airport.country}</td>
                                
                                </tr>
                                <tr>
                                <td>Altitude</td>
                                <td className='fw1 pl2'>{airport.altitude} m</td>
                                </tr>
                                <tr>
                                <td>Position</td>
                                <td className='fw1 pl2'>{convertToDegrees(airport.lat_decimal)} {airport.lat_dir}, {convertToDegrees(airport.lon_decimal)} {airport.lon_dir}</td>
                                </tr>
                                
                                <tr>
                                <td>Weather</td>
                                <td className='fw1 pl2'></td>
                                </tr>
                                                                 
                                                               
                            </th>                                                             
                        </table>
                        <p className="code f6 ml1 b white underline ">Arrivals</p>
                        <SelectedPlanes planes={arrivals} pilots={pilots} accordionItem={accordionFlight} setAccordionItem={setAccordionFlight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} cardType={"arrival"} handleFunction={handleAddPlane} />
                        <p className="code f6 b ml1 white underline">Departures</p>
                        <SelectedPlanes planes={departures} pilots={pilots} accordionItem={accordionFlight} setAccordionItem={setAccordionFlight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} cardType={"departure"} handleFunction={handleAddPlane}/>
                        </div></>
                    : null

                    }
                    
                </>
            );
        })
        }
    </div>        
    )
};

export default SelectedAirports;


/*{pilots.map((pilot, i) => {
                            if ( airport.icao_code===pilot.arr){
                                handleAdd(arrivals, pilot, setArrivals)
                            }
                            else if (airport.icao_codepilot.dep) {
                                handleAdd(departures, pilot, setDepartures)
                        }})}*/