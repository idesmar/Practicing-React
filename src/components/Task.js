import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'


/*
  ? the import above is from react-icons which
  ? allows access to fontawesome without a CDN
  ? (and other icon sources?)
*/


export default function Task({ task, onDelete, toggleReminder }) {
  return (
    <div
      className={`task ${task.reminder ? 'reminder' : ''}`}
      onDoubleClick={() => toggleReminder(task.id)}
    >
      <h3>
        {task.text}
        {/*
          * onClick(() => props function )
          * props func should be a callback;
          if not treated as one
          (ie onClick(props func)),
          it will be immediately invoked
        */}
        <FaTimes 
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{task.day}</p>
      <p>
        <Link to={'/task/' + task.id} >
          View Details
        </Link>
      </p>
    </div>
  )
}
