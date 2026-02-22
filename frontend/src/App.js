// import logo from './logo.svg';
// import './App.css';

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import './App.css';
import iphone from './images/iphone-14.jpg';
import samsung from './images/samsung-s23.jpg';
import oneplus from './images/oneplus-11.jpg';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">EMI Financing</Link>
            <div className="search-wrapper-nav">
              <input 
                type="text" 
                placeholder="Search for TV, Mobiles, Headphones & more" 
                className="search-input-nav"
              />
              <button className="search-button-nav">🔍</button>
            </div>
            <div className="nav-menu">
              <Link to="/product/iphone-17-pro" className="nav-link">iPhone 17 Pro</Link>
              <Link to="/product/samsung-s24-ultra" className="nav-link">Samsung S24 Ultra</Link>
              <Link to="/product/oneplus-12" className="nav-link">OnePlus 12</Link>
            </div>
          </div>
        </nav>

        
        <div className="category-tabs">
          <div className="categories-container">
            <Link to="/category/mobiles" className="category-link active">Mobiles</Link>
            <Link to="/category/electronics" className="category-link">Electronics</Link>
            <Link to="/category/appliances" className="category-link">TV, AC & Appliances</Link>
            <Link to="/category/kitchen" className="category-link">Kitchen & Home</Link>
            <Link to="/category/health" className="category-link">Health & Wellness</Link>
            <Link to="/category/fashion" className="category-link">Fashion</Link>
            <Link to="/category/baby" className="category-link">Baby & Kids</Link>
            <Link to="/category/sports" className="category-link">Sports & Fitness</Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:slug" element={<ProductPage />} />
        </Routes>

        {/* FOOTER SECTION - SAME AS IMAGE */}
        <footer className="footer">
          <div className="footer-container">
            
            {/* Company Info */}
            <div className="footer-section">
              <h3 className="footer-brand">EMI Financing</h3>
              <p className="footer-text">EMI Financing</p>
              <p className="footer-text">Office No. 102, 2nd Floor, C-Wing, Mahindra Tech Park, Yelhanka Station, Bangalore-560035</p>
              <p className="footer-text">Contact number: 156-89176543</p>
              <p className="footer-text">Monday to Friday (9AM to 5PM)</p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h4 className="footer-title">Quick Links</h4>
              <ul className="footer-links">
                <li><Link to="/about" className="footer-link">About Us</Link></li>
                <li><Link to="/careers" className="footer-link">Careers</Link></li>
                <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                <li><Link to="/join-store" className="footer-link">Join as a EMI Store Merchant</Link></li>
                <li><Link to="/request-emi" className="footer-link">Request EMI Payment Solution</Link></li>
                <li><Link to="/partners" className="footer-link">Partners</Link></li>
              </ul>
            </div>

            {/* Support Links */}
            <div className="footer-section">
              <h4 className="footer-title">Support Links</h4>
              <ul className="footer-links">
                <li><Link to="/return-policy" className="footer-link">Return Policy</Link></li>
                <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
                <li><Link to="/terms" className="footer-link">Terms and Conditions</Link></li>
                <li><Link to="/refund-policy" className="footer-link">Refund Policy</Link></li>
                <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                <li><Link to="/corporate" className="footer-link">Corporate Information</Link></li>
              </ul>
            </div>

            {/* Download App */}
            <div className="footer-section">
              <h4 className="footer-title">Download EMI Financing Today</h4>
              <div className="app-buttons">
                <Link to="#" className="app-button">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" style={{ height: '40px' }} />
                </Link>
                <Link to="#" className="app-button">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: '40px', marginTop: '10px' }} />
                </Link>
              </div>
            </div>

          </div>
          
          {/* Copyright */}
          <div className="footer-bottom">
            <p className="copyright">© 2026 EMI Financing. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to EMI Financing</h1>
      <p>Select a product to view EMI plans</p>
      
      {/* Product Cards */}
      <div className="product-grid">
        <Link to="/product/iphone-17-pro" className="product-card">
          <img src={iphone} alt="iphone-14.jpg"/> 
          <h3>iPhone 17 Pro</h3>
          <p>Starting at ₹1,27,400</p>
        </Link>
        <Link to="/product/samsung-s24-ultra" className="product-card">
          <img src={samsung} alt="Samsung-s23.jpg" />
          <h3>Samsung S24 Ultra</h3>
          <p>Starting at ₹1,24,999</p>
        </Link>
        <Link to="/product/oneplus-12" className="product-card">
          <img src={oneplus} alt="Oneplus-11.jpg" />
          <h3>OnePlus 12</h3>
          <p>Starting at ₹64,999</p>
        </Link>
      </div>

      {/* Category Links */}
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        
        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#333' }}></h3>
          <div style={{ marginLeft: '20px' }}>
            <div style={{ marginBottom: '5px' }}><span style={{ color: '#666', marginRight: '8px' }}>•</span><Link to="#" style={{ color: '#0066c0', textDecoration: 'none' }}></Link></div>
            <div style={{ marginBottom: '5px' }}><span style={{ color: '#666', marginRight: '8px' }}>•</span><Link to="#" style={{ color: '#0066c0', textDecoration: 'none' }}></Link></div>
            <div style={{ marginBottom: '5px' }}><span style={{ color: '#666', marginRight: '8px' }}>•</span><Link to="#" style={{ color: '#0066c0', textDecoration: 'none' }}></Link></div>
          </div>
        </div>
        {/* Add other categories similarly */}
      </div>
    </div>
  );
}

export default App;




