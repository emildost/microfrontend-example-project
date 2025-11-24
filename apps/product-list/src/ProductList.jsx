import React, { useState, useEffect } from 'react';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/products/`);
        
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken hata oluştu');
        }
        
        const data = await response.json();
        setProducts(data.data || data);
      } catch (err) {
        setError(err.message);
        // Mock data fallback
        setProducts([
          {
            id: 1,
            name: 'iPhone 14',
            description: 'Apple iPhone 14 - 128GB',
            price: 999.99,
            category_name: 'Elektronik',
            image_url: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=iPhone+14',
            stock: 50
          },
          {
            id: 2,
            name: 'Samsung Galaxy S23',
            description: 'Samsung Galaxy S23 - 256GB',
            price: 899.99,
            category_name: 'Elektronik',
            image_url: 'https://via.placeholder.com/300x200/50E3C2/FFFFFF?text=Galaxy+S23',
            stock: 30
          },
          {
            id: 3,
            name: 'Nike Air Max',
            description: 'Nike spor ayakkabı - Siyah',
            price: 129.99,
            category_name: 'Giyim',
            image_url: 'https://via.placeholder.com/300x200/B8E986/FFFFFF?text=Nike+Air+Max',
            stock: 100
          },
          {
            id: 4,
            name: 'Java Programlama Kitabı',
            description: 'Java programlama ve algoritma kitabı',
            price: 49.99,
            category_name: 'Kitap',
            image_url: 'https://via.placeholder.com/300x200/F5A623/FFFFFF?text=Java+Kitap',
            stock: 25
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    // Sepet event'i gönder
    const event = new CustomEvent('addToCart', { 
      detail: { product } 
    });
    window.dispatchEvent(event);
    
    alert(`${product.name} sepete eklendi!`);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Ürünler yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h3>Hata oluştu</h3>
        <p>{error}</p>
        <p>Mock veriler gösteriliyor...</p>
      </div>
    );
  }

  return (
    <div className="product-list">
      <div className="product-list-header">
        <h2>🎯 Popüler Ürünler</h2>
        <p>{products.length} ürün listeleniyor</p>
      </div>

      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image_url || `https://via.placeholder.com/300x200/667eea/FFFFFF?text=${encodeURIComponent(product.name)}`} 
                alt={product.name}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/667eea/FFFFFF?text=${encodeURIComponent(product.name)}`;
                }}
              />
              <span className="category-badge">{product.category_name}</span>
            </div>
            
            <div className="product-info">
              <h3 className="product-title">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              
              <div className="product-meta">
                <div className="price">${product.price}</div>
                <div className="stock">
                  {product.stock > 0 ? (
                    <span className="in-stock">✅ Stokta ({product.stock})</span>
                  ) : (
                    <span className="out-of-stock">❌ Stokta yok</span>
                  )}
                </div>
              </div>
              
              <button 
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? '🛒 Sepete Ekle' : 'Stokta Yok'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Global scope'a export et
if (typeof window !== 'undefined') {
  window.ProductList = ProductList;
}

export default ProductList;