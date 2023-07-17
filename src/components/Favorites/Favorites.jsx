import React from "react";
import { useState, useEffect } from "react";
import FavoritesList from "./FavoritesList";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const Favorites = ({userId, pilots}) => {

    const [airports, setAirports] = useState([]);
    const [favAirports, setFavAirports] = useState([]);
    const [updatedRow, setUpdatedRow] = useState("");
    const [error, setError] = useState("");
    const [searchField, setSearchField] = useState("");


    useEffect(() => {
        try {
        const fetchAirports  = async () => {
            const response = await fetch(`https://tender-teal-panda.cyclic.app/map/airports/${searchField.toUpperCase()}`)
            setAirports(await response.json());
        }
        if (searchField.length >= 3){
            fetchAirports();
        }
        if (searchField.length <= 2){
            setAirports([]);
        }}
        catch (error) {
            console.log(error)
        }
    }, [searchField]);



    useEffect(() => {
        try {
            const fetchAirports  = async () => {
                const response = await fetch(`https://tender-teal-panda.cyclic.app/user/favAirports/${userId}`)
                setFavAirports(await response.json());
            }
            fetchAirports()
        } catch (error) {
            console.log(error)
        }
    }, [updatedRow]);


    const handleAddAirport = (icao) => {
        try {
            fetch('https://tender-teal-panda.cyclic.app/user/addToFavorites', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_id : userId,
                    icao_code : icao
                })
            })
            .then(response=> setUpdatedRow(response))
            .then(setSearchField(""))

       } catch (error) {
            setError('This airport could not be added.')
       }
        


    }

    const handleRemoveAirport = (icao) => {
        try {
            fetch('https://tender-teal-panda.cyclic.app/user/removeFromFavorites', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_id : userId,
                    icao_code : icao
                })
            })
            .then(response=> setUpdatedRow(response))

       } catch (error) {
            setError('This airport could not be removed.')
       }

    }
    


    return (
        <div className="pt6">
            <div className="center code mb3 fav-airports">
                <div>
                        <input
                            className="pa2 input-reset ba white bg-near-black o-70 w-100" 
                            type='text' 
                            placeholder="Search"
                            onChange={e => setSearchField(e.target.value)}
                        /> 
                      
                </div>
                {airports && 
                airports.map((airport) => {
                    return (
                    
                        <div className="pa2 br bb bl b--silver flex justify-between bg-transparent w-100 items-center ph3">
                            <p className="code f6 black ma0"><b>{airport.icao_code}</b>, {airport.city}, {airport.name}</p>
                            <div className="ba b--silver ph4 pointer flex justify-around items-center pa1" style={{backgroundColor: '#4ea86c'}}
                                onClick={()=> {handleAddAirport(airport.icao_code); console.log(updatedRow)}}>
                                <FontAwesomeIcon className='white dib f7 pr2' icon={faStar} ></FontAwesomeIcon>
                                <p className="code f7 white ma0 b lh-copy">Favorite</p>

                            </div>
                        </div>
                    )
                })
                }
                
            </div>
      

           

            <FavoritesList favAirports={favAirports} pilots={pilots} handleRemove={handleRemoveAirport}/>
            

        </div>
    )



}


export default Favorites;


