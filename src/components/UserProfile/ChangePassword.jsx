import React from "react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';


const ChangePassword = ({email, setMessage, setPage}) => {

    const [errorMessage, setErrorMessage] = useState('')
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmPasswordRef= useRef();

    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (!newPasswordRef.current.value || !confirmPasswordRef.current.value || !oldPasswordRef.current.value ) {
            return setErrorMessage('Each field must be filled out.')
        }
        if (newPasswordRef.current.value !== confirmPasswordRef.current.value){
            return setErrorMessage('Passwords do not match.');
        }
        try {
            fetch('https://tender-teal-panda.cyclic.app/changePassword', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: email,
                    oldPassword: oldPasswordRef.current.value,
                    newPassword: newPasswordRef.current.value
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response === 'success') {
                    setMessage('Your password has been updated successfully.');
                    setPage('updateInfo');
                  } else {
                    setErrorMessage('The old password is invalid. Please try again.');
                  }
            })
        } catch (error) {
            setMessage('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="flex justify-center">
            <div className="bg-white ba b--black-10 code pa4 w-100 w-60-m w-30-l float-box shadow-5">
                <div className="flex items-center" onClick={()=> {setPage('updateInfo');setErrorMessage('')}}>
                    <FontAwesomeIcon className='black dib f6 ph2 pointer' icon={faArrowLeft}/>
                    <p className="b f5 pointer">Back</p>
                </div>
                <div className=" measure">
                <p className="tc">You may update your password here.</p>
                {errorMessage && <p className="dark-red f6 lh-solid tc">{errorMessage}</p>}
                    <div className="mt3 items-center">
                        <label className="db fw6 b lh-copy f6" htmlFor="old-password">Old Password</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                ref={oldPasswordRef}
                                type="password" 
                                name="old-password"  
                                id="old-password"/>
                    </div>
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
                                type="submit" value="Change Password" onClick={handlePasswordChange}
                            />
                            </div>

                </div>
            </div>
    </div>
    
    )

}
      

export default ChangePassword;
            
            /*<div className="flex">
                    <FontAwesomeIcon className='black dib f6 ph2 pointer ml-auto' icon={faXmark} onClick={()=> {setChangePasswordWindow(false);setErrorMessage('')}}/>
                </div>*/
            
            
            