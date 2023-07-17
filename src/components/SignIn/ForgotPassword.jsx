import React from "react";
import { useRef, useState } from "react";
import { Link } from 'react-router-dom';

const ForgotPassword = () => {

    const emailRef = useRef()
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
      
        fetch('https://tender-teal-panda.cyclic.app/auth/forgotPassword', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailRef.current.value,
          })
        })
          .then(response => {response.json()})
          .then(setError('A password reset link has been sent to your email address.'))
          .catch(error => {
            console.log(error);
          });
      };



    return (
        <div className="pt6">
        <article className="br3 ba b--black-10 w-100 w-50-m w-25-l shadow-5 center code">
            <main className="pa4 black-80">
                <div className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 ph0 mh0 tc b">Forgotten Password</legend>
                        <div className="tc blue">
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
                        
                    </fieldset>
                    <div className="tc mt3">
                        <input 
                            className="b ph3 pv2 mb2 input-reset ba b--black bg-transparent grow pointer f6 dib black"
                            type="submit" value="Submit" onClick={handleSubmit}
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p className="f6 link dim tc black db"><Link className='no-underline black' to={'/signIn'}>Go Back</Link></p>
                    </div>
                </div>
            </main>
        </article>
        </div>
    )
  
}

export default ForgotPassword;