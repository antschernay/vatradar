import React, { useEffect } from "react";
import { useState } from "react";
import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";


const UserProfile = ({user, setUser}) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [cid, setCid]= useState(user.cid);
    const [message, setMessage] = useState('');
    const [page, setPage] = useState('updateInfo')
   


    useEffect(() => {

        try {
            fetch(`https://tender-teal-panda.cyclic.app/getUser/${user.user_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.email) {
                    setEmail(data.email);
                    setName(data.name)
                } 
                else setMessage('Something went wrong. Please try again.')
            })
        } catch (error) {
            setMessage('Something went wrong. Please try again.')
        }

    }, [])
    

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
        <>
        {page==='updateInfo'&&
        <div className='pt6'>

            
            <article className="br3 ba b--black-10 w-100 w-50-m w-25-l shadow-5 center code">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f2 tc fw6 ph0 mh0 b">Edit Profile</legend>
                                <div className="tc">
                                    {message && <p className="blue pb2">{message}</p>}
                                </div>
                                <div className="mt3 flex items-center">
                                    <label className="db fw6 b lh-copy w-20 f6" htmlFor="email-address">Email</label>
                                    <input className="pa2 input-reset ba bg-silver w-100"
                                            disabled
                                            value={email}
                                            type="email" 
                                            name="email"  
                                            id="email"/>
                                </div>
                                <div className="mt3 flex items-center">
                                    <label className="db fw6 b lh-copy w-20 f6" htmlFor="name">Name</label>
                                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        onChange={(event) => setName(event.target.value)}
                                        defaultValue={name}
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
                            className="b ph3 pv2 mt2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit" value="Apply Changes" onClick={handleSubmit}
                        />
                        </div>
                        <p className="f6 link dim tc black db mt4 pointer" onClick={() => setPage('changePassword')}>Change password</p>
                        <p className="f6 link dim tc black db mt2 pointer" onClick={() => setPage('deleteAccount')}>Delete account</p>
                    </div>
                </main>
            </article>
            

            
            
        </div>
        }
        {page==='changePassword' &&
            <ChangePassword email={email} setMessage={setMessage} setPage={setPage}/>
          }

          {page==='deleteAccount' &&
           <DeleteAccount user={user} email={email} setUser={setUser} setMessage={setMessage} setPage={setPage}/>
          }
          </>
    )
}

export default UserProfile;