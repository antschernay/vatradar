import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

const SignIn = ({setUser}) => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
       try {
            fetch('https://tender-teal-panda.cyclic.app/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: emailRef.current.value,
                    password: passwordRef.current.value
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.user_id) {
                    console.log(user)
                    setUser(user);
                    sessionStorage.setItem("login", JSON.stringify(user))
                    navigate('/', { replace: true });
                } 
                else setError('Invalid email or password')
            })
       } catch (error) {
            setError('Invalid email or password')
       }
        
  

    }

    return (
        <div className="pt6">
        <article className="br3 ba b--black-10 w-100 w-50-m w-25-l shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw5 ph0 mh0 tc">Sign In</legend>
                        <div className="tc red">
                            {error && <p>{error}</p>}
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
                            className="b ph3 pv2 mb2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                            type="submit" value="Sign in" onClick={handleSubmit}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f6 link dim tc black db"><Link className='no-underline black' to={''}>Forgotten password?</Link></p>
                        <p className="f6 link dim tc black db"><Link className='no-underline black' to={'/register'}>Register</Link></p>
                    </div>
                </div>
            </main>
        </article>
        </div>
    )
  
}

export default SignIn;
