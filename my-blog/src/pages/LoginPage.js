import React from 'react'

const LoginPage = () => {
    const [email, setEmail ] = useState('');
    const [password, SetPassword] = useState('')
    const [ error, SetError ] = useState('')    //to show if wrong pw or user
  return (
    <h1>Login Page</h1>
  )
}

export default LoginPage