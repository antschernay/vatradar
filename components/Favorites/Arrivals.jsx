import React from "react";


const Arrivals = ({arrivals}) => {

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
                return 'ARRIVD';
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



    return (
      <>
      <p className="b f5 mt2">Arrivals ({arrivals.length})</p>

       { arrivals.map((flight) => {
            return <p className="f6 flights"><b>{getArrivalTime(calculateArrivalTime(getDistance(flight.lat, flight.lon, flight.latAir, flight.lonAir), flight.speed),
                            getDistance(flight.lat, flight.lon, flight.latAir, flight.lonAir))}</b> from <b>{flight.from}</b></p>
        })}
      </>
       
    )
    


}

export default Arrivals;