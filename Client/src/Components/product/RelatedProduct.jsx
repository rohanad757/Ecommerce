import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../Context/AppContext.jsx';
import { Link , useNavigate } from 'react-router-dom';

const RelatedProduct = ({ category }) => {
    const { products, addCart , token } = useContext(AppContext);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();

    const getRelatedProducts = async () => {
        const relatedProducts = await products.filter(product => product?.category?.toLowerCase() === category?.toLowerCase());
        if (relatedProducts.length === 1) {
            setRelatedProducts([]);
            return;
        }
        setRelatedProducts(relatedProducts);
    }

    const handlePrice = async (id, title, price, qty, img) => {
        if (token) {
            await addCart(id, title, price, qty, img);
            navigate("/cart");
        } else {
            alert("Please login to add products to cart.");
            navigate("/login");
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

    useEffect(() => {
        getRelatedProducts();
    }, [products]);

    return (
        <div className="product-container">
            <div className="product-grid">
                {relatedProducts?.map((product) => (
                    <div key={product._id} className="product-card">
                        <Link to={`/product/${product._id}`} className="product-image">
                            <img
                                src={product.imgSrc}
                                alt={product.title || "Product"}
                                loading="lazy"
                            />
                        </Link>
                        <div className="product-info">
                            <h5 className="product-title">{product.title}</h5>
                            <div className="product-footer">
                                <button className="price-btn" onClick={() => handlePrice(product._id, product.title, product.price, product.qty, product.imgSrc)}>₹{product.price}</button>
                                <button
                                    className="cart-btn"
                                    onClick={() => handleCartButton(product._id, product.title, product.price, product.qty, product.imgSrc)}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style jsx="true">{`
                .product-container {
                    padding: 25px;
                    margin: 20px;
                    background: #212529;
                    border-radius: 10px;
                }

                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 25px;
                }

                .product-card {
                    background: #343a40;
                    border-radius: 8px;
                    overflow: hidden;
                    transition: transform 0.2s ease;
                }

                .product-card:hover {
                    transform: translateY(-3px);
                }

                .product-image {
                    width: 100%;
                    height: 200px;
                    display: block;
                    text-decoration: none;
                    background: #2c3034;
                }

                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-bottom: 2px solid #feca57;
                }

                .product-info {
                    padding: 12px;
                    color: #e9ecef;
                }

                .product-title {
                    font-size: 1.2rem;
                    font-weight: 500;
                    margin: 0 0 8px;
                    line-height: 1.3;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .product-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }

                .price-btn, .cart-btn {
                    flex: 1;
                    padding: 6px 12px;
                    font-size: 14px;
                    border: none;
                    border-radius: 5px;
                    color: #fff;
                    text-align: center;
                    cursor: pointer;
                    transition: background 0.2s ease;
                }

                .price-btn {
                    background: #4dabf7;
                }

                .price-btn:hover {
                    background: #339af0;
                }

                .cart-btn {
                    background: #ff922b;
                }

                .cart-btn:hover {
                    background: #e67e22;
                }

                @media (max-width: 768px) {
                    .product-container {
                        padding: 20px;
                        margin: 15px;
                    }

                    .product-grid {
                        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                        gap: 20px;
                    }

                    .product-image {
                        height: 160px;
                    }

                    .product-title {
                        font-size: 1.1rem;
                    }

                    .price-btn, .cart-btn {
                        padding: 5px 10px;
                        font-size: 12px;
                    }

                    .product-info {
                        padding: 10px;
                    }
                }

                @media (max-width: 480px) {
                    .product-container {
                        padding: 15px;
                        margin: 10px;
                    }

                    .product-grid {
                        grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
                        gap: 15px;
                    }

                    .product-image {
                        height: 140px;
                    }

                    .product-title {
                        font-size: 1rem;
                        -webkit-line-clamp: 1;
                    }

                    .price-btn, .cart-btn {
                        padding: 4px 8px;
                        font-size: 11px;
                    }
                }

                @media (max-width: 360px) {
                    .product-container {
                        padding: 10px;
                        margin: 5px;
                    }

                    .product-grid {
                        grid-template-columns: 1fr;
                        gap: 12px;
                    }

                    .product-image {
                        height: 120px;
                    }

                    .product-title {
                        font-size: 0.95rem;
                    }

                    .price-btn, .cart-btn {
                        padding: 4px 6px;
                        font-size: 10px;
                    }
                }
            `}</style>
        </div>
    );
}

export default RelatedProduct;