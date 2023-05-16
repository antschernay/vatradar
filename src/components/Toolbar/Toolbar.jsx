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

