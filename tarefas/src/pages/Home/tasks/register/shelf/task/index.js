import { useState } from "react"
import axios from "axios"
import styles from './index.module.css'
import {FiEdit, FiDelete, FiCheck } from 'react-icons/fi'

export default ({ task, onRewind }) => {
  const [inEdition, SetInEdition] = useState(false)

  let brasileira = task.dataprazo.split('-').join('/')

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/tasks/${id}`)
      .then(() => onRewind())
      .catch(err => alert(err))
  }

  const handleComplete = (task) => {
    task.isCompleted = true
    task.finishTask = new Date()
    axios
      .put(`http://localhost:5000/tasks/${task.id}`, task )
      .then(() => onRewind())
      .catch(err => alert(err))
  }

  const handleUpdate = (task, e) => {
    task.task = e.target.value
    axios
      .put(`http://localhost:5000/tasks/${task.id}`, task)
      .then(() => {
        SetInEdition(false)
        onRewind()
      })
      .catch(err => alert(err))
  }

  return (
    <div className={styles.container}>
      <div>
      <div >
        {inEdition
          ? <input onBlur={e => handleUpdate(task, e)} defaultValue={task.task} />
          : <h4>{task.task}</h4>
        }
      </div>
        <p>{task.email}</p>
        <p>{task.date}</p>
        <p>{brasileira}</p>
        {!task.isCompleted ?
        <>
          <p className={styles.edit} onClick={() => SetInEdition(true)}><FiEdit/></p>
          <p className={styles.delete} onClick={() => handleDelete(task.id)}><FiDelete/></p>
          <p className={styles.finish} onClick={() => handleComplete(task)}><FiCheck/></p>
        </>
      : <p>{task.finishTask}</p>
        
      }
      </div>
    </div>
  )
}
