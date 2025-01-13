import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext
import { Redirect } from 'react-router-dom'; // Redirect component for redirection
import PropTypes from 'prop-types'; // Import PropTypes for validation

const HomePage = () => {
  const { user, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  if (!user) {
    // If the user is not logged in, redirect to the login page
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      <div>
        <p>Hello, {user.username}!</p> {/* Show the user's username */}
        <p>Your role is: {user.role}</p> {/* Show the user's role */}

        {/* Logout Button */}
        <button onClick={logout}>Logout</button>
      </div>

      {/* Show a message based on the user's role */}
      {user.role === 'admin' ? (
        <div>
          <h2>Admin Section</h2>
          <p>Welcome, Admin! You have access to admin features.</p>
        </div>
      ) : (
        <div>
          <h2>User Section</h2>
          <p>Welcome, User! Explore the user features here.</p>
        </div>
      )}
    </div>
  );
};

HomePage.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
};

export default HomePage;