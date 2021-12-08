import { useState } from 'react'
// TODO import PropTypes from 'prop-types'

export default function AddTask({ onAdd }) {
  const [text, setText] = useState('')
  const [day, setDay] = useState('')
  const [reminder, setReminder] = useState(false)
  const [ErrMsg, setErrMsg] = useState(false)

  /* 
    * UNTESTED custom made state
    ? creates a new object
    rather than individual state
    const [newTask, setNewTask] = useState({
      text: '',
      day: Date.now(),
      reminder: false,
    })
  */

  // let showAlert

  const onSubmit = (e) => {
    e.preventDefault()
    /*
      * no custom validation added to warn unanswered input
      attribute of required={true} will suffice
    */
    if (text !== '' && day !== '') {
      onAdd({ text, day, reminder })
      setText('')
      setDay('')
      setReminder(false)
      setErrMsg(false)
    } else {
      setErrMsg(true)
    }
    
  }  

  return (
    <form
      className='add-form'
      onSubmit={onSubmit}
    >
      <div
        className='form-control'>
        <label htmlFor="new-task">Task</label>
        <input
          className={ErrMsg === true && text === '' ? 'errP' : ''}
          type='text'
          id='new-task'
          placeholder='Add Task'
          value={text}
          autoComplete='off'
          onChange={(e) => setText(e.target.value)}
        />
        { ErrMsg && text === '' && <p className='err'>Fill out Task Name</p> }
      </div>
      <div
        className='form-control'
      >
        <label htmlFor='day-time'>Day & Time</label>
        <input
          className={ErrMsg === true && day === '' ? 'errP' : ''}
          type='text'
          id='day-time'
          placeholder='Add Day & Time'
          value={day}
          autoComplete='off'
          onChange={(e) => { setDay(e.target.value) }}
        />
        { ErrMsg && day === '' && <p className='err'>Fill out Day and Time</p> }
      </div>


      <div className='form-control form-control-check'>
        <label htmlFor='task-reminder'>Set Reminder</label>
        <input
          type='checkbox'
          checked={reminder}
          id='task-reminder'
          onChange={() => setReminder(!reminder)}
        />
      </div>
      <input
        type="submit"
        value="Save Task"
        className='btn btn-block'
      />
    </form>
  )
}


/*
  * onChange for reminder based on tutorial
  onChange={(e) => setReminder(e.currentTarget.checked)}
  * custom written code also works
*/

/*
  TODO how to check if input[type='text'] (text, day) is string
  * Not in tutorial
 added as an experiment for understanding
 PropTypes and possibly as security measure for
 code injection.... maybe?
*/
// AddTask.propTypes = {
//   text: PropTypes.string
// }