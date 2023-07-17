import React from "react";
import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';

const SignIn = ({setUser}) => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const location = useLocation();
    const message = location.state && location.state.message;

    const handleSubmit = (e) => {
        e.preventDefault();
      
        fetch('https://tender-teal-panda.cyclic.app/auth/signin', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
            password: passwordRef.current.value
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else if (response.status === 400) {
              throw new Error('Invalid email or password');
            } else {
              throw new Error('HTTP request failed');
            }
          })
          .then(user => {
            setUser(user);
            sessionStorage.setItem("login", JSON.stringify(user));
            navigate('/', { replace: true });
          })
          .catch(error => {
            console.log(error);
            if (error.message === 'Invalid email or password') {
              setError('Invalid email or password');
            } else {
              setError('The server is currently down. Please try again later.');
            }
          });
      };

      console.log(message);


    return (
        <div className="pt6">
        <article className="br3 ba b--black-10 w-100 w-50-m w-25-l shadow-5 center code">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 ph0 mh0 tc b">Sign In</legend>
                        <div className="tc">
                            {error && <p className="red">{error}</p>}
                            {message && <p className="blue">{message}</p>}
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
                            className="b ph3 pv2 mb2 input-reset ba b--black bg-transparent grow pointer f6 dib black"
                            type="submit" value="Sign in" onClick={handleSubmit}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f6 link dim tc black db"><Link className='no-underline black' to={'/forgotPassword'}>Forgotten password?</Link></p>
                        <p className="f6 link dim tc black db"><Link className='no-underline black' to={'/register'}>Register</Link></p>
                    </div>
                </div>
            </main>
        </article>
        </div>
    )
  
}

export default SignIn;


/*      .then(response => response.json())
        .then(user => {
            if (user.user_id) {
                navigate('/', { replace: true })
            } 
            else setError('Invalid email or password')
        });*/