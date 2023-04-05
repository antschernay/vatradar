import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin } from '@fortawesome/free-solid-svg-icons';
import SelectedPlanes from "./SelectedPlanes";
import SelectedAirports from "./SelectedAirports";



const SearchPanel = ( { pilots, selectedPlanes, setSelectedPlanes, selectedAirports, setSelectedAirports, selectedFlight,
    setSelectedFlight, handleAddPlane, accordionItem, setAccordionItem } ) => {

    const [airports, setAirports] = useState([]);
    const [searchField, setSearchField] = useState("");
   


    useEffect(() => {
        const fetchAirports  = async () => {
            const response = await fetch(`https://tender-teal-panda.cyclic.app/airports/${searchField.toUpperCase()}`)
            setAirports(await response.json());
        }
        if (searchField.length >= 3){
            fetchAirports();
        }
        if (searchField.length === 2){
            setAirports([]);
        }
    }, [searchField]);

  
    const filteredPlanes = pilots.filter(pilot =>{
        return pilot.callsign.toLowerCase().includes(searchField.toLowerCase()) || 
                pilot.dep.toLowerCase().includes(searchField.toLowerCase()) ||
                pilot.arr.toLowerCase().includes(searchField.toLowerCase()) ||
                pilot.cid.toString().includes(searchField.toLowerCase());
         
    });
    
    
    const handleDelete = (array, item, event) => {
        const newItems = array.filter((plane) => plane !== item);
        event(newItems);
    }

    

    const handleAdd = (array, item, event) => {
        console.log(array)
        if (!array.some(value => value.icao_code === item.icao_code)) {
        event(prevArray => [...prevArray, item])
        } 
      }

    return (
        <>
            
            <div className="fl w-30 ph2 bg-dark-gray code searchpanel">
                
                <div className="mt5 mb2">
                <input
                    className="pa2 input-reset ba white bg-near-black o-70 w-100 mb1" 
                    type='text' 
                    placeholder="Search"
                    onChange={e => setSearchField(e.target.value)}
                /> 


                <SelectedPlanes planes={selectedPlanes} pilots={pilots} accordionItem={accordionItem} setAccordionItem={setAccordionItem} handleFunction={handleDelete} setSelectedPlanes={setSelectedPlanes} cardType={"normal"} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight}/>
                <SelectedAirports airports={selectedAirports} pilots={pilots} 
                                    accordionItem={accordionItem} setAccordionItem={setAccordionItem}
                                    handleDelete={handleDelete} setSelectedAirports={setSelectedAirports} 
                                    selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight}
                                    handleAddPlane={handleAddPlane} />
              


                {searchField.length ?
                    <div className="">
                        <div>
                         {
                            filteredPlanes.map((plane) => {
                                return (
                                
                                    <div className="pa2 ba b--silver bg-transparent flex justify-between w-100 mt2">
                                        <p className="code f6 white ma0"><b>{plane.callsign}</b>, {plane.dep} - {plane.arr}</p>
                                        <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faMapPin} 
                                                     onClick={()=> handleAddPlane(plane)}/>
                                    
                                    </div>
                                );
                            })
                            }
                        </div>        
                        <div>
                            {airports.length ?
                                airports.map((airport) => {
                                    return (
                                    
                                        <div className="pa2 ba b--silver flex justify-between bg-transparent w-100 mt2">
                                            <p className="code f6 white ma0"><b>{airport.icao_code}</b>, {airport.city}, {airport.name}</p>
                                            <FontAwesomeIcon className='white dib f7 ph2 pointer' icon={faMapPin} 
                                                     onClick={()=> handleAdd(selectedAirports, airport, setSelectedAirports)}/>
                                        </div>
                                    );
                                })
                                :null
                            }
                        </div>        
                    </div> 

                :null
                }

                </div>
            </div>

        </>
    )
};



export default SearchPanel;

