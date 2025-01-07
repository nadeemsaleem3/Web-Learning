import PropTypes from 'prop-types'

const Login = (props) => {
  return (
    <button onClick={props.onClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
    Login
  </button>
  )
}

Login.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default Login