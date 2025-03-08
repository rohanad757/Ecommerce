import React from 'react';
import {
  useAccount,
  useDisconnect,
  useBalance,
  useChainId,
  useTransactionCount,
  useBlockNumber,
  useFeeData,
} from 'wagmi';
import '../../../public/Account.css';
import { Link } from 'react-router-dom';

const Account = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: balance, isLoading: balanceLoading, error: balanceError } = useBalance({ address });
  const chainId = useChainId();
  const { data: txCount, isLoading: txCountLoading } = useTransactionCount({ address });
  const { data: blockNumber, isLoading: blockLoading } = useBlockNumber();
  const { data: feeData, isLoading: feeLoading } = useFeeData();

  // Placeholder function for "Pay via Crypto" (implement as needed)
  const handlePayViaCrypto = () => {
    console.log('Pay via Crypto clicked');
    // Add your crypto payment logic here
  };

  return (
    <div className="account-container">
      <h1 className="account-title">Account Dashboard</h1>
      <div className="account-details-list">
        <div className="account-detail">
          <span>Status</span>
          <span>{isConnected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <div className="account-detail">
          <span>Address</span>
          <span>{address}</span>
        </div>
        <div className="account-detail">
          <span>Chain ID</span>
          <span>{chainId ?? 'Unknown'}</span>
        </div>
        <div className="account-detail">
          <span>Balance</span>
          <span>
            {balanceLoading ? 'Loading...' : balance ? `${balance.formatted} ${balance.symbol}` : 'N/A'}
          </span>
        </div>
        {balanceError && (
          <div className="account-detail">
            <span>Error</span>
            <span>{balanceError.message}</span>
          </div>
        )}
        <div className="account-detail">
          <span>Transaction Count</span>
          <span>{txCountLoading ? 'Loading...' : txCount ? txCount.toString() : 'N/A'}</span>
        </div>
        <div className="account-detail">
          <span>Block Number</span>
          <span>{blockLoading ? 'Loading...' : blockNumber ? blockNumber.toString() : 'N/A'}</span>
        </div>
      </div>
      <div className="button-container">
        <button className="disconnect-button" onClick={disconnect}>
          Disconnect Wallet
        </button>
        <Link className="pay-crypto-button" onClick={handlePayViaCrypto} style={{textDecoration:"none"}} to={'/send-transaction'}>
          Pay via Crypto
        </Link>
      </div>
    </div>
  );
};

export default Account;