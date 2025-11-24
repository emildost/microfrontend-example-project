import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [components, setComponents] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMicrofrontend = (name, url) => {
      return new Promise((resolve, reject) => {
        // Script daha önce yüklenmiş mi kontrol et
        if (window[name]) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = url;
        script.onload = () => {
          console.log(`${name} loaded successfully`);
          resolve();
        };
        script.onerror = () => {
          console.error(`Failed to load ${name}`);
          reject(new Error(`Failed to load ${name}`));
        };
        document.head.appendChild(script);
      });
    };

    const loadAllMicrofrontends = async () => {
      try {
        await Promise.all([
          loadMicrofrontend('Header', process.env.REACT_APP_HEADER_URL || 'http://localhost:3001/remoteEntry.js'),
          loadMicrofrontend('ProductList', process.env.REACT_APP_PRODUCT_LIST_URL || 'http://localhost:3002/remoteEntry.js'),
          loadMicrofrontend('UserProfile', process.env.REACT_APP_USER_PROFILE_URL || 'http://localhost:3003/remoteEntry.js'),
          loadMicrofrontend('Cart', process.env.REACT_APP_CART_URL || 'http://localhost:3004/remoteEntry.js'),
        ]);

        setComponents({
          Header: window.Header,
          ProductList: window.ProductList,
          UserProfile: window.UserProfile,
          Cart: window.Cart
        });
      } catch (error) {
        console.error('Error loading microfrontends:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllMicrofrontends();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <h2>Uygulama Yükleniyor...</h2>
        <div className="spinner"></div>
      </div>
    );
  }

  const { Header, ProductList, UserProfile, Cart } = components;

  return (
    <div className="app">
      <div className="header-section">
        {Header ? <Header /> : <div className="error">Header yüklenemedi</div>}
      </div>
      
      <div className="main-content">
        <div className="sidebar">
          {UserProfile ? <UserProfile /> : <div className="error">Profil yüklenemedi</div>}
          {Cart ? <Cart /> : <div className="error">Sepet yüklenemedi</div>}
        </div>
        
        <div className="content">
          {ProductList ? <ProductList /> : <div className="error">Ürünler yüklenemedi</div>}
        </div>
      </div>
    </div>
  );
};

export default App;