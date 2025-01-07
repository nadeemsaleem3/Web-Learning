import PropTypes from 'prop-types'

const Logout = (props) => {
  return (
    <button onClick={props.onClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
      Logout
    </button>
  )
}

Logout.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Logout