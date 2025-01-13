import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importing AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Importing ProtectedRoute
import HomePage from './pages/HomePage'; // Sample HomePage
import LoginPage from './pages/LoginPage'; // Sample LoginPage
import AdminDashboard from './pages/AdminDashboard'; // Sample AdminDashboard
import { Redirect } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
      <AuthProvider>
        <Router>
          <Switch>
            <Route path="/login">
              <LoginPage />
            </Route>

            <ProtectedRoute path="/" exact>
              <HomePage />
            </ProtectedRoute>

            <ProtectedRoute path="/admin" allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>

            <Redirect to="/" /> {/* Redirect to home page by default */}
          </Switch>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
