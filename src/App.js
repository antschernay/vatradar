import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import '../node_modules/leaflet/dist/leaflet.css'
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



function App() {

  const [pilots, setPilots] = useState([]);
  const [airports, setAirports] = useState([]);
  const [time, setTime] = useState(new Date().toUTCString());
  const [selectedPlanes, setSelectedPlanes] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);


  
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
      <Navigation dateTime={time} pilots={pilots.length}/>
      <Routes>
        <Route path='/' element={<Home pilots={pilots} selectedPlanes={selectedPlanes} setSelectedPlanes={setSelectedPlanes} airports={airports}
                                            selectedAirports={selectedAirports} setSelectedAirports={setSelectedAirports}/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' />
      </Routes>
      </div> 
      
    </>

  );
}


export default App;
