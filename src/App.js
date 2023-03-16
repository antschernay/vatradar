import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import '../node_modules/leaflet/dist/leaflet.css'
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';



function App() {

  const [pilots, setData] = useState([]);
  const [time, setTime] = useState(new Date().toUTCString());
  const [selectedPlanes, setSelectedPlanes] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);

  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toUTCString());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

 

  function fetchJson(){
    fetch("http://localhost:3001")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }



  React.useEffect(() => {
    fetchJson();
    const interval = setInterval(() => {
      fetchJson()
    }, 60000); 
    return () => clearInterval(interval);    
  }, []);




  
  return (   
    <>
     <div className='app'>
      <Navigation dateTime={time} pilots={pilots.length}/>
      <Routes>
        <Route path='/' element={<Home pilots={pilots} selectedPlanes={selectedPlanes} setSelectedPlanes={setSelectedPlanes} 
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
