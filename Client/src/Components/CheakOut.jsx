import React, { useContext, useEffect } from 'react';
import AppContext from '../Context/AppContext.jsx';
import { useNavigate } from 'react-router-dom';

const CheakOut = () => {
  const { addAddress, address, setAddress, message, getAddress, token } = useContext(AppContext);
  const navigate = useNavigate();

  // Fetch latest address only when token is available
  useEffect(() => {
    if (token) {
      getAddress();
    }
  }, []);

  const latestAddr = async () => {
    const latestAddress = await getAddress();
    if (latestAddress) {
      console.log("FrontEnd Latest Address:", latestAddress);
      alert("Proceeding with your latest address!");
      navigate('/order');
    } else {
      alert("No previous address found. Please add a new one.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const result = await addAddress(address);
      if (result === false || message === "Address already exists") {
        alert("Address already exists. Please use a different address.");
        return;
      }
      console.log("Address submitted successfully:", address);
      alert("Address added successfully!");
      navigate('/order');
    } catch (error) {
      console.error("Error submitting address:", error);
      alert("An error occurred while adding the address.");
    }
  };

  return (
    <div className="checkout-wrapper">
      <h2>Add your Address</h2>
      <form className="checkout-form" onSubmit={submitForm}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="inputFullName">Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              value={address.fullName || ''} 
              onChange={handleChange} 
              className="form-control" 
              id="inputFullName" 
              placeholder="Full Name" 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="inputPhoneNumber">Phone Number</label>
            <input 
              type="text" 
              name="phoneNumber" 
              value={address.phoneNumber || ''} 
              onChange={handleChange} 
              className="form-control" 
              id="inputPhoneNumber" 
              placeholder="Phone Number" 
            />
          </div>
        </div>
        <div className="form-group full-width">
          <label className="form-label" htmlFor="inputAddress">Address</label>
          <input 
            type="text" 
            name="address" 
            value={address.address || ''} 
            onChange={handleChange} 
            className="form-control" 
            id="inputAddress" 
            placeholder="1234 Main St" 
          />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="inputCity">City</label>
            <input 
              type="text" 
              name="city" 
              value={address.city || ''} 
              onChange={handleChange} 
              className="form-control" 
              id="inputCity" 
              placeholder="City" 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="inputState">State</label>
            <input 
              type="text" 
              name="state" 
              value={address.state || ''} 
              onChange={handleChange} 
              className="form-control" 
              id="inputState" 
              placeholder="State" 
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="inputPinCode">Pin Code</label>
            <input 
              type="text" 
              name="pinCode" 
              value={address.pinCode || ''} 
              onChange={handleChange} 
              className="form-control" 
              id="inputPinCode" 
              placeholder="Pin Code" 
            />
          </div>
        </div>
        <div className="form-group full-width">
          <label className="form-label" htmlFor="inputCountry">Country</label>
          <input 
            type="text" 
              name="country" 
              value={address.country || ''} 
              onChange={handleChange} 
              className="form-control" 
              id="inputCountry" 
              placeholder="Country" 
          />
        </div>
        <button type='button' className='btn btn-primary' onClick={latestAddr}>Cheakout with your Old Address</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <style>{`
        :root {
          --primary-bg: #212529;
          --form-bg: #343a40;
          --input-bg: #2c3034;
          --text-color: #e9ecef;
          --border-color: #495057;
          --focus-color: #feca57;
          --placeholder-color: #adb5bd;
          --spacing-sm: 10px;
          --spacing-md: 15px;
          --spacing-lg: 20px;
        }

        .checkout-wrapper {
          min-height: calc(100vh - 200px);
          margin-top: 0px;
          background: var(--primary-bg);
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .checkout-form {
          width: 100%;
          max-width: 700px;
          padding: var(--spacing-lg);
          background: var(--form-bg);
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          max-height: 90vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .form-row {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          justify-content: space-between;
        }

        .form-group {
          flex: 1;
          min-width: 200px;
        }

        .full-width {
          flex: 0 0 100%;
          max-width: 100%;
        }

        .form-label {
          display: block;
          font-size: 1rem;
          font-weight: 500;
          color: var(--text-color);
          margin-bottom: 6px;
        }

        .form-control {
          width: 100%;
          padding: var(--spacing-sm);
          font-size: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          background: var(--input-bg);
          color: var(--text-color);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-control:focus {
          border-color: var(--focus-color);
          box-shadow: 0 0 4px rgba(254, 202, 87, 0.3);
        }

        .form-control::placeholder {
          color: var(--placeholder-color);
        }

        .address-display {
          width: 100%;
          max-width: 700px;
          padding: var(--spacing-lg);
          background: var(--form-bg);
          border-radius: 8px;
          color: var(--text-color);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .address-display h3 {
          margin-bottom: var(--spacing-md);
          font-size: 1.2rem;
        }

        .address-display p {
          margin: 0 0 var(--spacing-sm) 0;
          font-size: 1rem;
        }

        .address-display strong {
          color: var(--focus-color);
          margin-right: 5px;
        }

        @media (max-width: 768px) {
          .checkout-wrapper {
            margin-top: 0;
            padding: var(--spacing-sm);
          }

          .checkout-form,
          .address-display {
            padding: var(--spacing-md);
            margin: var(--spacing-sm);
          }

          .form-row {
            gap: var(--spacing-sm);
            flex-direction: column;
          }

          .form-group {
            min-width: 100%;
          }

          .form-control {
            padding: 8px;
            font-size: 0.95rem;
          }

          .form-label {
            font-size: 0.95rem;
          }

          .address-display h3 {
            font-size: 1.1rem;
          }

          .address-display p {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}

export default CheakOut;