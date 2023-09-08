import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import AirportInfo from './AirportInfo';

const SelectedAirports = ({airports, pilots, accordionItem, setAccordionItem, handleDelete, setSelectedAirports, setSelectedAirport,
                    selectedFlight, setSelectedFlight, handleAddPlane, selectedAirport, controllers, handleSetView}) => {

    return (
        <div>
        {
        airports.map((airport) => {
            
            
            return (
                
                <>

                
                    <div className="pa2 ba b--silver w-100 mt2" style={{backgroundColor: selectedAirport.icao_code===airport.icao_code ?'#999999' :'#7C90A3'}}>
                        <div className="flex justify-between">
                            <p className="code f6 white ma0"><b>{airport.icao_code}</b>, {airport.city}</p>
                            <div className='flex'>
                                <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faLocationDot} 
                                    onClick={()=> {
                                        if (selectedAirport.icao_code===airport.icao_code) {
                                           
                                            setSelectedAirport({"icao_code": '', "lat_decimal":0, "lon_decimal":0});
                                       
                                        } else {
                                            
                                            setSelectedAirport({"icao_code":airport.icao_code, "lat_decimal": airport.lat_decimal, "lon_decimal": airport.lon_decimal});
                                            handleSetView([airport.lat_decimal, airport.lon_decimal + 5])};
                                        }
                                    }
                                   />
                                {accordionItem===airport.icao_code ? 
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretUp} 
                                    onClick={()=> setAccordionItem("")} />
                                    :
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretDown} 
                                    onClick={()=> {setAccordionItem(airport.icao_code); }}  />
                                }
                                <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faXmark} 
                                    onClick={()=> {handleDelete(airports, airport, setSelectedAirports);
                                                    if (selectedAirport.icao_code===airport.icao_code) {
                                                        setSelectedAirport({"icao_code": '', "lat_decimal":0, "lon_decimal":0})
                                                    }
                                                    if (accordionItem===airport.icao_code) {
                                                        setSelectedFlight([]);
                                                    }
                                                }
                                            }/>
                            </div>
                        </div>
                    </div>
                    
                    {accordionItem===airport.icao_code ? 
                        
                            <AirportInfo airport={airport} pilots={pilots} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight}
                                             handleAddPlane={handleAddPlane} controllers={controllers} handleSetView={handleSetView}/>
                        
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
                        }})}
                        
                        
                        
                        
                        
                        
                         useEffect(() => {
        try {
            fetch(`https://metar.vatsim.net/metar.php?id={accordionItem}`)
            .then((response) => response.json())
            .then((responseData) => {
             
                setWeather(responseData);
            })
        } 
        catch (error) {
           
            console.error(error.message)
        }
    })*/
