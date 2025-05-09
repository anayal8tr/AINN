import  { useState } from 'react';
import './App.css';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(1);

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <h1>CozyCabins</h1>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#amenities">Amenities</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#reviews">Login</a></li>
            <li><a href="#contact">Signup</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Mountain Retreat Lodge</h2>
            <p>Experience luxury in the heart of nature</p>
            <button className="cta-button">Book Now</button>
          </div>
        </section>

        <section className="booking" id="booking">
          <div className="booking-container">
            <h3>Check Availability</h3>
            <div className="booking-form">
              <div className="form-group">
                <label>Check-in / Check-out</label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                />
              </div>
              <div className="form-group">
                <label>Guests</label>
                <select 
                  value={guests} 
                  onChange={(e) => setGuests(parseInt(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                  ))}
                </select>
              </div>
              <button className="search-button">Search</button>
            </div>
          </div>
        </section>

        <section className="features" id="amenities">
          <h3>Property Features</h3>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🏠</div>
              <h4>Entire Cabin</h4>
              <p>Private 3-bedroom cabin with mountain views</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔥</div>
              <h4>Fireplace</h4>
              <p>Cozy wood-burning fireplace for chilly evenings</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🛁</div>
              <h4>Hot Tub</h4>
              <p>Private outdoor hot tub with panoramic views</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌲</div>
              <h4>Nature Trails</h4>
              <p>Direct access to hiking and biking trails</p>
            </div>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <h3>Property Gallery</h3>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="placeholder-image"></div>
              <p>Living Room</p>
            </div>
            <div className="gallery-item">
              <div className="placeholder-image"></div>
              <p>Master Bedroom</p>
            </div>
            <div className="gallery-item">
              <div className="placeholder-image"></div>
              <p>Kitchen</p>
            </div>
            <div className="gallery-item">
              <div className="placeholder-image"></div>
              <p>Outdoor Deck</p>
            </div>
            <div className="gallery-item">
              <div className="placeholder-image"></div>
              <p>Hot Tub</p>
            </div>
            <div className="gallery-item">
              <div className="placeholder-image"></div>
              <p>Mountain View</p>
            </div>
          </div>
        </section>

        <section className="reviews" id="reviews">
          <h3>Guest Reviews</h3>
          <div className="reviews-container">
            <div className="review">
              <div className="review-header">
                <div className="review-avatar"></div>
                <div>
                  <h4>Sarah M.</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p>"Absolutely stunning property with breathtaking views. The cabin was immaculate and had all the amenities we needed. Can't wait to come back!"</p>
            </div>
            <div className="review">
              <div className="review-header">
                <div className="review-avatar"></div>
                <div>
                  <h4>John D.</h4>
                  <div className="rating">★★★★★</div>
                </div>
              </div>
              <p>"Perfect getaway spot. The hot tub under the stars was magical. Host was very responsive and helpful throughout our stay."</p>
            </div>
          </div>
        </section>

        <section className="host" id="about">
          <h3>About Your Host</h3>
          <div className="host-container">
            <div className="host-avatar"></div>
            <div className="host-info">
              <h4>Emma & David</h4>
              <p>Superhost · 5 years hosting</p>
              <p>We're passionate about providing unforgettable mountain experiences for our guests. Our cabin has been lovingly restored to provide modern comforts while preserving its rustic charm.</p>
              <button className="contact-button">Contact Host</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Location</h4>
            <p>123 Mountain View Road</p>
            <p>Pine Valley, CA 91962</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@cozycabins.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#" className="social-link">Instagram</a>
              <a href="#" className="social-link">Facebook</a>
              <a href="#" className="social-link">Pinterest</a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2025 CozyCabins. All rights reserved.</p>
        </div>
      </footer>
      <style>
        {`
        
        /* App.css */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

:root {
  --primary-red: #FF5A5F;
  --dark-red: #E1374B;
  --light-red: #FFE2E2;
  --white: #FFFFFF;
  --light-gray: #F5F5F5;
  --dark-gray: #555555;
  --black: #222222;
}

body {
  background-color: var(--white);
  color: var(--black);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background-color: var(--white);
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5%;
  border-bottom: 1px solid var(--light-gray);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo h1 {
  color: var(--primary-red);
  font-size: 24px;
  font-weight: 700;
}

.nav ul {
  display: flex;
  list-style: none;
}

.nav li {
  margin-left: 30px;
}

.nav a {
  text-decoration: none;
  color: var(--black);
  font-weight: 500;
  transition: color 0.3s;
}

.nav a:hover {
  color: var(--primary-red);
}

/* Hero Section */
.hero {
  height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/api/placeholder/1200/500') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  text-align: center;
}

.hero-content {
  max-width: 800px;
  padding: 0 20px;
}

.hero h2 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 24px;
  margin-bottom: 30px;
}

.cta-button {
  background-color: var(--primary-red);
  color: var(--white);
  border: none;
  padding: 14px 30px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: var(--dark-red);
}

/* Main Content */
main {
  flex: 1;
}

section {
  padding: 60px 5%;
}

section h3 {
  font-size: 32px;
  margin-bottom: 30px;
  color: var(--black);
  text-align: center;
}

/* Booking Section */
.booking {
  background-color: var(--light-red);
  padding: 30px 5%;
}

.booking-container {
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--white);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.booking h3 {
  text-align: center;
  margin-bottom: 20px;
  color: var(--primary-red);
}

.booking-form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.form-group {
  flex: 1;
  min-width: 200px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: var(--dark-gray);
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--light-gray);
  border-radius: 5px;
}

.search-button {
  background-color: var(--primary-red);
  color: var(--white);
  border: none;
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 24px;
}

.search-button:hover {
  background-color: var(--dark-red);
}

/* Features Section */
.features {
  background-color: var(--white);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.feature {
  background-color: var(--light-gray);
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 32px;
  margin-bottom: 15px;
}

.feature h4 {
  color: var(--primary-red);
  margin-bottom: 10px;
}

/* Gallery Section */
.gallery {
  background-color: var(--light-red);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.gallery-item {
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.gallery-item:hover {
  transform: scale(1.03);
}

.placeholder-image {
  width: 100%;
  height: 200px;
  background-color: var(--light-gray);
}

.gallery-item p {
  background-color: var(--white);
  padding: 10px;
  text-align: center;
  font-weight: 500;
}

/* Reviews Section */
.reviews {
  background-color: var(--white);
}

.reviews-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.review {
  background-color: var(--light-gray);
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.review-header {  
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  align-items: center;
}

.review-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-red);
}

.rating {
  color: var(--primary-red);
  font-size: 18px;
}

/* Host Section */
.host {
  background-color: var(--light-red);
}

.host-container {
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  background-color: var(--white);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  gap: 30px;
}

.host-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--primary-red);
  flex-shrink: 0;
}

.host-info h4 {
  font-size: 24px;
  margin-bottom: 5px;
}

.host-info p {
  margin-bottom: 15px;
  line-height: 1.5;
}

.contact-button {
  background-color: var(--primary-red);
  color: var(--white);
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-button:hover {
  background-color: var(--dark-red);
}

/* Footer */
.footer {
  background-color: var(--dark-red);
  color: var(--white);
  padding: 50px 5% 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 30px;
}

.footer-section h4 {
  margin-bottom: 15px;
  font-size: 18px;
}

.footer-section p {
  margin-bottom: 8px;
  color: var(--light-gray);
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-link {
  color: var(--light-gray);
  text-decoration: none;
  transition: color 0.3s;
}

.social-link:hover {
  color: var(--white);
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header {
    flex-direction: column;
    height: auto;
    padding: 15px 5%;
  }
  
  .nav {
    margin-top: 15px;
  }
  
  .nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .nav li {
    margin: 5px 10px;
  }
  
  .hero {
    height: 400px;
  }
  
  .hero h2 {
    font-size: 36px;
  }
  
  .hero p {
    font-size: 18px;
  }
  
  .host-container {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

@media (max-width: 480px) {
  section {
    padding: 40px 5%;
  }
  
  .booking-form {
    flex-direction: column;
  }
  
  .hero {
    height: 300px;
  }
  
  .hero h2 {
    font-size: 28px;
  }
  
  .features-grid,
  .gallery-grid,
  .reviews-container {
    grid-template-columns: 1fr;
  }
}
              
        `}
      </style>
    </div>
    
  );
};

export default App;