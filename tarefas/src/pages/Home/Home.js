import { Link } from 'react-router-dom'
import NavBar from '../../components/navbar';
import Register from './tasks/register';
import './Home.css'

const Home = () => {
  const isLoginTrue = JSON.parse(localStorage.getItem("login"))
  const userNotLogin = () => (
    <>
      <h2>It seem's like you are not login</h2>
      <h3>
        If you have an account, please <Link to="/">Login</Link>
      </h3>
      <h3>
        Don't have an account, please create <Link to="/register">Register</Link>
      </h3>
    </>
  )

  return (
    <div>
      <NavBar />
      {isLoginTrue && isLoginTrue.userLogin
        ? <Register />
        : <>{userNotLogin()}</>
      }
    </div>
  )
}

export default Home