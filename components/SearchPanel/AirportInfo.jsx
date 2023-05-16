import React from "react";
import { useState, useEffect } from "react";
import SelectedPlanes from "./SelectedPlanes";
import Controllers from "./Controllers";

const AirportInfo = ({airport, pilots, selectedFlight, setSelectedFlight, handleAddPlane, controllers}) => {

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


      const getArrivalTime = (mins, distance) => {
        if (mins===0) {
            if (distance < 20) {
                return '000000';
            }
            else return 'DEPART';
        }
        // Get the current GMT time
        let gmtTime = new Date();
      
        // Add the specified number of minutes to the GMT time
        let newTime = new Date(gmtTime.getTime() + mins * 60000);
      
        // Extract the hours and minutes components of the new time
        let hours = newTime.getUTCHours().toString().padStart(2, '0');
        let minutes = newTime.getUTCMinutes().toString().padStart(2, '0');
      
        // Return the new time in "hh:mm" format
        return `${hours}:${minutes}Z`;
      }



      const getControllers = (icao) => {
        let airportControllers = [];
        controllers.map((controller) => {
            if (controller.callsign.slice(0,4) === icao) {
                airportControllers = [...airportControllers, controller]
            }
        })
       
        return airportControllers;


    }



    useEffect(() => {
        setArrivals([]);
        setDepartures([]);
        pilots.map(pilot => {
            if (pilot.arr===airport.icao_code){
                
                return setArrivals(arrivals => [...arrivals, {...pilot, "latAir": airport.lat_decimal, "lonAir": airport.lon_decimal, 
                    "estTime": getArrivalTime(calculateArrivalTime
                    (getDistance(pilot.lat, pilot.lon, airport.lat_decimal, airport.lon_decimal), pilot.speed),
                    getDistance(pilot.lat, pilot.lon, airport.lat_decimal, airport.lon_decimal))}]
                    .sort((a, b) => (a.estTime < b.estTime ? -1 : 1)))
                
                
            }
            if (pilot.dep===airport.icao_code) {
                return setDepartures(departures => [...departures, {...pilot, "latAir": airport.lat_decimal, "lonAir": airport.lon_decimal}].sort((a, b) => (a.deptime < b.deptime ? -1 : 1)))
            }
        });
    }, [pilots])


    useEffect(() => {
        try {
            fetch(`http://localhost:3001/weather/${airport.icao_code}`)
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
                <tbody className='b white f6'>
                        <tr>
                        <td>Name</td>
                        <td className='fw1 pl2'>{airport.name}</td>
                        
                        </tr>
                        <tr>
                        <td>Country</td>
                        <td className='fw1 pl2'>{airport.country}</td>
                        
                        </tr>
                        <tr>
                        <td>Alt/Pos</td>
                        <td className='fw1 pl2'>{airport.altitude} m / {convertToDegrees(airport.lat_decimal)} {airport.lat_dir}, {convertToDegrees(airport.lon_decimal)} {airport.lon_dir}</td>
                        </tr>
                        
                        <tr className="items-start">
                        <td>Weather</td>
                        <td className='fw1 pl2'>{weather.substring(4)}</td>
                        </tr>
                                                            
                                                        
                    </tbody>                                                             
                </table> 
                    <p className="code f6 ml1 b white underline ">ATC</p>
                        <Controllers controllers={getControllers(airport.icao_code)}/>
                    <p className="code f6 ml1 b white underline ">Arrivals</p>
                        <SelectedPlanes planes={arrivals} pilots={pilots} accordionItem={accordionFlight} setAccordionItem={setAccordionFlight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} cardType={"arrival"} handleFunction={handleAddPlane}/>
                    <p className="code f6 b ml1 white underline">Departures</p>
                        <SelectedPlanes planes={departures} pilots={pilots} accordionItem={accordionFlight} setAccordionItem={setAccordionFlight} selectedFlight={selectedFlight} setSelectedFlight={setSelectedFlight} cardType={"departure"} handleFunction={handleAddPlane}/>
        </div>
    </>
  )
};


export default AirportInfo;