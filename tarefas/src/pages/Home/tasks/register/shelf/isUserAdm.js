export default () => {
  const user = JSON.parse(localStorage.getItem("login"))
  return user.adm || false
}