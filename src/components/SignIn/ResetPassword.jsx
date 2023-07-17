import React from "react";
import { useRef, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';



const ResetPassword = () => {

    const [errorMessage, setErrorMessage] = useState('')
    const {id, token} = useParams();
    const newPasswordRef = useRef();
    const confirmPasswordRef= useRef();

    const navigate = useNavigate()

    const handlePasswordReset = (e) => {
        e.preventDefault();
       
        if (!newPasswordRef.current.value || !confirmPasswordRef.current.value ) {
            return setErrorMessage('Each field must be filled out.')
        }
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value){
            return setErrorMessage('Passwords do not match.');
        }
        try {
            fetch('https://tender-teal-panda.cyclic.app/auth/resetPassword', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    user_id: id.split('=')[1],
                    token: token.split('=')[1],
                    newPassword: newPasswordRef.current.value
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response === 'success') {
                    navigate('/signin', { replace: true, state: { message: 'Your password has been changed successfully. Use your new password to sign in.' } });
                  } else {
                    setErrorMessage('Something went wrong. Please try again.');
                  }
            })
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="flex justify-center">
            <div className="bg-white ba b--black-10 code pa4 w-100 w-60-m w-30-l float-box shadow-5">
            
                <div className=" measure">
                <p className="tc">You may enter your new password here.</p>
                {errorMessage && <p className="dark-red f6 lh-solid tc">{errorMessage}</p>}
                    
                    <div className="mt3 items-center">
                        <label className="db fw6 b lh-copy f6" htmlFor="name">New Password</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                ref = {newPasswordRef}
                                type="password" 
                                name="new-password"  
                                id="new-password"/>
                    </div>                            
                    <div className="mv3 items-center">
                        <label className="db fw6 b lh-copy f6" htmlFor="cid">Confirm New Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                ref = {confirmPasswordRef}
                                type="password" 
                                name="re-enter-password"  
                                id="re-enter-password"/>
                    </div>
                    <div className="tc">
                    <input                         
                                className="b ph3 pv2 mt2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit" value="Change Password" onClick={handlePasswordReset}
                            />
                            </div>

                </div>
            </div>
    </div>
    
    )

}
      

export default ResetPassword;