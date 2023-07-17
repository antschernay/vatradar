import React from "react";
import { useState, useEffect } from "react";
import { Polyline, Circle } from "react-leaflet";



const LinesToFlights = ({lat, lon, icao_code, pilots}) => {


    const [arrivals, setArrivals] = useState([]);
    const [departures, setDepartures] = useState([]);

    useEffect(() => {
        setArrivals([]);
        setDepartures([]);
        pilots.map(pilot => {
            if (pilot.arr===icao_code){
                console.log('true')
                setArrivals(arrivals => [...arrivals, { "latArr": pilot.lat, "lonArr":pilot.lon}])
            }
            if (pilot.dep===icao_code) {
                setDepartures(departures => [...departures, { "latDep": pilot.lat, "lonDep":pilot.lon}])
            }
        });
        console.log(arrivals)
    }, [pilots, icao_code])


    return (
    <>

        {arrivals &&
            arrivals.map((arrival) => {
                return (
                    <>
                    <Polyline positions={[[lat, lon], [arrival.latArr, arrival.lonArr]]} color={'#ba2779'} weight={1} smoothFactor={2.0} pane={"markerPane"} />
                    <Circle center={[arrival.latArr, arrival.lonArr]} color={'#ba2779'} radius={120} pane={"markerPane"}/>
                    </>
                )
            })
          
        }
        {departures &&
            departures.map((departure) => {
                return (
                    <>
                    <Polyline positions={[[lat, lon], [departure.latDep, departure.lonDep]]} color={'#077db3'} weight={1} smoothFactor={2.0} pane={"markerPane"} />
                    <Circle center={[departure.latDep, departure.lonDep]} color={'#077db3'} radius={120} pane={"markerPane"}/>
                    </>
                )
            })
          
        }

    
    </>
    )


}


export default LinesToFlights;