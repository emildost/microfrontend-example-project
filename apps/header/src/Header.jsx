import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🛍️ E-Ticaret</h1>
        </div>
        
        <nav className="nav">
          <a href="/" className="nav-link">Ana Sayfa</a>
          <a href="/products" className="nav-link">Ürünler</a>
          <a href="/categories" className="nav-link">Kategoriler</a>
          <a href="/about" className="nav-link">Hakkımızda</a>
          <a href="/contact" className="nav-link">İletişim</a>
        </nav>
        
        <div className="header-actions">
          <button className="search-btn">🔍</button>
          <button className="notification-btn">🔔</button>
        </div>
      </div>
    </header>
  );
};

// Global scope'a export et - Bu kritik öneme sahip!
if (typeof window !== 'undefined') {
  window.Header = Header;
}

export default Header;