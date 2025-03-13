import { useState, useEffect } from 'react';
import { NibiruTxClient, Testnet } from '@nibiruchain/nibijs';
import { Input } from "../components/ui/input";

interface MessageStoreProps {
  address: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  contractAddress: string;
  timestamp?: string;
  hideTimePicker?: boolean;
  hideMessageInput?: boolean;
  onlyShowButton?: boolean;
}

const MessageStore = ({ 
  address, 
  isLoading, 
  setIsLoading,
  contractAddress,
  timestamp,
  hideTimePicker = false,
  hideMessageInput = false,
  onlyShowButton = false
}: MessageStoreProps) => {
  const [message, setMessage] = useState('');
  const [unlockTime, setUnlockTime] = useState('');
  
  // Update unlockTime when timestamp changes from parent
  useEffect(() => {
    if (timestamp) {
      setUnlockTime(timestamp);
    }
  }, [timestamp]);

  const storeMessage = async () => {
    // If using the parent component's textarea in capsule.tsx when hideMessageInput=true
    let currentMessage = message;

    if (hideMessageInput) {
      // Get message from the textarea in the parent component
      const textareas = document.querySelectorAll('textarea');
      if (textareas.length > 0) {
        currentMessage = textareas[0].value;
      }
    }

    if (!address) {
      alert('Please connect your wallet first');
      return;
    }
    if (!currentMessage) {
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
          message: currentMessage,
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
      
      // Reset the form
      setMessage("");
      
      // Reset the parent textarea if we're using it
      if (hideMessageInput) {
        const textareas = document.querySelectorAll('textarea');
        if (textareas.length > 0) {
          textareas[0].value = '';
        }
      }
      
      // Don't reset unlockTime if it's controlled by parent
      if (!hideTimePicker) {
        setUnlockTime("");
      }
      
    } catch (error) {
      console.error("Error storing message:", error);
      alert("Failed to store message: " + 
        (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  // If we only want to show the button (using parent's UI for the rest)
  if (onlyShowButton) {
    return (
      <button 
        onClick={storeMessage}
        disabled={isLoading || !address || !unlockTime}
        className="w-full bg-gradient-to-r from-[#4361EE] to-[#7209B7] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#7209B7]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#252A44] disabled:from-[#252A44] disabled:to-[#252A44]"
      >
        {isLoading ? 'Creating Capsule...' : 'Create Capsule'}
      </button>
    );
  }

  return (
    <div className="mb-2">
      {/* Only show message input if not hidden */}
      {!hideMessageInput && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-1.5">
            Your Message
          </label>
          <textarea 
            className="w-full px-3 py-2 bg-[#181B2E] border border-[#252A44] rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-[#4CC9F0] focus:border-[#4CC9F0]" 
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message here..."
          />
        </div>
      )}
      
      {/* Only show date picker if not hidden */}
      {!hideTimePicker && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-white mb-1.5">
            Unlock Date
          </label>
          <Input
            type="datetime-local"
            className="w-full bg-[#181B2E] border-[#252A44] text-white focus:ring-[#4CC9F0] focus:border-[#4CC9F0]"
            onChange={(e) => {
              const dateValue = e.target.value;
              const timestamp = Math.floor(new Date(dateValue).getTime() / 1000);
              setUnlockTime(timestamp.toString());
            }}
          />
          {unlockTime && (
            <p className="text-xs text-white mt-1">
              Timestamp: {unlockTime}
            </p>
          )}
        </div>
      )}
      
      <button 
        onClick={storeMessage}
        disabled={isLoading || !address || !unlockTime}
        className="w-full bg-gradient-to-r from-[#4361EE] to-[#7209B7] text-white py-2 px-4 rounded-lg hover:shadow-lg hover:shadow-[#7209B7]/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#252A44] disabled:from-[#252A44] disabled:to-[#252A44]"
      >
        {isLoading ? 'Creating Capsule...' : 'Create Capsule'}
      </button>
    </div>
  );
};

export default MessageStore;