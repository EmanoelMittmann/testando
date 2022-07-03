export default () => {
  const user = JSON.parse(localStorage.getItem("login"))
  console.log(user)
  return user.user || 0
}