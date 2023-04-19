import React from "react";
import { useState, useEffect } from "react";
import SelectedPlanes from "./SelectedPlanes";
import SelectedAirports from "./SelectedAirports";
import pin from '../../img/pin1.svg';



const SearchPanel = ( { pilots, selectedPlanes, setSelectedPlanes, selectedAirports, setSelectedAirports, selectedFlight,
    setSelectedFlight, handleAddPlane, accordionItem, setAccordionItem, selectedAirport} ) => {

    const [airports, setAirports] = useState([]);
    const [searchField, setSearchField] = useState("");
   


    useEffect(() => {
        const fetchAirports  = async () => {
            const response = await fetch(`http://localhost:3001/airports/${searchField.toUpperCase()}`)
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
                <SelectedAirports airports={selectedAirports} pilots={pilots} setSelectedPlanes={setSelectedPlanes}
                                    accordionItem={accordionItem} setAccordionItem={setAccordionItem}
                                    handleDelete={handleDelete} setSelectedAirports={setSelectedAirports} 
                                    selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight}
                                    handleAddPlane={handleAddPlane} selectedAirport={selectedAirport}
                                    />
              


                {searchField.length ?
                    <div className="">
                         <div>
                            {airports.length===1 ?
                                airports.map((airport) => {
                                    return (
                                    
                                        <div className="pa2 ba b--silver flex justify-between bg-transparent w-100 mt2">
                                            <p className="code f6 white ma0"><b>{airport.icao_code}</b>, {airport.city}, {airport.name}</p>
                                            <img className='dib pointer' src={pin} alt="glass" width="20" height="20" 
                                                     onClick={()=> handleAdd(selectedAirports, airport, setSelectedAirports)}/>
                                        </div>
                                    );
                                })
                                :null
                            }
                        </div>      
                        <div>
                         {
                            filteredPlanes.map((plane) => {
                                return (
                                
                                    <div className="pa2 ba b--silver bg-transparent flex justify-between w-100 mt2">
                                        <p className="code f6 white ma0"><b>{plane.callsign}</b>, {plane.dep} - {plane.arr}</p>
                                        <img className='dib pointer' src={pin} alt="glass" width="20" height="20" 
                                                     onClick={()=> handleAddPlane(plane)}/>
                                    
                                    </div>
                                );
                            })
                            }
                        </div>        
                        <div>
                            {airports.length > 1 ?
                                airports.map((airport) => {
                                    return (
                                    
                                        <div className="pa2 ba b--silver flex justify-between bg-transparent w-100 mt2">
                                            <p className="code f6 white ma0"><b>{airport.icao_code}</b>, {airport.city}, {airport.name}</p>
                                            <img className='dib pointer' src={pin} alt="glass" width="20" height="20" 
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

