import {useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginPage = () => {
    const [email, setEmail ] = useState('');
    const [password, SetPassword] = useState('')
    const [ error, SetError ] = useState('')    //to show if wrong pw or user
    
    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles')
        } catch (e) {
            SetError(e.message);
        }
    }

    return (
     <>
         <h1>Login Page</h1>
         {error && <p className='error'> {error}</p>}

         <input 
            placeholder='Your email address'
            value={email}
            onChange={e => setEmail(e.target.value)} />
        
        <input 
            placeholder='Your Password'
            value={password}
            onChange={e=> SetPassword(e.target.value)} />

        <button onClick={logIn}>Log In</button>
        <Link to="/create-account">Don't have an account? Create one here</Link>
     </>   

  )
}

export default LoginPage