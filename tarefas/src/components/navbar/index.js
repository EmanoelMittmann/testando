import { useNavigate } from "react-router-dom";
import { BiLogOut } from 'react-icons/bi'
import styles from './NavBar.module.css'
import getUserEmail from "./getUserEmail";

export default () => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    localStorage.removeItem("login")
    navigate('/')
  }

  return (
    <div className={styles.nav}>
      <p>{getUserEmail()}</p>
      <h2 onClick={handleClick}><BiLogOut /></h2>
    </div>
  )
}
