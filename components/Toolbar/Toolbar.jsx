import React from 'react';
import atc from '../../img/atc.svg';
import glass from '../../img/glass.svg';
import airplane from '../../img/airplane.svg';
import airport from '../../img/airport1.svg';
import { useMapEvents } from 'react-leaflet';


const Toolbar = ({ planesAreShown, setPlanesAreShown, panelIsShown, setPanelIsShown, airportsAreShown, setAirportsAreShown}) => {

    //const [windowIsShown, setWindowIsShown] = useState(false);

    const mapEvents = useMapEvents({
        zoomend: () => {
            localStorage.setItem('zoom', JSON.stringify(mapEvents.getZoom()));
        },
        moveend: () => {
            localStorage.setItem('center', JSON.stringify([(mapEvents.getCenter()).lat, mapEvents.getCenter().lng]))
        }
    });
    
    return (
        <>
        
            
            <div className='flex justify-start toolbar o-90 mh3 code'>
            
                <div className='flex'>
                    {panelIsShown ? 
                    <img className='pa2 mr0 pointer br3 bg-white' src={glass} alt="glass" width="27" height="27"
                    onClick={()=> setPanelIsShown(!panelIsShown)}/>
                    :
                    <img className='pa2 pointer br3' src={glass} alt="glass" width="27" height="27"
                    onClick={()=> setPanelIsShown(!panelIsShown)}/>}
                    
                    
                    {planesAreShown ?
                        <img className='pa2 mh2 pointer bg-white br3' src={airplane} alt="airplane" width="27" height="27"
                            onClick={()=> setPlanesAreShown(!planesAreShown)}/>
                        :
                        <img className='pa2 mh2 pointer br3' src={airplane} alt="airplane" width="27" height="27"
                            onClick={()=> setPlanesAreShown(!planesAreShown)}/>
                    }

                    {airportsAreShown ?
                        <img className='pa2 pointer bg-white br3' src={airport} alt="airport" width="27" height="27"
                            onClick={()=> setAirportsAreShown(!airportsAreShown)}/>
                        :
                        <img className='pa2 pointer br3' src={airport} alt="airport" width="27" height="27"
                            onClick={()=> setAirportsAreShown(!airportsAreShown)}/>
                    }

                    <img className='pa2 pointer br3' src={atc} alt="atc" width="27" height="27"
                            />
                    
                </div>
                
            </div>
        </>
   );
}

export default Toolbar;

//trackFlight, setTrackFlight,
/* {windowIsShown ? 
            <div className='flex fixed justify-center window'>
                <div className='bg-white pa3 br3 code'>
                    <div className='flex justify-between'>
                        <p className='b f5 mt0 mr4'>Track Your Flight</p>
                        <div onClick={()=> setWindowIsShown(false)}>
                            <FontAwesomeIcon className='black dib f6 pointer' icon={faXmark} />
                        </div>
                    </div>
                    <p className='mt1'>Please enter your CID</p>
                    <input
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type='text' 
                        value={trackedFlight}
                    
                    />
                    <div className="tc">
                    <input 
                       className="b mt3 ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                       type="submit" value="Track"
                   />
                    </div>
                </div>
            </div>

        :null}*/


        /*<div className='flex'>
                <img className='pa2 pointer br3' src={radar} alt="radar" width="25" height="25"
                    onClick={()=> setWindowIsShown(true)}/>
                   
                {planesAreShown ?
                    <img className='pa2 mh2 pointer bg-white br3' src={airplane} alt="airplane" width="25" height="25"
                        onClick={()=> setPlanesAreShown(!planesAreShown)}/>
                    :
                    <img className='pa2 mh2 pointer br3' src={airplane} alt="airplane" width="25" height="25"
                        onClick={()=> setPlanesAreShown(!planesAreShown)}/>
                }

                <img className='pa2 pointer br3' src={atc} alt="atc" width="25" height="25"
                        />
                
            </div>
            
            
            
            {windowIsShown ? 
        <div className='flex fixed justify-center window'>
            <div className='bg-white pa3 br3 code ba'>
                <div className='flex justify-between'>
                    <p className='b f5 mt0 mr4'>Track Your Flight</p>
                    <div onClick={()=> setWindowIsShown(false)}>
                        <FontAwesomeIcon className='black dib f6 pointer ml2' icon={faXmark} />
                    </div>
                </div>
                <p className='mt1'>Please enter your CID</p>
                <input
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type='text' 
                    value={trackedFlight}
                
                />
                <div className="tc">
                <input 
                   className="b mt3 ph3 pv2 input-reset ba b--black bg-transparent pointer f6 dib"
                   type="submit" value="Track"
               />
                </div>
            </div>
        </div>

    :null}


    <div className='ph2'>
                <input
                    className='pa3 pr5 o-80 ba br3 f6 bg-black searcharea'
                    type='search' 
                    placeholder='Search'
                
                />
            </div>
    
    */
