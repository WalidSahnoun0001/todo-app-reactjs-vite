import './todo.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import { useRef, useState } from 'react'


function Todo() {
    const [tasks, setTask] = useState([])
    const taskContent = useRef('')
    const total = tasks.length
    const completedUpdate = useRef(0)
    const [completed, setCompleted] = useState(0)


    const addTask = () => {
        if(taskContent.current.value.trim() != '' && !tasks.includes(taskContent.current.value)) {
            const todo = [...tasks, taskContent.current.value.trim()]
            taskContent.current.value = ''
            
            setTask(todo)
        }
    }

    const deleteTask = (ts) => {
        const afDelete = tasks.filter((k) => k != ts)

        setTask(afDelete)
    }
    const doneTask = (ts) => {
        if(ts.classList.contains('done')) {
            if (completedUpdate.current <= 0) {
                completedUpdate.current = 0
                ts.classList.remove('done')
            }
            else {
                ts.classList.remove('done')
                completedUpdate.current--
            }
        }
        else {
            ts.classList.add('done')
            completedUpdate.current++
        }

        setCompleted(completedUpdate.current)
    }
  return (
    <section>
        <h2>Todo App</h2>
        <div className="todo">
            <div className="display">
                <input type="text" name="screen" placeholder='Type a task...' ref={taskContent}/>
                <span onClick={addTask}><div className="cover"></div> +</span>
            </div>
            <div className="tasks">
                {
                    tasks.map((task) => (
                        <div className="task" key={task}>
                            <p className='task-content' onClick={(task) => doneTask(task.target)}>{task}</p>
                            <span><FontAwesomeIcon icon={faTrash} onClick={()=> deleteTask(task)} /></span>
                        </div>
                    ))
                }
            </div>
        </div>
        <div className="tasks-details">
            <div className="total">
                <div>Total Tasks: <span>{total}</span></div>
            </div>
            <div className="completed">
                <div>Completed: <span>{completed}</span></div>
            </div>
        </div>
    </section>
  )
}

export default Todo