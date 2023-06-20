import React from "react";
import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const cidRef = useRef()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
      
        if (!nameRef.current.value || !emailRef.current.value || !passwordRef.current.value) {
          setError("Fields name, email, and password cannot be empty");
        } else {
          fetch('https://tender-teal-panda.cyclic.app/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: nameRef.current.value,
              email: emailRef.current.value,
              password: passwordRef.current.value,
              cid: cidRef.current.value
            })
          })
            .then(response => response.json())
            .then(response => {
              if (response === 'User registered successfully!') {
                navigate('/signin', { replace: true });
              } else {
                setError('This email address is already used.');
              }
            })
            .catch(error => {
              setError('Something went wrong. Please try again.');
            });
        }
      };


    return (
      <div className="pt6 code">
        <article className="br3 ba b--black-10 w-100 w-50-m w-25-l shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 b tc fw6 ph0 mh0">Register</legend>
                        <p className="tc dark-red pv2">{error}</p>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        ref={nameRef}
                                        type="text" 
                                        name="name"  
                                        id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        ref={emailRef}
                                        type="email" 
                                        name="email"  
                                        id="email"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        ref={passwordRef}
                                        type="password" 
                                        name="password"  
                                        id="password"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="cid">CID (optional)</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                        ref={cidRef}
                                        type="text" 
                                        name="cid"  
                                        id="cid"/>
                            </div>

                    </fieldset>
                    <div className="tc">
                    <input                         
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                        type="submit" value="Register" onClick={handleSubmit}
                    />
                    </div>
                    
                </div>
            </main>
        </article>
      </div>
    )
  
}

export default Register;
