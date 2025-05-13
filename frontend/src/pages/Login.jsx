import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../store/session';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(state => state.session.error);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData));
      navigate('/');
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  const handleDemoLogin = async () => {
    try {
      await dispatch(login({ 
        credential: 'demo@user.io', 
        password: 'password' 
      }));
      navigate('/');
    } catch (error) {
      // Error is handled by the reducer
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Welcome back</h1>
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Log in
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            className="demo-button"
          >
            Continue with Demo User
          </button>

          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 