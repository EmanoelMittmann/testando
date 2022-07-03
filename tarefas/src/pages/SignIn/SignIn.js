import styles from './SignIn.module.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignIn = () => {
  const nav = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    axios
      .post(`http://localhost:5000/users`, {
        email: email,
        password: password,
        adm: false
      })
      .then(response => {
        localStorage.setItem("login", JSON.stringify({
          userLogin: true,
          user: response.data.id,
          adm: false
        }))
        nav('/home')
      })
      .catch(error => setError(error.response.data.message))
  }

  return (
    <div className={styles.container}>
      <form className={styles.forms} onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <input
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <input type="submit" value="Autenticar" />
        <p>You have account <Link to="/">Login</Link></p>
      </form>
    </div>
  )
}

export default SignIn