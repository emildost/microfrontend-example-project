import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './Header';

// Component'i render et (development için)
const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(<Header />);
}

// Global scope'a export et
if (typeof window !== 'undefined') {
  window.Header = Header;
}