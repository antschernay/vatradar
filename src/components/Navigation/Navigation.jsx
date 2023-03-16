import React from "react";
import logo from '../../img/logo15.png';
import { Link } from 'react-router-dom';


const Navigation = ({dateTime, pilots}) => { 
    
        return (
         <nav className='flex justify-between bg-near-black navbar code silver'>
        
            <div className="flex ml2 mt2">
                <Link to='/'><img src={logo} alt="Logo" width="200" height="42"/></Link>
                
            </div> 
            <div className="flex">
                   
                <p className='f5 b link pt1 ph3 dim pointer'><Link className='silver no-underline' to='/signin'>Sign In</Link></p>
                <p className='f5 b link dim ph3 pt1 pointer'><Link className='silver no-underline' to='/register'>Register</Link></p>
                <p className='f6 pl3 pt2 avenir'>Flights:</p><p className='f6 ph2 b pt2 avenir'>{pilots}</p>
                <p className='f6 ph3 pt2 avenir'>{dateTime}</p>
                
            </div> 
        </nav>   
       
        );
       

}

export default Navigation;

/*if (isSignedIn) {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signout')} className='f3 link dim black pa3 pointer'>Sign Out</p>
        </nav>
        );
    } else {
        return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 pointer'>Sign In</p>
            <p onClick={() => onRouteChange('register')} className='f3 link dim black pa3 pointer'>Register</p>
        </nav>          
        );
         <p onClick={()=> onRouteChange("signin")} className='f5 b link pt1 ph3 dim pointer'>Sign In</p>
                <p onClick={()=> onRouteChange("register")} className='f5 b link dim ph3 pt1 pointer'>Register</p>
    }     
    
    
     <SearchBox />
              
                <FontAwesomeIcon className='silver pt2 f3 dim pointer' icon={faMagnifyingGlassLocation } />
                
                */