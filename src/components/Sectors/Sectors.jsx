import React from "react";
import { useEffect, useState } from "react";
import { Polygon, Tooltip, Polyline, GeoJSON } from "react-leaflet";
import simplify from 'simplify-js';
import firs_us from './data/Airspace_Boundary.json'
import firs_eu from './data/eurofirs.json'



const Sectors = ({}) => {
  
  const sectors = firs_eu;





      return (
        <>
        
          <GeoJSON data={firs_us} weight={1} />
         { sectors.map((sector) => {
         
          const swappedPolygon = sector.polygon.map(([a, b]) => [b, a]);
          
     
          return (
            <Polygon positions={swappedPolygon} color="blue" weight={1} >
           
            </Polygon>
          );
        })}
        </>
  
      );




}


export default Sectors;


/* sectors.map((sector) => {
          console.log(sector)
          //const swappedPolygon = sector.polygon.map(([a, b]) => [b, a]);
          const coordinates=[].concat(...sector.geometry.coordinates);
          const swappedCoordinates = coordinates.map(([a, b]) => [b, a]);
     
          return (
            <Polygon positions={swappedCoordinates} color="blue" weight={1}>
           
            </Polygon>
          );
        })
        const [sectors, setSectors] = useState([]);

    const tolerance = 5;


    const simplifiedData = sectors.map((sector) => {
      const simplifiedPolygon = simplify(sector.polygon, 0.00001, true);
      return { ...sector, polygon: simplifiedPolygon };
    });


    const shortData = sectors.map((sector) => {
      let filteredItems = sector.polygon;
      if (sector.polygon.length > 2000){
        if (sector.polygon.length > 5000) {
          filteredItems = sector.polygon.filter((_, index) => (index + 1) % 5 === 0);
        }
        else  {
          filteredItems = sector.polygon.filter((_, index) => (index + 1) % 2 === 0);
        }
      }
      
     

      return {...sector, polygon: filteredItems}

    });
    
    
      const [data1, setData1] = useState([]);

  useEffect(() => {

  
    try {
      fetch(`http://localhost:3001/map/sectors`)
      .then((response) => response.json())
      .then((responseData) => {
      
          setData1(responseData);
      })
  } 
  catch (error) {
     
      console.error(error.message)
  }


  }, [])*/