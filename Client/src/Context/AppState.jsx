import React , { useState , useEffect } from 'react';
import AppContext from './AppContext.jsx';
import axios from 'axios';
import { toast , ToastContainer , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppState = (props) => {
  const [products , setProducts] = useState([]);
  const [token , setToken] = useState("");
  const [isAuthenticated , setIsAuthenticated] = useState(false);
  const [filteredData , setFilteredData] = useState([]);
  const [profile , setProfile] = useState({});
  const [cart , setCart] = useState([]);
  const [ address , setAddress ] = useState({ fullName: '', phoneNumber: '', address: '', city: '', state: '', country: '', pinCode: '' });
  const [message , setMessage] = useState("");

    const url = 'http://localhost:3000/api/';

    const fetchData = async () => {
        try {
            const api = await axios.get(`${url}product/all`,{
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            setProducts(api.data.allProducts);
            setFilteredData(api.data.allProducts);
            // console.log("Filtered" , api.data.allProducts);
            // console.log("Products" , api.data.allProducts);
            
        } catch (error) {
            if (error.response) {
                console.log('AxiosError:', error.response);
            } else {
                console.log('Error:', error.message);
            }
        }
    };

    // // Register User
    const register = async (name , email , password) => {
      try {
          const api = await axios.post(`${url}user/register`, {name , email , password} ,{
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true
          });
          console.log(api.data.success);
          toast.success('Register Successfully', {
            position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
            autoClose: 1600,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Flip,
            style: { color: 'black' , fontWeight: 'bold'},
          });
          return api.data.success;
      } catch (error) {
        toast.error('Wrong Credentials', {
          position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
          autoClose: 1600,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
          style: { color: 'black' , fontWeight: 'bold'},
          });
          return error.response.data.success;
      }
  };

  // // Login User
  const login = async (email , password) => {
    try {
      const api = await axios.post(`${url}user/login`, {email , password} ,{
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
      });
      console.log(api.data.success);
      localStorage.setItem("token" , api.data.token);
      toast.success('Login Successfully', {
        position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
        autoClose: 1600,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: { color: 'black' , fontWeight: 'bold'},
      });
      setToken(api.data.token);
      console.log("Token:", api.data.token);
      setIsAuthenticated(true);
      return api.data.success;
  } catch (error) {
    toast.error('Wrong Credentials', {
      position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
      autoClose: 1600,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: { color: 'black' , fontWeight: 'bold'},
      });
      console.log(error.response.data.success);
      return error.response.data.success;
  }
  }

  // // Logout User
  const logout = async () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    setToken("");
    toast.success('Logout Successfully', {
      position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
      autoClose: 1600,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Flip,
      style: { color: 'black' , fontWeight: 'bold'},
    });
  };

  // // Get Profile
  const getProfile = async () => {
    try {
      const user = await axios.get(`${url}user/profile`, {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      setProfile(user.data);
      // console.log("fetchDataOfProfile : " , user.data);
    } catch (error) {
      console.log(error.response.data);
      return error.response.data.success;
    }
  };

  // // Add to Cart
  const addCart = async (productId, title, price, qty, imgSrc) => {
    try {
      const cart = await axios.post(`${url}cart/add` , { productId, title, price, qty, imgSrc } , {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      // console.log(cart.data.cart);
      toast.success(`${cart.data.cart.items[cart.data.cart.items.length - 1].title} added to Cart`, {
        position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
        autoClose: 1600,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: { color: 'black' , fontWeight: 'bold'},
      });
      return cart.data.success;
    } catch (error) {
      console.log("Error in Cart" , error.response.data.success);
      return error.response.data.success;
    }
  };

  // // Show Products
  const showProducts = async () => {
    try {
      if (!token) {
        throw new Error("No token available");
      }
      const showAppCart = await axios.get(`${url}cart/all`, {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      const items = showAppCart.data.cart?.items || [];
      setCart(items);
      // console.log("Cart : ", items);
    } catch (error) {
      console.log("Error in Cart", error.response ? error.response.data.success : error.message);
      if (error.response && error.response.status === 401) {
        toast.error('Session expired. Please log in again.', {
          position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
          autoClose: 1600,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
          style: { color: 'black' , fontWeight: 'bold'},
        });
        logout();
      }
      return error.response ? error.response.data.success : false;
    }
  };

  // // Remove from Cart
  const removeFromCart = async (id) => {
    try {
      console.log("Token RemoveFromCart :" , token);
      const removeCart = await axios.delete(`${url}cart/remove/${id}`,{
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      setCart(removeCart.data.cart);
      console.log("Cart Removed", removeCart.data.cart);
      return removeCart.data.cart;
    } catch (error) {
      console.log("Error in Cart", error.response ? error.response.data.success : error.message);
      toast.error('Error removing product from Cart', {
        position: window.innerWidth <= 768 ? "top-center" : "bottom-right",
        autoClose: 1600,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
        style: { color: 'black' , fontWeight: 'bold'},
      });
      return error.response ? error.response.data : { success: false };
    }
  };

  // // Decrease Quantity
  const reduceQty = async (id) => {
    try {
      const decreaseCartQty = await axios.put(`${url}cart/decrease/${id}` , {}, {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      setCart(decreaseCartQty.data.cart.items);
      console.log("Decremented FrontEnd : ", decreaseCartQty.data.cart.items);  // // [{ productId , title , price , qty , imgSrc }]
      // console.log("Cart updated : ",cart);
      return decreaseCartQty.data.cart.items;
    } catch (error) {
      console.log("Error in Cart", error.response ? error.response.data.success : error.message);
      return error.response ? error.response.data.success : false;
    }
  };

  // Increase Quantity 
  const incrementQty = async (id) => {
    try {
      const increaseCartQty = await axios.put(`${url}cart/increase/${id}` , {} , {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      setCart(increaseCartQty.data.cart.items);
      console.log("Increase FrontEnd : ", increaseCartQty.data.cart.items);
      return increaseCartQty.data.cart.items;
    } catch (error) {
      console.log("Error in Cart", error.response ? error.response.data.success : error.message);
      return error.response ? error.response.data.success : false;
    }
  };

  // // Clear cart
  const clearCart = async () => {
    try {
      const clearCart = await axios.delete(`${url}cart/clear`, {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      setCart(clearCart);
      console.log("Cart Cleared", clearCart);
    } catch (error) {
      console.log("Error in Cart", error.response ? error.response.data.success : error.message);
      return error.response ? error.response.data.success : false;
    }
  };

  // // Add Address 
  const addAddress = async (addressData) => {
    try {
      const response = await axios.post(`${url}address/add`, addressData, {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      if (response.data.msg === "Address already exists") {
        setMessage(response.data.msg);
        return false; // Indicate failure due to duplicate address
      }
      setMessage(""); // Clear any previous error message
      setAddress(response.data.address);
      console.log("Address Added", response.data.address);
      return response.data.address; // Return the added address on success
    } catch (error) {
      console.log("Error in Address", error.response ? error.response.data : error.message);
      setMessage("An error occurred while adding the address.");
      return false; // Indicate failure
    }
  };

  // // get latest address
  const getAddress = async () => {
    try {
      const getLatestAddr = await axios.get(`${url}address/get`, {
        headers: { 'Content-Type': 'application/json', 'token': token },
        withCredentials: true,
      });
      // console.log("getAddress" , getLatestAddr.data.address);
      setAddress(getLatestAddr.data.address);
      return getLatestAddr.data.address;
    } catch (error) {
      console.log("Error in Address", error.response ? error.response.data : error.message);
      return false;
    }
  };

    
    useEffect(() => {
      fetchData();
      if(localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        setIsAuthenticated(true);
      }
    }, []);

    const getAdd = async () => {
      const latestAddr = await getAddress();
      // console.log("UseEffect Address", latestAddr);
    };

    useEffect(() => {
      if (token) {
        getProfile();
        showProducts();
        getAdd();
      }
    }, [token]);

  return (
    <AppContext.Provider value={{ products , register , login , token , isAuthenticated , setIsAuthenticated , filteredData , setFilteredData , logout , profile , addCart , showProducts , cart , setCart , removeFromCart , reduceQty , incrementQty , clearCart , addAddress , address , setAddress , message , getAddress }}>
      <ToastContainer/>
        {props.children}
      </AppContext.Provider>
    );
}
export default AppState;
