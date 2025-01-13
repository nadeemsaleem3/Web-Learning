import { useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Redirect } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      <Redirect to="/" />;
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const { data } = await axios.get('/api/auth/admin', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={fetchAdminData}>Fetch Admin Data</button>
    </div>
  );
};

export default AdminDashboard;