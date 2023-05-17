import React from "react";
import { useRef, useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            fetch('http://localhost:3001/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: nameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response==='User registered successfully!') {
                    navigate('/signin', { replace: true })
                } 
                else setError('This email address is already used.')
            })
        } catch (error) {
            setError('Something went wrong. Please try again.')
        }
        
    }


    return (
        <article className="br3 ba b--black-10 mv6 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 tc fw6 ph0 mh0">Register</legend>
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
    )
  
}

export default Register;
