import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import Arrivals from "./Arrivals";
import Departures from "./Departures";

const FavoritesList = ({favAirports, pilots, handleRemove}) => {

    
    const getWeather = (icao) => {
        try {
            fetch(`https://tender-teal-panda.cyclic.app/weather/${icao}`)
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
                arrivals = [...arrivals, {"from":pilot.dep, "lat": pilot.lat, "lon": pilot.lon, "latAir": latAir, "lonAir": lonAir, "speed": pilot.speed}]
            }
        })
      
        return arrivals;

    }
       
    
    const getDepartures = (icao) => {
        let departures = [];
        pilots.map((pilot) => {
            if (pilot.dep === icao) {
                departures = [...departures, {"to": pilot.arr, "deptime": pilot.deptime}]
            }
        })


        return departures;


    }

     return (
        <>

    <div className="flex flex-wrap mt4 code w-80 justify-center center pb5">

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
                           
                            <Departures departures={getDepartures(airport.icao_code)}/>
               
                            
                            
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
