import React, { useContext, useEffect } from 'react';
import '../style/OrderSummary.css';
import AppContext from '../../Context/AppContext.jsx';
import { Link } from 'react-router-dom'; 

const OrderSummary = () => {
  const { address, cart, reduceQty, incrementQty, removeFromCart } = useContext(AppContext);

  const calculateTotal = () => {
    return cart
      ?.reduce((acc, item) => acc + item.price, 0)
      .toFixed(2) || '0.00';
  };

  const handleIncrement = async (id) => {
    const incremented = await incrementQty(id);
    if (!incremented) {
      console.error('Failed to increment quantity');
    }
    console.log('Incremented', incremented);
  };

  const handleDecrement = async (id) => {
    const decremented = await reduceQty(id);
    if (!decremented) {
      console.error('Failed to decrement quantity');
    }
    console.log('Decremented', decremented);
  };

  const handleProceedToPay = () => {
    console.log('Proceeding to payment...');
  };

  return (
    <>
      {cart?.length === 0 ? (
        <div className="empty-cart">
          <h2>Your Cart is Empty</h2>
          <p>Please add some items to your cart</p>
        </div>
      ) : (
        <div className="order-summary">
          <h2>Order Summary</h2>

          <div className="items-container">
            {Array.isArray(cart) &&
              cart.map((item) => (
                <div key={item.productId} className="item-row">
                  <img src={item.imgSrc} alt={item.title} className="item-image" />

                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                    <p>Price: ₹{(item.price / item.qty).toFixed(2)}</p>
                    <p>Subtotal: ₹{item.price.toFixed(2)}</p>
                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleDecrement(item.productId)}
                      disabled={item.qty <= 1}
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleIncrement(item.productId)}>+</button>
                  </div>
                </div>
              ))}
          </div>

          <div className="total-section">
            <h3>Total: ₹{Array.isArray(cart) && calculateTotal()}</h3>
            <Link to={'/crypto'} className="proceed-button" onClick={handleProceedToPay} style={{ textDecoration: 'none' }}>
              Proceed to Pay 💳
            </Link>
          </div>

          <div className="shipping-section">
            <h3>Shipping Address</h3>
            {(!address || Object.keys(address).length === 0) ? (
              <p>Please add your address</p>
            ) : (
              <>
                <p>{address.address || 'N/A'}</p>
                <p>{address.city || 'N/A'}</p>
                <p>
                  {address.state && address.pinCode
                    ? `${address.state} ${address.pinCode}`
                    : 'N/A'}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OrderSummary;