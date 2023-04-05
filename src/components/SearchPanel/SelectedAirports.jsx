import React from 'react';
import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faXmark } from '@fortawesome/free-solid-svg-icons';
import AirportInfo from './AirportInfo';

const SelectedAirports = ({airports, pilots, accordionItem, setAccordionItem, handleDelete, setSelectedAirports, selectedFlight, setSelectedFlight, handleAddPlane}) => {

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
                                    onClick={()=> setAccordionItem("")} />
                                    :
                                    <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faCaretDown} 
                                    onClick={()=> {setAccordionItem(airport.icao_code); console.log(airport)}}  />
                                }
                                <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faXmark} 
                                    onClick={()=> handleDelete(airports, airport, setSelectedAirports)}/>
                            </div>
                        </div>
                    </div>
                    
                    {accordionItem===airport.icao_code ? 
                        
                            <AirportInfo airport={airport} pilots={pilots} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} handleAddPlane={handleAddPlane}/>
                        
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
