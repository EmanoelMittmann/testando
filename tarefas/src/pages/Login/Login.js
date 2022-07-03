import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .get(`http://localhost:5000/users?email=${email}&password=${password}`)
      .then((response) => {
        response.data &&
          localStorage.setItem("login", JSON.stringify({
            userLogin: true,
            user: response.data[0].id,
            adm: response.data[0].adm,
            email: response.data[0].email
          }))
        navigate('/home')
      })
      .catch(error => setError(error.response.data.message))
  }

  return (
    <div className={styles.container}>
      <form className={styles.forms} onSubmit={handleSubmit}>
        <h4>Faça login e cadastre suas tarefas!</h4>
        <label>
          <input
            type="email"
            placeholder='Username'
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <input
            type="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <button type="submit">Autenticar</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p className={styles.redirection}>You haven't account <Link to="register">Sign In</Link></p>
      </form>
    </div>
  )
}

export default Login