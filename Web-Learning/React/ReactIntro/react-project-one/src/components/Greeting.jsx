import UserGreeting from './UserGreeting'
import GuestGreeting from './GuestGreeting'
import PropTypes from 'prop-types'

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
      return <UserGreeting />;
    }
    return <GuestGreeting />;
  }

  Greeting.propTypes = {
      isLoggedIn: PropTypes.bool.isRequired,
  }

export default Greeting