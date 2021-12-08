import { useState, useEffect } from 'react'
// import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom'
import { useParams, useNavigate, useLocation } from 'react-router-dom'

import Button from './Button'

export default function TaskDetails() {
  const [loading, setLoading] = useState(true)
  const [task, setTask] = useState({
    text: '',
    day: ''
  })
  // const [error, setError] = useState(null)

  const params = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const url = 'http://localhost:5000/tasks/'

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(url + params.id)
      const data = await res.json()

      if (res.status === 404) {
        navigate('/')
        /*
          * Just using Navigate (not useNavigate)  
          setError('Task not found')
        */
      }

      setTask(data)
      setLoading(false)
    }
    
    fetchTask()
  })
  /*
    * USING empty array [] results to an error
    ! Compiled BUT with warning on console below
    React Hook useEffect has missing dependencies: 'navigate' and 'params.id'.
    Either include them or remove the dependency array
    [react-hooks/exhaustive-deps]
  */

  /*
    * Just using Navigate (excluding useNavigate)  
  
    if (error) {
      return <Navigate to='/' />
    }
  */

  return(
    loading
      ? <h3>Loading...</h3>
      : <div>
          <p>{ pathname }</p>
          <h3>{ task.text }</h3>
          <p>{ task.day }</p>
          <Button
            text='Go Back'
            onClick={() => {
              navigate(-1)
            }}
          />
        </div>
  )
}
