import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Arrivals from "./Arrivals";
import Departures from "./Departures";

const FavoritesList = ({favAirports, pilots, handleRemove}) => {

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
      };

    
    const getWeather = (icao) => {
        try {
            fetch(`https://tender-teal-panda.cyclic.app/map/weather/${icao}`)
            .then((response) => response.json())
            .then((responseData) => {
              
                document.getElementById(icao).innerHTML = responseData.toString().substring(4);
            })
        } 
        catch (error) {
           
            console.error(error.message)
        }

    }


    const getArrivals = (icao, latAir, lonAir) => {
        let arrivals = [];
        pilots.map((pilot) => {
            if (pilot.arr === icao) {
                arrivals = [...arrivals, {"from":pilot.dep, "estTime": getArrivalTime(calculateArrivalTime
                    (getDistance(pilot.lat, pilot.lon, latAir, lonAir), pilot.speed),
                    getDistance(pilot.lat, pilot.lon, latAir, lonAir))}]
                    .sort((a, b) => (a.estTime < b.estTime ? -1 : 1))
                }
            })
            
        
      
        return arrivals;

    }

    const getDepartTime = (distance, speed, depTime) => {
        if (distance > 5 && speed > 20) {
            return "ENROUT"
        }
        else return `${depTime.slice(0, 2)}:${depTime.slice(2)}Z`;


      }


       
    
    const getDepartures = (icao, latAir, lonAir) => {
        let departures = [];
        pilots.map((pilot) => {
            if (pilot.dep === icao) {
                departures = [...departures, {"to": pilot.arr, "estTime": getDepartTime(
                getDistance(pilot.lat, pilot.lon, latAir, lonAir), pilot.speed, pilot.deptime)}]
                .sort((a, b) => (a.estTime < b.estTime ? -1 : 1))
            }
        })


        return departures;


    }

     return (
        <>

    <div className="flex flex-wrap mt4 code w-80 justify-center center pb5 fav-airports">

        {favAirports.map((airport) => {

            return (
            
            
   
                <div className="airport-card ba pa3 pv4 mh2 mb3 br3 ba b--black-10 shadow-4 white" style={{ background: "linear-gradient(120deg, rgba(10,29,41,1) 18%, rgba(35,49,80,1) 100%)"}} >
                    <div className="half-card">
                        <div className="flex justify-between">
                            <h1 className="b f2 ma0 lh-solid">{airport.icao_code}</h1>
                            
                            <FontAwesomeIcon className='white dib f7 pointer' icon={faTrashCan}  onClick={()=> handleRemove(airport.icao_code)} />
                        </div>
                        <p className="ma0 mt2 b">{airport.city}, {airport.name}</p>
                        <p className="mt4" id={airport.icao_code}>{getWeather(airport.icao_code)}</p>
                    </div>
                    <div className="flex mt4">
                        <div className="w-50 mr1 ph2 ba b--silver half-card-flights" style={{background: "#6891bc"}}>
                            
                            <Arrivals arrivals={getArrivals(airport.icao_code, airport.lat_decimal, airport.lon_decimal)} />
      
                        </div>
                        <div className="w-50 ml1 ph2 ba b--silver half-card-flights" style={{background: "#707479"}}>
                           
                            <Departures departures={getDepartures(airport.icao_code, airport.lat_decimal, airport.lon_decimal)}/>
               
                            
                            
                        </div>
                    </div>
                </div>
           
            
            
            )
       

        })}
        </div>
     
 

        </>
     )
    


}

export default React.memo(FavoritesList, (prevProps, nextProps) => {

    if (prevProps.favAirports !== nextProps.favAirports || prevProps.pilots !== nextProps.pilots) {
            return false
        }
    else return true;
});