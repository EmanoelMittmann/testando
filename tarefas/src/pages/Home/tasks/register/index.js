import { useState } from "react"
import axios from 'axios'
import getUserId from "../getUserId"
import Shelf from "./shelf"
import getUserEmail from "../getUserEmail"

const CreateTask = () => {
  const [title, setTitle] = useState("")
  const [task, setTask] = useState("")
  const [dataprazo, setDataprazo] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit =(e) => {
    e.preventDefault()
    setLoading(true)
    axios
      .post("http://localhost:5000/tasks", {
        task: task,
        date: new Date(),
        dataprazo: dataprazo,
        email: getUserEmail(),
        user: getUserId(),
        isCompleted: false
      })
      .then(() => resetInputs())
      .catch(error => setError(error.response.data.message))
  }

  

  function resetInputs() {
    setError("")
    setTask("")
    setDataprazo("")
    setLoading(false)
  }

  return (
    <div>
      <div id='tasks'>
        <form id='forms' onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              placeholder='Descreva sua tarefa'
              onChange={(e) => setTask(e.target.value)}
              value={task}
            />
            <input
              type='date'
              onChange={(e) => setDataprazo(e.target.value)}
              value={dataprazo}
            />
          </label>
          <input type="submit" value="Criar" />
          {error && <p>{error}</p>}
        </form>
      </div>
      <Shelf loading={loading} />
    </div>
  )
}

export default CreateTask