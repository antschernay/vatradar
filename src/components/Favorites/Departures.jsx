import React from "react";


const Departures = ({departures}) => {


    return (
        <>
        <p className="b f5 mt2 ">Departures ({departures.length})</p>

        {departures.map((flight) => {
            return <p className="f6 flights"><b>{flight.estTime} to {flight.to}</b></p>
        })}
       
        
        </>

        
       
    )


}

export default Departures;
