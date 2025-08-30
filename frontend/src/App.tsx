import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/AuthLayout'
import SigninForm from './components/SigninForm'
import SignupForm from './components/SignupForm'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/signup" element={<AuthLayout><SignupForm /></AuthLayout>} />
        <Route path="/signin" element={<AuthLayout><SigninForm /></AuthLayout>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<AuthLayout><SigninForm /></AuthLayout>} />
        </Routes>
    </div>
  )
}

export default App
