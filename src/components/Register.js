import Room from '@mui/icons-material/Room'
import axios from 'axios'
import { useRef, useState } from 'react'
import './register.css'
import CancelIcon from '@mui/icons-material/Cancel';
import logo from '../assets/socialTag.png'


export function Register({setShowRegister}) {

    const[success, setSuccess] = useState(false)
    const[error, setError] = useState(false)

    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }

        try{
            await axios.post(`https://socialtags-map.herokuapp.com/map/register`, newUser)
            setError(false)
            setSuccess(true)

        }catch(err) {
            setError(true)
        }


    }

    return(
        <div className="registerContainer small">
            <div className="logo">
            <img src={logo} alt="Social Tag Logo"  className='loginLogo'/>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Username" autocomplete="off" ref={nameRef}/>
                <input type="email" placeholder="Enter Email" autocomplete="off" ref={emailRef}/>
                <input type="password" placeholder="Enter Password" ref={passwordRef}/>
                <button className='registerBtn' type='submit'>Register</button>
                {success && <span className='success'>Successfull. You can login now!</span>}
                {error && <span className='failure'>Something went wrong!</span>}
                
            </form>
                <CancelIcon className='registerCancel' onClick={() => setShowRegister(false)}/>
        </div>
    )
}