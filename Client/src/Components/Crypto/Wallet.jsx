import React from 'react';
import { useConnect } from 'wagmi';
import '../../../public/Wallet.css'; // Import the new CSS file

const Wallet = () => {
  const { connectors, connect } = useConnect();

  return (
    <div className="wallet-container">
      <h1 className="wallet-title">Connect Your Wallet</h1>
      <div className="wallet-connectors">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            className="connect-button"
            onClick={() => connect({ connector })}
          >
            {connector.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Wallet;