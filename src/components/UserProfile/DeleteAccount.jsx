import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft} from '@fortawesome/free-solid-svg-icons';


const DeleteAccount = ({user, email, setUser, setMessage, setPage}) => {

    const [errorMessage, setErrorMessage] = useState('')

    const passwordRef = useRef();

    const navigate = useNavigate();


    const handleDeleteAccount = (e) => {
        e.preventDefault();
        if (!passwordRef.current.value) {
            return setErrorMessage('The field below must not be empty.')
        }
        try {
            fetch('https://tender-teal-panda.cyclic.app/auth/deleteAccount', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: user.user_id,
                    email: email,
                    password: passwordRef.current.value,
                    
                })
            })
            .then(response => response.json())
            .then(response => {
                if (response === 'Account deleted successfully.') {
                    setMessage('Your account has been deleted. You will be redirected soon.');
                    setPage('updateInfo')
                    setTimeout(()=> {
                        sessionStorage.clear();
                        setUser([]);
                        navigate('/', { replace: true });
                    }, 3400)
                  } else {
                    setErrorMessage('Wrong password. Please try again.');
                  }
            })
        } catch (error) {
            setErrorMessage('Something went wrong. Please try again.');
        }
    }

    return (
        <div className="flex justify-center">
            <div className="bg-white ba b--black-10 code pa4 w-100 w-60-m w-30-l float-box shadow-5">
            <div className="flex items-center" onClick={()=> {setPage('updateInfo');setErrorMessage('')}}>
                    <FontAwesomeIcon className='black dib f6 ph2 pointer' icon={faArrowLeft}/>
                    <p className="b f5 pointer">Back</p>
                </div>
                <div className="tc">
                <p><b>Warning:</b> this action will delete your account <b>permanently</b>. After that, you will not be able
                            to use this account anymore. If you wish to continue, please enter your <b>password.</b></p>
                {errorMessage && <p className="dark-red f6 lh-solid">{errorMessage}</p>}
                <div className="mt3 flex items-center">
                
                    <input className="pa2 mb2 mt2 input-reset ba w-100"
                            ref={passwordRef}
                            type="password" 
                            name="password"  
                            id="password"/>
                </div>

                <input                         
                            className="b ph3 pv2 mt3 input-reset ba b--black bg-transparent grow pointer f6 dib "
                            type="submit" value="Delete Account" onClick={handleDeleteAccount}
                        />

                </div>
            </div>
        </div>
    )
}


export default DeleteAccount;




       