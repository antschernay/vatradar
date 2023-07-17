import React from "react";
import logo from '../../img/logo15.png';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines } from '@fortawesome/free-solid-svg-icons';


const Navigation = ({dateTime, pilots, user, setUser}) => { 

    const [isMobile, setIsMobile] = useState(false);
    const [menuIsShown, setMenuIsShown] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 675);
      };
  
      // Add event listener to listen for window resize
      window.addEventListener('resize', handleResize);
  
      // Call the handleResize function on component mount
      handleResize();
  
      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    
        return (
        <>
         <nav className='flex justify-between bg-near-black navbar code silver items-center'>
        
            <div className="flex ml2 mt2">
                <Link to='/'><img src={logo} alt="Logo" width="200" height="42"/></Link>
            </div> 
            {!isMobile ? (
                <div className="flex nav-in-line items-center">
                    {user.user_id ? 
                    <>  <p className='f5 b link pt1 ph3 dim pointer'><Link className='silver no-underline' to='/favorites'>Favorites</Link></p>
                        <p className='f5 b link pt1 ph3 dim pointer'><Link className='silver no-underline' to='/profile'>Profile</Link></p>
                        <p className='f5 b link pt1 ph3 dim pointer' onClick={()=> {sessionStorage.setItem("login", JSON.stringify([])); setUser([])}}><Link className='silver no-underline' to='/signin'>Sign Out</Link></p>
                    </>
                    :
                    <>
                        <p className='f5 b link pt1 ph3 dim pointer'><Link className='silver no-underline' to='/signin'>Sign In</Link></p>
                        <p className='f5 b link dim ph3 pt1 pointer'><Link className='silver no-underline' to='/register'>Register</Link></p>
                    </>
                    }   
                    
                    <p className='f6 pl3 pt2 avenir'>Flights:</p><p className='f6 ph2 b pt2 avenir'>{pilots}</p>
                    <p className='f6 ph3 pt2 avenir'>{dateTime}</p>
                    
                </div> 
            )
            :
            <>
            <div>
                <div className='' onClick={()=> setMenuIsShown(!menuIsShown)}>
                    <FontAwesomeIcon className='silver f5 pointer ph4' icon={faGripLines} />
                </div>
            </div>

           
            </>
       
         }
            
         </nav>  
          {menuIsShown && 
            <div className="dropdown-menu bg-near-black ph1 tc code">
                {user.user_id ? 
                <>  <p className='f5 b link dim pointer pt5 lh-solid' onClick={()=> setMenuIsShown(false)}><Link className='silver no-underline' to='/favorites'>Favorites</Link></p>
                    <p className='f5 b link dim pointer lh-solid' onClick={()=> setMenuIsShown(false)}><Link className='silver no-underline' to='/profile'>Profile</Link></p>
                    <p className='f5 b link dim pointer lh-solid' onClick={()=> 
                            {sessionStorage.setItem("login", JSON.stringify([])); setUser([]); setMenuIsShown(false)}}>
                            <Link className='silver no-underline' to='/signin'>Sign Out</Link></p>
                </>
                :
                <>
                    <p className='f5 b link dim pointer pt5 lh-title' onClick={()=> setMenuIsShown(false)}><Link className='silver no-underline' to='/signin'>Sign In</Link></p>
                    <p className='f5 b link dim pointer lh-title' onClick={()=> setMenuIsShown(false)}><Link className='silver no-underline' to='/register'>Register</Link></p>
                </>
                }   
                
                <p className='f5 silver lh-title'>Flights:&nbsp;<b>{pilots}</b></p>
                <p className='f5 lh-title silver'>{dateTime}</p>
                
            </div>
        }
        </> 
       
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