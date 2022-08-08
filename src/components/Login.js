import Room from '@mui/icons-material/Room'
import axios from 'axios'
import { useRef, useState } from 'react'
import './login.css'
import logo from '../assets/socialTag.png'
import CancelIcon from '@mui/icons-material/Cancel';


export function Login({setShowLogin, myStorage, setCurrentUser}) {

    const[error, setError] = useState(false)

    const nameRef = useRef()

    const passwordRef = useRef()


    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = {
            username: nameRef.current.value,
            password: passwordRef.current.value,
        }

        try{
            const res = await axios.post(`/map/login`, user)
            myStorage.setItem("user", res.data.username)
            setCurrentUser(res.data.username)
            setError(false);
            setShowLogin(false)


        }catch(err) {
            setError(true)
        }


    }

    return(
        <div className="loginContainer small">
            <div className="logo">
            <img src={logo} alt="Social Tag Logo"  className='loginLogo'/>
            </div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Enter Username"  autocomplete="off" ref={nameRef}/>
                <input type="password" placeholder="Enter Password" autocomplete="off"  ref={passwordRef}/>
                <button className='loginBtn' type='submit'>Login</button>

                {error && <span className='failure'>Something went wrong!</span>}
                
            </form>
                <CancelIcon className='loginCancel' onClick={() => setShowLogin(false)}/>
        </div>
    )
}