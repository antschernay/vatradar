import React from "react";


const Arrivals = ({arrivals}) => {

   


    return (
      <>
      <p className="b f5 mt2">Arrivals ({arrivals.length})</p>

       { arrivals.map((flight) => {
            return <p className="f6 flights"><b>{flight.estTime==='000000'?'ARRIVD':flight.estTime}</b> from <b>{flight.from}</b></p>
        })}
      </>
       
    )
    


}

export default Arrivals;