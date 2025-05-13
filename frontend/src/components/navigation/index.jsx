{isLoggedIn ? (
  <div className="nav-right">
    <Link to="/spots/new" className="create-spot-button">
      Create a New Spot
    </Link>
    <Link to="/spots/current" className="nav-link">
      Manage Spots
    </Link>
    <Link to="/bookings" className="nav-link">
      Your Trips
    </Link>
    <ProfileButton user={sessionUser} />
  </div>
) : (
  <div className="nav-right">
    <button onClick={handleLoginClick} className="nav-button">
      Log In
    </button>
    <button onClick={handleSignupClick} className="nav-button">
      Sign Up
    </button>
  </div>
)} 