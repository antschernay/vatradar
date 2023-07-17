import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../node_modules/leaflet/dist/leaflet.css'
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile';
import Favorites from './components/Favorites/Favorites';
import Error404 from './components/Error404/Error404';
import ForgotPassword from './components/SignIn/ForgotPassword';
import ResetPassword from './components/SignIn/ResetPassword';



function App() {

  
  const [pilots, setPilots] = useState([]);
  const [airports, setAirports] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [time, setTime] = useState(new Date().toUTCString());
  const [selectedPlanes, setSelectedPlanes] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);
  const [user, setUser] = useState([]);

 

  useEffect(() => {
    const data = sessionStorage.getItem('login')
    if (data) {
      setUser(JSON.parse(data))
    }
  }, []);


  


  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const dateObject = new Date();
      const day = dateObject.getUTCDate();
      const month = dateObject.toLocaleString("en-US", { month: "short" });
      const hours = dateObject.getUTCHours().toString().padStart(2, "0");
      const minutes = dateObject.getUTCMinutes().toString().padStart(2, "0");

      const outputString = `${day} ${month} ${hours}:${minutes} Zulu`;
      setTime(outputString);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

 

  async function fetchPilots(){
    try {
      const data = await fetch("https://tender-teal-panda.cyclic.app/")
      const pilots = await data.json();
      setPilots(pilots);

      const data2 = await fetch("https://tender-teal-panda.cyclic.app/mapAirports")
      const airports = await data2.json()
      setAirports(airports)

      const data3 = await fetch("https://tender-teal-panda.cyclic.app/controllers")
      const controllers = await data3.json()
      setControllers(controllers)
    } catch (error) {
      console.log(error)
    }
   
  }
     
  


  React.useEffect(() => {
    fetchPilots();

    const interval = setInterval(() => {
      fetchPilots();

    }, 60000); 
    return () => clearInterval(interval);    
  }, []);


 

  
  return (   
    <>
     <div className='app'>
      <Navigation dateTime={time} pilots={pilots.length} user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home pilots={pilots} selectedPlanes={selectedPlanes} setSelectedPlanes={setSelectedPlanes} airports={airports}
                                            selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports} user={user.cid}
                                            controllers={controllers} />} />
        <Route path='/signin' element={<SignIn setUser={setUser}/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/resetPassword/:id/:token' element={<ResetPassword />}/>
        <Route path='/profile' element={user.user_id ? <UserProfile user={user} setUser={setUser} /> : <Navigate to="/signin" /> }/>
        <Route path='/favorites' element={user.user_id ? <Favorites userId={user.user_id} pilots={pilots}/> : <Navigate to="/signin" /> }/>
        <Route path='*' element={<Error404 />} />
      </Routes>
      </div> 
      
    </>

  );
}


export default App;


/*async function fetchJson() {
  try {
    const response = await fetch("http://localhost:3001");
    const json = await response.json();
    setData(json);
  } catch (error) {
    console.error(error);
  }

  const data2 = await fetch("http://localhost:3001/mapAirports")
    const airports = await data2.json()
    setAirports(airports)
}  */
