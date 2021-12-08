import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import TaskDetails from './components/TaskDetails'

export default function App() {
  // * tasks state
  const [tasks, setTasks] = useState([])

  // * Show/Hide Add Task State
  const [showAddTask, setShowAddTask] = useState(false)

  // * added loading --- idea from TaskDetails module
  const [loading, setLoading] = useState(true)

  // * url of JSON data
  const url = 'http://localhost:5000/tasks/'


  /*
    * fetch tasks
    can be directly inside of useEffect but left outside
    in case the function needs to be reused
    * modified to accept id as an argument
    with a default value of '' if nothing is passed
  */
  const fetchTasks = async (id ='') => {
    const res = await fetch(url + id)
    const data = await res.json()
    return data
  }

  /*
    * tutorial used this almost identical fetch request
    code shown below. However, to make code DRY,
    id was used as a built-in parameter
    with a default value of '' (empty string)

    const fetchTask = async (id) => {
      const res = await fetch(url + id)
      const data = await res.json()
      return data
    }
  */ 

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
      setLoading(false)
    }
    getTasks()
  }, [])
  /*
    ? dependency array value where you want to run if the value changes
    ? requires a lot more research on
    * passing an empty array as dependency
      the side-effect runs once after the initial rendering
    * READ MORE:
    * https://dmitripavlutin.com/react-useeffect-explanation/#2-dependencies-argument
  */


  /*
    * Add Task
    id generated is custom made
    tutorial made use of a random number from 1-10,001
  */
  const addTask = async (task) => {
    setShowAddTask(false)
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    /*
      * JSON server generates an id,
     hence no id generated locally
     before passing to server
    */

    /*
      const id = tasks.length + 1
      const newTask = {id, ...task}
      setTasks([...tasks, newTask])
    */
  }


  /*
    * Delete Task
    Filter and display all task that does
    not have the clicked id
    * Note that a keyword return is used
    * in this example, because the expected
    * return is written in a new line
  */
  const deleteTask = async (id) => {
    await fetch(url + id, { method: 'DELETE' } )
    setTasks(tasks.filter((task) => {
      return task.id !== id
    }))
  }

  /*
    * Toggle Reminder
  */
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTasks(id)
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    
    const res = await fetch(url + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(updatedTask)
    })
    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id
        ? {...task, reminder: data.reminder}
        : task
    ))
  }

  return (
    <Router>
      <div className="container">
        <Header
          onToggleAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />


        <Routes>
          <Route
            path='/'
            element={
              <>
                {
                  showAddTask
                  && <AddTask onAdd={addTask} />
                }
                {
                  tasks.length > 0
                    ? <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      toggleReminder={toggleReminder}
                      />
                    : loading
                      ? <p>Loading...</p>
                      : <p style={{ opacity: 0.5 }}>
                          No Task to display
                        </p>
                }
              </>
            }
          />

          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetails />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  )
}

/*
  ? commented to use export default function
  ? at top of module
  export default App
*/

/*
  * Another way of exporting module
  if in a conventional function format,
  export default can be appended before
  the keyword function
  * Available to functions w/ defaultProps
  see Button.js as an example
  ! this does not work if in arrow function
  keyword const seems to not allow it
  hence, using 'export default' + funcName
  at the bottom is required
*/