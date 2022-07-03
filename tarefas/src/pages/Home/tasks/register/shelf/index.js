import axios from "axios"
import { useEffect, useState } from "react"
import getUserId from "../../getUserId"
import isUserAdm from "./isUserAdm"
import Task from "./task/index"
import styles from "./index.module.css"
 
export default ({ loading }) => {
  const [tasks, setTasks] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    rewind()
  }, [loading, page])

  const rewind = () => {
    const url = isUserAdm()
      ? `http://localhost:5000/tasks?_page=${page}&_limit=10`
      : `http://localhost:5000/tasks?user=${getUserId()}&?_page=${page}&_limit=10`

    axios
      .get(url)
      .then(response => setTasks(response.data))
      .catch(err => alert(err))
  }

  return (
    <div>
      {tasks.map(task => <Task key={task.id} task={task} onRewind={() => rewind()} />)}
      <button className={styles.btn} onClick={() => page > 1 && setPage(page - 1)}>Retornar pagina</button>
      {page}
      <button className={styles.btn} onClick={() => setPage(page + 1)}>Próxima pagina</button>
    </div>
  )
}
