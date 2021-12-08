import PropTypes from 'prop-types'
import Button from './Button'


const Header = ({ title, onToggleAdd, showAdd }) => {
  
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? 'red' : 'green'}
        onClick={onToggleAdd}
        text={showAdd ? 'Close' : 'Add'}
      />
    </header>
  )
}

Header.defaultProps = {
  title: 'Task Tracker'
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
}


export default Header
