import React from "react";
import { useState, useEffect } from "react";
import SelectedPlanes from "./SelectedPlanes";

const AirportInfo = ({airport, pilots, selectedFlight, setSelectedFlight, handleAddPlane}) => {

    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState([]);
    const [weather, setWeather] = useState("");
    const [accordionFlight, setAccordionFlight] = useState("");


    const convertToDegrees = (decimal) => {
        const degrees = Math.floor(decimal);
        const minutes = (decimal - degrees) * 60;
        const seconds = (minutes - Math.floor(minutes)) * 60;
        return `${degrees}° ${Math.floor(minutes)}' ${Math.floor(seconds)}"`;
    }


    useEffect(() => {
        setArrivals([]);
        setDepartures([]);
        pilots.map(pilot => {
            if (pilot.arr===airport.icao_code){
                return setArrivals(arrivals => [...arrivals, {...pilot, "latAir": airport.lat_decimal, "lonAir": airport.lon_decimal}])
              
            }
            if (pilot.dep===airport.icao_code) {
                return setDepartures(departures => [...departures, {...pilot, "latAir": airport.lat_decimal, "lonAir": airport.lon_decimal}])
            }
        });
    }, [pilots])


    useEffect(() => {
        try {
            fetch(`https://tender-teal-panda.cyclic.app/weather/${airport.icao_code}`)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                setWeather(responseData);
            })
        } 
        catch (error) {
           
            console.error(error.message)
        }
    }, [])


  return (
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
                        <td className='fw1 pl2'>{weather.substring(4)}</td>
                        </tr>
                                                            
                                                        
                    </th>                                                             
                </table>
                    <p className="code f6 ml1 b white underline ">Arrivals</p>
                        <SelectedPlanes planes={arrivals} pilots={pilots} accordionItem={accordionFlight} setAccordionItem={setAccordionFlight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} cardType={"arrival"} handleFunction={handleAddPlane} />
                    <p className="code f6 b ml1 white underline">Departures</p>
                        <SelectedPlanes planes={departures} pilots={pilots} accordionItem={accordionFlight} setAccordionItem={setAccordionFlight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} cardType={"departure"} handleFunction={handleAddPlane}/>
        </div>
    </>
  )
};


export default AirportInfo;
