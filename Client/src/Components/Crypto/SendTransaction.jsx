import React, { useContext, useState, useEffect } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import AppContext from "../../Context/AppContext.jsx";
import { usePublicClient } from "wagmi";
import '../../../public/Transaction.css';

const SendTransaction = () => {
  const publicClient = usePublicClient();
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();
  const { cart } = useContext(AppContext);
  const [ethPrice, setEthPrice] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  
  // Fixed recipient address
  const FIXED_ADDRESS = "0x3899e07973434Baa416739E6B63c704Cd4fb81a0";

  // Fetch current ETH price in INR
  const fetchEthPrice = async () => {
    try {
      setIsLoadingPrice(true);
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
      const data = await response.json();
      setEthPrice(data.ethereum.inr);
    } catch (err) {
      console.error("Error fetching ETH price:", err);
    } finally {
      setIsLoadingPrice(false);
    }
  };

  useEffect(() => {
    fetchEthPrice();
  }, []);

  // Calculate total price from cart in INR and convert to ETH
  const calculateCartTotal = () => {
    if (!cart || cart.length === 0) return "0";
    if (!ethPrice) return "0";

    const totalInr = cart.reduce((acc, item) => acc + item.price, 0);
    const totalEth = totalInr / ethPrice;
    return totalEth.toFixed(8);
  };

  const cartTotalEth = calculateCartTotal();
  const cartTotalInr = cart?.length > 0 
    ? cart.reduce((acc, item) => acc + item.price, 0).toFixed(2)
    : "0";

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cartTotalEth || cartTotalEth === "0") {
      console.error("No items in cart or invalid total");
      return;
    }
    
    try {
      await sendTransaction({
        to: FIXED_ADDRESS,
        value: parseEther(cartTotalEth),
      });
    } catch (err) {
      console.error("Transaction Error:", err);
    }
  }

  const { isConfirming, isConfirmed } = useWaitForTransactionReceipt({
    hash: hash || undefined,
    confirmations: 2,
  });

  return (
    <div className="tx-container">
      <form onSubmit={handleSubmit} className="transaction-form">
        <h2>Checkout Payment</h2>
        
        <div className="address-display" style={{ marginBottom: '15px' }}>
          <label style={{ color: '#fff', display: 'block', marginBottom: '5px' }}>
            Payment Address:
          </label>
          <div style={{ 
            color: '#a855f7', 
            wordBreak: 'break-all',
            background: '#ffffff10',
            padding: '8px',
            borderRadius: '4px'
          }}>
            {FIXED_ADDRESS}
          </div>
        </div>
        
        <div className="cart-total" style={{ marginBottom: '15px', color: '#fff' }}>
          <strong>Total Amount: {cartTotalEth} ETH</strong>
          {cart.length > 0 && (
            <div style={{ color: '#a855f7', fontSize: '14px' }}>
              ≈ {cartTotalInr} INR | Items: {cart.length}
              {isLoadingPrice && " (Loading ETH price...)"}
              {!isLoadingPrice && ethPrice && ` (1 ETH = ${ethPrice} INR)`}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || cartTotalEth === "0" || !ethPrice || isLoadingPrice}
          className="tx-button"
        >
          {isPending ? "Processing..." : "Confirm Payment"}
        </button>

        {hash && (
          <div className="tx-hash">
            Transaction Hash:{" "}
            <a
              href={`https://etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="tx-link"
            >
              {hash.slice(0, 6)}...{hash.slice(-4)}
            </a>
          </div>
        )}
        
        {isConfirming && (
          <div className="tx-waiting" role="waiting">
            Waiting for confirmation (2/2 blocks)...
          </div>
        )}
        
        {isConfirmed && (
          <div className="tx-success" role="alert">
            ✅ Payment confirmed successfully!
          </div>
        )}
        
        {error && (
          <div className="tx-error" role="error">
            ❌ Error: {error?.shortMessage || error?.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default SendTransaction;