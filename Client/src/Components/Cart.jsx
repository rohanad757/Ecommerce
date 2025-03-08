import React, { useContext, useEffect } from "react";
import AppContext from "../Context/AppContext.jsx";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    showProducts,
    cart = [],
    setCart,
    token,
    removeFromCart,
    reduceQty,
    incrementQty,
    addCart,
    clearCart,
  } = useContext(AppContext);

  useEffect(() => {
    if (token) {
      showProducts();
    }
  }, [token]);

  async function remove(id) {
    await removeFromCart(id);
    setCart(cart.filter((item) => item.productId !== id));
    console.log("Removed from Cart", cart);
  }

  async function decreaseQty(id) {
    const updatedCart = await reduceQty(id);
    await setCart(updatedCart);
    cart.map((item) =>
      item.productId === id ? { ...item, qty: item.qty - 1 } : item
    );
    console.log("Decreased Quantity", updatedCart);
  }

  async function incCartQty(id) {
    const updatedCart = await incrementQty(id);
    await setCart(updatedCart);
    cart.map((item) =>
      item.productId === id ? { ...item, qty: item.qty + 1 } : item
    );
    console.log("Increased Quantity", updatedCart);
  }

  async function handleClearCart() {
    await clearCart();
    setCart([]);
  }

  return (
    <div className="cart-wrapper">
      <h3 className="cart-title">🛒 Your Shopping Cart</h3>
      <button className="pay-btn" onClick={handleClearCart}>
        Clear Cart 🧹
      </button>
      {cart.length === 0 ? (
        <p className="empty-message">Your cart is empty. Add some items! 🛍️</p>
      ) : (
        <div className="cart-grid">
          {(Array.isArray(cart) ? cart : [])
            .filter((item) => item.qty > 0)
            .map((item) => (
              <div className="cart-item" key={item._id}>
                <img className="cart-img" src={item.imgSrc} alt={item.title} />
                <div className="cart-info">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">₹{item.price / item.qty}</p>
                  <div>
                    <p className="cart-item-qty">Qty: {item.qty}</p>
                    <div className="qty-btn">
                      <button onClick={() => decreaseQty(item.productId)}>
                        -
                      </button>
                      <button onClick={() => incCartQty(item.productId)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => remove(item.productId)}
                >
                  ❌
                </button>
              </div>
            ))}
        </div>
      )}
      <div className="pay">
        <h3 className="total">
          Total: ₹
          {(Array.isArray(cart) ? cart : [])
            .reduce((acc, item) => acc + item.price, 0)
            .toFixed(2)}
        </h3>
        <div
          className="buttonCart"
          style={{
            width: "100%",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Link to={"/address"}>
            <button className="pay-btn" style={{ color: "black", width: "200px", fontWeight: "bold" }}>
              Check Out
            </button>
          </Link>
        </div>
      </div>
      <style>{`
/* Cart.css */
.cart-wrapper {
  max-width: 900px;
  margin: 20px auto;
  padding: 15px;
  background: #131417;
  color: #fff;
  border-radius: 8px;
}

.cart-title {
  font-size: 1.8rem;
  margin: 0 0 15px;
  text-align: center;
}

.empty-message {
  color: #aaa;
  text-align: center;
  padding: 15px 0;
  font-size: 1.1rem;
}

.cart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.cart-item {
  display: flex;
  align-items: center;
  background: #1e1f22;
  padding: 10px;
  border-radius: 6px;
  transition: transform 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
}

.cart-img {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  object-fit: cover;
}

.cart-info {
  flex: 1;
  padding-left: 10px;
}

.cart-item-title {
  font-size: 1.1rem;
  margin: 0 0 5px;
}

.cart-item-price {
  font-size: 1rem;
  color: #00ff99;
  margin: 0 0 5px;
}

.qty-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-item-qty {
  font-size: 0.9rem;
  color: #bbb;
  margin: 0;
}

.qty-btn {
  display: flex;
  gap: 5px;
}

.qty-btn button {
  width: 25px;
  height: 25px;
  background: rgb(187, 0, 72);
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;
}

.qty-btn button:hover {
  background: #00cc77;
}

.remove-btn {
  background: none;
  border: none;
  color: #ff4d4d;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0 5px;
  transition: color 0.2s ease;
}

.remove-btn:hover {
  color: #ff1a1a;
}

.pay {
  margin-top: 15px;
  padding: 15px;
  background: #131417;
  border-radius: 6px;
}

.total {
  font-size: 1.4rem;
  margin: 0 0 15px;
  text-align: center;
}

.button-cart {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
}

.pay-btn {
  padding: 8px 20px;
  background: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.2s ease;
}

.pay-btn:hover {
  background: #218838;
}

.clear-btn {
  background: #dc3545;
  margin-bottom: 15px;
}

.clear-btn:hover {
  background: #c82333;
}

/* Media Queries */
@media (max-width: 600px) {
  .cart-wrapper {
    margin: 10px;
    padding: 10px;
  }

  .cart-title {
    font-size: 1.5rem;
  }

  .cart-grid {
    grid-template-columns: 1fr;
  }

  .button-cart {
    flex-direction: column;
    gap: 10px;
  }
}
      `}</style>
    </div>
  );
};

export default Cart;
