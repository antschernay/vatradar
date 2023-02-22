import React from 'react';
import L from "leaflet";
import {  Marker, Popup } from 'react-leaflet';
import "leaflet-rotatedmarker";





const PlaneList = ({ pilots, setSelectedFlight, callsign, trackedFlight }) => {

  
   //const plane =  "<img src='../../img/plane1-smol0.svg' />";
   //const iconUrl = 'data:image/svg+xml;base64,' + btoa(plane);



    

    function getIcon(_iconSize){
        return L.icon({
          iconUrl: require("../../img/plane1.png"),
          iconSize: [_iconSize]
        })
      }

      function getYellowIcon(_iconSize){
        return L.icon({
          iconUrl: require("../../img/plane11.png"),
          iconSize: [_iconSize]
        })
      }
  

  
  

    return ( 
      
        
        pilots.map((pilot, i) => {
            if ( pilots[i].callsign===callsign){
              return (
                <Marker position={[pilots[i].lat, pilots[i].lon]} icon={getYellowIcon(23)} key={pilots[i].callsign}
                        rotationOrigin="center" rotationAngle={pilots[i].head} eventHandlers={{
                        click: () => {
                        
                          setSelectedFlight([]);
                                                
                        },
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                      }}>  
                                      
                      <Popup>{pilots[i].callsign}</Popup>   
                </Marker> 
              )
            }
            else {
            return (
                
                <Marker position={[pilots[i].lat, pilots[i].lon]} icon={getIcon(22)} key={pilots[i].callsign}
                      rotationOrigin="center" rotationAngle={pilots[i].head} eventHandlers={{
                        click: () => {
                       
                          setSelectedFlight(pilots[i]);
                                                
                        },
                        mouseover: (event) => event.target.openPopup(),
                        mouseout: (event) => event.target.closePopup(),
                      }}>  
                                      
                      <Popup>{pilots[i].callsign}</Popup>  
                </Marker>  
                                              
                 
            );
                    }
        })

             

    );
}

export default PlaneList;


//<p className="b">Route: {pilots[i].flight_plan.route}</p>
/*<Popup>
                            <div className="ba bg-dark-gray pa3 ma1 bw1">
                                <p className="f4 b white">{pilots[i].callsign}</p>
                                <hr></hr> 
                                <p className="b white">Speed: {pilots[i].groundspeed} </p>
                                
                                <p className="b white">Altitude: {pilots[i].altitude} ft.</p>
                                <p className="b white">Route: {pilots[i].route}</p>
                                <p className="b white">Aircraft: {pilots[i].aircraft}</p>
                                                               
                                
                            </div>
                        </Popup> 
                        {isShown && <Box />}   */


                        /*<Popup>
                            <div className="ba bg-dark-gray ma1 bw1 code">
                                <p className="f3 b white tc">{pilots[i].callsign}</p>
                                <div className='flex justify-center bg-gray mb2 f4'>
                                  <div className='w-25 pa3 mr2 b white'>
                                       {pilots[i].dep}
                                  </div>
                                  <div className='w-25 pa3 mr2 b white'>
                                        {pilots[i].arr}
                                  </div>
                                </div>
                                <table className='dt pa3'>
                                    <th className='b white f6 pr2'>
                                      <tr>
                                        <td>Speed</td>
                                        <td>{pilots[i].speed}</td>
                                        
                                      </tr>
                                      <tr>
                                        <td>Altitude</td>
                                        <td>{pilots[i].alti}</td>
                                      </tr>
                                      <tr>
                                        <td>Aircraft</td>
                                        <td>{pilots[i].aircraft}</td>                                       
                                      </tr>                                
                                    </th>                                                             
                                </table>
                                
                                <div className='flex justify-around'>
                                  <div className='mr3' onClick={()=> setIsExpanded(!isExpanded)}>
                                    <FontAwesomeIcon className='white f5' icon={faGripLines} />
                                  </div>
                                </div>

                                {isExpanded ? 
                                
                                  <table className='dt pa3'>
                                    <th className='white f6 pr2'>
                                      <tr>
                                        <td>Transponder</td>
                                        <td>{pilots[i].transp}</td>
                                      </tr>
                                      <tr>
                                        <td>Alternate</td>
                                        <td>{pilots[i].alter}</td>
                                      </tr>
                                      <tr>
                                        <td>Enroute</td>
                                        <td>{pilots[i].en_time}</td>
                                      </tr>                                  
                                      <tr>
                                        <td>Remarks</td>
                                        <td>{pilots[i].remarks}</td>
                                      </tr>
                                      <tr>
                                        <td>Route</td>
                                        <td>{pilots[i].route}</td>
                                      </tr>
                                    </th>                                                             
                                </table> 

                                :null}                            
                                
                            </div>
                      </Popup>
                      
                      
                      <Polyline positions={[
                          [0, 0], [30, 30]
                          ]} color={'black'} weight={1}/>
                          */