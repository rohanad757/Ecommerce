import React from 'react';
import { useAccount } from 'wagmi';
import Wallet from './Wallet.jsx';
import Account from './Account.jsx';

const Crpt = () => {
    const { isConnected } = useAccount();
  return (
    <div>
        {isConnected ? <Account /> : <Wallet />}
    </div>
  )
}

export default Crpt;