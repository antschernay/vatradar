import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";



const UserProfile = ({user, setUser}) => {

    const [name, setName] = useState(user.name);
    const emailRef = useRef()
    const passwordRef = useRef()
    const [cid, setCid]= useState(user.cid);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            fetch('https://tender-teal-panda.cyclic.app/profile', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user.user_id,
                    name: name,
                    cid: cid
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.user_id) {
                    setUser(data);
                    setMessage('Information updated successfully.')
                } 
                else setMessage('Something went wrong. Please try again.')
            })
        } catch (error) {
            setMessage('Something went wrong. Please try again.')
        }
        
    }

    return  (
        <article className="br3 ba b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 tc fw6 ph0 mh0">Edit Profile</legend>
                            <div className="tc">
                                {message && <p className="blue pb2">{message}</p>}
                            </div>
                            <div className="mt3 flex items-center">
                                <label className="db fw6 b lh-copy w-20 f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-silver w-100"
                                        diabled
                                        value={user.email}
                                        type="email" 
                                        name="email"  
                                        id="email"/>
                            </div>
                            <div className="mt3 flex items-center">
                                <label className="db fw6 b lh-copy w-20 f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                       onChange={(event) => setName(event.target.value)}
                                       defaultValue={user.name}
                                        type="text" 
                                        name="name"  
                                        id="name"/>
                            </div>                            
                            <div className="mv3 flex items-center">
                                <label className="db fw6 b lh-copy w-20 f6" htmlFor="cid">CID</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                      onChange={(event) => setCid(event.target.value)}
                                      defaultValue={user.cid}
                                        type="text" 
                                        name="cid"  
                                        id="cid"/>
                            </div>

                    </fieldset>
                    <div className="tc">
                    <input                         
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit" value="Apply Changes" onClick={handleSubmit}
                    />
                    </div>
                    
                </div>
            </main>
        </article>
    )
}

export default UserProfile;
