import React, { useState, useEffect } from 'react';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    // Sepet event'lerini dinle
    const handleAddToCart = (event) => {
      const product = event.detail.product;
      addToCart(product);
    };

    window.addEventListener('addToCart', handleAddToCart);

    // Mock initial cart data
    setCartItems([
      {
        id: 1,
        name: 'iPhone 14',
        price: 999.99,
        quantity: 1,
        image: 'https://via.placeholder.com/60/4A90E2/FFFFFF?text=IP14'
      },
      {
        id: 2,
        name: 'Nike Air Max',
        price: 129.99,
        quantity: 2,
        image: 'https://via.placeholder.com/60/B8E986/FFFFFF?text=NIKE'
      }
    ]);

    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
    };
  }, []);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image_url || `https://via.placeholder.com/60/667eea/FFFFFF?text=${product.name.charAt(0)}`
          }
        ];
      }
    });
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 9.99 : 0;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (!isOpen) {
    return (
      <div className="cart-closed">
        <button 
          className="open-cart-btn"
          onClick={() => setIsOpen(true)}
        >
          🛒 {totalItems}
        </button>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-header">
        <h3>🛒 Sepetim ({totalItems})</h3>
        <button 
          className="close-cart-btn"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>
      </div>

      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <p>Sepetiniz boş</p>
            <span>Ürün eklemek için alışverişe başlayın!</span>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h4 className="item-name">{item.name}</h4>
                    <div className="item-price">${item.price}</div>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="quantity">{item.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Ara Toplam:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Kargo:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>KDV (%18):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total">
                <span>Toplam:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <button className="checkout-btn">
                💳 Satın Al ({totalItems} ürün)
              </button>
              <button 
                className="clear-cart-btn"
                onClick={clearCart}
              >
                🗑️ Sepeti Temizle
              </button>
            </div>
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-promo">
          <div className="promo-code">
            <input 
              type="text" 
              placeholder="Promosyon kodu girin"
              className="promo-input"
            />
            <button className="apply-promo-btn">Uygula</button>
          </div>
          <div className="shipping-info">
            🚚 2-3 iş günü içinde kargo
          </div>
        </div>
      )}
    </div>
  );
};

// Global scope'a export et
if (typeof window !== 'undefined') {
  window.Cart = Cart;
}

export default Cart;