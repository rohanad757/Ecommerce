import React, { useState, useEffect, useContext } from "react";
import { useParams , useNavigate } from "react-router-dom";
import axios from "axios";
import AppContext from "../../Context/AppContext.jsx";
import RelatedProduct from "./RelatedProduct.jsx";

const ProductDetails = () => {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const { addCart , token } = useContext(AppContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`http://localhost:3000/api/product/${id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setDetails(data.product);
      console.log("Frontend Details : ",data.product);    
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartButton = async (id, title, price, qty, img) => {
    if (token) {
      await addCart(id, title, price, qty, img);
    } else {
      alert("Please login to add products to cart.");
      navigate("/login");
    }
  };

  const buyButton = async (id, title, price, qty, img) => {
    if (token) {
      await addCart(id, title, price, qty, img);
      navigate("/cart");
    } else {
      alert("Please login to add products to cart.");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="details-container">
      <div className="item-details">
        <div className="details-image">
          <img
            src={details?.imgSrc}
            alt={details?.title || "Product"}
            loading="lazy"
          />
        </div>
        <div className="details-info">
          <h2 className="details-title">Food: {details?.title}</h2>
          <h3 className="details-price">Price: ₹{details?.price}</h3>
          <p className="details-description">Dish: {details?.description}</p>
          <div className="details-actions">
            <button className="buy-btn" onClick={() => buyButton(details?._id,details?.title,details?.price,details?.qty,details?.imgSrc)}>Buy</button>
            <button className="cart-btn" onClick={() => handleCartButton(details._id,details.title,details.price,details.qty,details.imgSrc)} > Add to Cart </button>
          </div>
        </div>
      </div>
      <div className="related-section">
        <h3 className="related-title">Related Items</h3>
        {details.category && <RelatedProduct category={details.category} />}
      </div>
      <style jsx="true">{`
        .details-container {
          padding: 25px;
          margin: 20px;
          background: #212529; /* Dark background matching ShowProduct */
          border-radius: 10px;
        }

        .item-details {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .details-image {
          width: 100%;
          max-width: 400px;
          height: 300px;
          background: #2c3034; /* Fallback for missing images */
          border-radius: 10px;
          overflow: hidden;
        }

        .details-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 2px solid #feca57; /* Yellow border */
        }

        .details-info {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          color: #e9ecef; /* Light text */
          text-align: center;
        }

        .details-title {
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
          color: #e9ecef;
        }

        .details-price {
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
          color: #4dabf7; /* Blue price */
        }

        .details-description {
          font-size: 1.1rem;
          margin: 0;
          color: #ced4da;
        }

        .details-actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .buy-btn {
          background: #e63946; /* Red for Buy */
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease;
          min-width: 100px;
        }

        .buy-btn:hover {
          background: #d00000;
        }

        .cart-btn {
          background: #ff922b; /* Orange for Add to Cart */
          border: none;
          border-radius: 6px;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 500;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s ease;
          min-width: 100px;
        }

        .cart-btn:hover {
          background: #e67e22;
        }

        .related-section {
          margin-top: 40px;
          text-align: center;
        }

        .related-title {
          font-size: 1.5rem;
          color: #4dabf7; /* Light blue for related items title */
          margin-bottom: 15px;
        }

        @media (max-width: 768px) {
          .details-container {
            padding: 20px;
            margin: 15px;
          }

          .details-image {
            max-width: 350px;
            height: 250px;
          }

          .details-title {
            font-size: 1.6rem;
          }

          .details-price {
            font-size: 1.3rem;
          }

          .details-description {
            font-size: 1rem;
          }

          .buy-btn, .cart-btn {
            padding: 8px 16px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .details-container {
            padding: 15px;
            margin: 10px;
          }

          .details-image {
            max-width: 300px;
            height: 200px;
          }

          .details-title {
            font-size: 1.4rem;
          }

          .details-price {
            font-size: 1.2rem;
          }

          .details-description {
            font-size: 0.9rem;
          }

          .details-actions {
            gap: 10px;
          }

          .buy-btn, .cart-btn {
            padding: 6px 12px;
            font-size: 12px;
            min-width: 90px;
          }

          .related-title {
            font-size: 1.3rem;
          }
        }

        @media (max-width: 360px) {
          .details-container {
            padding: 10px;
            margin: 5px;
          }

          .details-image {
            max-width: 250px;
            height: 180px;
          }

          .details-title {
            font-size: 1.2rem;
          }

          .details-price {
            font-size: 1.1rem;
          }

          .details-description {
            font-size: 0.85rem;
          }

          .buy-btn, .cart-btn {
            padding: 5px 10px;
            font-size: 11px;
            min-width: 80px;
          }

          .related-title {
            font-size: 1.2rem;
          }
        }

        @media (min-width: 769px) {
          .item-details {
            flex-direction: row;
            gap: 30px;
            align-items: flex-start;
          }

          .details-image, .details-info {
            width: 50%;
          }

          .details-info {
            text-align: left;
          }

          .details-actions {
            justify-content: flex-start;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;