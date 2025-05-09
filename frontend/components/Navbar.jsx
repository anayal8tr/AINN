import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../store/session';
import './Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector(state => state.session.user);

  const handleLogout = async () => {
    await dispatch(logout());
    setIsMenuOpen(false);
    navigate('/');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="AInnBnB" className="logo-image" />
          <span className="logo-text">AInnBnB</span>
        </Link>

        <div className="search-bar">
          <button className="search-button">
            <span>Anywhere</span>
            <span className="separator">|</span>
            <span>Any week</span>
            <span className="separator">|</span>
            <span className="guests">Add guests</span>
            <div className="search-icon">
              <i className="fas fa-search"></i>
            </div>
          </button>
        </div>

        <div className="user-menu">
          {user ? (
            <button className="host-home">
              <Link to="/spots/new">AInnBnB your home</Link>
            </button>
          ) : null}
          
          <div className="profile-menu">
            <button className="menu-button" onClick={toggleMenu}>
              <i className="fas fa-bars"></i>
              <i className="fas fa-user-circle"></i>
            </button>

            {isMenuOpen && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <Link to="/spots/current" className="menu-item">
                      Manage Listings
                    </Link>
                    <Link to="/reviews/current" className="menu-item">
                      Manage Reviews
                    </Link>
                    <button onClick={handleLogout} className="menu-item">
                      Log out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="menu-item">
                      Log in
                    </Link>
                    <Link to="/signup" className="menu-item">
                      Sign up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 