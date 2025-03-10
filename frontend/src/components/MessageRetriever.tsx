import { useState } from 'react';
import { NibiruQuerier, Testnet } from '@nibiruchain/nibijs';

interface MessageRetrieverProps {
  address: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  contractAddress: string;
}

const MessageRetriever = ({ 
  address, 
  isLoading, 
  setIsLoading,
  contractAddress 
}: MessageRetrieverProps) => {
  const [storedMessage, setStoredMessage] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlockDate, setUnlockDate] = useState('');

  // Get stored message
  const getMessage = async () => {
    if (!address) {
      alert('Please connect your wallet first');
      return;
    }

    try {
      setIsLoading(true);
      
      // Format query message
      const queryMsg = {
        get_message: {
          owner: address
        }
      };
      
      // Get the testnet configuration
      const testnet = Testnet(2);
      
      // Create querier client
      const querier = await NibiruQuerier.connect(testnet.endptTm);
      
      // Query the contract
      const result = await querier.nibiruExtensions.wasm.queryContractSmart(
        contractAddress,
        queryMsg
      );

      console.log('Query result:', result);
      
      if (!result) {
        throw new Error('Failed to get response from contract');
      }
      
      // Set the retrieved message data
      setStoredMessage(result.message);
      setIsUnlocked(result.is_unlocked);
      
      // Convert UNIX timestamp to readable date
      const date = new Date(result.unlock_time * 1000);
      setUnlockDate(date.toLocaleString());
    } catch (error) {
      console.error('Error retrieving message:', error);
      alert('Failed to retrieve message: ' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border-t pt-4">
      <h2 className="text-xl font-semibold mb-3">Retrieve Your Message</h2>
      
      <button 
        onClick={getMessage}
        disabled={isLoading || !address}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 disabled:bg-gray-400 mb-4"
      >
        {isLoading ? 'Retrieving...' : 'Get My Message'}
      </button>
      
      {storedMessage && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <p className="font-bold text-sm mb-2">
            Status: {isUnlocked ? 'Unlocked ✅' : 'Still Locked 🔒'}
          </p>
          <p className="text-sm mb-2">Unlock date: {unlockDate}</p>
          <div className="mt-2">
            <p className="font-bold text-sm">Message:</p>
            <p className="p-2 bg-white border rounded mt-1">{storedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageRetriever;