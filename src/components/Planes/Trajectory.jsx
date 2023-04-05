import React from "react";
import { useState, useEffect } from "react";
import { Polyline} from 'react-leaflet';
import "leaflet-rotatedmarker";



const Trajectory = ({lat, lon, arrIcao, depIcao}) => {


  
  const [arrAirportLat, setArrAirportLat] = useState(lat);
  const [arrAirportLon, setArrAirportLon] = useState(lon);
  const [depAirportLat, setDepAirportLat] = useState(lat);
  const [depAirportLon, setDepAirportLon] = useState(lon);

  useEffect(() => {
    try {
      fetch(`https://tender-teal-panda.cyclic.app/${arrIcao}`)
      .then((response) => response.json())
      .then((responseData) => {
       
        if (responseData.lat_decimal === 'NaN') {
          setArrAirportLat(lat);
        }
        else if (responseData.lon_decimal === 'NaN') {
          setArrAirportLon(lon);
        }
        else  {
        setArrAirportLat(responseData.lat_decimal);
        setArrAirportLon(responseData.lon_decimal);
        }
          
      })
  } 
  catch (error) {
   
      console.error(error.message)
  }
  try {
      fetch(`https://tender-teal-panda.cyclic.app/${depIcao}`)
      .then((response) => response.json())
      .then((responseData) => { 
        console.log(responseData.lat_decimal)
        if (responseData.lat_decimal === 'NaN') {
          
          setDepAirportLat(lat);
        }
        else if (responseData.lon_decimal === 'NaN') {
          setDepAirportLon(lon);
        }
        else {
        setDepAirportLat(responseData.lat_decimal);
        setDepAirportLon(responseData.lon_decimal);
        }
      })
  } catch (error) {
   
      console.log(error)
  }
  }, []);
    
    
    return (

      
      <Polyline positions={[[arrAirportLat, arrAirportLon], [lat, lon], 
               [depAirportLat, depAirportLon]]} color={'#BA7170'} weight={2} smoothFactor={2.0} pane={"markerPane"} />
     

     
    );

}


export default Trajectory;

