/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import { Testnet } from '@nibiruchain/nibijs';

interface WalletConnectProps {
  address: string;
  onConnect: (address: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const WalletConnect = ({ 
  address, 
  onConnect,
  isLoading,
  setIsLoading
}: WalletConnectProps) => {

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      
      if (!window.leap) {
        alert('Please install Leap wallet extension');
        return;
      }

      // Get the testnet configuration
      const testnet = Testnet(2);
      
      // Request connection to Leap wallet
      await window.leap.enable(testnet.chainId);
      
      // Get the offline signer for the chain
      const offlineSigner = window.leap.getOfflineSigner(testnet.chainId);
      
      // Ensure offlineSigner exists
      if (!offlineSigner) {
        throw new Error('Failed to get offline signer');
      }
      
      // Get user accounts
      const accounts = await offlineSigner.getAccounts();
      
      // Set the first account's address
      onConnect(accounts[0].address);
      
      console.log('Connected to wallet:', accounts[0].address);
    } catch (error) {
      console.error('Error connecting to wallet:', error);
      alert('Failed to connect wallet: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6">
      {address ? (
        <div className="flex flex-col">
          <span className="text-sm text-gray-600 mb-2">Connected Address:</span>
          <span className="text-xs bg-gray-100 p-2 rounded break-all">{address}</span>
        </div>
      ) : (
        <button 
          onClick={connectWallet}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Connecting...' : 'Connect Leap Wallet'}
        </button>
      )}
    </div>
  );
};

export default WalletConnect;