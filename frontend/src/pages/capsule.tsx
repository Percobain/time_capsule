// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import WalletConnect from '../components/WalletConnect';
import MessageStore from '../components/MessageStore';
import MessageRetriever from '../components/MessageRetriever';
import { Toaster, toast } from 'sonner';

export default function Capsule() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  // Function to handle successful wallet connection
  const handleConnect = (address: string) => {
    setAddress(address);
    toast.success('Wallet connected successfully', {
      description: `Connected to ${address.slice(0, 8)}...${address.slice(-4)}`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Toaster position="top-right" richColors />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Time Capsule</h1>
        
        <WalletConnect 
          address={address} 
          onConnect={handleConnect} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading}
        />
        
        <MessageStore 
          address={address} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          contractAddress={contractAddress}
        />
        
        <MessageRetriever 
          address={address} 
          isLoading={isLoading} 
          setIsLoading={setIsLoading} 
          contractAddress={contractAddress}
        />
      </div>
    </div>
  );
}