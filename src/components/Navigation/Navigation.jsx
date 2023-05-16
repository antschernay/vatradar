import React from "react";
import logo from '../../img/logo15.png';
import { Link } from 'react-router-dom';


const Navigation = ({dateTime, pilots, user, setUser}) => { 


    
        return (
         <nav className='flex justify-between bg-near-black navbar code silver'>
        
            <div className="flex ml2 mt2">
                <Link to='/'><img src={logo} alt="Logo" width="200" height="42"/></Link>
                
            </div> 
            <div className="flex">
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
        </nav>   
       
        );
       

}

export default Navigation;

