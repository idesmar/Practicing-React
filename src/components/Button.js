import PropTypes from 'prop-types'

export default function Button({ color, text, onClick }) {

  return (
    <button
      className='btn'
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

Button.defaultProps = {
  text: 'Add',
  color: 'steelblue',
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

// export default Button
