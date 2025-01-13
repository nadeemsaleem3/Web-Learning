import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Redirect to="/" />;
  }

  return children;
};

// PropTypes for the ProtectedRoute component
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired, // Ensures that children are valid React elements
    allowedRoles: PropTypes.arrayOf(PropTypes.string), // Array of roles allowed to access the route
  };
  
  ProtectedRoute.defaultProps = {
    allowedRoles: [], // If no allowedRoles are passed, default to empty array
  };

export default ProtectedRoute;