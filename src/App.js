import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import '../node_modules/leaflet/dist/leaflet.css'
import './App.css';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';




function App() {

  const [pilots, setData] = useState([]);
  const [time, setTime] = useState(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));

  
  function fetchJson(){
    fetch("https://tender-teal-panda.cyclic.app/")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
  }
  
  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);



  React.useEffect(() => {
    fetchJson();
    const interval = setInterval(() => {
      fetchJson()
    }, 61000); 
    return () => clearInterval(interval);    
  }, []);




  
  return (   
    <>
    
      <Navigation dateTime={time} pilots={pilots.length}/>
      <Routes>
        <Route path='/' element={<Home pilots={pilots}/>} />
        <Route path='/signin' element={<SignIn/>} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/profile' />
      </Routes>
           
      
    </>

  );
}


export default App;

