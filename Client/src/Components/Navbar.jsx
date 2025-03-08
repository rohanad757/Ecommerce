import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../Context/AppContext.jsx";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const { token, isAuthenticated, setIsAuthenticated, setFilteredData, products, logout } = useContext(AppContext);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, [token, products]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/product/search/${search}`);
      setSearch("");
      setSearchOpen(false);
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSearch = () => setSearchOpen(!searchOpen);

  const filterByCategory = (category = "all") => {
    const filtered = category === "all"
      ? products
      : products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    setFilteredData(filtered);
    navigate("/");
    setMenuOpen(false);
  };

  const filterByPrice = (price) => {
    const filtered = products.filter(p =>
      p.price >= parseInt(price) - 50 && p.price <= parseInt(price) + 50
    );
    setFilteredData(filtered);
    navigate("/");
    setMenuOpen(false);
  };

  const logoutUser = () => {
    logout();
    setMenuOpen(false);
  };

  // Handle cart link click
  const handleCartClick = (e) => {
    if (!token) {
      e.preventDefault(); // Prevent navigation
      alert("Please log in to view your cart.");
      navigate("/login"); // Redirect to login page
    }
    // If token exists, navigation to /cart proceeds normally via Link
  };

  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar bg-dark">
          <Link
            onClick={() => filterByCategory()}
            to={"/"}
            className="left"
          >
            <h3>DOT</h3>
          </Link>
          <form
            onSubmit={handleSubmit}
            className={`search_bar ${searchOpen ? "open" : ""}`}
          >
            <span className="material-symbols-outlined">search</span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            <Link
              to={"/cart"}
              className="nav-btn cart-btn"
              onClick={handleCartClick} // Add click handler
            >
              Cart
            </Link>
            <Link to={"/profile"} className="nav-btn profile-btn">Profile</Link>
            {isAuthenticated ? (
              <Link onClick={logoutUser} to={"/"} className="nav-btn logout-btn">Logout</Link>
            ) : (
              <>
                <Link to={"/login"} className="nav-btn login-btn">Login</Link>
                <Link to={"/register"} className="nav-btn signup-btn">Signup</Link>
              </>
            )}
          </div>
          <div className="hamburger" onClick={toggleMenu}>
            <span className="material-symbols-outlined">menu</span>
          </div>
          <div className="search_icon" onClick={toggleSearch}>
            <span className="material-symbols-outlined">search</span>
          </div>
        </div>
        {menuOpen && (
          <div className="mobile_menu">
            <Link
              to={"/cart"}
              className="nav-btn cart-btn"
              onClick={handleCartClick} // Add click handler for mobile menu too
            >
              Cart
            </Link>
            <Link to={"/profile"} className="nav-btn profile-btn">Profile</Link>
            {isAuthenticated ? (
              <Link onClick={logoutUser} to={"/"} className="nav-btn logout-btn">Logout</Link>
            ) : (
              <>
                <Link to={"/login"} className="nav-btn login-btn">Login</Link>
                <Link to={"/register"} className="nav-btn signup-btn">Signup</Link>
              </>
            )}
          </div>
        )}
      </div>
      <div className="subBar">
        <div className="subBar-item" onClick={() => filterByCategory("all")}>No Filter</div>
        <div className="subBar-item" onClick={() => filterByCategory("NonVeg")}>Non Veg</div>
        <div className="subBar-item" onClick={() => filterByCategory("Veg")}>Veg</div>
        <div className="subBar-item" onClick={() => filterByCategory("Indian")}>Indian</div>
        <div className="subBar-item" onClick={() => filterByCategory("Chinese")}>Chinese</div>
        <div className="subBar-item" onClick={() => filterByCategory("IceCream")}>Cold</div>
        <div className="subBar-item" onClick={() => filterByCategory("Cake")}>Cakes</div>
        <div className="subBar-item" onClick={() => filterByPrice("400")}>400</div>
        <div className="subBar-item" onClick={() => filterByPrice("500")}>500</div>
      </div>
      <style jsx="true">{`
        .nav_bar {
          display: flex;
          align-items: center;
          padding: 10px 15px;
          min-height: 60px;
          background: #212529;
        }

        .left {
          text-decoration: none;
          color: #e9ecef;
          font-size: 1.5rem;
          font-weight: bold;
        }

        .search_bar {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
          max-width: 500px;
          margin: 0 15px;
        }

        .search_bar input {
          width: 100%;
          padding: 8px 12px;
          border-radius: 5px;
          border: none;
          outline: none;
          font-size: 14px;
          background: #000000;
          color: #ffffff;
        }

        .right {
          display: flex;
          gap: 12px;
        }

        .nav-btn {
          padding: 8px 16px;
          font-size: 14px;
          border-radius: 6px;
          text-decoration: none;
          color: #fff;
          font-weight: 500;
          transition: transform 0.2s ease, opacity 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 80px;
        }

        .nav-btn:hover {
          transform: translateY(-2px);
          opacity: 0.9;
        }

        .cart-btn {
          background: #4dabf7;
          border: none;
        }

        .profile-btn {
          background: #feca57;
          border: none;
          color: #212529;
        }

        .login-btn, .signup-btn {
          background: #6c757d;
          border: none;
        }

        .logout-btn {
          background: #e63946;
          border: none;
        }

        .hamburger, .search_icon {
          display: none;
          cursor: pointer;
          font-size: 24px;
          color: #e9ecef;
        }

        .mobile_menu {
          display: none;
          flex-direction: column;
          gap: 12px;
          background-color: #343a40;
          padding: 15px;
          position: absolute;
          width: 100%;
          top: 60px;
          left: 0;
          z-index: 1000;
        }

        .subBar {
          display: flex;
          flex-wrap: nowrap;
          gap: 12px;
          padding: 10px 15px;
          background: #1e2226;
          border-top: 1px solid #343a40;
          margin: 0;
          width: 100%;
          max-width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          box-sizing: border-box;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .subBar::-webkit-scrollbar {
          display: none;
        }

        .subBar-item {
          padding: 6px 14px;
          color: #e9ecef;
          background: none;
          border: 1px solid #495057;
          border-radius: 5px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          transition: border-color 0.3s ease, color 0.3s ease;
          flex-shrink: 0;
          white-space: nowrap;
        }

        .subBar-item:hover {
          border-color: #feca57;
          color: #feca57;
        }

        @media (max-width: 768px) {
          .nav_bar {
            justify-content: space-between;
            padding: 8px 10px;
          }

          .search_bar {
            display: none;
          }

          .search_bar.open {
            display: flex;
            position: absolute;
            top: 60px;
            left: 0;
            width: calc(100% - 20px);
            max-width: 100%;
            padding: 8px 10px;
            background-color: #000000;
            box-sizing: border-box;
            z-index: 1000;
            gap: 6px;
          }

          .search_bar.open span {
            font-size: 20px;
            color: #e9ecef;
            flex-shrink: 0;
          }

          .search_bar.open input {
            padding: 8px;
            font-size: 14px;
            border: none;
            outline: none;
            background: #000000;
            color: #ffffff;
            box-sizing: border-box;
          }

          .right {
            display: none;
          }

          .hamburger, .search_icon {
            display: block;
          }

          .mobile_menu {
            display: flex;
          }

          .nav-btn {
            padding: 8px 14px;
            font-size: 13px;
            min-width: 100%;
            border-radius: 5px;
          }

          .subBar {
            gap: 10px;
            padding: 8px 12px;
          }

          .subBar-item {
            padding: 5px 12px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .left {
            font-size: 1.2rem;
          }

          .hamburger, .search_icon {
            font-size: 20px;
          }

          .search_bar.open {
            width: calc(100% - 16px);
            padding: 6px 8px;
            background-color: #000000;
          }

          .search_bar.open span {
            font-size: 18px;
          }

          .search_bar.open input {
            padding: 6px;
            font-size: 12px;
            background: #000000;
            color: #ffffff;
          }

          .nav-btn {
            padding: 6px 12px;
            font-size: 12px;
          }

          .mobile_menu {
            padding: 12px;
            gap: 10px;
          }

          .subBar {
            gap: 8px;
            padding: 6px 10px;
          }

          .subBar-item {
            padding: 4px 10px;
            font-size: 12px;
          }
        }

        @media (max-width: 360px) {
          .subBar {
            gap: 6px;
            padding: 5px 8px;
          }

          .subBar-item {
            padding: 3px 8px;
            font-size: 11px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;