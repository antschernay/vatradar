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



function App() {

  
  const [loading, setLoading] = useState(true);
  const [pilots, setPilots] = useState([]);
  const [airports, setAirports] = useState([]);
  const [controllers, setControllers] = useState([]);
  const [time, setTime] = useState(new Date().toUTCString());
  const [selectedPlanes, setSelectedPlanes] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);
  const [user, setUser] = useState([]);
  const [zoom, setZoom] = useState(6);
  const [center, setCenter] = useState([48.5,10])

  

  useEffect(() => {
    const data = sessionStorage.getItem('login')
    if (data) {
      setUser(JSON.parse(data))
    }
  }, []);


  useEffect(() => {
    const storageAirports = localStorage.getItem('selectedAirports')
    const storageZoom = localStorage.getItem('zoom')
    const storageCenter = localStorage.getItem('center')
    if (storageZoom) {
      setZoom(JSON.parse(storageZoom))
      console.log(JSON.parse(JSON.parse(storageZoom)))
      console.log(zoom)
    }

    if (storageAirports) {
      setSelectedAirports(JSON.parse(storageAirports));
    }
    

    if (storageCenter) {
      console.log(storageCenter)
      setCenter(JSON.parse(storageCenter))
     
    }
    setLoading(false);
  }, []);
  


  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

 

  async function fetchPilots(){
    const data = await fetch("http://localhost:3001")
    const pilots = await data.json();
    setPilots(pilots);

    const data2 = await fetch("http://localhost:3001/mapAirports")
    const airports = await data2.json()
    setAirports(airports)

    const data3 = await fetch("http://localhost:3001/controllers")
    const controllers = await data3.json()
    setControllers(controllers)
   
  }
     
  





  React.useEffect(() => {
    fetchPilots();

    const interval = setInterval(() => {
      fetchPilots();

    }, 60000); 
    return () => clearInterval(interval);    
  }, []);


  if (loading) {
    return <div>LOADING</div>
  }

  
  return (   
    <>
     <div className='app'>
      <Navigation dateTime={time} pilots={pilots.length} user={user} setUser={setUser}/>
      <Routes>
        <Route path='/' element={<Home pilots={pilots} selectedPlanes={selectedPlanes} setSelectedPlanes={setSelectedPlanes} airports={airports}
                                            selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports} user={user.cid}
                                            zoom={zoom} center={center} controllers={controllers} />} />
        <Route path='/signin' element={<SignIn setUser={setUser}/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' element={user.user_id ? <UserProfile user={user} setUser={setUser} /> : <Navigate to="/signin" /> }/>
        <Route path='/favorites' element={user.user_id ? <Favorites userId={user.user_id} pilots={pilots}/> : <Navigate to="/signin" /> }/>
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
