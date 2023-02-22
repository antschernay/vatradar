import React from 'react';
import atc from '../../img/atc.svg';
import airplane from '../../img/airplane.svg';
import radar from '../../img/radar.svg';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
//import { ZoomControl } from 'react-leaflet';


const Toolbar = ({ planesAreShown, setPlanesAreShown, trackedFlight, setTrackedFlight }) => {

    const [windowIsShown, setWindowIsShown] = useState(false);
    
    return (
        <>
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
          
        <div className='flex justify-start searchbox o-90 ph2 code'>
            <div className='ph2'>
                <input
                    className='pa3 pr5 o-80 ba br3 f6 bg-black searcharea'
                    type='search' 
                    placeholder='Search'
                
                />
            </div>
            <div className='flex'>
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
                
            </div>*/
