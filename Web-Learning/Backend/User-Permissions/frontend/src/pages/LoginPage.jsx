import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Importing AuthContext

const LoginPage = () => {
  const { login } = useContext(AuthContext); // Access login function
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory(); // For navigation after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate login
    const userData = {
      email,
      role: 'user', // You would get the role from backend
      token: 'fake-jwt-token',
    };

    login(userData); // Save user data in context and localStorage
    history.push('/'); // Redirect to home page after login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;