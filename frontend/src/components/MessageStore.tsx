// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react';
import { NibiruTxClient, Testnet } from '@nibiruchain/nibijs';

interface MessageStoreProps {
  address: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  contractAddress: string;
}

const MessageStore = ({ 
  address, 
  isLoading, 
  setIsLoading,
  contractAddress 
}: MessageStoreProps) => {
  const [message, setMessage] = useState('');
  const [unlockTime, setUnlockTime] = useState('');

  // Convert date to UNIX timestamp
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = event.target.value;
    const timestamp = Math.floor(new Date(dateValue).getTime() / 1000);
    setUnlockTime(timestamp.toString());
  };

  const storeMessage = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }
    if (!message) {
      alert('Please enter a message');
      return;
    }
    if (!unlockTime) {
      alert('Please set an unlock time');
      return;
    }
  
    try {
      setIsLoading(true);
  
      const executeMsg = {
        store_message: {
          message: message,
          unlock_time: parseInt(unlockTime),
        },
      };
  
      const testnet = Testnet(2);
      if (!window.leap) {
        throw new Error('Leap wallet not available');
      }
  
      await window.leap.enable(testnet.chainId);
      const signer = window.leap.getOfflineSigner(testnet.chainId);

      const signingClient = await NibiruTxClient.connectWithSigner(
        testnet.endptTm,
        signer
      );

      const tx = await signingClient.wasmClient.execute(
        address,
        contractAddress,
        executeMsg,
        "auto",
        "Store time capsule message",
        []
      );
      console.log("Transaction hash:", tx);

      alert("Message stored successfully!");
      setMessage("");
      setUnlockTime("");
    } catch (error) {
      console.error("Error storing message:", error);
      alert("Failed to store message: " + 
        (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-6 border-t pt-4">
      <h2 className="text-xl font-semibold mb-3">Store a Message</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Message:
        </label>
        <textarea 
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" 
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message here..."
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Unlock Date:
        </label>
        <input 
          type="datetime-local" 
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          onChange={handleDateChange}
        />
        {unlockTime && (
          <p className="text-xs text-gray-600 mt-1">
            Timestamp: {unlockTime}
          </p>
        )}
      </div>
      
      <button 
        onClick={storeMessage}
        disabled={isLoading || !address}
        className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:bg-gray-400"
      >
        {isLoading ? 'Storing...' : 'Store Message'}
      </button>
    </div>
  );
};

export default MessageStore;